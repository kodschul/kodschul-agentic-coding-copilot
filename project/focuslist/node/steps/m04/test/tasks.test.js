import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { startTestServer } from "./helpers.js";
import { nextId } from "../src/tasks.js";

let app;
beforeEach(async () => (app = await startTestServer()));
afterEach(() => app.close());

test("POST /tasks/:id/delete entfernt die Aufgabe und leitet um", async () => {
  const res = await app.postForm("/tasks/2/delete");
  assert.equal(res.status, 302);
  assert.equal(res.headers.get("location"), "/");

  const tasks = await app.readTasks();
  assert.deepEqual(tasks.map((t) => t.id), [1, 3]);
});

test("Löschen einer unbekannten ID ändert nichts", async () => {
  const res = await app.postForm("/tasks/999/delete");
  assert.equal(res.status, 302);
  assert.equal((await app.readTasks()).length, 3);
});

test("neue Aufgabe nach dem Löschen bekommt eine freie ID", async () => {
  await app.postForm("/tasks/2/delete");
  await app.postForm("/tasks", { title: "Neue Aufgabe", priority: "low" });

  const ids = (await app.readTasks()).map((t) => t.id);
  assert.deepEqual(ids, [1, 3, 4]);
});

test("nextId nimmt die größte ID + 1", () => {
  assert.equal(nextId([]), 1);
  assert.equal(nextId([{ id: 1 }, { id: 5 }, { id: 3 }]), 6);
});
