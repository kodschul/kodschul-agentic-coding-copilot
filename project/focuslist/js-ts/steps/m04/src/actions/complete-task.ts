import type { Task } from "../models/task.js";
import { readTasks, writeTasks } from "../storage/json-store.js";

export function completeTask(id: string): Task {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    throw new Error(`Task mit id "${id}" existiert nicht.`);
  }
  task.done = true;
  writeTasks(tasks);
  return task;
}
