# Cheatsheet Modul 6: Custom Agents

Stand: 11/2026. Quellen: [Custom agents](https://code.visualstudio.com/docs/agent-customization/custom-agents), [Migrate customizations](https://code.visualstudio.com/docs/agent-customization/migrate-customizations), [Agent harnesses](https://code.visualstudio.com/docs/agents/run/agent-harnesses)

## Instructions, Skill, Agent

| | Instructions | Skill | Custom Agent |
| --- | --- | --- | --- |
| Frage | Was muss der Agent immer wissen? | Wie erledigt man eine Aufgabe? | Wer darf was? |
| Inhalt | Regeln | Ablauf, Vorlage, Abnahmekriterium | Rolle, Werkzeuge, Modell, Ablauf |
| Geladen | jede Anfrage bzw. `applyTo` | bei passender `description` oder `/<name>` | in der Agent-Auswahl gewählt oder als Subagent gestartet |
| Datei | `AGENTS.md`, `*.instructions.md` | `.github/skills/<name>/SKILL.md` | `.github/agents/<name>.agent.md` |
| FocusList | Schichten, `next_id()`, Escaping-Regel | `test-writer`, `security-checker` | `reviewer`, `tester`, `feature-lead` |

## Frontmatter `.agent.md`

| Feld | Pflicht | Default | Wirkung |
| --- | --- | --- | --- |
| `name` | ja | – | Name in der Agent-Auswahl und für Subagent-Aufrufe |
| `description` | ja | – | was und wann; Grundlage für die Wahl als Subagent |
| `tools` | nein | Standardwerkzeuge | erlaubte Werkzeuge (Aliase) |
| `model` | nein | Modell aus dem Chat | eigenes Modell für die Rolle |
| `user-invocable` | nein | `true` | `false`: nicht in der Agent-Auswahl, nur Subagent |
| `disable-model-invocation` | nein | `false` | `true`: kann nicht als Subagent gestartet werden |

Nur Local-Harness, im Kurs nicht verwenden: `agents:` (erlaubte Subagents), `handoffs`.

## Tool-Aliase (Copilot-Harness)

| Alias | Erlaubt |
| --- | --- |
| `read` | Dateien lesen |
| `search` | im Projekt suchen |
| `edit` | Dateien anlegen und ändern |
| `execute` | Terminal-Befehle (mit Freigabe) |
| `agent` | andere Agents als Subagent starten (intern Tool `task`) |
| `web` | Webseiten abrufen |
| `todo` | Todo-Liste führen |
| `*` | alle Werkzeuge |
| `<server>/*` | alle Werkzeuge eines MCP-Servers (m07) |

`tools` begrenzt Werkzeuge, keine Pfade. Pfad- und Befehlsregeln stehen im Auftrag.

## Die drei Rollen in FocusList

| Agent | `tools` | darf | darf nicht | nutzt |
| --- | --- | --- | --- | --- |
| `reviewer` | `['read', 'search']` | lesen, suchen, Bericht | ändern, Terminal | Instructions, `security-checker` |
| `tester` | `['read', 'search', 'edit', 'execute']` | Tests unter `tests/` bzw. `test/`, `pytest`/`npm test` | Produktcode, Installationen | `test-writer` |
| `feature-lead` | `['read', 'search', 'edit', 'execute', 'agent', 'todo']` | planen, Produktcode, Subagents | neue Abhängigkeiten ohne Rückfrage, Tests selbst schreiben | `tester`, `reviewer` |

## Ablauf `feature-lead`

| # | Schritt | Wer |
| --- | --- | --- |
| 1 | verstehen, Fragen stellen | `feature-lead` |
| 2 | planen (Todo-Liste) | `feature-lead` |
| 3 | implementieren, Tests ausführen | `feature-lead` |
| 4 | Tests schreiben | Subagent `tester` |
| 5 | Review | Subagent `reviewer` |
| 6 | Befunde hoch/mittel beheben, max. 2 Review-Runden | `feature-lead` (+ `reviewer`) |
| 7 | Übergabe | `feature-lead` |
| 8 | Diff lesen, Browser, Keep | Mensch |

## Review-Format

| Spalte | Inhalt |
| --- | --- |
| Befund | was ist falsch und warum |
| Datei | `<datei>:<zeile>` |
| Schwere | hoch (Fehler, Sicherheit) · mittel (Regelverstoß, fehlender Test) · niedrig (Stil) |
| Vorschlag | konkrete Änderung in einem Satz |
| Fazit | freigeben · nach Korrektur freigeben · nicht freigeben |

## Team oder Einzelagent?

| Änderung | Empfehlung |
| --- | --- |
| Text, Tippfehler, eine Tailwind-Klasse | Einzelagent |
| Tests ergänzen | `/test-writer` oder `tester` |
| Sicherheitsfix | Agent + danach `reviewer` |
| neue Route mit Logik, Template, Tests | `feature-lead` mit Team |

## Typische Fehler

| Symptom | Lösung |
| --- | --- |
| Agent fehlt in der Auswahl | Datei `.github/agents/<name>.agent.md`, neue Sitzung |
| Reviewer ändert Dateien | `tools: ['read', 'search']` explizit setzen |
| Reviewer weiß nicht, was er prüfen soll | geänderte Dateien im Auftrag nennen |
| kein Subagent startet | `agent` in `tools`, Namen exakt wie `name:` im Ablauf nennen |
| Review-Schleife ohne Ende | „höchstens zwei Review-Runden“ |
| Tester ändert Produktcode | Regel „nur `tests/`“ fett, Diff prüfen; erzwingen per Hook (m07) |

## Gleiche Idee, andere Ordner

| Werkzeug | Custom Agents |
| --- | --- |
| GitHub Copilot | `.github/agents/<name>.agent.md` |
| Claude Code | `.claude/agents/` |
| OpenAI Codex | eigene Konfiguration |

## Befehle

| Zweck | Python | Node.js |
| --- | --- | --- |
| Stand v2 holen | `node project/focuslist/catch-up.mjs python m06 <zielordner>` | `node project/focuslist/catch-up.mjs node m06 <zielordner>` |
| Stand v3 holen | `node project/focuslist/catch-up.mjs python m07 <zielordner>` | `node project/focuslist/catch-up.mjs node m07 <zielordner>` |
| Tests | `pytest -q` (v3: 43 passed) | `npm test` (v3: 32 Tests) |
