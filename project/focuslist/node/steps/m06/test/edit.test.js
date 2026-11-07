import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { startTestServer } from "./helpers.js";

let app;
beforeEach(async () => (app = await startTestServer()));
afterEach(() => app.close());

test("GET /tasks/:id/edit zeigt das Formular mit den gespeicherten Werten", async () => {
  const res = await fetch(`${app.baseUrl}/tasks/2/edit`);
  assert.equal(res.status, 200);
  const html = await res.text();
  assert.match(html, /value="Tailwind ausprobieren"/);
  assert.match(html, /<option value="medium" selected>/);
});

test("GET /tasks/:id/edit mit unbekannter ID antwortet 404", async () => {
  const res = await fetch(`${app.baseUrl}/tasks/999/edit`);
  assert.equal(res.status, 404);
});

test("POST /tasks/:id/edit speichert Titel und Priorität und leitet um", async () => {
  const res = await app.postForm("/tasks/2/edit", { title: "Tailwind vertiefen", priority: "high" });
  assert.equal(res.status, 302);
  assert.equal(res.headers.get("location"), "/");

  const task = (await app.readTasks()).find((t) => t.id === 2);
  assert.deepEqual(task, { id: 2, title: "Tailwind vertiefen", priority: "high", done: false });
});

test("POST /tasks/:id/edit lässt den Status erledigt unverändert", async () => {
  await app.postForm("/tasks/3/edit", { title: "Agent-Modus testen", priority: "high" });
  const task = (await app.readTasks()).find((t) => t.id === 3);
  assert.equal(task.done, true);
});

test("POST /tasks/:id/edit akzeptiert einen Titel mit genau 100 Zeichen", async () => {
  const res = await app.postForm("/tasks/1/edit", { title: "b".repeat(100), priority: "low" });
  assert.equal(res.status, 302);
  assert.equal((await app.readTasks())[0].title.length, 100);
});

test("POST /tasks/:id/edit mit leerem Titel zeigt Fehler und speichert nichts", async () => {
  const before = await app.readTasks();
  const res = await app.postForm("/tasks/1/edit", { title: "  ", priority: "low" });
  assert.equal(res.status, 400);
  assert.match(await res.text(), /Bitte einen Titel eingeben/);
  assert.deepEqual(await app.readTasks(), before);
});

test("POST /tasks/:id/edit mit ungültiger Priorität antwortet 400", async () => {
  const res = await app.postForm("/tasks/1/edit", { title: "Test", priority: "urgent" });
  assert.equal(res.status, 400);
});

test("POST /tasks/:id/edit mit unbekannter ID antwortet 404", async () => {
  const res = await app.postForm("/tasks/999/edit", { title: "Test", priority: "low" });
  assert.equal(res.status, 404);
  assert.equal((await app.readTasks()).length, 3);
});

test("eingegebener Titel wird im Fehlerfall escaped zurückgegeben", async () => {
  const res = await app.postForm("/tasks/1/edit", { title: "<b>x</b>", priority: "urgent" });
  const html = await res.text();
  assert.match(html, /value="&lt;b&gt;x&lt;\/b&gt;"/);
});
