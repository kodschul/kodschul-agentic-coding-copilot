import test from "node:test";
import assert from "node:assert/strict";
import { addTask } from "../../src/actions/add-task.js";

test("legt eine neue Task mit Default-Priorität an", () => {
  const task = addTask("Testaufgabe");
  assert.equal(task.title, "Testaufgabe");
  assert.equal(task.priority, "medium");
  assert.equal(task.done, false);
});

test("wirft bei leerem Titel einen Error", () => {
  assert.throws(() => addTask("   "), /darf nicht leer sein/);
});
