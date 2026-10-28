# Vibecoding

Vibecoding heißt: Wünsche in natürlicher Sprache an den Agenten geben, das Ergebnis ausprobieren und ohne Regeln, Vorlagen oder Review weiterbauen. Das geht erstaunlich schnell, und es zeigt genau, welche Entscheidungen das Modell selbst trifft, wenn niemand sie vorgibt.

## Leitfragen

<details>
<summary>Reicht ein Wunsch in einem Satz, damit eine lauffähige App entsteht?</summary>

Für lauffähigen Code oft ja. Stil, Fehlerbehandlung, Dateistruktur und Randfälle legt der Wunsch aber nicht fest; diese Entscheidungen trifft das Modell bei jeder Anfrage neu.

</details>

<details>
<summary>Hält Copilot den Stil über mehrere Anfragen von selbst konsistent?</summary>

Nein. Jede neue Anfrage sieht nur ihren eigenen Kontext. Was eine frühere Anfrage festgelegt hat, kennt die nächste nur, wenn die Datei zufällig im Kontext liegt.

</details>

<details>
<summary>Ist es schlimm, wenn das Ergebnis inkonsistent wird?</summary>

Hier nicht. Die Abweichungen sind das Material für [02-ergebnis-reviewen.md](02-ergebnis-reviewen.md) und für Modul 4.

</details>

## Was beim Vibecoding passiert

| Was der Wunsch festlegt | Was das Modell frei wählt |
| --- | --- |
| Funktion ("Aufgabe anlegen"), grobe Felder | Datei- und Funktionsnamen, Rückgabetyp |
| Speicherort, falls genannt | ob eine vorhandene Speicherfunktion genutzt oder die Datei direkt geöffnet wird |
| – | Verhalten bei leerem Titel, unbekannter id, ungültiger Eingabe |
| – | Sprache der Ausgaben, Ausgabeformat, Exit-Codes |
| – | Abhängigkeiten, Tests (oder keine) |

- Gearbeitet wird im **Agent-Modus** ([Chat und Kontext](../m02-copilot-core-features/02-chat-und-kontext.md)): der Agent legt Dateien an, führt Befehle aus und zeigt jede Änderung als Diff.
- Vibecoding eignet sich für Prototypen und zum Ausprobieren; für Code, der gewartet wird, fehlen die Leitplanken.

## Das Kursprojekt FocusList

FocusList ist eine Aufgabenliste als Kommandozeilen-Programm (CLI) mit JSON-Datei, in JS/TS oder Python. Das Startprojekt `start/` ist bewusst leer: Lint und Testrunner sind eingerichtet, Code gibt es noch keinen.

| | JS/TS | Python |
| --- | --- | --- |
| Start | [`../project/focuslist/js-ts/start/`](../project/focuslist/js-ts/start/) | [`../project/focuslist/python/start/`](../project/focuslist/python/start/) |
| Installieren | `npm install` | `uv sync` |
| Starten | `npm start -- <befehl>` (führt `tsx src/cli.ts` aus) | `uv run focuslist <befehl>` (ruft `focuslist.cli:main` auf) |
| Testen / Lint | `npm test` / `npm run lint` | `uv run pytest` / `uv run ruff check .` |
| Inhalt | leeres `src/` | leeres Paket `focuslist/` |

Ideen für FocusList (Auswahl, alles optional):

- Datenmodell `Task`: `id`, `title`, `done` (Default `false`), `priority` (`"low" | "medium" | "high"`, Default `"medium"`)
- Aktionen: Aufgabe anlegen, Aufgaben auflisten (optional nach `done` gefiltert), Aufgabe erledigen per `id`
- Speicherung: eine Datei `tasks.json` im Projektordner, kein Datenbank-Server
- Später denkbar: Priorität ändern, Suche, Fälligkeitsdatum, Sortierung

Statt FocusList ist jedes andere kleine Projekt möglich (z. B. Notiz-CLI, Einkaufsliste, Mini-API). Für die folgenden Module ist FocusList die gemeinsame Basis; wer etwas anderes baut, arbeitet ab Modul 4 mit dem Stand v0 weiter (`node <kursmaterial>/project/focuslist/catch-up.mjs <stack> m04 focuslist`, Dateien in [`steps/m03/`](../project/focuslist/js-ts/steps/m03/)).

## Übung

**Start:** Kopie von [`../project/focuslist/js-ts/start/`](../project/focuslist/js-ts/start/) bzw. [`../project/focuslist/python/start/`](../project/focuslist/python/start/) (alternativ `node <kursmaterial>/project/focuslist/catch-up.mjs <stack> m03 focuslist`; oder ein eigenes leeres Projekt)
**Referenz:** [`steps/m03/`](../project/focuslist/js-ts/steps/m03/) bzw. [Python](../project/focuslist/python/steps/m03/) — nur die in Modul 3 geänderten Dateien (ein möglicher v0-Stand)
**Dauer:** 45 Min.

1. Kopiere `start/` nach `arbeitsordner/focuslist/` (Layout siehe [`../project/README.md`](../project/README.md)), öffne ihn in VS Code und führe `npm install` bzw. `uv sync` aus.
2. Lege `vibe-log.md` im Projektordner an (Vorlage unten).
3. Wähle im Copilot Chat den Modus **Agent** und beschreibe den ersten Wunsch in eigenen Worten, z. B. `Baue eine CLI-Aufgabenliste: Aufgaben anlegen, auflisten und erledigen, gespeichert in tasks.json.`
4. Übernimm das Ergebnis, probiere es im Terminal aus und formuliere den nächsten Wunsch. Stelle mindestens drei weitere Anfragen in **neuen** Chats, jeweils für ein Feature.
5. Trage nach jeder Anfrage in `vibe-log.md` ein, was die KI gemacht hat, das nicht gewünscht oder nicht erwartet war.
6. Rufe zusätzlich Randfälle auf, z. B. bei FocusList `add-task` ohne Titel, `add-task "Test" urgent` und `complete-task 123`, danach `echo $?` (PowerShell: `$LASTEXITCODE`). Notiere die Ausgaben, ohne etwas zu korrigieren.

Vorlage `vibe-log.md`:

```markdown
# Vibe-Log

| # | Wunsch | Was die KI gemacht hat | Warum unerwünscht |
| --- | --- | --- | --- |
| 1 | Aufgaben anlegen, auflisten, erledigen | `complete-task` liest `tasks.json` selbst statt über die Speicherfunktion | zwei Wege zur selben Datei |
| 2 | … | … | … |
```

**Checkpoint:** Die App läuft mit mindestens drei Funktionen über die CLI; `vibe-log.md` enthält mindestens drei Einträge; die Randfall-Ausgaben sind notiert. Nichts wurde nachträglich vereinheitlicht.

**Falls es hakt:** Liefert der Agent kein lauffähiges Ergebnis, die Stelle minimal von Hand ergänzen oder den Stand v0 mit `node <kursmaterial>/project/focuslist/catch-up.mjs <stack> m04 focuslist` erzeugen und das Vibe-Log an diesem Stand ausfüllen.

<details>
<summary>Typische Einträge im Vibe-Log (Referenzstand v0)</summary>

| Was die KI gemacht hat | Warum unerwünscht |
| --- | --- |
| `complete-task` liest und schreibt `tasks.json` selbst, `add`/`list` nutzen `storage` | Speicherzugriff doppelt, bricht ohne Datei mit `ENOENT` bzw. `FileNotFoundError` ab |
| `completeTask` meldet "nicht gefunden" als `false`, `addTask` meldet nie einen Fehler | Fehlerbehandlung uneinheitlich |
| `add-task` ohne Titel speichert `title: undefined` (Python: `IndexError`-Traceback) | keine Eingabeprüfung |
| `add-task "Test" urgent` speichert `priority: 'urgent'` | ungültige Werte landen in der Datei |
| `complete-task 123` gibt "Task not found" aus, Exit-Code 0 | Fehler für Skripte nicht erkennbar |
| Ausgaben gemischt Deutsch/Englisch, Objekt-Dump bei `add-task` | uneinheitliche CLI |
| Imports mal mit, mal ohne `.js` (Python: Type Hints nur teilweise) | Stilbruch zwischen Anfragen |
| keine Tests | nichts sichert Verhalten ab |

</details>

## Fazit

- Vibecoding liefert schnell lauffähigen Code.
- Was der Wunsch offen lässt, entscheidet das Modell, und zwar bei jeder Anfrage neu.
- Das Vibe-Log macht diese Entscheidungen sichtbar.

Weiter mit [02-ergebnis-reviewen.md](02-ergebnis-reviewen.md): das Ergebnis systematisch prüfen.
