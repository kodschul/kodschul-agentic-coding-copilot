# VS Code Tasks

Eine VS Code Task ist ein benannter Befehl in `.vscode/tasks.json`, startbar über **Tasks: Run Task** in der Command Palette. Für FocusList bündelt eine Task Lint und Tests: denselben Befehl, den danach auch ein Hook und ein Agent ausführen.

## Leitfragen

<details>
<summary>Was spricht dagegen, Lint und Tests jedes Mal von Hand ins Terminal zu tippen?</summary>

Befehle werden vergessen, vertippt oder je Person anders aufgerufen. Ein gespeicherter Befehl im Projekt ist für alle gleich und mit einem Klick startbar.

</details>

<details>
<summary>Wo sollte ein gemeinsamer Prüfbefehl liegen, damit das ganze Team ihn nutzt?</summary>

Im Repository selbst, versioniert neben dem Code. VS Code liest dafür `.vscode/tasks.json`.

</details>

<details>
<summary>Wie landen Fehler aus einem Terminalbefehl an der richtigen Codezeile im Editor?</summary>

Ein Problem Matcher liest die Ausgabe, erkennt Datei, Zeile und Meldung und trägt sie ins Problems-Panel ein.

</details>

## Aufbau einer Task

| Feld | Bedeutung |
| --- | --- |
| `version` | immer `"2.0.0"` |
| `label` | sprechender Name, erscheint unter **Tasks: Run Task** |
| `type` | `"shell"`: Befehl läuft in der Shell, `&&` ist erlaubt |
| `command` | der Befehl selbst |
| `group` | `{ "kind": "test", "isDefault": true }` macht die Task zur Standard-Testtask (**Tasks: Run Test Task**) |
| `problemMatcher` | ordnet Ausgabezeilen Dateien und Zeilen zu; `[]` = keine Zuordnung |

## FocusList: Lint + Test als Task

**JS/TS** (`.vscode/tasks.json`):

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "FocusList: Lint + Test",
      "type": "shell",
      "command": "npm run lint && npm test",
      "group": { "kind": "test", "isDefault": true },
      "problemMatcher": ["$eslint-stylish"]
    }
  ]
}
```

`$eslint-stylish` ist ein eingebauter Problem Matcher für die Standardausgabe von ESLint.

**Python** (`.vscode/tasks.json`):

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "FocusList: Lint + Test",
      "type": "shell",
      "command": "uv run ruff check --output-format=concise . && uv run pytest",
      "group": { "kind": "test", "isDefault": true },
      "problemMatcher": {
        "owner": "ruff",
        "fileLocation": ["relative", "${workspaceFolder}"],
        "pattern": {
          "regexp": "^(.+?):(\\d+):(\\d+): (\\S+) (.*)$",
          "file": 1, "line": 2, "column": 3, "code": 4, "message": 5
        }
      }
    }
  ]
}
```

- Für Ruff gibt es keinen eingebauten Matcher. `--output-format=concise` erzeugt Zeilen wie ``focuslist/cli.py:3:8: F401 [*] `os` imported but unused``; der reguläre Ausdruck zerlegt sie in Datei, Zeile, Spalte, Code und Meldung.
- Ohne Matcher (`"problemMatcher": []`) läuft die Task genauso, die Fehler stehen dann nur im Terminal.
- `&&` startet die Tests nur, wenn Lint fehlerfrei war. Ein Lint-Fehler beendet die Task also vor dem Testlauf.

## Task starten

| Weg | Wirkung |
| --- | --- |
| Command Palette: **Tasks: Run Task** → "FocusList: Lint + Test" | startet die Task im Terminal-Panel |
| Command Palette: **Tasks: Run Test Task** | startet direkt die Task mit `"isDefault": true` in der Gruppe `test` |
| Problems-Panel (`Strg+Shift+M` / `Cmd+Shift+M`) | zeigt die erkannten Fehler mit Sprung zur Zeile |

_Stand: 10/2026, Quelle: [Tasks in Visual Studio Code](https://code.visualstudio.com/docs/debugtest/tasks)._

## Grenzen einer Task

- Eine Task führt nur aus. Sie behebt keine Fehler und startet nicht von selbst.
- Ein Problem Matcher erkennt nur das Ausgabeformat, für das er gebaut ist. Testfehler von `node:test` oder `pytest` erscheinen deshalb nur im Terminal.

## Übung

**Start:** eigener Stand aus Modul 7 oder Stand v4 erzeugen: `node <kursmaterial>/project/focuslist/catch-up.mjs <stack> m08 focuslist` ([Projektdateien](../project/README.md))
**Referenz:** [`steps/m08/.vscode/tasks.json`](../project/focuslist/js-ts/steps/m08/.vscode/tasks.json) bzw. [Python](../project/focuslist/python/steps/m08/.vscode/tasks.json) — nur die in Modul 8 geänderten Dateien
**Dauer:** 15 Min.

`npm install` bzw. `uv sync` ist gelaufen; der Stand ist committet.

1. Erstelle `.vscode/tasks.json` mit der Task `FocusList: Lint + Test` wie oben, als Standard-Testtask und mit Problem Matcher.
2. Starte die Task über **Tasks: Run Task** und prüfe die Ausgabe im Terminal-Panel.
3. Baue einen Lint-Fehler ein: eine ungenutzte Variable `const unbenutzt = 1;` am Ende von `src/actions/search-tasks.ts` bzw. `import os` in der ersten Zeile von `focuslist/actions/search_tasks.py`.
4. Starte die Task erneut, diesmal über **Tasks: Run Test Task**, und öffne das Problems-Panel. Klicke den Eintrag an.
5. Entferne den Fehler, starte die Task ein letztes Mal und committe `.vscode/tasks.json`.

**Checkpoint:** Schritt 2 zeigt Lint- und Testausgabe nacheinander ohne Fehler. In Schritt 4 zeigt das Problems-Panel den Fehler mit Datei und Zeile (JS/TS: `'unbenutzt' is assigned a value but never used  @typescript-eslint/no-unused-vars`; Python: ``F401 [*] `os` imported but unused``, dazu `I001`), der Klick springt zur Zeile, und die Tests laufen nicht, weil `&&` nach dem fehlgeschlagenen Lint abbricht. Schritt 5 läuft wieder grün.

**Falls es hakt:** Erscheint der Fehler nicht im Problems-Panel, die Rohausgabe im Terminal prüfen. Steht der Fehler dort, passt der Problem Matcher nicht zum Ausgabeformat (bei Python fehlt meist `--output-format=concise`); die Task selbst funktioniert trotzdem. Sonst `tasks.json` aus der Referenz kopieren.

**Erweiterung:** Ergänze eine zweite Task `Nur Tests` und verknüpfe beide über `"dependsOn": ["FocusList: Lint + Test", "Nur Tests"]` und `"dependsOrder": "sequence"` zu einer dritten Task `Alles prüfen`. Ohne `dependsOrder` startet VS Code die Teile parallel.

## Fazit

- `.vscode/tasks.json` macht Lint und Tests zu einem versionierten Befehl für alle.
- `$eslint-stylish` bzw. ein eigener Ruff-Matcher bringt Lint-Fehler ins Problems-Panel.
- Eine Task wird von einem Menschen gestartet; automatisch läuft erst ein Hook.

Als Nächstes führt ein Agent Hook dieselben Tests automatisch aus, bevor der Agent fertig meldet: [02-agent-hooks.md](02-agent-hooks.md).
