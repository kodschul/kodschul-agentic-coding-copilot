import type { Task } from "../models/task.js";
import { readTasks, writeTasks } from "../storage/json-store.js";
import { assertPriority } from "./validation.js";

export function setPriority(id: string, priority: string): Task {
  assertPriority(priority);
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    throw new Error(`Task mit id "${id}" existiert nicht.`);
  }
  task.priority = priority;
  writeTasks(tasks);
  return task;
}
