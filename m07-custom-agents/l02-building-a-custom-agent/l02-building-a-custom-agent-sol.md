# Lab 7.2 – Lösung

## Aufgabe 1: `.github/agents/focuslist-test-agent.agent.md`

```markdown
---
name: focuslist-test-agent
description: Schreibt und pflegt ausschließlich Tests für FocusList-Aktionen.
tools: ["read_file", "grep_search", "create_file", "replace_string_in_file"]
---

Du schreibst und pflegst ausschließlich Tests unter `tests/actions/`.
Du änderst niemals Dateien unter `src/`. Folge dem bestehenden Testmuster
(Positivfall + mindestens ein Fehlerfall pro Aktion) und den
Fehlerbehandlungsregeln aus `.github/copilot-instructions.md`.
```

## Aufgabe 2: Ergänzter Test (Beispiel für `list-tasks.ts`)

```ts
// tests/actions/list-tasks.test.ts
import { listTasks } from "../../src/actions/list-tasks";

test("gibt alle vorhandenen Tasks zurück", () => {
  const tasks = listTasks();
  expect(Array.isArray(tasks)).toBe(true);
});
```

## Aufgabe 3 & 4: Ergebnis

`git diff` zeigt ausschließlich neue/geänderte Dateien unter `tests/actions/`. Alle Tests (für `add-task`, `list-tasks`, `complete-task`, `set-priority`) laufen grün — FocusList erreicht v4.
