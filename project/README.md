# Projektdateien

Alle Dateien für die Übungen. Hauptprojekt ist **FocusList**, eine kleine CLI-Aufgabenliste, die von Modul 3 bis Modul 9 Schritt für Schritt wächst. FocusList liegt in zwei Sprachen vor, JS/TS und Python; pro Kursdurchführung gilt ein Stack für alle.

## FocusList: Start und Schritte

Jede Datei liegt nur einmal vor. `start/` ist das leere Projekt, `steps/mNN/` enthält nur die Dateien, die Modul NN hinzufügt oder ändert (gelöschte Dateien stehen in `_entfernt.txt`). Ein vollständiger Stand entsteht mit [`focuslist/catch-up.mjs`](focuslist/catch-up.mjs): `start/` plus alle Schritte bis zum gewünschten Modul.

```text
focuslist/
├── catch-up.mjs        baut einen Stand zusammen
├── js-ts/
│   ├── start/          leeres Projekt mit Lint und Testrunner
│   └── steps/
│       ├── m03/ … m09/ nur die Änderungen des jeweiligen Moduls
├── python/             gleich aufgebaut
└── codex/              nur die Codex-Dateien, auf den JS/TS-Endstand gelegt
```

| Schritt (`focuslist/<stack>/…`) | ergibt Stand | Neu in diesem Schritt | Tests danach |
| --- | --- | --- | --- |
| `start/` | Start Modul 3 | leeres Projekt mit Lint und Testrunner | 0 |
| `steps/m03/` | v0 | `add-task`, `list-tasks`, `complete-task`, per Vibecoding ohne Vorgaben gebaut, mit typischen Schwächen | 0 |
| `steps/m04/` | v1 | `copilot-instructions.md`, `tests.instructions.md`, `validation`, zentrale Speicherung, erste Tests | 8 |
| `steps/m05/` | v2 | Skill `add-focuslist-action`, Aktion `set-priority` | 10 |
| `steps/m06/` | v3 | Prompt-Dateien (Review, Tests, Refactoring, Doku), README-Abschnitt "Befehle", `CHANGELOG.md`, zwei Zusatztests für `set-priority`; Transfer: Skill `filter-and-search-tasks` mit `search-tasks` | 15 |
| `steps/m07/` | v4 | fünf Agents: Test-Agent (in der Übung gebaut), Code-, Review-, Docs-Agent, Kette `focuslist-feature-team` | 15 |
| `steps/m08/` | v6 | v5: `.vscode/tasks.json`, Stop-Hook, Regel 4 (alles-oder-nichts), Transfer: Skill `bulk-priority-update` mit `bulk-set-priority`; v6: `.vscode/mcp.json` für die Tickets | 18 |
| `steps/m09/` | v7 (Endstand) | OpenSpec (`openspec/`, `opsx-*`-Prompts, `openspec-*`-Skills), Fälligkeitsdatum mit `list-tasks --sort due-date`, `complete-tasks` über die Agenten-Kette | 23 |

- **Referenz einer Übung:** `steps/mNN/` des eigenen Moduls zeigt genau, was sich geändert hat.
- **Versionsnummern** in `package.json` bzw. `pyproject.toml`: `0.0.0` (leer), `0.1.0` (v0), `1.0.0` (v1) bis `4.0.0` (v4), `6.0.0` (v6), `7.0.0` (v7).
- **Fälligkeitsdatum:** `dueDate` bzw. `due_date`, `assertIsoDate` bzw. `assert_iso_date` und Regel 3 "Prioritäten und Datumswerte" gehören zum OpenSpec-Change `sort-by-due-date` ([`tasks.md`](focuslist/js-ts/steps/m09/openspec/changes/archive/2026-10-14-sort-by-due-date/tasks.md)) und kommen deshalb erst mit `steps/m09/`. Bis v6 kennt `add-task` nur Titel und Priorität.

## Stand erzeugen

Gearbeitet wird nicht im Kurs-Repo, sondern in einem eigenen Arbeitsordner, den Ticket-Ordner daneben:

```text
arbeitsordner/
├── focuslist/            # eigener Stand oder per catch-up.mjs erzeugt
└── focuslist-tickets/    # Kopie von project/focuslist-tickets/
```

```bash
# Start von Modul 5 (Stand v1), JS/TS
node <kursmaterial>/project/focuslist/catch-up.mjs js-ts m05 arbeitsordner/focuslist
cp -R <kursmaterial>/project/focuslist-tickets arbeitsordner/focuslist-tickets

# Endstand v7, Python
node <kursmaterial>/project/focuslist/catch-up.mjs python final arbeitsordner/focuslist-final

# Codex-Variante des Endstands
node <kursmaterial>/project/focuslist/catch-up.mjs codex arbeitsordner/focuslist-codex
```

| Aufruf | Ergebnis |
| --- | --- |
| `catch-up.mjs <js-ts\|python> mNN <ziel>` | Stand zu Beginn von Modul NN (`start/` plus `steps/m03/` bis `steps/m(NN−1)/`) |
| `catch-up.mjs <js-ts\|python> final <ziel>` | Endstand v7 nach Modul 9 |
| `catch-up.mjs codex <ziel>` | Endstand v7 mit Codex-Dateien statt `.github/` und `.vscode/` |
| `… --force` | schreibt in einen nicht leeren Ordner und überschreibt vorhandene Dateien |

Ohne `--force` bricht das Skript ab, wenn der Zielordner nicht leer ist. Danach den Zielordner als eigenen Ordner in VS Code öffnen, damit Copilot `.github/` und `.vscode/` dieses Projekts liest.

**MCP-Pfad:** Ab v6 startet `.vscode/mcp.json` den Filesystem-Server mit `${workspaceFolder}/../focuslist-tickets`. Der Pfad funktioniert im Arbeitsordner oben, in dem beide Ordner nebeneinanderliegen. Beim Wechsel auf einen späteren Stand nur `arbeitsordner/focuslist/` ersetzen, `focuslist-tickets/` bleibt.

## Setup

- **Node.js ab 20.19** für beide Stacks: `catch-up.mjs`, der MCP-Server (`npx`) und die OpenSpec-CLI brauchen es.
- **JS/TS:** im erzeugten Ordner `npm install && npm run lint && npm test`.
- **Python:** Python ab 3.11 und `uv`, dann `uv sync && uv run ruff check . && uv run pytest`.
- **MCP-Server:** `@modelcontextprotocol/server-filesystem` (2.0.1 und 2.1.0 vom 28.10.2026) deklariert in `package.json` Node.js ab 24, läuft aber auch mit Node.js 20; `npx` gibt dann nur eine Warnung `EBADENGINE` aus. `npx -y` lädt immer die neueste Version (Stand: 10/2026, Quelle: <https://www.npmjs.com/package/@modelcontextprotocol/server-filesystem>, Start mit Node.js 20.20 getestet).
- Im leeren Projekt und in v0 gibt es noch keine Tests: `npm test` bzw. `uv run pytest` laufen erst, sobald die erste Testdatei existiert.

## Weitere Ordner

| Ordner | Inhalt | Genutzt in |
| --- | --- | --- |
| `snippets/` | vier KI-generierte Snippets mit versteckten Schwächen (TS und Python) und das Szenario `szenario-passwort-speicherung.md` | Modul 1 (`04-sicherheit-und-verantwortung.md`), Modul 2 (`03-befehle-und-konfiguration.md`, Snippet 4), Modul 6 (Prompt-Dateien am Fremdcode) |
| `sample-project/`, `sample-project-python/` | Fremdprojekt (Ticket-Modell) zum freien Ausprobieren | "Selbst ausprobieren" in Modul 2 und in den "Was ist …"-Teilen der Module 4 bis 8 |
| `practice/` | `mcp-scenarios.md`, `neues-projekt-brief.md` | Modul 8 (`03-mcp.md`), Modul 10 (`02-best-practices-und-ausblick.md`) |
| `focuslist-tickets/` | externe Ticket-Ablage (FL-101 bis FL-103) für den MCP-Server | Modul 8 und 9; im Arbeitsordner neben `focuslist/` ablegen |
| `focuslist/codex/` | nur die Codex-Dateien (`AGENTS.md`, `.agents/skills/`, `.codex/`) und die Zuordnung Copilot → Codex; vollständig mit `catch-up.mjs codex <ziel>` | Modul 10 (Ausblick); für MCP ebenfalls neben `focuslist-tickets/` ablegen |
