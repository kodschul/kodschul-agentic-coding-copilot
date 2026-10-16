import type { Task } from "../models/task.js";
import { readTasks, writeTasks } from "../storage/json-store.js";

// Alles-oder-nichts: eine unbekannte id bricht ab, bevor etwas gespeichert wird.
export function completeTasks(ids: string[]): Task[] {
  if (ids.length === 0) {
    throw new Error("Mindestens eine id angeben.");
  }
  const tasks = readTasks();
  const targets = ids.map((id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) throw new Error(`Task mit id "${id}" existiert nicht.`);
    return task;
  });
  for (const task of targets) task.done = true;
  writeTasks(tasks);
  return targets;
}
