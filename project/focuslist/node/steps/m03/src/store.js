import { readFile, writeFile } from "node:fs/promises";
import fs from "node:fs";

// Liest alle Aufgaben aus der JSON-Datei
export async function loadTasks(path) {
  const text = await readFile(path, "utf8");
  return JSON.parse(text);
}

// Schreibt alle Aufgaben zurück in die JSON-Datei
export async function saveTasks(path, tasks) {
  await writeFile(path, JSON.stringify(tasks, null, 2) + "\n", "utf8");
}

// Fügt eine neue Aufgabe hinzu
export function addTask(path, task, callback) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) return callback(err);
    const tasks = JSON.parse(data);
    task.id = tasks.length + 1;
    tasks.push(task);
    fs.writeFile(path, JSON.stringify(tasks, null, 2), callback);
  });
}
