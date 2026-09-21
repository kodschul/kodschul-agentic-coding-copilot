import test from "node:test";
import assert from "node:assert/strict";
import { listTasks } from "../../src/actions/list-tasks.js";

test("gibt alle vorhandenen Tasks zurück", () => {
  const tasks = listTasks();
  assert.equal(Array.isArray(tasks), true);
});
