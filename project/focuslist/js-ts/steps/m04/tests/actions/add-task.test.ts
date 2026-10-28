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

test("übernimmt die angegebene Priorität", () => {
  assert.equal(addTask("Arzttermin", "high").priority, "high");
});

test("wirft bei leerem Titel einen Error", () => {
  assert.throws(() => addTask("   "), /darf nicht leer sein/);
});

test("wirft bei ungültiger Priorität einen Error", () => {
  assert.throws(() => addTask("X", "urgent" as never), /Ungültige Priorität/);
});
