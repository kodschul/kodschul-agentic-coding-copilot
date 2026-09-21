import type { Task } from "../models/task.js";
import { readTasks } from "../storage/json-store.js";

export function listTasks(): Task[] {
  return readTasks();
}
