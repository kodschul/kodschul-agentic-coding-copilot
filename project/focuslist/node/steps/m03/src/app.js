import { createServer } from "node:http";
import { readFile } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadTasks, saveTasks, addTask } from "./store.js";
import { indexPage } from "./views/index.js";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

export function createApp({ dataPath = path.join(ROOT, "data", "tasks.json") } = {}) {
  return createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");

    try {
      // Startseite mit Filter
      if (req.method === "GET" && url.pathname === "/") {
        const status = url.searchParams.get("status") || "all";
        let tasks = await loadTasks(dataPath);
        const total = tasks.length;
        if (status == "open") tasks = tasks.filter((t) => !t.done);
        if (status == "done") tasks = tasks.filter((t) => t.done);
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(indexPage(tasks, { status, total, created: url.searchParams.get("created") }));
        return;
      }

      // Neue Aufgabe anlegen
      if (req.method === "POST" && url.pathname === "/tasks") {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", () => {
          const form = new URLSearchParams(body);
          const title = form.get("title");
          const priority = form.get("priority") || "medium";
          addTask(dataPath, { title, priority, done: false }, (err) => {
            if (err) {
              res.writeHead(500);
              res.end("Fehler beim Speichern");
              return;
            }
            res.writeHead(302, { Location: "/?created=" + encodeURIComponent(title) });
            res.end();
          });
        });
        return;
      }

      // Aufgabe als erledigt markieren
      const match = url.pathname.match(/^\/tasks\/(\d+)\/complete$/);
      if (req.method === "POST" && match) {
        const tasks = await loadTasks(dataPath);
        const task = tasks.find((t) => t.id == match[1]);
        if (task) {
          task.done = true;
          await saveTasks(dataPath, tasks);
        }
        res.writeHead(302, { Location: "/" });
        res.end();
        return;
      }

      // JSON-API
      if (req.method === "GET" && url.pathname === "/api/tasks") {
        const tasks = await loadTasks(dataPath);
        const status = url.searchParams.get("status");
        let result = tasks;
        if (status === "open") result = tasks.filter((t) => t.done === false);
        else if (status === "done") result = tasks.filter((t) => t.done === true);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
        return;
      }

      // Statische Dateien (CSS)
      if (req.method === "GET" && req.url.startsWith("/static/")) {
        const filePath = path.join(ROOT, "static", req.url.replace("/static/", ""));
        readFile(filePath, (err, data) => {
          if (err) {
            res.writeHead(404);
            res.end("Nicht gefunden");
            return;
          }
          const type = filePath.endsWith(".css") ? "text/css" : "text/plain";
          res.writeHead(200, { "Content-Type": type });
          res.end(data);
        });
        return;
      }

      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Nicht gefunden");
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Interner Fehler");
    }
  });
}
