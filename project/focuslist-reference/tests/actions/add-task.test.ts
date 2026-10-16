import assert from "node:assert/strict";
import test from "node:test";
import { addTask } from "../../src/actions/add-task.js";
import { listTasks } from "../../src/actions/list-tasks.js";
import { useTempStore } from "../helpers.js";

useTempStore();

test("legt eine Task mit Default-Priorität an und speichert sie", () => {
  const task = addTask("Steuererklärung");
  assert.equal(task.priority, "medium");
  assert.equal(task.done, false);
  assert.deepEqual(listTasks(), [task]);
});

test("übernimmt Priorität und Fälligkeitsdatum", () => {
  const task = addTask("Arzttermin", "high", "2026-11-03");
  assert.equal(task.priority, "high");
  assert.equal(task.dueDate, "2026-11-03");
});

test("wirft bei leerem Titel einen Error", () => {
  assert.throws(() => addTask("   "), /darf nicht leer sein/);
});

test("wirft bei ungültiger Priorität oder ungültigem Datum einen Error", () => {
  assert.throws(() => addTask("X", "urgent" as never), /Ungültige Priorität/);
  assert.throws(() => addTask("X", "low", "3.11.2026"), /Ungültiges Datum/);
});
