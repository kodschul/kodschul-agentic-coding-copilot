# Agentic Coding mit GitHub Copilot

## Worum es geht

- KI schreibt nicht mehr nur Vorschläge, sondern erledigt Aufgaben selbst
- Gute Ergebnisse brauchen Leitplanken im Repo
- Zwei Tage: vom ungeleiteten Agenten zum abgesicherten Agenten-Team

> **Leitmotiv:** Der Agent ist so gut wie das, was im Repo steht.

## Die Entwicklung von Agentic Coding

| Jahr | Stufe |
| --- | --- |
| 2021 | **Vorschlag:** Copilot ergänzt Code im Editor |
| 2023 | **Chat:** Fragen stellen, Code bekommen |
| 2025 | **Agent:** liest, ändert, testet selbst (Copilot Agent Mode, Claude Code, Codex) |
| 2024–2025 | **Standards:** MCP, `AGENTS.md`, Skills |
| 2026 | **Harnesses:** Copilot, Claude, Codex in einem Editor |

Details: [Lab 1.2](../m01-ai-foundations/l02-evolution.md)

## Was ist Agentic Coding?

- Ein KI-Agent erledigt eine Aufgabe in Schritten
- Loop: **planen → Werkzeug nutzen → prüfen → wiederholen**
- Mensch: Ziel vorgeben, Grenzen setzen, Ergebnis abnehmen

<img src="../assets/images/m02/agent-loop.png" alt="Agent-Loop: Prompt → Understand → Act → Validate → Result, mit Rücksprung „iterate“ und Werkzeugen zum Lesen, Ändern und Ausführen" width="600">

_Quelle: VS Code Docs, Agents (https://code.visualstudio.com/docs/agents/concepts/agents), Microsoft, CC BY 3.0 US, abgerufen am 07.11.2026._

## Warum Agentic Coding?

- Agent übernimmt Lesen, Boilerplate, Tests, Fehlersuche
- Rolle wechselt: Auftrag geben, Rahmen setzen, prüfen

| | Vorschlag | Chat | Agent |
| --- | --- | --- | --- |
| Wer handelt | Mensch | Mensch | KI im Loop |
| KI sieht | aktuelle Datei | Frage + Kontext | Projekt, Terminal |
| Prüfung | jede Zeile lesen | selbst testen | Diff abnehmen |

Details: [Lab 1.1](../m01-ai-foundations/l01-llm-agent-loop.md)

## Vibecoding oder agentisch?

| | Vibecoding | Agentic Coding |
| --- | --- | --- |
| Eingabe | ein Prompt | Prompt + Regeln aus dem Repo |
| Prüfung | Blick in den Browser | Diff, Tests, Abnahme |
| Geeignet für | Prototyp, Demo | Team-Code, Produktion |

Details: [Lab 3.1](../m03-coding-approaches/l01-comparison.md)

## Die sechs Bausteine

| Baustein | Frage | Modul |
| --- | --- | --- |
| Instructions | Was muss der Agent immer wissen? | 4 |
| Skills | Wie geht eine wiederkehrende Aufgabe? | 5 |
| Custom Agents | Wer darf was? | 6 |
| Hooks | Was muss immer / darf nie passieren? | 7 |
| MCP | Welche Werkzeuge außerhalb des Editors? | 7 |
| Spec | Was genau soll gebaut werden? | 8 |

<img src="../assets/images/m09/agents-window-customizations.png" alt="VS-Code-Agents-Fenster: links unter „Customizations“ die Einträge Agents, Skills, Instructions, Hooks und MCP Servers" width="600">

_Quelle: VS Code Blog, Modern UI (https://code.visualstudio.com/blogs/2026/10/15/modern-ui), Microsoft, CC BY 3.0 US, abgerufen am 07.11.2026._

Gleiche Idee bei Claude Code und Codex, andere Ordner: [Lab 1.3](../m01-ai-foundations/l03-ecosystem.md)

## Ziel nach zwei Tagen

- Harness wählen, Agent sicher steuern
- Vibecoding und agentischen Weg unterscheiden, Code-Bewertung des Prototyps
- Jeden Baustein selbst schreiben und einsetzen
- Transfer-Plan für das eigene Projekt

## Projekt FocusList

- Kleine Web-App für Aufgaben, mit Tailwind CSS
- Python (Flask) **oder** Node.js (ohne Framework)
- Wächst in Versionen:

`start` → **v0** vibecodet → **v1** Instructions → **v2** Skills → **v3** Agents → **v4** Hooks + MCP → **v5** Spec

Details: [project/README.md](../project/README.md)

## Tag 1 – Überblick, Copilot, erste Leitplanken

| Zeit | Thema |
| --- | --- |
| 09:00 | Auftakt |
| 09:25 | **Modul 1** KI-Grundlagen für die Softwareentwicklung |
| 10:30 | *Pause* |
| 10:45 | Modul 1: Verantwortung · **Modul 2** GitHub Copilot in VS Code |
| 12:15 | *Mittag* |
| 13:15 | Modul 2: Agent steuern · **Modul 3** Vibecoding vs. Agentic Coding → v0 |
| 14:45 | *Pause* |
| 15:00 | **Modul 4** Instructions → v1 |
| 16:15 | Tagesabschluss |

## Tag 2 – Skills, Agents, Automatisierung, Spec

| Zeit | Thema |
| --- | --- |
| 09:00 | Rückblick |
| 09:15 | **Modul 5** Skills → v2 |
| 10:30 | *Pause* |
| 10:45 | **Modul 6** Custom Agents → v3 |
| 12:15 | *Mittag* |
| 13:15 | **Modul 7** Hooks und MCP → v4 |
| 14:45 | *Pause* |
| 15:00 | **Modul 8** Spec-Driven Development → v5 |
| 16:00 | **Modul 9** Rückblick, Transfer, Ausblick |

Alle Labs mit Zeiten: [topics.md](topics.md)

## So arbeiten wir

- Eine Datei pro Lab, ein Cheatsheet pro Modul
- Standard: **Copilot-Harness**, Autopilot aus
- Jeden Diff lesen, dann Keep oder Undo; Checkpoints zum Zurücksetzen
- Rückstand? Stand per `catch-up.mjs` holen:

```bash
node project/focuslist/catch-up.mjs python m05 ~/kurs/focuslist
```

## Voraussetzungen

- Programmieren in Python oder JavaScript, HTML-Grundlagen
- VS Code + aktive Copilot-Lizenz, Node.js 22+, ggf. Python 3.12+
- Einrichtung: [00-setup-and-installation.md](../00-setup-and-installation.md)
