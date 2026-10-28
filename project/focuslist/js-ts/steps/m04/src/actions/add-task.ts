import { randomUUID } from "node:crypto";
import type { Priority, Task } from "../models/task.js";
import { readTasks, writeTasks } from "../storage/json-store.js";
import { assertPriority } from "./validation.js";

export function addTask(title: string, priority: Priority = "medium"): Task {
  if (!title.trim()) {
    throw new Error("Task-Titel darf nicht leer sein.");
  }
  assertPriority(priority);
  const tasks = readTasks();
  const task: Task = { id: randomUUID().slice(0, 8), title: title.trim(), done: false, priority };
  tasks.push(task);
  writeTasks(tasks);
  return task;
}
