import { readFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { sendText } from "./http.js";

const TYPES = { ".css": "text/css; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png" };

export async function serveStatic(req, res, staticDir) {
  const filePath = join(staticDir, req.url.replace("/static/", ""));
  try {
    const data = await readFile(filePath);
    res.writeHead(200, { "Content-Type": TYPES[extname(filePath)] || "text/plain; charset=utf-8" });
    res.end(data);
  } catch {
    sendText(res, 404, "Nicht gefunden");
  }
}
