import test from "node:test";
import assert from "node:assert/strict";
import { addTask } from "../../src/actions/add-task.js";
import { completeTask } from "../../src/actions/complete-task.js";

test("markiert eine bestehende Task als erledigt", () => {
  const task = addTask("Wird erledigt");
  const completed = completeTask(task.id);
  assert.equal(completed.done, true);
});

test("wirft Error bei unbekannter id", () => {
  assert.throws(() => completeTask("unbekannt"), /existiert nicht/);
});
