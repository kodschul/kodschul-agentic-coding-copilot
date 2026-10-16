import type { Task } from "../models/task.js";
import { readTasks } from "../storage/json-store.js";

export function searchTasks(query: string): Task[] {
  const needle = query.trim().toLowerCase();
  if (!needle) {
    throw new Error("Suchbegriff darf nicht leer sein.");
  }
  return readTasks().filter((t) => t.title.toLowerCase().includes(needle));
}
