import test from "node:test";
import assert from "node:assert/strict";
import { addTask } from "../../src/actions/add-task.js";
import { setPriority } from "../../src/actions/set-priority.js";

test("ändert die Priorität einer bestehenden Task", () => {
  const task = addTask("Prioritäts-Test");
  const updated = setPriority(task.id, "high");
  assert.equal(updated.priority, "high");
});

test("wirft Error bei unbekannter id", () => {
  assert.throws(() => setPriority("unbekannt", "high"), /existiert nicht/);
});
