import fs from "node:fs";
import type { Task } from "../models/task";

export function completeTask(id: string): boolean {
  const tasks: Task[] = JSON.parse(fs.readFileSync("tasks.json", "utf-8"));
  const task = tasks.find((t) => t.id === id);
  if (!task) return false;
  task.done = true;
  fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
  return true;
}
