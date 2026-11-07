import { readFile, writeFile } from "node:fs/promises";

// Liest alle Aufgaben aus der JSON-Datei
export async function loadTasks(path) {
  const text = await readFile(path, "utf8");
  // Ältere Einträge ohne Fälligkeitsdatum bekommen due: null
  return JSON.parse(text).map((task) => ({ ...task, due: task.due ?? null }));
}

// Schreibt alle Aufgaben zurück in die JSON-Datei
export async function saveTasks(path, tasks) {
  await writeFile(path, JSON.stringify(tasks, null, 2) + "\n", "utf8");
}
