import type { Priority, Task } from "../models/task";
import { readTasks, writeTasks } from "../storage/json-store";

export function addTask(title: string, priority: Priority = "medium"): Task {
  const tasks = readTasks();
  const task: Task = { id: crypto.randomUUID(), title, done: false, priority };
  tasks.push(task);
  writeTasks(tasks);
  return task;
}
