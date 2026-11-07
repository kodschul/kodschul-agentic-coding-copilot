import { mkdtemp, copyFile, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createApp } from "../src/app.js";

// Startet die App auf einem freien Port mit einer Kopie der Beispieldaten
export async function startTestServer() {
  const dir = await mkdtemp(join(tmpdir(), "focuslist-"));
  const dataPath = join(dir, "tasks.json");
  await copyFile(new URL("../data/tasks.json", import.meta.url), dataPath);

  const server = createApp({ dataPath });
  await new Promise((resolve) => server.listen(0, resolve));
  const baseUrl = `http://localhost:${server.address().port}`;

  return {
    baseUrl,
    dataPath,
    readTasks: async () => JSON.parse(await readFile(dataPath, "utf8")),
    // Formular absenden wie der Browser, Redirect nicht folgen
    postForm: (path, fields = {}) =>
      fetch(baseUrl + path, { method: "POST", body: new URLSearchParams(fields), redirect: "manual" }),
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}
