import { createServer } from "node:http";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { readBody, sendHtml, sendJson, redirect, sendText } from "./http.js";
import { serveStatic } from "./static.js";
import { STATUSES, validateTask, listTasks, createTask, completeTask, deleteTask } from "./tasks.js";
import { indexPage } from "./views/index.js";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

// Routen verteilen nur: Logik steckt in tasks.js, HTML in views/
export function createApp({ dataPath = join(ROOT, "data", "tasks.json") } = {}) {
  return createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");
    const { pathname, searchParams } = url;
    const taskAction = pathname.match(/^\/tasks\/(\d+)\/(complete|delete)$/);

    try {
      if (req.method === "GET" && pathname === "/") {
        const requested = searchParams.get("status");
        const status = STATUSES.includes(requested) ? requested : "all";
        const { tasks, total } = await listTasks(dataPath, status);
        const created = searchParams.get("created");
        return sendHtml(res, 200, indexPage(tasks, { status, total, created }));
      }

      if (req.method === "POST" && pathname === "/tasks") {
        const form = new URLSearchParams(await readBody(req));
        const { errors, value } = validateTask({ title: form.get("title"), priority: form.get("priority") });
        if (errors.length > 0) {
          const { tasks, total } = await listTasks(dataPath, "all");
          return sendHtml(res, 400, indexPage(tasks, { total, errors, form: value }));
        }
        const task = await createTask(dataPath, value);
        return redirect(res, "/?created=" + encodeURIComponent(task.title));
      }

      if (req.method === "POST" && taskAction) {
        const id = Number(taskAction[1]);
        if (taskAction[2] === "complete") await completeTask(dataPath, id);
        else await deleteTask(dataPath, id);
        return redirect(res, "/");
      }

      if (req.method === "GET" && pathname === "/api/tasks") {
        const status = searchParams.get("status") ?? "all";
        if (!STATUSES.includes(status)) {
          return sendJson(res, 400, { error: `Unbekannter Status: erlaubt sind ${STATUSES.join(", ")}` });
        }
        const { tasks } = await listTasks(dataPath, status);
        return sendJson(res, 200, tasks);
      }

      if (req.method === "GET" && pathname.startsWith("/static/")) {
        return await serveStatic(req, res, join(ROOT, "static"));
      }

      sendText(res, 404, "Nicht gefunden");
    } catch (err) {
      if (err.status) return sendText(res, err.status, err.message);
      console.error(err);
      sendText(res, 500, "Interner Fehler");
    }
  });
}
