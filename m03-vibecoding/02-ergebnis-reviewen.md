# Ergebnis reviewen

Der vibecodete Stand läuft, aber "läuft" ist kein Qualitätsnachweis. Ein Review mit festen Kategorien macht aus dem Bauchgefühl eine belegbare Liste mit Datei und Zeile.

## Leitfragen

<details>
<summary>Warum wird hier nur analysiert und noch nicht gefixt?</summary>

Vorschnelles Fixen behebt Symptome einzeln. Erst die vollständige Liste zeigt, welche Schwächen dieselbe Ursache haben und als eine Regel behoben werden können (Modul 4).

</details>

<details>
<summary>Was unterscheidet eine falsche Annahme von einem reinen Stilproblem?</summary>

Eine falsche Annahme betrifft das Verhalten, z. B. ein frei gewählter Default oder eine akzeptierte ungültige Eingabe. Ein Stilproblem betrifft nur die Konsistenz von Schreibweise und Struktur.

</details>

<details>
<summary>Wie lassen sich Fehler in Code finden, der bereits läuft?</summary>

Mit gezielten Randfall-Eingaben (leer, unbekannt, ungültig) und indem genutzte APIs gegen die offizielle Dokumentation und die installierte Version geprüft werden.

</details>

## Review-Kategorien

| Kategorie | Prüffrage | Beispiel aus FocusList v0 |
| --- | --- | --- |
| Stilinkonsistenz | Lösen vergleichbare Stellen dasselbe Problem gleich? | `completeTask` gibt `false` zurück, `addTask` meldet nie einen Fehler |
| Falsche Annahme | Steht diese Entscheidung im Wunsch oder Konzept? | Aufgabe ohne Titel wird gespeichert |
| Fehlender Kontext | Gibt es dafür schon eine Datei oder Funktion? | `complete-task.ts` liest `tasks.json` selbst statt über `json-store.ts` |
| Halluzination | Existiert die API so, in dieser Version? | `crypto.randomUUID()` gegen die Node.js-Doku prüfen |
| Fehlende Tests | Sichert ein Test das Verhalten ab? | keine einzige Testdatei |
| Fehlerverhalten | Erkennt ein Skript den Fehler (Exit-Code)? | `complete-task 123` endet mit Exit-Code 0 |
| Sicherheit / Daten | Werden Eingaben ungeprüft gespeichert? | Priorität `urgent` landet in `tasks.json` |

## API gegen die Dokumentation prüfen

| Schritt | JS/TS | Python |
| --- | --- | --- |
| Genutzte API finden | `crypto.randomUUID()` in `add-task.ts` | `uuid.uuid4()` in `add_task.py` |
| Installierte Version | `node --version` | `uv run python --version` |
| Offizielle Doku | nodejs.org/api/crypto.html, nodejs.org/api/globals.html | docs.python.org/3/library/uuid.html |
| Ergebnis festhalten | "bestätigt" oder "fehlerhaft" mit Versionsangabe | ebenso |

Auch ein "bestätigt" kommt in die Liste: Es belegt, dass geprüft wurde.

## Priorisieren: Muss und Kann

| Klasse | Kriterium | Folge |
| --- | --- | --- |
| Muss | falsches Verhalten oder Ursache vieler Folgefehler | wird in Modul 4 zur Regel und behoben |
| Kann | Schönheitsfehler, kein falsches Verhalten | bleibt notiert, Behebung optional |

```markdown
# v0 – Gefundene Schwächen

## Muss (vor v1 beheben)

1. <Schwäche> – <Datei:Zeile> – <Randfall-Eingabe und Ausgabe>

## Kann (spätere Iteration)

2. <Schwäche> – <Datei:Zeile>
```

## Übung

**Start:** eigener Stand aus [01-vibecoding.md](01-vibecoding.md) mit `vibe-log.md`, alternativ Stand v0 erzeugen: `node <kursmaterial>/project/focuslist/catch-up.mjs <stack> m04 focuslist` ([Projektdateien](../project/README.md))
**Referenz:** Schwächenliste zum Stand v0 (unten aufklappbar)
**Dauer:** 30 Min.

1. Vergleiche die Dateien, die in getrennten Anfragen entstanden sind (bei FocusList die drei Aktionsdateien unter `src/actions/` bzw. `focuslist/actions/`), auf Benennung, Fehlerbehandlung, Speicherzugriff und Rückgabetyp. Notiere mindestens zwei Abweichungen mit Datei und Zeile.
2. Ordne jeden Eintrag aus `vibe-log.md` einer Review-Kategorie zu.
3. Prüfe jede Default-Entscheidung (z. B. Default-Priorität, Verhalten bei unbekannter id) gegen den ursprünglichen Wunsch: stand sie dort oder wurde sie frei gewählt?
4. Prüfe eine genutzte API in der offiziellen Dokumentation gegen die installierte Version.
5. Lege `v0-weaknesses.md` an und ordne alle Funde in "Muss" und "Kann" ein, je mit Datei:Zeile.

**Checkpoint:** `v0-weaknesses.md` enthält Muss- und Kann-Punkte mit Datei:Zeile, die API-Prüfung endet mit "bestätigt" oder "fehlerhaft" plus Version. Kein Code wurde geändert.

**Falls es hakt:** Fehlt ein eigener Stand, die Analyse am Stand v0 durchführen; zeigt ein Randfall keine Auffälligkeit, trotzdem mit Ausgabe dokumentieren ("abgelehnt mit Meldung …").

<details>
<summary>Referenz: Schwächen von v0 (JS/TS)</summary>

Zeilennummern gelten für v0 ([`steps/m03/`](../project/focuslist/js-ts/steps/m03/)).

| # | Stelle | Abweichung |
| --- | --- | --- |
| 1 | `src/actions/complete-task.ts:5,9` | liest und schreibt `tasks.json` selbst, `add`/`list` nutzen `storage` |
| 2 | `src/actions/complete-task.ts:7` | meldet "nicht gefunden" als `false`; `addTask` meldet nie einen Fehler |
| 3 | `src/cli.ts:10,19` | Ausgabe gemischt: Objekt-Dump bei `add-task`, Zeile bei `list-tasks`, "Task not found" auf Englisch |
| 4 | `src/cli.ts:1-4` | Imports mal mit, mal ohne `.js` |

```text
$ npm start -- add-task
Aufgabe angelegt: { id: '312ee3b3-…', title: undefined, done: false, priority: 'medium' }
$ npm start -- add-task "Test" urgent
Aufgabe angelegt: { id: '22142f77-…', title: 'Test', done: false, priority: 'urgent' }
$ npm start -- complete-task 123
Task not found
$ echo $?
0
```

**API:** `crypto.randomUUID()` gibt es im Modul `node:crypto` seit Node.js 14.17.0 / 15.6.0; das globale `crypto` ohne Import ist seit Node.js 19.0.0 ohne Flag verfügbar. Mit Node.js ≥ 20.19: **bestätigt**, lesbarer wäre `import { randomUUID } from "node:crypto";` (Stand: 10/2026, Quelle: https://nodejs.org/api/crypto.html#cryptorandomuuidoptions und https://nodejs.org/api/globals.html#crypto).

```markdown
# v0 – Gefundene Schwächen

## Muss (vor v1 beheben)

1. Fehlerbehandlung uneinheitlich: `completeTask` gibt `false` zurück (complete-task.ts:7),
   unbekannte id endet mit "Task not found" und Exit-Code 0 (cli.ts:19).
2. Speicherzugriff nicht gekapselt: `completeTask` liest/schreibt tasks.json selbst
   (complete-task.ts:5,9), bricht ohne Datei mit ENOENT ab.
3. Keine Eingabeprüfung: leerer Titel und Priorität "urgent" werden gespeichert (add-task.ts:4-6).
4. Keine Tests: kein Ordner tests/.

## Kann (spätere Iteration)

5. `crypto.randomUUID()` ohne Import (add-task.ts:6), mit Node ≥ 20.19 unkritisch.
6. 36-stellige ids sind auf der Kommandozeile unhandlich.
7. CLI-Ausgaben uneinheitlich (Objekt-Dump, Englisch), keine Hilfe bei unbekanntem Befehl.
```

</details>

<details>
<summary>Referenz: Schwächen von v0 (Python)</summary>

Zeilennummern gelten für v0 ([`steps/m03/`](../project/focuslist/python/steps/m03/)).

| # | Stelle | Abweichung |
| --- | --- | --- |
| 1 | `focuslist/actions/complete_task.py:5-11` | liest und schreibt `tasks.json` selbst, arbeitet mit `dict` statt `Task` |
| 2 | `focuslist/actions/complete_task.py:13` | meldet "nicht gefunden" als `False`; `add_task` meldet nie einen Fehler |
| 3 | `focuslist/cli.py:14,22` | Ausgabe gemischt: Objekt-Dump, Zeile, "Task not found" auf Englisch |
| 4 | `complete_task.py:4`, `list_tasks.py:4` | Type Hints nur in einem Teil der Funktionen |

```text
$ uv run focuslist add-task
IndexError: list index out of range                          # Traceback statt Meldung
$ uv run focuslist add-task "Test" urgent
Aufgabe angelegt: Task(id='6a257cdd-…', title='Test', done=False, priority='urgent')
$ uv run focuslist complete-task 123
Task not found
$ echo $?
0
```

**API:** `uuid.uuid4()` ist Teil der Standardbibliothek, `str(...)` ergibt 36 Zeichen: **bestätigt** (Quelle: https://docs.python.org/3/library/uuid.html). Nebenfund in `storage.py:19`: `json.dump` schreibt standardmäßig mit `ensure_ascii=True`, "Brötchen" landet als `"Brötchen"` in `tasks.json` (Quelle: https://docs.python.org/3/library/json.html#json.dump).

```markdown
# v0 – Gefundene Schwächen

## Muss (vor v1 beheben)

1. Fehlerbehandlung uneinheitlich: `complete_task` gibt `False` zurück (complete_task.py:13),
   `add-task` ohne Titel endet mit IndexError-Traceback (cli.py:13).
2. Speicherzugriff nicht gekapselt: `complete_task` liest/schreibt tasks.json selbst und arbeitet
   mit dict statt Task (complete_task.py:5-11), bricht ohne Datei mit FileNotFoundError ab.
3. Keine Eingabeprüfung: leerer Titel und Priorität "urgent" werden gespeichert (add_task.py:7-9).
4. Keine Tests: Ordner tests/ fehlt.

## Kann (spätere Iteration)

5. Umlaute werden als \u-Escape gespeichert (storage.py:19, ensure_ascii).
6. Type Hints fehlen in complete_task.py, list_tasks.py, cli.py.
7. CLI-Ausgaben uneinheitlich (Objekt-Dump, Englisch), keine Hilfe bei unbekanntem Befehl.
```

</details>

## Warum? Die KI kennt die Projektregeln nicht

Fast jeder Fund geht auf dieselbe Ursache zurück: Die Anfragen enthielten keine Projektregeln.

| Was fehlte | Folge im Code |
| --- | --- |
| Fehlerkonvention ("werfen, nie `null`/`false`") | jede Aktion meldet Fehler anders |
| Strukturvorgabe ("nur `storage` greift auf die Datei zu") | zweiter Dateizugriff in `complete-task` |
| Validierungsregel | `urgent` und leere Titel landen in `tasks.json` |
| Testkonvention | keine Tests |
| Ausgabeformat und Sprache | gemischte CLI-Ausgaben |

- Jede Anfrage startet ohne Wissen über Konventionen, Struktur und frühere Entscheidungen.
- Diese Regeln jedes Mal in den Prompt zu schreiben, skaliert nicht. Modul 4 legt sie einmal ins Repo: `.github/copilot-instructions.md`.

## Fazit

- Review-Kategorien machen Schwächen belegbar statt gefühlt.
- Randfall-Eingaben und Doku-Abgleich finden, was "läuft" verdeckt.
- Muss-Punkte werden in Modul 4 zu Regeln, Kann-Punkte bleiben notiert.

Weiter mit Modul 4: [copilot-instructions.md](../m04-custom-instructions/01-copilot-instructions.md).
