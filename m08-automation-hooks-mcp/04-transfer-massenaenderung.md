# Transfer: Massenänderung mit Skill und Stop-Hook (optional)

Die Übung verbindet Modul 5 (Skill), Modul 7 (Agenten) und den Stop-Hook aus [02-agent-hooks.md](02-agent-hooks.md): Der Agent baut eine neue Aktion `bulk-set-priority` nach einem Skill, und der Hook lässt ihn erst fertig melden, wenn alle Tests grün sind.

## Leitfragen

<details>
<summary>Was soll passieren, wenn bei "Priorität für fünf Aufgaben setzen" die dritte id nicht existiert?</summary>

Nichts soll gespeichert werden. Sonst sind zwei Aufgaben geändert, drei nicht, und niemand weiß genau, welche. Das Muster heißt alles-oder-nichts: erst alle ids prüfen, dann einmal speichern.

</details>

<details>
<summary>Wo gehört diese Regel hin: in die Instructions, in einen Skill oder in den Prompt?</summary>

Die Regel selbst gilt für das ganze Projekt, also in `copilot-instructions.md`. Der Ablauf, wie eine Massenänderung gebaut wird, ist Wissen für eine bestimmte Aufgabe, also ein Skill, den Copilot nur bei Bedarf lädt.

</details>

## Bausteine

| Baustein | Datei | Aufgabe in dieser Übung |
| --- | --- | --- |
| Regel | `.github/copilot-instructions.md`, Regel 4 | alles-oder-nichts für Aktionen, die mehrere Tasks ändern |
| Skill | `.github/skills/bulk-priority-update/SKILL.md` | Ablauf und Pflicht-Tests für Massenänderungen |
| Stop-Hook | `.github/hooks/run-tests.json` | Agent meldet erst fertig, wenn die neuen Tests grün sind |
| Review-Agent | `.github/agents/focuslist-review-agent.agent.md` | prüft das Ergebnis gegen die Regeln (Erweiterung) |

## Der Skill

`.github/skills/bulk-priority-update/SKILL.md` (JS/TS):

```markdown
---
name: bulk-priority-update
description: Ändert Felder mehrerer FocusList-Tasks in einem Aufruf (z. B. Priorität oder Status für eine Liste von ids). Verwenden für Massenänderungen, Batch-Operationen oder Befehle mit mehreren ids.
---

# Massenänderungen an Tasks

Massenänderungen arbeiten **alles-oder-nichts**:

1. Alle Eingaben prüfen (z. B. Priorität über `assertPriority`), leere id-Liste ist ein Fehler.
2. Alle Ziel-Tasks über ihre id suchen. Fehlt eine id: `Error` werfen, **bevor** etwas gespeichert wird.
3. Erst danach alle Ziel-Tasks ändern und einmal `writeTasks(tasks)` aufrufen.
4. Die geänderten Tasks zurückgeben.

Vorbild für eine einzelne Änderung: `src/actions/set-priority.ts`.

## Pflicht-Tests

- Mehrere Tasks werden geändert.
- Eine unbekannte id bricht ab und **nichts** ist gespeichert (Zustand vorher = nachher).
- Leere id-Liste wirft einen Fehler.
```

Python: `assert_priority`, `ValueError`, `write_tasks(tasks)`, Vorbild `focuslist/actions/set_priority.py`.

Die `description` enthält die Auslöser "Massenänderungen", "Batch", "mehrere ids". Eine Anfrage wie "Priorität mehrerer Aufgaben auf einmal setzen" passt dazu, ohne den Skill zu nennen.

## Übung

**Start:** eigener Stand nach [02-agent-hooks.md](02-agent-hooks.md) (Task und Stop-Hook committet), sonst Stand v4 erzeugen (`node <kursmaterial>/project/focuslist/catch-up.mjs <stack> m08 focuslist`) plus `.vscode/tasks.json` und `.github/hooks/` aus `steps/m08/`
**Referenz:** [`steps/m08/`](../project/focuslist/js-ts/steps/m08/) bzw. [Python](../project/focuslist/python/steps/m08/) — nur die in Modul 8 geänderten Dateien
**Dauer:** 30 Min.

Agent-Modus, Session Target **Copilot**.

1. Ergänze in `.github/copilot-instructions.md` als Regel 4: "Aktionen, die mehrere Tasks ändern, arbeiten alles-oder-nichts: erst alle ids prüfen, dann speichern." Die folgenden Regeln rücken eine Nummer weiter.
2. Erstelle `.github/skills/bulk-priority-update/SKILL.md` wie oben und prüfe mit `/skills`, dass `bulk-priority-update` erscheint.
3. Schreibe im Agent-Modus, ohne den Skill zu nennen: "Baue einen Befehl `bulk-set-priority <prio> <id> [<id> ...]`, der die Priorität mehrerer Aufgaben auf einmal setzt."
4. Prüfe in den Tool-Aufrufen, ob `SKILL.md` gelesen wurde, und beobachte, ob der Stop-Hook den Agenten noch einmal zurückschickt.
5. Prüfe das Ergebnis über die CLI (`npm start --` bzw. `uv run focuslist`): zwei Aufgaben anlegen, beide mit `bulk-set-priority high <id1> <id2>` ändern, danach `bulk-set-priority low <id1> unbekannt` aufrufen und mit `list-tasks` prüfen.
6. Starte **Tasks: Run Test Task**, prüfe mit `git diff --stat` die geänderten Dateien und committe den Stand.

**Checkpoint:**

```text
$ npm start -- bulk-set-priority high b586a129 3699133f      # Python: uv run focuslist …
b586a129  [ ] Steuer (high)
3699133f  [ ] Arzt (high)
$ npm start -- bulk-set-priority low b586a129 unbekannt
Fehler: Task mit id "unbekannt" existiert nicht.
$ npm start -- list-tasks
b586a129  [ ] Steuer (high)
3699133f  [ ] Arzt (high)
```

Die ids sind zufällig. `/skills` listet `add-focuslist-action`, `filter-and-search-tasks` und `bulk-priority-update`; die Task "FocusList: Lint + Test" läuft grün.

**Falls es hakt:** Lädt Copilot den Skill nicht: direkt aufrufen mit `/bulk-priority-update Priorität für mehrere ids setzen`. Läuft der Hook nicht im Agentenlauf: die Task nach dem Lauf manuell starten und rote Tests selbst an den Agenten zurückgeben. Sonst Stand v6 mit `catch-up.mjs <stack> m09 focuslist --force` neu erzeugen.

**Erweiterung:** Führe `git diff --stat HEAD~1` aus, wähle `focuslist-review-agent`, füge die Ausgabe in den Chat ein und schreibe: "Prüfe diese geänderten Dateien gegen die Projektregeln." Der Review-Agent hat kein `execute` und kann `git` nicht selbst aufrufen. Die Tabelle der Antwort sollte die Regel "4 alles-oder-nichts" mit "erfüllt" enthalten und mit **Freigabe: ja** enden.

### Was sich in der Referenz geändert hat

| Datei | Änderung |
| --- | --- |
| `.github/copilot-instructions.md` | Regel 4 alles-oder-nichts |
| `.github/skills/bulk-priority-update/SKILL.md` | neu; nennt als Vorbild bereits `bulk-set-priority`, weil die Aktion dort existiert |
| `src/actions/bulk-set-priority.ts` bzw. `focuslist/actions/bulk_set_priority.py` | prüft Priorität und leere Liste, sucht alle ids, wirft bei einer unbekannten id **vor** `writeTasks` bzw. `write_tasks`, speichert einmal |
| `src/cli.ts` bzw. `focuslist/cli.py` | Zeile in `USAGE` und neuer Befehl `bulk-set-priority` |
| `tests/actions/bulk-set-priority.test.ts` bzw. `test_bulk_set_priority.py` | drei Tests: mehrere geändert, unbekannte id ändert nichts, leere Liste wirft |

## Fazit

- Regel in den Instructions, Ablauf im Skill, Kontrolle im Hook: Jeder Baustein übernimmt einen Teil, der Prompt bleibt ein Satz.
- Alles-oder-nichts heißt: erst alle Eingaben prüfen, dann einmal speichern.
- Der Review-Agent prüft ohne `execute`; der Diff kommt vom Menschen.

Modul 9 plant das nächste Feature zuerst als Spezifikation, bevor ein Agent Code schreibt.
