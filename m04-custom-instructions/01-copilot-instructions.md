# copilot-instructions.md

Instructions sind Markdown-Dateien mit Projektregeln, die Copilot automatisch in den Kontext jeder Anfrage aufnimmt. Die repoweite Datei `.github/copilot-instructions.md` beantwortet die Frage aus Modul 3: wie die KI die Regeln des Projekts erfährt, ohne dass sie in jedem Prompt stehen.

## Leitfragen

<details>
<summary>Wie oft muss eine Projektregel wie "Fehler immer als Exception melden" im Prompt stehen, damit Copilot sie einhält?</summary>

Ohne Regeldatei in jedem einzelnen Prompt. Eine Instructions-Datei im Repo wird automatisch an jede Chat-Anfrage angehängt; die Regel steht dann einmal fest im Projekt.

</details>

<details>
<summary>Behebt eine neue Regel die Schwächen aus Modul 3 automatisch?</summary>

Nein. Regeln wirken auf künftige Anfragen. Bestehender Code ändert sich erst, wenn ein Refactoring angestoßen wird ([03-regeln-anwenden.md](03-regeln-anwenden.md)).

</details>

<details>
<summary>Garantiert eine Regeldatei, dass Copilot sich daran hält?</summary>

Nein. Sie erhöht die Wahrscheinlichkeit deutlich. Ob sie genutzt wurde, zeigt die Liste **Referenzen** unter der Antwort; das Ergebnis bleibt zu prüfen.

</details>

## Ablage und Wirkung

| Eigenschaft | `copilot-instructions.md` |
| --- | --- |
| Ablage | `.github/copilot-instructions.md` im Workspace |
| Gilt für | jede Chat-Anfrage im Workspace, in allen Modi |
| Kopf (Frontmatter) | keiner |
| Typischer Inhalt | Stack, Struktur, Kernregeln |
| Sichtbar | Liste **Referenzen** unter der Chat-Antwort |
| Entwurf erzeugen | `/init` im Agent-Modus erzeugt oder aktualisiert Workspace-Instructions |

Stand: 10/2026, Quellen: https://code.visualstudio.com/docs/copilot/customization/custom-instructions, https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features. Pfadbezogene Regeln für einzelne Dateitypen folgen in [02-instructions-dateien.md](02-instructions-dateien.md).

```text
focuslist/
└── .github/
    └── copilot-instructions.md     # immer aktiv
```

## Beispiel: FocusList-Projektregeln

JS/TS, Stand v1 ([`steps/m04/.github/copilot-instructions.md`](../project/focuslist/js-ts/steps/m04/.github/copilot-instructions.md)):

```markdown
# FocusList – Projektregeln

FocusList ist eine CLI-Aufgabenliste in TypeScript (Node.js, `tsx`). Daten liegen in einer JSON-Datei, es gibt keine Datenbank und kein Framework.

## Struktur

- `src/models/task.ts`: Datenmodell `Task` und erlaubte Prioritäten.
- `src/storage/json-store.ts`: einziger Zugriff auf die JSON-Datei (`readTasks`, `writeTasks`).
- `src/actions/<aktion>.ts`: eine exportierte Funktion pro Aktion, Dateiname in kebab-case.
- `src/cli.ts`: verdrahtet jede Aktion als Unterbefehl.
- `tests/actions/<aktion>.test.ts`: Tests mit `node:test` und `node:assert/strict`.

## Regeln

1. Aktionen werfen bei ungültiger Eingabe einen `Error` mit deutscher, konkreter Meldung. Sie geben nie `null` oder `undefined` als Fehlersignal zurück.
2. Nur `json-store.ts` liest oder schreibt die Datei. Aktionen nutzen `readTasks`/`writeTasks`.
3. Eingabewerte wie Prioritäten werden über `src/actions/validation.ts` geprüft, nicht neu implementiert.
4. Jede neue Aktion bekommt einen Test für den Erfolgsfall und mindestens einen Fehlerfall.
5. Keine neuen Abhängigkeiten ohne ausdrückliche Anfrage.
```

Python ([`steps/m04/.github/copilot-instructions.md`](../project/focuslist/python/steps/m04/.github/copilot-instructions.md)): gleiche Regeln mit `ValueError`, `storage.py`, `pytest`, `argparse`; Regel 5 zusätzlich "Type Hints an allen öffentlichen Funktionen".

| Teil | Zweck |
| --- | --- |
| Einleitungssatz | Stack und Grenzen (keine DB, kein Framework) |
| `## Struktur` | wo was liegt; verhindert neue Parallelstrukturen |
| `## Regeln`, nummeriert | einzeln im Diff prüfbar, im Review per Nummer referenzierbar |

## Vage vs. prüfbare Regel

| Vage | Prüfbar im Diff |
| --- | --- |
| "Saubere Fehlerbehandlung" | Aktionen werfen bei ungültiger Eingabe einen `Error`, nie `null` oder `undefined` |
| "Speicherzugriff kapseln" | Nur `json-store.ts` liest oder schreibt die Datei |
| "Eingaben prüfen" | Prioritäten werden über `src/actions/validation.ts` geprüft |
| "Gut testen" | Jede neue Aktion bekommt einen Erfolgs- und mindestens einen Fehlerfall-Test |
| "Vorsicht mit Paketen" | Keine neuen Abhängigkeiten ohne ausdrückliche Anfrage |

- Wenige, konkrete, priorisierte Regeln wirken zuverlässiger als eine lange Liste von "Best Practices".
- Verbote gehören ausdrücklich dazu, z. B. "kein Dateizugriff außerhalb von `storage`".

> **Merksatz:** Eine Regel, die sich nicht im Diff prüfen lässt, ist ein Wunsch.

## Wirkweise und Grenzen

| Ohne Instructions | Mit Instructions |
| --- | --- |
| jede Anfrage startet stilistisch bei null | Regeln sind vor der Anfrage im Kontext |
| das Modell rät Konventionen | Naming, Fehlerbehandlung, Struktur vorgegeben |
| gleiche Anfrage, oft anderes Muster | Muster folgt sichtbar der Regel |
| keine Garantie | keine Garantie, Regeln können übersehen werden |

- Lange oder vage Regeln verlieren an Wirkung; widersprüchliche Anfragen schwächen sie.
- Ein laufender Chatverlauf kann alte Regeln "mitschleppen"; Vergleiche deshalb immer in einem neuen Chat.

## Selbst ausprobieren

Projekt: [`../project/sample-project/`](../project/sample-project/) bzw. [`../project/sample-project-python/`](../project/sample-project-python/), ohne Instructions-Datei, Modus **Agent**.

1. Schreibe in einem neuen Chat: `Ergänze in src/validators.ts eine Funktion parsePriority(value: string), die einen String in eine TicketPriority umwandelt.` (Python: `sample/validators.py`, `parse_priority(value: str)`). Notiere, was sie bei `"urgent"` tut, und verwirf die Änderung mit **Undo**.
2. Lege `.github/copilot-instructions.md` an mit: `Funktionen werfen bei ungültiger Eingabe einen Error (Python: ValueError) mit konkreter Meldung. Sie geben nie null/undefined (Python: None) als Fehlersignal zurück.`
3. Stelle dieselbe Anfrage in einem neuen Chat. Prüfe unter **Referenzen**, ob `copilot-instructions.md` aufgeführt ist, und verwirf die Änderung.
4. Kehre die Regel um ("geben bei ungültiger Eingabe `null` bzw. `None` zurück, werfen nie") und wiederhole die Anfrage in einem neuen Chat. Lösche die Datei danach wieder.

**Erwartete Beobachtung:** Ohne Regel liefert `"urgent"` meist `undefined` bzw. `None` (bei einem zweiten Lauf ebenso gut eine Exception, das Verhalten ist nicht festgelegt). Mit der Wurf-Regel endet die Funktion mit `throw new Error(...)` bzw. `raise ValueError(...)`, der Rückgabetyp enthält kein `undefined`/`None` mehr, und `copilot-instructions.md` steht unter **Referenzen**. Mit der umgekehrten Regel kommt `null`. Folgt ein Lauf der Regel nicht, ist das die praktische Grenze von Instructions, kein Bedienfehler.

## Fazit

- `.github/copilot-instructions.md` gilt für jede Anfrage im Workspace, ohne Referenz im Prompt.
- Regeln nummeriert und prüfbar formulieren, z. B. "werfen einen `Error`, nie `null`".
- Instructions steuern künftige Antworten, bestehender Code braucht ein Refactoring.

Weiter mit [02-instructions-dateien.md](02-instructions-dateien.md): Regeln nur für bestimmte Dateien.
