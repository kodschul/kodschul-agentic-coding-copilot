import { createServer } from "node:http";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { readBody, sendHtml, sendJson, redirect, sendText } from "./http.js";
import { serveStatic } from "./static.js";
import { listTasks, createTask, completeTask, deleteTask } from "./tasks.js";
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
        const status = searchParams.get("status") || "all";
        const { tasks, total } = await listTasks(dataPath, status);
        const created = searchParams.get("created");
        return sendHtml(res, 200, indexPage(tasks, { status, total, created }));
      }

      if (req.method === "POST" && pathname === "/tasks") {
        const form = new URLSearchParams(await readBody(req));
        const task = await createTask(dataPath, {
          title: form.get("title"),
          priority: form.get("priority"),
        });
        return redirect(res, "/?created=" + encodeURIComponent(task.title));
      }

      if (req.method === "POST" && taskAction) {
        const id = Number(taskAction[1]);
        if (taskAction[2] === "complete") await completeTask(dataPath, id);
        else await deleteTask(dataPath, id);
        return redirect(res, "/");
      }

      if (req.method === "GET" && pathname === "/api/tasks") {
        const { tasks } = await listTasks(dataPath, searchParams.get("status") || "all");
        return sendJson(res, 200, tasks);
      }

      if (req.method === "GET" && req.url.startsWith("/static/")) {
        return await serveStatic(req, res, join(ROOT, "static"));
      }

      sendText(res, 404, "Nicht gefunden");
    } catch (err) {
      console.error(err);
      sendText(res, 500, "Interner Fehler");
    }
  });
}
