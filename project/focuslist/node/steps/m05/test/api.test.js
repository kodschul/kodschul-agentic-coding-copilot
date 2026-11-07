import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { startTestServer } from "./helpers.js";

let app;
before(async () => (app = await startTestServer()));
after(() => app.close());

test("GET /api/tasks liefert alle Aufgaben als JSON", async () => {
  const res = await fetch(`${app.baseUrl}/api/tasks`);
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type"), /application\/json/);

  const tasks = await res.json();
  assert.equal(tasks.length, 3);
  assert.deepEqual(Object.keys(tasks[0]).sort(), ["done", "id", "priority", "title"]);
});

test("GET /api/tasks?status=open liefert nur offene Aufgaben", async () => {
  const tasks = await (await fetch(`${app.baseUrl}/api/tasks?status=open`)).json();
  assert.deepEqual(tasks.map((t) => t.id), [1, 2]);
});

test("GET /api/tasks?status=done liefert nur erledigte Aufgaben", async () => {
  const tasks = await (await fetch(`${app.baseUrl}/api/tasks?status=done`)).json();
  assert.deepEqual(tasks.map((t) => t.id), [3]);
});

test("GET /api/tasks?status=all entspricht ohne Filter", async () => {
  const all = await (await fetch(`${app.baseUrl}/api/tasks?status=all`)).json();
  const unfiltered = await (await fetch(`${app.baseUrl}/api/tasks`)).json();
  assert.deepEqual(all, unfiltered);
});

test("GET /api/tasks mit unbekanntem Status antwortet 400", async () => {
  const res = await fetch(`${app.baseUrl}/api/tasks?status=kaputt`);
  assert.equal(res.status, 400);
  assert.match((await res.json()).error, /Unbekannter Status/);
});
