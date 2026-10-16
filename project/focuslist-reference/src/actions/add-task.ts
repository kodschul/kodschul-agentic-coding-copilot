import { randomUUID } from "node:crypto";
import type { Priority, Task } from "../models/task.js";
import { readTasks, writeTasks } from "../storage/json-store.js";
import { assertIsoDate, assertPriority } from "./validation.js";

export function addTask(title: string, priority: Priority = "medium", dueDate?: string): Task {
  if (!title.trim()) {
    throw new Error("Task-Titel darf nicht leer sein.");
  }
  assertPriority(priority);
  if (dueDate !== undefined) assertIsoDate(dueDate);
  const tasks = readTasks();
  const task: Task = { id: randomUUID().slice(0, 8), title: title.trim(), done: false, priority };
  if (dueDate !== undefined) task.dueDate = dueDate;
  tasks.push(task);
  writeTasks(tasks);
  return task;
}
