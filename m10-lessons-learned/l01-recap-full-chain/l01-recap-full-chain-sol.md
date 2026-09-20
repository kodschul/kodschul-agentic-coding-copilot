# Lab 10.1 – Lösung

## Aufgabe 1: v0 vs. v7 – `completeTask`

**v0 (Modul 3):**

```ts
export function completeTask(id: string): boolean {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) return false;
  task.done = true;
  writeTasks(tasks);
  return true;
}
```

**v7 (nach Modul 4-9, inhaltlich unverändert seit Modul 4, aber jetzt getestet/abgesichert):**

```ts
export function completeTask(id: string): Task {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    throw new Error(`Task mit id "${id}" existiert nicht.`);
  }
  task.done = true;
  writeTasks(tasks);
  return task;
}
```

## Aufgabe 2 & 3: Unterschiede mit Versionsstufen-Zuordnung

1. Fehlerbehandlung (`false`/`null` → `Error`) — eingeführt in **Modul 4** (`copilot-instructions.md`).
2. Testabdeckung (kein Test in v0, vollständiger Test seit **Modul 7**, Test-Agent).
3. Automatisierte Absicherung (Tests laufen seit **Modul 8** automatisch vor jedem Commit).
4. Dokumentation (README/Docstrings seit **Modul 6**, Doku-Prompt).

## Aufgabe 4: Kernaussage der Präsentation

Der Code selbst hat sich nach Modul 4 kaum noch verändert — was sich verändert hat, ist die Absicherung und Konsistenz drumherum, aufgebaut über sechs weitere Modul-Stufen.
