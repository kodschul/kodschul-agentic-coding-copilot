import fs from "node:fs";
import type { Task } from "../models/task.js";

// FOCUSLIST_FILE erlaubt Tests eine eigene, temporäre Datei.
function dataFile(): string {
  return process.env.FOCUSLIST_FILE ?? "tasks.json";
}

export function readTasks(): Task[] {
  const file = dataFile();
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf-8")) as Task[];
}

export function writeTasks(tasks: Task[]): void {
  fs.writeFileSync(dataFile(), JSON.stringify(tasks, null, 2));
}
