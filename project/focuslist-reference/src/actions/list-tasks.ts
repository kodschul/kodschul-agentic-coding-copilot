import type { Priority, Task } from "../models/task.js";
import { readTasks } from "../storage/json-store.js";

export interface ListFilter {
  status?: "open" | "done";
  priority?: Priority;
}

export function listTasks(filter: ListFilter = {}): Task[] {
  return readTasks().filter(
    (t) =>
      (filter.status === undefined || t.done === (filter.status === "done")) &&
      (filter.priority === undefined || t.priority === filter.priority),
  );
}
