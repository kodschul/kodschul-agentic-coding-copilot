import assert from "node:assert/strict";
import test from "node:test";
import { addTask } from "../../src/actions/add-task.js";
import { bulkSetPriority } from "../../src/actions/bulk-set-priority.js";
import { listTasks } from "../../src/actions/list-tasks.js";
import { useTempStore } from "../helpers.js";

useTempStore();

test("setzt die Priorität mehrerer Tasks", () => {
  const a = addTask("A");
  const b = addTask("B");
  bulkSetPriority([a.id, b.id], "high");
  assert.deepEqual(listTasks().map((t) => t.priority), ["high", "high"]);
});

test("ändert nichts, wenn eine id unbekannt ist", () => {
  const a = addTask("A");
  assert.throws(() => bulkSetPriority([a.id, "unbekannt"], "high"), /existiert nicht/);
  assert.equal(listTasks()[0].priority, "medium");
});

test("wirft bei leerer id-Liste", () => {
  assert.throws(() => bulkSetPriority([], "high"), /Mindestens eine id/);
});
