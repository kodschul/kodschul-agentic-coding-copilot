import assert from "node:assert/strict";
import test from "node:test";
import { sortByDueDate } from "../../src/actions/sort-by-due-date.js";
import type { Task } from "../../src/models/task.js";

const task = (id: string, dueDate?: string): Task => ({ id, title: id, done: false, priority: "medium", dueDate });

test("sortiert aufsteigend nach Datum, Tasks ohne Datum ans Ende", () => {
  const sorted = sortByDueDate([task("spaet", "2026-12-01"), task("ohne"), task("frueh", "2026-11-01")]);
  assert.deepEqual(sorted.map((t) => t.id), ["frueh", "spaet", "ohne"]);
});

test("verändert die übergebene Liste nicht", () => {
  const input = [task("b", "2026-12-01"), task("a", "2026-11-01")];
  sortByDueDate(input);
  assert.deepEqual(input.map((t) => t.id), ["b", "a"]);
});
