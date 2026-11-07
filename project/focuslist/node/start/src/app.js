import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadTasks } from "./store.js";
import { indexPage } from "./views/index.js";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

export function createApp({ dataPath = join(ROOT, "data", "tasks.json") } = {}) {
  return createServer(async (req, res) => {
    try {
      if (req.method === "GET" && req.url === "/") {
        const tasks = await loadTasks(dataPath);
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(indexPage(tasks));
        return;
      }

      // Das von Tailwind gebaute Stylesheet
      if (req.method === "GET" && req.url === "/static/app.css") {
        const css = await readFile(join(ROOT, "static", "app.css"));
        res.writeHead(200, { "Content-Type": "text/css; charset=utf-8" });
        res.end(css);
        return;
      }

      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Nicht gefunden");
    } catch (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Nicht gefunden");
        return;
      }
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Interner Fehler");
    }
  });
}
