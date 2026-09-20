# Lab 3.1 – Lösung

## Aufgabe 1: Datenmodell & Speicherung

```ts
// src/models/task.ts
export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  done: boolean;
  priority: Priority;
}
```

```ts
// src/storage/json-store.ts
import fs from "node:fs";

const FILE = "tasks.json";

export function readTasks(): Task[] {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

export function writeTasks(tasks: Task[]): void {
  fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
}
```

## Aufgabe 2-4: Die drei Aktionen

```ts
// src/actions/add-task.ts
export function addTask(title: string, priority: Priority = "medium"): Task {
  const tasks = readTasks();
  const task: Task = { id: crypto.randomUUID(), title, done: false, priority };
  tasks.push(task);
  writeTasks(tasks);
  return task;
}
```

```ts
// src/actions/list-tasks.ts
export function listTasks(): Task[] {
  return readTasks();
}
```

```ts
// src/actions/complete-task.ts
export function completeTask(id: string): boolean {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) return false;
  task.done = true;
  writeTasks(tasks);
  return true;
}
```

## Aufgabe 5: Erwartete stilistische Brüche (bewusst nicht behoben)

- `addTask` nutzt einen Default-Parameter für `priority`, `completeTask` prüft explizit auf `undefined` per `find` — zwei unterschiedliche Stile für "optionales Verhalten", je nachdem, was Copilot in der jeweiligen isolierten Anfrage gewählt hat.
- Keine gemeinsame Fehlerbehandlung (z. B. was passiert bei ungültiger `id`) — jede Aktion behandelt das für sich.

Diese Unstimmigkeiten werden bewusst NICHT hier korrigiert — das ist der Auftrag von Lab 3.2 und Modul 4.
