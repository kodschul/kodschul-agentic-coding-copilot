# Kursüberblick: Agentic Coding mit GitHub Copilot

## Kursziel

- Vom Autocomplete zum agentischen Workflow mit GitHub Copilot in VS Code.
- Ein durchgängiges Projekt: FocusList, eine CLI-Aufgabenverwaltung mit JSON-Datei, in JS/TS oder Python.
- Erst ungeleitet vibecoden (v0), dann Schritt für Schritt Leitplanken ins Repo legen (v1 bis v7).
- Am Ende begründbar: wann sich Instructions, Skills, Prompts, Custom Agents, Tasks/Hooks, MCP und Spec-Driven Development lohnen und wann nicht.

## Tag 1: vom Autocomplete zum Agenten

| Zeit | Modul | Inhalt |
| --- | --- | --- |
| 09:00–09:20 | Start | Vorstellung, Setup-Check |
| 09:20–10:30 | Modul 1 `m01-ai-coding` | Was ist ein LLM, wie hilft es beim Programmieren, Sicherheit und Verantwortung |
| 10:45–12:15 | Modul 2 `m02-copilot-core-features` | Inline-Vorschläge, Chat und Kontext, Befehle und Konfiguration |
| 13:15–14:45 | Modul 3 `m03-vibecoding` | erster großer Praxisteil: frei vibecoden, Vibe-Log, Ergebnis reviewen (v0) |
| 15:00–16:30 | Modul 4 `m04-custom-instructions` | Projektregeln in `copilot-instructions.md`, v0 → v1 |

## Tag 2: agentischer Workflow

| Zeit | Modul | Inhalt |
| --- | --- | --- |
| 09:00–10:30 | Modul 5 `m05-skills` | Was ist ein Skill, eigenen Skill schreiben (v2) |
| 10:45–12:15 | Modul 6 `m06-custom-prompts` | Prompt-Dateien, Prompt-Bibliothek, Doku mit KI (v3) |
| 13:15–14:45 | Modul 7 `m07-custom-agents` | Agent-Modi, eigener Custom Agent (v4) |
| 15:00–16:30 | Modul 8 `m08-automation-hooks-mcp` | VS Code Tasks, Agent Hooks, MCP (v5, v6) |
| Puffer | Modul 9 `m09-spec-driven-development` | Spec-Driven Development mit OpenSpec (v7) |
| Puffer | Modul 10 `m10-lessons-learned` | Rückblick, Best Practices, Ausblick |

Pausen: 10:30–10:45, 12:15–13:15, 14:45–15:00.

## Aufbau der Unterlagen

- Pro Modul ein Ordner `mNN-…/` mit nummerierten Themendateien (`01-….md`, `02-….md`, …).
- Jede Themendatei: Leitfragen (aufklappbar) → Stichpunkte, Tabellen, echter Code für beide Stacks → `## Selbst ausprobieren` oder `## Übung` → `## Fazit`.
- Konzeptthemen (Module 1, 2, 10 und die "Was ist …"-Teile) enden mit "Selbst ausprobieren": kurze Versuche am Beispielprojekt, erwartete Beobachtung steht direkt dabei.
- Bauthemen (Module 3–9) enden mit einer Übung: **Start**-Ordner, **Referenz**-Ordner, Dauer, Schritte, Checkpoint, "Falls es hakt".
- Pro Modul ein Cheatsheet `mNN-cheatsheet.md`; Modul 2 enthält das vollständige Copilot-Cheatsheet (Tastenkürzel, Slash-Befehle, `#`-Kontext, Modi, Einstellungen).
- Nachschlagen: [glossary.md](glossary.md), [faq.md](faq.md), [best-practices.md](best-practices.md).

## So funktioniert das Projekt

- Alle Projektdateien liegen in [`../project/`](../project/README.md), FocusList je Stack in `project/focuslist/js-ts/` und `project/focuslist/python/`.
- `start/` ist das leere Projekt für Modul 3. `steps/mNN/` enthält nur die Dateien, die Modul NN hinzufügt oder ändert (gelöschte Dateien stehen in `_entfernt.txt`).
- `node project/focuslist/catch-up.mjs <stack> mNN focuslist` erzeugt den vollständigen Stand zu Beginn von Modul NN (`start/` plus alle früheren Schritte); `final` erzeugt den Endstand nach Modul 9.

| Modul | Start | Referenz | Neu im Modul |
| --- | --- | --- | --- |
| 3 Vibecoding | `start/` (leer) | `steps/m03/` | v0, frei vibecodet |
| 4 Instructions | v0 (`m04`) | `steps/m04/` | v1: Regeln, Validierung, Tests |
| 5 Skills | v1 (`m05`) | `steps/m05/` | v2: Skill `add-focuslist-action`, `set-priority` |
| 6 Prompts | v2 (`m06`) | `steps/m06/` | v3: Prompt-Dateien, README, CHANGELOG |
| 7 Agents | v3 (`m07`) | `steps/m07/` | v4: Custom Agents |
| 8 Tasks, Hooks, MCP | v4 (`m08`) | `steps/m08/` | v5/v6: `tasks.json`, Stop-Hook, `mcp.json` |
| 9 OpenSpec | v6 (`m09`) | `steps/m09/` | v7: Spec-getriebene Erweiterung |

- Arbeitsweise: Stand mit `catch-up.mjs` nach `arbeitsordner/focuslist/` erzeugen, daneben `arbeitsordner/focuslist-tickets/` (für MCP ab Modul 8).
- Weitergearbeitet wird am eigenen Stand. Wer hängt, erzeugt den nächsten Stand mit `catch-up.mjs <stack> m(NN+1) focuslist --force` und steigt dort wieder ein.
- Modul 1 und 2 brauchen kein FocusList: dort dienen [`../project/sample-project/`](../project/sample-project/), [`../project/sample-project-python/`](../project/sample-project-python/) und [`../project/snippets/`](../project/snippets/) als Spielwiese.
- Vergleich am Ende: [`../project/focuslist/codex/`](../project/focuslist/codex/) zeigt dieselbe Kette mit OpenAI Codex.

## Voraussetzungen

- Copilot-Alltagserfahrung (Autocomplete, Chat); kein Vorwissen zu Instructions, Skills, Agents, MCP oder Spec-Driven Development nötig.
- Grundlegende Git- und Terminal-Kenntnisse.

| Werkzeug | JS/TS-Stack | Python-Stack |
| --- | --- | --- |
| VS Code mit GitHub Copilot (Plan mit Agent-Modus) | ja | ja |
| Node.js ≥ 20.19 | ja | ja (für MCP-Server per `npx` und OpenSpec-CLI) |
| Python 3.11+ und `uv` | – | ja |
| Git | ja | ja |

- Ab Modul 8 zusätzlich: Workspace als vertrauenswürdig markiert, Agent-Hooks (`.github/hooks/*.json`, Preview-Funktion) erlaubt, `npx` darf einen lokalen MCP-Server starten.
- Keine produktiven oder personenbezogenen Daten im Kurs; FocusList arbeitet ausschließlich mit Beispieldaten.
