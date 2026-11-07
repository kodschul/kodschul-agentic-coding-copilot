import { test, describe, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { startTestServer } from "./helpers.js";
import { isOverdue, isValidDate, sortTasks, today, validateTask } from "../src/tasks.js";

const TODAY = "2026-11-12";
const open = (due) => ({ id: 1, title: "A", priority: "low", done: false, due });

describe("Fälligkeitsdatum: Logik", () => {
  test("isOverdue: gestern fällig ist überfällig", () => {
    assert.equal(isOverdue(open("2026-11-11"), TODAY), true);
  });

  test("isOverdue: heute fällig ist noch nicht überfällig", () => {
    assert.equal(isOverdue(open(TODAY), TODAY), false);
  });

  test("isOverdue: ohne Datum oder erledigt nie überfällig", () => {
    assert.equal(isOverdue(open(null), TODAY), false);
    assert.equal(isOverdue({ ...open("2020-01-01"), done: true }, TODAY), false);
  });

  test("today liefert das lokale Datum als YYYY-MM-DD", () => {
    assert.equal(today(new Date(2026, 0, 5, 23, 59)), "2026-01-05");
  });

  test("isValidDate prüft Format und echtes Kalenderdatum", () => {
    assert.equal(isValidDate("2026-11-30"), true);
    assert.equal(isValidDate("2028-02-29"), true);
    assert.equal(isValidDate("2026-02-30"), false);
    assert.equal(isValidDate("30.11.2026"), false);
  });

  test("validateTask: leeres Datum wird zu null, ungültiges Datum ist ein Fehler", () => {
    assert.equal(validateTask({ title: "A", priority: "low", due: "" }).value.due, null);
    assert.equal(validateTask({ title: "A", priority: "low" }).value.due, null);
    const { errors } = validateTask({ title: "A", priority: "low", due: "morgen" });
    assert.deepEqual(errors, ["Bitte ein gültiges Fälligkeitsdatum wählen."]);
  });

  test("sortTasks: offene nach Fälligkeit, ohne Datum zuletzt, erledigte am Ende", () => {
    const tasks = [
      { id: 1, done: false, due: null },
      { id: 2, done: true, due: "2026-01-01" },
      { id: 3, done: false, due: "2026-12-01" },
      { id: 4, done: false, due: "2026-11-15" },
    ];
    assert.deepEqual(sortTasks(tasks).map((t) => t.id), [4, 3, 1, 2]);
  });
});

describe("Fälligkeitsdatum: Routen", () => {
  let app;
  beforeEach(async () => (app = await startTestServer()));
  afterEach(() => app.close());

  test("POST /tasks speichert das Fälligkeitsdatum", async () => {
    const res = await app.postForm("/tasks", { title: "Bericht", priority: "high", due: "2026-12-24" });
    assert.equal(res.status, 302);
    assert.equal((await app.readTasks()).at(-1).due, "2026-12-24");
  });

  test("POST /tasks ohne Datum speichert due: null", async () => {
    await app.postForm("/tasks", { title: "Ohne Datum", priority: "low", due: "" });
    assert.equal((await app.readTasks()).at(-1).due, null);
  });

  test("POST /tasks mit ungültigem Datum antwortet 400 und speichert nichts", async () => {
    const res = await app.postForm("/tasks", { title: "Kaputt", priority: "low", due: "2026-13-01" });
    assert.equal(res.status, 400);
    assert.match(await res.text(), /gültiges Fälligkeitsdatum/);
    assert.equal((await app.readTasks()).length, 3);
  });

  test("POST /tasks/:id/edit ändert und entfernt das Fälligkeitsdatum", async () => {
    await app.postForm("/tasks/2/edit", { title: "Tailwind ausprobieren", priority: "medium", due: "2026-12-01" });
    assert.equal((await app.readTasks())[1].due, "2026-12-01");
    await app.postForm("/tasks/2/edit", { title: "Tailwind ausprobieren", priority: "medium", due: "" });
    assert.equal((await app.readTasks())[1].due, null);
  });

  test("GET / markiert vergangene Fälligkeit als überfällig, heute nicht", async () => {
    await app.postForm("/tasks", { title: "Alt", priority: "low", due: "2000-01-01" });
    await app.postForm("/tasks", { title: "Heute", priority: "low", due: today() });
    const html = await (await fetch(`${app.baseUrl}/`)).text();
    const item = (title) => html.split("<li").find((part) => part.includes(`>${title}<`));
    assert.match(item("Alt"), /überfällig/);
    assert.doesNotMatch(item("Heute"), /überfällig/);
    assert.match(item("Alt"), /fällig 01\.01\.2000/);
  });

  test("GET /api/tasks?status=open sortiert nach Fälligkeit", async () => {
    await app.postForm("/tasks", { title: "Früh", priority: "low", due: "2026-11-01" });
    const tasks = await (await fetch(`${app.baseUrl}/api/tasks?status=open`)).json();
    assert.deepEqual(tasks.map((t) => t.title), ["Früh", "Kursunterlagen lesen", "Tailwind ausprobieren"]);
  });
});
