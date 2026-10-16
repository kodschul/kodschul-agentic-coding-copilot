import assert from "node:assert/strict";
import test from "node:test";
import { addTask } from "../../src/actions/add-task.js";
import { completeTask } from "../../src/actions/complete-task.js";
import { listTasks } from "../../src/actions/list-tasks.js";
import { useTempStore } from "../helpers.js";

useTempStore();

test("liefert eine leere Liste ohne gespeicherte Tasks", () => {
  assert.deepEqual(listTasks(), []);
});

test("filtert nach Status und Priorität", () => {
  const a = addTask("A", "high");
  addTask("B", "low");
  completeTask(a.id);
  assert.deepEqual(listTasks({ status: "done" }).map((t) => t.title), ["A"]);
  assert.deepEqual(listTasks({ status: "open" }).map((t) => t.title), ["B"]);
  assert.deepEqual(listTasks({ priority: "low" }).map((t) => t.title), ["B"]);
});
