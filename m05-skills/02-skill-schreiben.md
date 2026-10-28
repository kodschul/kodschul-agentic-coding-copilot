# Eine eigene Skill schreiben

Jede neue FocusList-Aktion folgt demselben Ablauf: Modell prüfen, Aktion schreiben, CLI verdrahten, Test schreiben, prüfen. Die Skill `add-focuslist-action` hält diesen Ablauf fest, damit Copilot ihn bei jeder neuen Aktion gleich ausführt.

## Leitfragen

<details>
<summary>Woran erkennt Copilot, dass eine Skill zur aktuellen Anfrage passt?</summary>

Am Feld `description` im Kopf der `SKILL.md`. Copilot vergleicht die Anfrage mit dieser Beschreibung und lädt den Rest der Datei nur bei Bedarf.

</details>

<details>
<summary>Was gehört in eine Skill, was in <code>copilot-instructions.md</code>?</summary>

Instructions sind Regeln, die immer gelten. Eine Skill ist ein Ablauf für eine bestimmte, wiederkehrende Aufgabe und wird nur geladen, wenn diese Aufgabe ansteht.

</details>

<details>
<summary>Warum liegt neben der <code>SKILL.md</code> noch eine Vorlagendatei?</summary>

Eine Skill ist ein Ordner. Vorlagen, Skripte oder Beispiele daneben werden aus der `SKILL.md` verlinkt und nur gelesen, wenn der Ablauf sie braucht.

</details>

## Aufbau einer Skill

```text
.github/skills/
└── add-focuslist-action/          # Ordnername = name im Kopf
    ├── SKILL.md                   # Pflicht: Kopf + Ablauf
    └── action-template.ts         # optional: Vorlage, aus SKILL.md verlinkt (Python: action_template.py)
```

| Feld im Kopf | Pflicht | Regel |
| --- | --- | --- |
| `name` | ja | nur Kleinbuchstaben, Ziffern, Bindestriche, max. 64 Zeichen; muss dem Ordnernamen entsprechen, sonst lädt die Skill nicht |
| `description` | ja | was die Skill tut **und** wann sie greift, max. 1024 Zeichen; das ist der Auslöser |
| `argument-hint` | nein | Hinweistext beim Aufruf als `/add-focuslist-action` |
| `user-invocable` | nein | `false` blendet die Skill im `/`-Menü aus, Copilot lädt sie weiter automatisch |
| `disable-model-invocation` | nein | `true` erlaubt nur den manuellen Aufruf über `/` |

Speicherorte im Projekt: `.github/skills/`, `.claude/skills/` oder `.agents/skills/`. Persönliche Skills (für alle Projekte eines Rechners): `~/.copilot/skills/`, `~/.claude/skills/` oder `~/.agents/skills/`.

_Stand: 10/2026, Quelle: [VS Code – Agent Skills](https://code.visualstudio.com/docs/copilot/customization/agent-skills)._

## Die Skill für FocusList

| Schritt | JS/TS | Python |
| --- | --- | --- |
| 1 Datenmodell | neues Feld in `src/models/task.ts` nur optional (`?`) | neues Feld in `focuslist/models.py` mit Default (`= None`) |
| 2 Aktion | `src/actions/<aktion>.ts` nach `action-template.ts`, Eingaben über `validation.ts`, Fehler als `Error` | `focuslist/actions/<aktion>.py` nach `action_template.py`, Eingaben über `validation.py`, Fehler als `ValueError` |
| 3 CLI | `case` in `src/cli.ts`, `USAGE` erweitern | Subparser in `_parser()`, Zweig in `run()` in `focuslist/cli.py`, `USAGE` erweitern |
| 4 Test | `tests/actions/<aktion>.test.ts`: Erfolgs- und Fehlerfall | `tests/actions/test_<aktion>.py`: Erfolgs- und Fehlerfall |
| 5 Prüfen | `npm run lint`, `npm test` | `uv run ruff check .`, `uv run pytest` |

JS/TS-Fassung der `SKILL.md`:

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

Am Ende die geänderten Dateien und den CLI-Aufruf nennen, mit dem die Aktion ausprobiert werden kann.
```

Beide Fassungen samt Vorlage liegen in der Referenz: [JS/TS](../project/focuslist/js-ts/steps/m05/.github/skills/add-focuslist-action), [Python](../project/focuslist/python/steps/m05/.github/skills/add-focuslist-action).

<details>
<summary>Vorlage action-template.ts / action_template.py</summary>

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

Der Link `./action-template.ts` in Schritt 2 ist relativ zur `SKILL.md`.

</details>

| Teil | Wirkung |
| --- | --- |
| "Verwenden, wenn …" in `description` | nennt die Auslöser; ohne diesen Satz lädt Copilot die Skill seltener |
| nummerierte Schritte | feste Reihenfolge, nichts wird vergessen (z. B. der Test) |
| Verweis auf `action-template.ts` | Copilot liest die Vorlage nur, wenn Schritt 2 ansteht |
| Schritt 5 | Copilot prüft das Ergebnis selbst, statt "fertig" nur zu behaupten |

## Gute und schwache Beschreibungen

| `description` | Problem |
| --- | --- |
| `Hilft bei FocusList.` | passt auf jede Anfrage, sagt nicht wann |
| `Neue Aktion.` | zu knapp, Wörter wie "Unterbefehl" oder "Befehl" lösen nicht aus |
| `Fügt FocusList eine neue CLI-Aktion hinzu … Verwenden, wenn …` | nennt Aufgabe und Auslöser |

> **Merksatz:** Die `description` entscheidet, ob eine Skill geladen wird. Der Rest der Datei entscheidet, wie gut das Ergebnis wird.

## Prüfen, ob die Skill greift

| Prüfung | Woran erkennbar |
| --- | --- |
| Skill wird gefunden | `/`-Menü bzw. `/skills` im Chat zeigt `add-focuslist-action` |
| Skill wird automatisch geladen | die aufgeklappten Tool-Aufrufe der Antwort zeigen einen Lesezugriff auf `SKILL.md` |
| Skill wird befolgt | Ergebnis enthält Test und CLI-Eintrag, Lint und Tests laufen grün |
| Skill manuell auslösen | `/add-focuslist-action Priorität ändern` |

| Symptom | Ursache und Korrektur |
| --- | --- |
| fehlt im `/`-Menü | Ordner heißt anders als `name`; `name` mit Punkt, Leerzeichen oder Großbuchstaben; Datei heißt `skill.md`; Kopf ohne schließendes `---` |
| wird nicht automatisch geladen | Anfrage anders formuliert als die `description`; Auslöser ergänzen |
| Schritt fehlt im Ergebnis | Schritte nicht nummeriert oder ohne konkreten Pfad |

Projektregeln (z. B. "Fehler als `Error` werfen") bleiben zusätzlich in `copilot-instructions.md`; die Skill verweist nur darauf.

## Übung

**Start:** eigener Stand aus Modul 4 oder Stand v1 erzeugen: `node <kursmaterial>/project/focuslist/catch-up.mjs <stack> m05 focuslist` ([Projektdateien](../project/README.md))
**Referenz:** [`steps/m05/`](../project/focuslist/js-ts/steps/m05/) bzw. [Python](../project/focuslist/python/steps/m05/) — nur die in Modul 5 geänderten Dateien
**Dauer:** 45 Min.

Ausgangslage: Aktionen `add-task`, `list-tasks`, `complete-task`, `validation.ts` bzw. `validation.py`, `.github/copilot-instructions.md` und `tests.instructions.md`. Bei einem mit `catch-up.mjs` erzeugten Stand vorher `npm install` bzw. `uv sync` ausführen. Lint und Tests laufen grün, Chat im Agent-Modus.

1. Lege `.github/skills/add-focuslist-action/` an und schreibe darin eine `SKILL.md` mit `name`, `description` und fünf nummerierten Schritten (Modell, Aktion, CLI, Test, Prüfen).
2. Lege im selben Ordner eine Vorlage für eine Aktion an (`action-template.ts` bzw. `action_template.py`) und verlinke sie aus Schritt 2 der Skill.
3. Tippe `/` in den Chat (oder `/skills`) und prüfe, ob `add-focuslist-action` erscheint. Falls nicht: `name` und Ordnernamen vergleichen.
4. Schreibe, ohne die Skill zu nennen: "Baue eine Aktion, mit der sich die Priorität einer Aufgabe ändern lässt." Prüfe in den Tool-Aufrufen, ob `SKILL.md` gelesen wurde.
5. Prüfe das Ergebnis gegen die fünf Schritte der Skill: Gibt es einen Test? Einen CLI-Eintrag mit `USAGE`-Zeile? Wird eine ungültige Priorität abgelehnt?
6. Führe die Aktion über die CLI aus (`npx tsx src/cli.ts …` bzw. `uv run focuslist …`): eine Aufgabe anlegen, Priorität auf `high` setzen, danach mit einer erfundenen id und mit `urgent` erneut aufrufen.

**Checkpoint:**

- Das `/`-Menü bzw. `/skills` listet `add-focuslist-action`.
- `set-priority` mit gültiger id zeigt die Aufgabe mit `(high)`; unbekannte id und ungültige Priorität enden mit einer Fehlermeldung und Exit-Code 1, `tasks.json` bleibt unverändert.
- Lint und Tests laufen grün: `npm test` → `ℹ tests 10`, `ℹ pass 10`; `uv run pytest -q` → `10 passed`.

```text
$ npx tsx src/cli.ts add-task "Wochenbericht schreiben"
800d79d5  [ ] Wochenbericht schreiben (medium)

$ npx tsx src/cli.ts set-priority 800d79d5 high
800d79d5  [ ] Wochenbericht schreiben (high)

$ npx tsx src/cli.ts set-priority 0000beef high
Fehler: Task mit id "0000beef" existiert nicht.

$ npx tsx src/cli.ts set-priority 800d79d5 urgent
Fehler: Ungültige Priorität "urgent". Erlaubt: low, medium, high.
```

Python (`uv run focuslist …`) liefert dieselben Zeilen mit einer anderen id.

**Falls es hakt:**

- Lädt Copilot die Skill nicht automatisch: direkt mit `/add-focuslist-action Priorität ändern` aufrufen. Damit ist der Ablauf testbar, die automatische Auswahl über die `description` aber nicht.
- Läuft der eigene Stand nicht: Stand v1 mit `catch-up.mjs <stack> m05 focuslist --force` neu erzeugen oder Stand v2 mit `catch-up.mjs <stack> m06 focuslist --force` erzeugen und dort ab Schritt 5 weiterarbeiten.

**Gegenprobe (optional):** `description` vorübergehend auf `Hilft bei FocusList.` setzen, neuen Chat starten, "Aufgabe umbenennen" anfordern und prüfen, ob `SKILL.md` noch gelesen wird. Danach die gute Beschreibung wiederherstellen.

### Was sich in der Referenz geändert hat

v2 gegenüber v1:

| Datei (JS/TS · Python) | Änderung |
| --- | --- |
| `.github/skills/add-focuslist-action/SKILL.md` + Vorlage | neu: fünf Schritte, Vorlage `action-template.ts` · `action_template.py` |
| `src/actions/set-priority.ts` · `focuslist/actions/set_priority.py` | neu: `assertPriority` bzw. `assert_priority`, Task per id suchen, sonst `Task mit id "…" existiert nicht.`, Priorität setzen, speichern |
| `src/cli.ts` · `focuslist/cli.py` | `case "set-priority"` bzw. Subparser + Zweig in `run()`, `USAGE`-Zeile `set-priority <id> <low\|medium\|high>` |
| `tests/actions/set-priority.test.ts` · `tests/actions/test_set_priority.py` | neu: Erfolgsfall; Fehlerfall mit unbekannter id und `urgent` |

## Fazit

- Eine Skill ist ein Ordner mit `SKILL.md` und optionalen Vorlagen; `name` muss dem Ordnernamen entsprechen.
- Die `description` sagt, was die Skill tut und wann sie greift; nur dann lädt Copilot sie ohne Aufforderung.
- Der letzte Schritt einer guten Skill prüft das Ergebnis selbst.

FocusList hat jetzt einen festen Ablauf für neue Aktionen. Modul 6 hält wiederkehrende Anfragen wie Review und Tests als Prompt-Dateien fest.
