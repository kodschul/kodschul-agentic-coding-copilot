# Projektdateien: FocusList

FocusList ist eine kleine Web-App für persönliche Aufgaben und das durchgehende Kursprojekt. Sie wächst vom Startgerüst bis v5; jede Version bringt einen neuen Baustein aus der Landkarte von Lab 1.3.

## Zwei Stacks, ein Fachmodell

| | Python | Node.js |
| --- | --- | --- |
| Ordner | `focuslist/python/` | `focuslist/node/` |
| Server | Flask 3 + Jinja2-Templates | `node:http` ohne Framework, HTML aus Template-Funktionen |
| Styling | Tailwind CSS v4 über `@tailwindcss/cli` | Tailwind CSS v4 über `@tailwindcss/cli` |
| Daten | `data/tasks.json` | `data/tasks.json` |
| Tests | `pytest` | `node:test` (`npm test`) |
| Start | `flask --app focuslist run --debug` | `npm run dev` |
| Adresse | <http://127.0.0.1:5000> | <http://localhost:3000> |

Eine Aufgabe hat `id`, `title` (1–100 Zeichen), `priority` (`low`, `medium`, `high`), `done` und ab v5 `due` (Datum oder `null`).

## Stände und Module

| Stand | Entsteht in | Inhalt | Ordner |
| --- | --- | --- | --- |
| start | Lab 2.1 | Server, Layout mit Tailwind, Liste aus JSON, ein Test | `<stack>/start/` |
| v0 | Lab 3.2 | vibecodet mit dem Prompt aus `vibecoding-prompt.md`: Formular, Badges, Erledigt, Filter, `/api/tasks`; bewusst mit typischen Mängeln (bewertet in Lab 3.3) | `<stack>/steps/m03/` |
| v1 | Modul 4 | `AGENTS.md`, `.github/instructions/`, aufgeräumte Schichten, Löschen mit Tests | `<stack>/steps/m04/` |
| v2 | Modul 5 | Skills `test-writer` und `security-checker`, Sicherheitsfunde behoben, `docs/security-report.md` | `<stack>/steps/m05/` |
| v3 | Modul 6 | Agents `reviewer`, `tester`, `feature-lead`, Bearbeiten mit Tests, `docs/review-edit-task.md` | `<stack>/steps/m06/` |
| v4 | Modul 7 | Hooks `guard` und `checks`, `.mcp.json` (Playwright), Layout für Handybreite | `<stack>/steps/m07/` |
| v5 | Modul 8 | `openspec/` mit archiviertem Change `add-due-date`, Fälligkeitsdatum und „überfällig“ | `<stack>/steps/m08/` |

`steps/mNN/` enthält nur die Dateien, die sich in diesem Modul ändern oder neu dazukommen. Gelöschte Dateien stehen in `steps/mNN/_entfernt.txt`.

## Einen Stand herstellen: `catch-up.mjs`

```bash
node project/focuslist/catch-up.mjs <python|node> <modul> <zielordner> [--force]
```

`<modul>` ist das Modul, mit dem es weitergeht:

| Aufruf | Ergebnis |
| --- | --- |
| `… python m03 ~/kurs/focuslist` | Startgerüst (für Modul 2 und 3) |
| `… python m04 ~/kurs/focuslist-v0` | v0, Start für Modul 4 |
| `… node m05 ~/kurs/focuslist` | v1, Start für Modul 5 |
| `… node m07 ~/kurs/focuslist` | v3, Start für Modul 7 |
| `… python final ~/kurs/focuslist-v5` | Endstand v5 |

- Der Zielordner muss leer sein; `--force` kopiert in einen bestehenden Ordner.
- Nach dem Herstellen: Abhängigkeiten installieren und CSS bauen wie in `README.md` des Stands beschrieben.
- Wer in einer Übung hängen bleibt oder ein Modul verpasst hat, holt sich den Stand für das nächste Modul und macht dort weiter.

## Weitere Dateien

| Datei | Zweck |
| --- | --- |
| `focuslist/vibecoding-prompt.md` | One-Shot-Prompt für Lab 3.2, unverändert zu senden |

Jeder Stand bringt eine eigene `.gitignore` mit (`node_modules/`, `.venv/`, `static/app.css`, `.env` …), weil die Ordner aus dem Kursmaterial herauskopiert werden.
