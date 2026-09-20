# Lab 4.2 – Lösung

## Aufgabe 1: `.github/copilot-instructions.md`

```markdown
# FocusList – Coding-Konventionen

1. Aktionen in `src/actions/` werfen bei ungültiger Eingabe immer eine
   `Error` mit sprechender Meldung. Sie geben niemals `null` oder
   `undefined` als Fehlersignal zurück.
2. Nur `src/storage/json-store.ts` liest/schreibt `tasks.json` direkt.
   Andere Dateien greifen ausschließlich über `readTasks`/`writeTasks` zu.
3. Neue Aktionen folgen der Signatur `(...args) => Task | never`
   (werfen statt `null` zurückzugeben).
```

## Aufgabe 2 & 3: Refactoring-Diff (Auszug)

```ts
// src/actions/complete-task.ts (nach Refactoring)
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

Regel 1 ist sichtbar umgesetzt: `completeTask` wirft jetzt eine `Error` statt `false` zurückzugeben, wie es in Modul 3 noch der Fall war.

## Aufgabe 4: Ergebnis

Alle drei Aktionen laufen nach dem Refactoring weiterhin über die CLI, jetzt aber mit konsistentem Fehlerverhalten — das ist FocusList v1.
