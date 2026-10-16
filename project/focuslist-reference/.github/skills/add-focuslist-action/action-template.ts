// Vorlage für eine Aktion, die eine bestehende Task ändert.
import type { Task } from "../models/task.js";
import { readTasks, writeTasks } from "../storage/json-store.js";

export function doSomething(id: string /* , weitere Parameter */): Task {
  // 1. Eingaben prüfen (validation.ts nutzen), bei Fehler: throw new Error("...")
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    throw new Error(`Task mit id "${id}" existiert nicht.`);
  }
  // 2. Task ändern
  writeTasks(tasks);
  return task;
}
