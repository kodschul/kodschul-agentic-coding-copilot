# Lab 5.2 – Lösung: FocusList v1 → v2 mit einer eigenen Skill

## Aufgabe 1: `SKILL.md`

**JS/TS:** `.github/skills/add-focuslist-action/SKILL.md`

```markdown
---
name: add-focuslist-action
description: Fügt FocusList eine neue CLI-Aktion hinzu, z. B. "Priorität ändern" oder "Aufgabe umbenennen". Verwenden, wenn eine neue Aktion, ein neuer Unterbefehl oder eine neue Operation auf Tasks gebaut werden soll.
---

# Neue FocusList-Aktion hinzufügen

Folge diesen Schritten in genau dieser Reihenfolge.

1. **Datenmodell prüfen:** Braucht die Aktion ein neues Feld in `src/models/task.ts`? Wenn ja, optional (`?`) ergänzen, damit bestehende Daten gültig bleiben.
2. **Aktion schreiben:** Neue Datei `src/actions/<aktion>.ts` nach dem Muster in [action-template.ts](./action-template.ts). Eingaben über `src/actions/validation.ts` prüfen, Fehler als `Error` werfen.
3. **CLI verdrahten:** In `src/cli.ts` einen `case` für den Unterbefehl ergänzen und die Zeile in `USAGE` erweitern.
4. **Test schreiben:** `tests/actions/<aktion>.test.ts` mit Erfolgsfall und Fehlerfall (unbekannte id oder ungültige Eingabe).
5. **Prüfen:** `npm run lint` und `npm test` ausführen. Erst fertig melden, wenn beides grün ist.

## Ergebnis

Am Ende nennst du die geänderten Dateien und den CLI-Aufruf, mit dem die Aktion ausprobiert werden kann.
```

**Python:** gleicher Aufbau, andere Pfade und Befehle:

```markdown
---
name: add-focuslist-action
description: Fügt FocusList eine neue CLI-Aktion hinzu, z. B. "Priorität ändern" oder "Aufgabe umbenennen". Verwenden, wenn eine neue Aktion, ein neuer Unterbefehl oder eine neue Operation auf Tasks gebaut werden soll.
---

# Neue FocusList-Aktion hinzufügen

Folge diesen Schritten in genau dieser Reihenfolge.

1. **Datenmodell prüfen:** Braucht die Aktion ein neues Feld in `focuslist/models.py`? Wenn ja, mit Default (`= None`) ergänzen, damit bestehende Daten gültig bleiben.
2. **Aktion schreiben:** Neue Datei `focuslist/actions/<aktion>.py` nach dem Muster in [action_template.py](./action_template.py). Eingaben über `focuslist/actions/validation.py` prüfen, Fehler als `ValueError` werfen.
3. **CLI verdrahten:** In `focuslist/cli.py` einen Subparser in `_parser()` und einen Zweig in `run()` ergänzen.
4. **Test schreiben:** `tests/actions/test_<aktion>.py` mit Erfolgsfall und Fehlerfall (unbekannte id oder ungültige Eingabe).
5. **Prüfen:** `uv run ruff check .` und `uv run pytest` ausführen. Erst fertig melden, wenn beides grün ist.

## Ergebnis

Am Ende nennst du die geänderten Dateien und den CLI-Aufruf, mit dem die Aktion ausprobiert werden kann.
```

Wichtig: Der Ordner heißt exakt `add-focuslist-action`, genau wie `name`. Ein anderer Ordnername lässt die Skill ohne Fehlermeldung nicht laden.

## Aufgabe 2: Vorlage

**JS/TS:** `.github/skills/add-focuslist-action/action-template.ts`

```ts
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
```

**Python:** `.github/skills/add-focuslist-action/action_template.py`

```python
# Vorlage für eine Aktion, die eine bestehende Task ändert.
from focuslist.models import Task
from focuslist.storage import read_tasks, write_tasks


def do_something(task_id: str) -> Task:
    # 1. Eingaben prüfen (validation.py nutzen), bei Fehler: raise ValueError("...")
    tasks = read_tasks()
    task = next((t for t in tasks if t.id == task_id), None)
    if task is None:
        raise ValueError(f'Task mit id "{task_id}" existiert nicht.')
    # 2. Task ändern
    write_tasks(tasks)
    return task
```

Der Link `[action-template.ts](./action-template.ts)` in Schritt 2 ist relativ zur `SKILL.md`.

## Aufgabe 3: `/skills`

Die Liste zeigt `add-focuslist-action` mit der Beschreibung aus dem Kopf. Fehlt der Eintrag, sind typische Ursachen:

| Ursache | Korrektur |
| --- | --- |
| Ordner heißt anders als `name` | Ordner umbenennen |
| `name` enthält Punkt, Leerzeichen oder Großbuchstaben | nur `a-z`, `0-9`, `-` |
| Datei heißt `skill.md` | Dateiname exakt `SKILL.md` |
| Kopf ohne `---` am Anfang und Ende | YAML-Block korrekt schließen |

## Aufgabe 4: Anfrage ohne Skill-Namen

Prompt im Agent-Modus:

```text
Baue eine Aktion, mit der sich die Priorität einer Aufgabe ändern lässt.
```

Die Anfrage nennt "Aktion" und "Priorität ändern", beides steht in der `description`. Lädt Copilot die Skill, erscheint in den aufgeklappten Tool-Aufrufen ein Lesezugriff auf `.github/skills/add-focuslist-action/SKILL.md`. Fehlt er, greift der Fallback aus der Übung.

## Aufgabe 5: Ergebnis gegen die Skill prüfen

| Schritt der Skill | Erwartetes Ergebnis (JS/TS) | Erwartetes Ergebnis (Python) |
| --- | --- | --- |
| 1 Modell | keine Änderung nötig, `priority` existiert | keine Änderung nötig |
| 2 Aktion | `src/actions/set-priority.ts` | `focuslist/actions/set_priority.py` |
| 3 CLI | `case "set-priority"` in `src/cli.ts`, Zeile in `USAGE` | Subparser `set-priority` in `focuslist/cli.py` |
| 4 Test | `tests/actions/set-priority.test.ts` | `tests/actions/test_set_priority.py` |
| 5 Prüfen | `npm run lint` und `npm test` grün | `uv run ruff check .` und `uv run pytest` grün |

**JS/TS:** `src/actions/set-priority.ts`

```ts
import type { Task } from "../models/task.js";
import { readTasks, writeTasks } from "../storage/json-store.js";
import { assertPriority } from "./validation.js";

export function setPriority(id: string, priority: string): Task {
  assertPriority(priority);
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

**Python:** `focuslist/actions/set_priority.py`

```python
from focuslist.actions.validation import assert_priority
from focuslist.models import Task
from focuslist.storage import read_tasks, write_tasks


def set_priority(task_id: str, priority: str) -> Task:
    assert_priority(priority)
    tasks = read_tasks()
    task = next((t for t in tasks if t.id == task_id), None)
    if task is None:
        raise ValueError(f'Task mit id "{task_id}" existiert nicht.')
    task.priority = priority
    write_tasks(tasks)
    return task
```

**JS/TS:** `tests/actions/set-priority.test.ts`

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { addTask } from "../../src/actions/add-task.js";
import { setPriority } from "../../src/actions/set-priority.js";
import { useTempStore } from "../helpers.js";

useTempStore();

test("ändert die Priorität einer bestehenden Task", () => {
  const task = addTask("Prioritäts-Test");
  assert.equal(setPriority(task.id, "high").priority, "high");
});

test("wirft Error bei unbekannter id oder ungültiger Priorität", () => {
  const task = addTask("X");
  assert.throws(() => setPriority("unbekannt", "high"), /existiert nicht/);
  assert.throws(() => setPriority(task.id, "urgent"), /Ungültige Priorität/);
});
```

**Python:** `tests/actions/test_set_priority.py`

```python
import pytest

from focuslist.actions.add_task import add_task
from focuslist.actions.set_priority import set_priority


def test_aendert_prioritaet_einer_bestehenden_task():
    task = add_task("Prioritäts-Test")
    assert set_priority(task.id, "high").priority == "high"


def test_wirft_bei_unbekannter_id_oder_ungueltiger_prioritaet():
    task = add_task("X")
    with pytest.raises(ValueError, match="existiert nicht"):
        set_priority("unbekannt", "high")
    with pytest.raises(ValueError, match="Ungültige Priorität"):
        set_priority(task.id, "urgent")
```

## Aufgabe 6: Ausführen

**JS/TS** (`npx tsx src/cli.ts …`), **Python** (`uv run focuslist …`); die id unterscheidet sich bei jedem Lauf:

```text
$ focuslist add-task "Wochenbericht schreiben"
adbbb3f4  [ ] Wochenbericht schreiben (medium)

$ focuslist set-priority adbbb3f4 high
adbbb3f4  [ ] Wochenbericht schreiben (high)

$ focuslist set-priority 0000beef high
Fehler: Task mit id "0000beef" existiert nicht.

$ focuslist set-priority adbbb3f4 urgent
Fehler: Ungültige Priorität "urgent". Erlaubt: low, medium, high.
```

Beide Fehlerfälle beenden das Programm mit Exit-Code 1, die Datei `tasks.json` bleibt unverändert.

## Erweiterung

Mit `description: Hilft bei FocusList.` fehlen die Auslöser "Aktion", "Unterbefehl" und "Operation auf Tasks". Zu vergleichen sind zwei Dinge:

| Prüfpunkt | gute `description` | schwache `description` |
| --- | --- | --- |
| Lesezugriff auf `SKILL.md` in den Tool-Aufrufen | vorhanden | prüfen, ob er fehlt |
| Ergebnis folgt den fünf Schritten (Test, CLI, `validation`) | ja | prüfen, welcher Schritt fehlt |

Unabhängig vom Ausgang gilt: Die gute Beschreibung kommt danach zurück in die Datei.
