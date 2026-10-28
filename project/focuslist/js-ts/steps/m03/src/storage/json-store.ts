import fs from "node:fs";
import type { Task } from "../models/task";

const FILE = "tasks.json";

export function readTasks(): Task[] {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

export function writeTasks(tasks: Task[]): void {
  fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
}
