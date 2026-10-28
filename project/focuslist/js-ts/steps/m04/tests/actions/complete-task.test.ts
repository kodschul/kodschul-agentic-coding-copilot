import assert from "node:assert/strict";
import test from "node:test";
import { addTask } from "../../src/actions/add-task.js";
import { completeTask } from "../../src/actions/complete-task.js";
import { useTempStore } from "../helpers.js";

useTempStore();

test("markiert eine bestehende Task als erledigt", () => {
  const task = addTask("Wird erledigt");
  assert.equal(completeTask(task.id).done, true);
});

test("wirft Error bei unbekannter id", () => {
  assert.throws(() => completeTask("unbekannt"), /existiert nicht/);
});
