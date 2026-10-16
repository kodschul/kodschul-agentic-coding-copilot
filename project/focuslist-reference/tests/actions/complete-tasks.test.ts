import assert from "node:assert/strict";
import test from "node:test";
import { addTask } from "../../src/actions/add-task.js";
import { completeTasks } from "../../src/actions/complete-tasks.js";
import { listTasks } from "../../src/actions/list-tasks.js";
import { useTempStore } from "../helpers.js";

useTempStore();

test("markiert mehrere Tasks in einem Aufruf als erledigt", () => {
  const a = addTask("A");
  const b = addTask("B");
  completeTasks([a.id, b.id]);
  assert.deepEqual(listTasks({ status: "done" }).length, 2);
});

test("ändert nichts, wenn eine id unbekannt ist", () => {
  const a = addTask("A");
  assert.throws(() => completeTasks([a.id, "unbekannt"]), /existiert nicht/);
  assert.equal(listTasks({ status: "done" }).length, 0);
});

test("wirft bei leerer id-Liste", () => {
  assert.throws(() => completeTasks([]), /Mindestens eine id/);
});
