# Cheatsheet Modul 1: KI-Grundlagen für die Softwareentwicklung

Stand: 11/2026

## Grundbegriffe

| Begriff | Kurz |
| --- | --- |
| LLM | sagt das nächste Token vorher |
| Token | Textstück, mit dem das Modell rechnet |
| Kontextfenster | was das Modell gleichzeitig sieht |
| Halluzination | überzeugend falsche Ausgabe |
| Agent | LLM im Loop mit Werkzeugen |
| Agentic Coding | Agent erledigt Aufgaben selbst: lesen, ändern, ausführen, prüfen |

## Agenten-Loop

| Schritt | Wer | Beispiel |
| --- | --- | --- |
| Ziel und Grenzen | Mensch | „Leere Titel ablehnen, nur `src/` ändern“ |
| Planen | Agent | betroffene Dateien finden |
| Werkzeug nutzen | Agent | Datei lesen, ändern, Terminal-Befehl |
| Ergebnis prüfen | Agent | Tests, Fehlermeldungen |
| wiederholen | Agent | bis Prüfung „fertig“ ergibt |
| Abnehmen | Mensch | Diff lesen, testen, übernehmen |

## Woran KI-Code scheitert

| Fehler | Erkennen durch |
| --- | --- |
| erfundene Funktion, Parameter, Paket | ausführen, Doku, Paketregister |
| veraltete API | Deprecation-Warnung, Versions-Doku |
| Logikfehler im Grenzfall | Test mit Grenzwerten |
| fehlende Validierung, Escaping | Sicherheits-Review |
| passt nicht zum Projekt | Code lesen, Projektregeln |

## Drei Stufen

| Stufe | Seit | Wer handelt |
| --- | --- | --- |
| Vorschlag | 2021 | Mensch, KI ergänzt |
| Chat | 2023 | Mensch kopiert Antwort |
| Agent | Feb 2025 | KI im Loop, Mensch nimmt ab |

## Wichtige Daten

Stand: 11/2026; Quelle je Zeile in Lab 1.2, Abschnitt „Zeitleiste 2021–2026“.

| Zeit | Ereignis |
| --- | --- |
| Jun 2021 | GitHub Copilot Technical Preview |
| Nov 2022 | ChatGPT |
| Dez 2023 | Copilot Chat allgemein verfügbar |
| Nov 2024 | MCP (Anthropic) |
| Feb 2025 | Copilot Agent Mode, Claude Code, „Vibe Coding“ |
| Apr–Mai 2025 | Codex CLI, Codex Cloud, Copilot Coding Agent |
| Aug 2025 | `AGENTS.md` (OpenAI) |
| Sep 2025 | Copilot CLI Preview |
| Okt 2025 | Agent Skills (Anthropic) |
| Dez 2025 | AAIF (Linux Foundation): MCP, `AGENTS.md`; Agent Skills offener Standard |
| Jul 2026 | VS Code Agent Host (Copilot, Claude, Codex) |
| Okt 2026 | Copilot-Harness Standard in VS Code |

## Werkzeuge nach Ort

| Ort | Beispiele |
| --- | --- |
| IDE | Copilot in VS Code, Cursor, Windsurf, JetBrains AI |
| Terminal | Claude Code, Codex CLI, Copilot CLI, Gemini CLI |
| Cloud | Copilot Cloud Agent, Codex Cloud |

## Sechs Bausteine

| Baustein | Frage | Copilot | Claude Code | Codex | Modul |
| --- | --- | --- | --- | --- | --- |
| Instructions | Was immer wissen? | `AGENTS.md`, `.github/copilot-instructions.md` | `CLAUDE.md` | `AGENTS.md` | m04 |
| Skills | Wie wiederkehrend erledigen? | `.github/skills/<name>/SKILL.md` | `.claude/skills/` | `.agents/skills/` | m05 |
| Custom Agents | Wer darf was? | `.github/agents/<name>.agent.md` | `.claude/agents/` | eigene Konfiguration | m06 |
| Hooks | Was immer / nie? | `.github/hooks/*.json` | – | – | m07 |
| MCP | Welche Werkzeuge außerhalb? | `.mcp.json` | – | – | m07 |
| Spec | Was genau bauen? | `openspec/` | – | – | m08 |

„–“ = im Kurs nicht behandelt, nicht „gibt es nicht“.

## Risiken und Sofortmaßnahmen

| Situation | Sofortmaßnahme |
| --- | --- |
| Secret im Chat | widerrufen, neu erzeugen, melden |
| echte Personendaten im Kontext | Datenschutz informieren, künftig anonymisieren |
| Agent will löschen (`rm -rf`) | Freigabe ablehnen, prüfen |
| unbekanntes Paket | Name und Herkunft prüfen |
| veraltete API | ersetzen, Test ergänzen |

## Grundregel

| Vor dem Übernehmen | Ja? |
| --- | --- |
| Code verstanden | ☐ |
| Tests laufen grün | ☐ |
| keine Secrets, keine Personendaten | ☐ |
| keine unnötigen Abhängigkeiten | ☐ |
