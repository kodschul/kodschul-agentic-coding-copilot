import test from "node:test";
import assert from "node:assert/strict";
import { sortByDueDate } from "../../src/actions/sort-by-due-date.js";
import type { Task } from "../../src/models/task.js";

const base: Omit<Task, "id" | "title" | "dueDate"> = {
  done: false,
  priority: "medium",
};

test("sortiert Tasks mit Fälligkeitsdatum aufsteigend, ohne Datum ans Ende", () => {
  const tasks: Task[] = [
    { id: "1", title: "Später", dueDate: "2026-10-05", ...base },
    { id: "2", title: "Ohne Datum", ...base },
    { id: "3", title: "Früher", dueDate: "2026-09-20", ...base },
  ];
  const sorted = sortByDueDate(tasks);
  assert.deepEqual(
    sorted.map((t) => t.id),
    ["3", "1", "2"]
  );
});
