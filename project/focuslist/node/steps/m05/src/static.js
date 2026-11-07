import { readFile } from "node:fs/promises";
import { resolve, sep, extname } from "node:path";
import { sendText } from "./http.js";

const TYPES = { ".css": "text/css; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png" };

// Liefert den absoluten Pfad nur, wenn er innerhalb von baseDir liegt
export function safePath(baseDir, requested) {
  let decoded;
  try {
    decoded = decodeURIComponent(requested.split("?")[0]);
  } catch {
    return null;
  }
  const base = resolve(baseDir);
  const fullPath = resolve(base, "." + sep + decoded);
  return fullPath.startsWith(base + sep) ? fullPath : null;
}

export async function serveStatic(req, res, staticDir) {
  const filePath = safePath(staticDir, req.url.slice("/static/".length));
  if (!filePath) return sendText(res, 404, "Nicht gefunden");
  try {
    const data = await readFile(filePath);
    res.writeHead(200, { "Content-Type": TYPES[extname(filePath)] || "text/plain; charset=utf-8" });
    res.end(data);
  } catch {
    sendText(res, 404, "Nicht gefunden");
  }
}
