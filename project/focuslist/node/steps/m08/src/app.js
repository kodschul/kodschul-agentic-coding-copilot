import { createServer } from "node:http";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { readBody, sendHtml, sendJson, redirect, sendText } from "./http.js";
import { serveStatic } from "./static.js";
import {
  STATUSES,
  today,
  validateTask,
  listTasks,
  createTask,
  getTask,
  updateTask,
  completeTask,
  deleteTask,
} from "./tasks.js";
import { indexPage } from "./views/index.js";
import { editPage } from "./views/edit.js";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

// Felder des Aufgaben-Formulars (Neu und Bearbeiten)
async function readForm(req) {
  const form = new URLSearchParams(await readBody(req));
  return { title: form.get("title"), priority: form.get("priority"), due: form.get("due") };
}

// Routen verteilen nur: Logik steckt in tasks.js, HTML in views/
export function createApp({ dataPath = join(ROOT, "data", "tasks.json") } = {}) {
  return createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");
    const { pathname, searchParams } = url;
    const taskAction = pathname.match(/^\/tasks\/(\d+)\/(complete|delete)$/);
    const editMatch = pathname.match(/^\/tasks\/(\d+)\/edit$/);

    try {
      if (req.method === "GET" && pathname === "/") {
        const requested = searchParams.get("status");
        const status = STATUSES.includes(requested) ? requested : "all";
        const { tasks, total } = await listTasks(dataPath, status);
        const created = searchParams.get("created");
        return sendHtml(res, 200, indexPage(tasks, { status, total, created, today: today() }));
      }

      if (req.method === "POST" && pathname === "/tasks") {
        const { errors, value } = validateTask(await readForm(req));
        if (errors.length > 0) {
          const { tasks, total } = await listTasks(dataPath, "all");
          return sendHtml(res, 400, indexPage(tasks, { total, errors, form: value, today: today() }));
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

      if (editMatch && (req.method === "GET" || req.method === "POST")) {
        const id = Number(editMatch[1]);
        const task = await getTask(dataPath, id);
        if (!task) return sendText(res, 404, "Aufgabe nicht gefunden");
        if (req.method === "GET") return sendHtml(res, 200, editPage(task));

        const { errors, value } = validateTask(await readForm(req));
        if (errors.length > 0) return sendHtml(res, 400, editPage(task, { errors, form: value }));
        await updateTask(dataPath, id, value);
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
