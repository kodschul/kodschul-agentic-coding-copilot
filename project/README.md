# Projekt-Assets

Geteilte Startzustände für Übungen, die über mehrere Module hinweg dasselbe Projekt referenzieren. Kein Modul dupliziert diese Dateien; Labs verlinken hierher.

```
project/
├── sample-project/            # Fremdprojekt für Module 2, 4, 6, 7, 8
│   ├── src/
│   │   ├── formatters.ts
│   │   ├── formatters.test.ts
│   │   ├── models.ts
│   │   └── validators.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── eslint.config.js
├── focuslist-starter/         # leeres FocusList-Repo für Modul 3
│   ├── js-ts/
│   │   ├── src/.gitkeep
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── python/
│       ├── focuslist/__init__.py
│       └── pyproject.toml
└── focuslist-reference/       # fertige v7-Referenz (Modul 4-9)
    ├── src/
    │   ├── models/task.ts
    │   ├── storage/json-store.ts
    │   ├── actions/*.ts
    │   └── cli.ts
    ├── tests/actions/*.test.ts
    ├── .github/
    │   ├── copilot-instructions.md
    │   ├── skills/add-focuslist-action/SKILL.md
    │   ├── prompts/*.prompt.md
    │   ├── agents/*.agent.md
    │   ├── hooks/pre-commit-test.md
    │   └── mcp/focuslist-mcp-config.json
    ├── .vscode/tasks.json
    ├── scripts/git-hooks/pre-commit
    ├── openspec/{archive,in-progress,changes}/
    └── package.json
```

## `sample-project/`

Kleines, projektunabhängiges Fremdprojekt (JS/TS). Bleibt über den Kurs hinweg unverändert und wird ausschließlich für generische Übungen genutzt, die die FocusList-Basis nicht verändern:

- Lab 2.1 (`l01-inline-completions`) — leere Funktionsrümpfe in `src/formatters.ts`.
- Lab 2.2 (`l02-chat-context`) — Datenmodell (`src/models.ts`) + leere Implementierungsdatei (`src/validators.ts`).
- Lab 4.1 (`l01-instructions-file-basics`) — dasselbe Projekt, zu Beginn ohne jede Instructions-Datei.
- Lab 6.1 (`l01-prompt-file-basics`) — dasselbe Projekt.
- Lab 7.1 (`l01-agent-modes-explained`) — dasselbe Projekt.
- Lab 8.1 (`l01-vscode-tasks-basics`) — Lint-/Test-Skripte in `package.json`.

Jede:r Teilnehmer:in arbeitet mit einer eigenen Kopie; Änderungen aus einem Lab werden vor dem nächsten Lab, das dasselbe Projekt nutzt, zurückgesetzt (frische Kopie aus diesem Ordner).

## `focuslist-starter/`

Leerer Startpunkt für das durchgängige FocusList-Projekt (Modul 3, Lab 3.1). Zwei gleichwertige Stack-Varianten, von denen **eine** pro Kursdurchführung verbindlich für alle gilt (siehe `00-intake.md`):

- `js-ts/` — Node.js LTS + TypeScript, Ausführung via `tsx`.
- `python/` — Python 3, Ausführung via `python`/`uv run`.

Beide Varianten sind bewusst leer (kein Code, keine Logik) und enthalten nur Projekt-Grundgerüst. Der eigentliche FocusList-Code (v0 bis v7) entsteht live im Kurs — er wird nicht vorgefertigt bereitgestellt, weil das genau die Übung ist. `focuslist-concept.md` (Lab 1.3) legt jede:r Teilnehmer:in ebenfalls selbst an; es gibt keine vorgefertigte Vorlage, um das Ergebnis nicht vorwegzunehmen.

## `focuslist-reference/`

Fertiger v7-Stand von FocusList (JS/TS), siehe [focuslist-reference/README.md](focuslist-reference/README.md). Enthält nicht nur den fertigen Code (`src/models/`, `src/storage/`, `src/actions/`, `src/cli.ts`, `tests/`), sondern auch alle agentischen Artefakte, die im Kurs modulweise entstehen: `.github/copilot-instructions.md` (Modul 4), `.github/skills/` (Modul 5), `.github/prompts/` (Modul 6), `.github/agents/` (Modul 7), `.vscode/tasks.json` + Git-Hook + MCP-Konfiguration (Modul 8), `openspec/` (Modul 9).

Dient als Vergleichspunkt bei Unsicherheit oder als Fallback-Demo, nicht als Vorlage zum Abschreiben — die Teilnehmer:innen bauen ihre eigene FocusList-Version im `focuslist-starter/` auf.

