import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { startTestServer } from "./helpers.js";
import { filterTasks } from "../src/tasks.js";

const sample = [
  { id: 1, title: "A", priority: "low", done: false },
  { id: 2, title: "B", priority: "high", done: true },
];

test("filterTasks trennt offene und erledigte Aufgaben", () => {
  assert.deepEqual(filterTasks(sample, "open").map((t) => t.id), [1]);
  assert.deepEqual(filterTasks(sample, "done").map((t) => t.id), [2]);
  assert.equal(filterTasks(sample, "all").length, 2);
});

test("filterTasks mit leerer Liste liefert eine leere Liste", () => {
  assert.deepEqual(filterTasks([], "open"), []);
});

let app;
before(async () => (app = await startTestServer()));
after(() => app.close());

test("GET /?status=done zeigt nur erledigte Aufgaben", async () => {
  const html = await (await fetch(`${app.baseUrl}/?status=done`)).text();
  assert.match(html, /Agent-Modus testen/);
  assert.doesNotMatch(html, /Kursunterlagen lesen/);
});

test("GET / mit unbekanntem Status zeigt alle Aufgaben", async () => {
  const res = await fetch(`${app.baseUrl}/?status=kaputt`);
  assert.equal(res.status, 200);
  const html = await res.text();
  assert.match(html, /Kursunterlagen lesen/);
  assert.match(html, /Agent-Modus testen/);
});
