# Kursüberblick: Agentic Coding mit GitHub Copilot

Dieser Überblick begleitet den gesamten Kurs: Ziel, Agenda, Arbeitsweise und Rahmenbedingungen stehen hier an einem Ort, unabhängig vom jeweils behandelten Modul.

## Kursziel

Teilnehmer:innen bauen ein einziges durchgängiges Projekt (FocusList, eine CLI-Aufgabenverwaltung) über zehn Module von einer ungeleiteten Basisversion (v0) zu einem voll agentischen, spec-getriebenen Workflow (v7) aus. Am Ende ist begründbar, wann welche Copilot-Fähigkeit (Instructions, Skills, Prompts, Agents, Automatisierung, MCP, Spec-Driven Development) sich lohnt und wann nicht.

Beobachtbares Ergebnis: eine vollständige FocusList-Versionskette (v0-v7) inklusive `copilot-instructions.md`, mindestens einer eigenen Skill, mindestens einem `*.prompt.md`, einem Custom Agent, einem VS-Code-Task/Hook, einer MCP-Anbindung und einer über OpenSpec umgesetzten Erweiterung.

## Zielgruppe & Voraussetzungen

- Entwickler:innen mit Copilot-Alltagserfahrung (Autocomplete, Chat).
- Kein Vorwissen zu Instructions, Skills, Custom Agents, MCP oder Spec-Driven Development vorausgesetzt.
- Grundlegende Git-/Terminal-Kenntnisse sowie ein lauffähiges VS-Code-Setup mit Copilot-Zugang werden erwartet.

## Agenda

### Tag 1

| Zeit        | Modul                                                         |
| ----------- | ------------------------------------------------------------- |
| 09:00-09:20 | Vorstellung & Setup-Check                                     |
| 09:20-10:30 | Modul 1 `m01-ai-coding` – Story & Mindset                     |
| 10:30-10:45 | Pause                                                         |
| 10:45-12:15 | Modul 2 `m02-copilot-core-features` – Copilot-Kernfeatures    |
| 12:15-13:15 | Mittagspause                                                  |
| 13:15-14:45 | Modul 3 `m03-vibecoding` – FocusList v0 bauen                 |
| 14:45-15:00 | Pause                                                         |
| 15:00-16:30 | Modul 4 `m04-custom-instructions` – `copilot-instructions.md` |

### Tag 2

| Zeit        | Modul                                                                  |
| ----------- | ---------------------------------------------------------------------- |
| 09:00-10:30 | Modul 5 `m05-skills` – Skills                                          |
| 10:30-10:45 | Pause                                                                  |
| 10:45-12:15 | Modul 6 `m06-custom-prompts` – Custom Prompts & AI-Doku                |
| 12:15-13:15 | Mittagspause                                                           |
| 13:15-14:45 | Modul 7 `m07-custom-agents` – Custom Agents                            |
| 14:45-15:00 | Pause                                                                  |
| 15:00-16:30 | Modul 8 `m08-automation-hooks-mcp` – Automatisierung & MCP             |
| Puffer      | Modul 9 `m09-spec-driven-development` + Modul 10 `m10-lessons-learned` |

## Modul- und Projektstruktur

Jedes Modul enthält zwei bis vier Labs. Jedes Lab folgt dem Muster generische Übung (risikofrei, projektunabhängig) gefolgt von Aufbau-Übung an FocusList. FocusList durchläuft dabei folgende Versionsstufen:

```
v0 (ungeleitet) → v1 (Instructions) → v2 (Skills) → v3 (Prompts)
  → v4 (Agents) → v5 (Hooks) → v6 (MCP) → v7 (Spec-Driven)
```

Modul 1 (Story & Mindset) und Modul 10 (Rückblick) haben keinen eigenen Versionssprung; sie rahmen die Kette ein. Modul 1 enthält zusätzlich flache Hintergrundmaterialien (`01-`..`04-*.md`) zu LLM-Grundlagen, KI im Workflow, KI in Softwareprojekten sowie Recht/Sicherheit/Datenschutz.

## Arbeitsweise & Übungskonventionen

- Jedes Lab besteht aus Theorie (`-thx.md`), Übung (`-exc.md`) und Lösung (`-sol.md`).
- Kurze Übungen (5-20 Min.) liefern ein konkretes Analyse- oder Konfigurationsergebnis; Projekt-Labs (45-90 Min.) verändern FocusList direkt.
- Lösungen werden erst nach Abschluss der Übung geöffnet.

## Umgebung & Sicherheit

- VS Code mit aktivem GitHub-Copilot-Zugang, Node.js oder Python (je nach FocusList-Stack der Gruppe), Git.
- Ab Modul 8 zusätzlich: lokale Berechtigung zum Einrichten von Git-Hooks und zum Starten eines MCP-Servers.
- Keine produktiven oder personenbezogenen Daten werden im Kurs verwendet; FocusList arbeitet ausschließlich mit Beispieldaten.

## Vorstellungsrunde

Der Kurs beginnt mit einer kurzen Vorstellungsrunde. Jede:r Teilnehmer:in teilt dabei in eigenen Worten:

- Name und Rolle,
- fachlicher Hintergrund und Weg in den Beruf,
- Organisation und Zugehörigkeitsdauer,
- optional Stadt/Region und aktuelles Wetter vor Ort,
- bisherige Erfahrung mit Copilot/AI-Coding-Tools,
- Erwartungen an den Kurs,
- ein mögliches Einsatzszenario für das Gelernte.

Alle persönlichen Angaben sind optional und können übersprungen werden.
