import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, copyFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createApp } from "../src/app.js";

let server;
let baseUrl;

before(async () => {
  // Jeder Testlauf arbeitet mit einer Kopie der Beispieldaten
  const dir = await mkdtemp(join(tmpdir(), "focuslist-"));
  const dataPath = join(dir, "tasks.json");
  await copyFile(new URL("../data/tasks.json", import.meta.url), dataPath);

  server = createApp({ dataPath });
  await new Promise((resolve) => server.listen(0, resolve));
  baseUrl = `http://localhost:${server.address().port}`;
});

after(() => server.close());

test("GET / zeigt die Aufgabenliste", async () => {
  const res = await fetch(`${baseUrl}/`);
  assert.equal(res.status, 200);
  const html = await res.text();
  assert.match(html, /Kursunterlagen lesen/);
});
