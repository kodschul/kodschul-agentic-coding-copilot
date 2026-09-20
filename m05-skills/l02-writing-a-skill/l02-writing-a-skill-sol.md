# Lab 5.2 – Lösung

## Aufgabe 1: `.github/skills/add-focuslist-action/SKILL.md`

```markdown
---
name: add-focuslist-action
description: Fügt FocusList eine neue Aktion hinzu (Datenmodell → Logik → CLI → Test).
---

# Neue FocusList-Aktion hinzufügen

1. Prüfe, ob das `Task`-Datenmodell erweitert werden muss.
2. Implementiere die Aktion in `src/actions/`, folge `copilot-instructions.md`
   (wirft `Error` bei ungültiger Eingabe, nutzt ausschließlich
   `readTasks`/`writeTasks`).
3. Verdrahte die Aktion als neuen CLI-Unterbefehl in `src/cli.ts`.
4. Ergänze einen Test, der sowohl den Erfolgsfall als auch den Fehlerfall
   (ungültige `id`) abdeckt.
```

## Aufgabe 2: `set-priority.ts`

```ts
// src/actions/set-priority.ts
import { Priority, Task } from "../models/task";
import { readTasks, writeTasks } from "../storage/json-store";

export function setPriority(id: string, priority: Priority): Task {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    throw new Error(`Task mit id "${id}" existiert nicht.`);
  }
  task.priority = priority;
  writeTasks(tasks);
  return task;
}
```

## Aufgabe 3: Konformität mit `copilot-instructions.md`

`setPriority` wirft eine `Error` statt `null`/`undefined` zurückzugeben (Regel 1), greift ausschließlich über `readTasks`/`writeTasks` auf `tasks.json` zu (Regel 2) — konsistent mit `completeTask` aus Modul 4.

## Aufgabe 4: CLI-Ausführung

```bash
focuslist set-priority <id> high
```

Ergebnis: die Priorität der referenzierten Aufgabe wird in `tasks.json` sichtbar auf `"high"` geändert — FocusList erreicht v2.
