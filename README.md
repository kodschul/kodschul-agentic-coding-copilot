<div align="center">

<img src="assets/kodschul-logo.png" alt="Kodschul" width="220" />

# Agentic Coding mit GitHub Copilot

**2-Tage-Workshop** · Programmierung · Deutsch

</div>

---

Teilnehmerunterlagen des Kurses **„Agentic Coding mit GitHub Copilot“**. Teilnehmende bauen über zwei Tage die **FocusList**, eine CLI-Aufgabenverwaltung mit JSON-Datei: erst ungeleitet per Vibecoding (v0), dann Schritt für Schritt mit Leitplanken im Repo (v1 bis v7) – von Custom Instructions über Skills, Prompts und Custom Agents bis zu Hooks, MCP und Spec-Driven Development.

Start hier: [m00-overview/overview.md](m00-overview/overview.md) (Kursziel, Tag 1, Tag 2, Aufbau, Projekt).

## Auf einen Blick

| | |
| --- | --- |
| **Dauer** | 2 Tage |
| **Zielgruppe** | Softwareentwickler:innen, die GitHub Copilot bereits im Alltag nutzen |
| **Niveau** | Mittelstufe: Programmiererfahrung und Copilot-Grundnutzung (Autocomplete, Chat) vorausgesetzt |
| **Sprache** | Deutsch |
| **Projekt** | FocusList (JS/TS-CLI oder Python-CLI, VS Code mit GitHub Copilot) |

## Orientierung

| Ressource | Pfad |
| --- | --- |
| Kursüberblick | [m00-overview/overview.md](m00-overview/overview.md) |
| Glossar | [m00-overview/glossary.md](m00-overview/glossary.md) |
| Best Practices | [m00-overview/best-practices.md](m00-overview/best-practices.md) |
| FAQ | [m00-overview/faq.md](m00-overview/faq.md) |
| Projektdateien | [project/README.md](project/README.md) |

## Module

Jede Themendatei endet mit `## Selbst ausprobieren` (Konzept) oder `## Übung` (Bauen). Übungen nennen einen **Start**-Stand und als **Referenz** den Schritt `project/focuslist/<stack>/steps/mNN/` (`<stack>` = `js-ts` oder `python`); jeden Stand erzeugt `node project/focuslist/catch-up.mjs <stack> mNN focuslist`.

| # | Modul | Themendateien | Cheatsheet | Start → Referenz |
| --- | --- | --- | --- | --- |
| 0 | [Überblick](m00-overview/) | [overview](m00-overview/overview.md), [glossary](m00-overview/glossary.md), [faq](m00-overview/faq.md), [best-practices](m00-overview/best-practices.md) | – | – |
| 1 | [KI in der Softwareentwicklung](m01-ai-coding/) | [01 LLM-Grundlagen](m01-ai-coding/01-llm-grundlagen.md), [02 KI beim Programmieren](m01-ai-coding/02-ki-beim-programmieren.md), [03 KI in Softwareprojekten](m01-ai-coding/03-ki-in-softwareprojekten.md), [04 Sicherheit und Verantwortung](m01-ai-coding/04-sicherheit-und-verantwortung.md) | [m01-cheatsheet](m01-ai-coding/m01-cheatsheet.md) | `snippets/`, `sample-project/` |
| 2 | [Copilot-Kernfeatures](m02-copilot-core-features/) | [01 Inline-Vorschläge](m02-copilot-core-features/01-inline-vorschlaege.md), [02 Chat und Kontext](m02-copilot-core-features/02-chat-und-kontext.md), [03 Befehle und Konfiguration](m02-copilot-core-features/03-befehle-und-konfiguration.md); für Codex: [codex/](m02-copilot-core-features/codex/README.md) | [m02-cheatsheet](m02-copilot-core-features/m02-cheatsheet.md) (vollständiges Copilot-Cheatsheet), [codex-cheatsheet](m02-copilot-core-features/codex/codex-cheatsheet.md) | `sample-project/`, `snippets/` |
| 3 | [Vibecoding](m03-vibecoding/) | [01 Vibecoding](m03-vibecoding/01-vibecoding.md), [02 Ergebnis reviewen](m03-vibecoding/02-ergebnis-reviewen.md) | [m03-cheatsheet](m03-vibecoding/m03-cheatsheet.md) | `start/` → `steps/m03/` |
| 4 | [Custom Instructions](m04-custom-instructions/) | [01 copilot-instructions.md](m04-custom-instructions/01-copilot-instructions.md), [02 Instructions-Dateien](m04-custom-instructions/02-instructions-dateien.md), [03 Regeln anwenden](m04-custom-instructions/03-regeln-anwenden.md) | [m04-cheatsheet](m04-custom-instructions/m04-cheatsheet.md) | v0 → `steps/m04/` |
| 5 | [Skills](m05-skills/) | [01 Was ist ein Skill](m05-skills/01-was-ist-ein-skill.md), [02 Skill schreiben](m05-skills/02-skill-schreiben.md) | [m05-cheatsheet](m05-skills/m05-cheatsheet.md) | v1 → `steps/m05/` |
| 6 | [Custom Prompts](m06-custom-prompts/) | [01 Prompt-Dateien](m06-custom-prompts/01-prompt-dateien.md), [02 Prompt-Bibliothek](m06-custom-prompts/02-prompt-bibliothek.md), [03 Doku mit KI](m06-custom-prompts/03-doku-mit-ki.md), [04 Transfer: Suche](m06-custom-prompts/04-transfer-suche.md) (optional) | [m06-cheatsheet](m06-custom-prompts/m06-cheatsheet.md) | v2 → `steps/m06/` |
| 7 | [Custom Agents](m07-custom-agents/) | [01 Agent-Modi](m07-custom-agents/01-agent-modi.md), [02 Eigener Agent](m07-custom-agents/02-eigener-agent.md) | [m07-cheatsheet](m07-custom-agents/m07-cheatsheet.md) | v3 → `steps/m07/` |
| 8 | [Automatisierung & MCP](m08-automation-hooks-mcp/) | [01 VS Code Tasks](m08-automation-hooks-mcp/01-vscode-tasks.md), [02 Agent Hooks](m08-automation-hooks-mcp/02-agent-hooks.md), [03 MCP](m08-automation-hooks-mcp/03-mcp.md), [04 Transfer: Massenänderung](m08-automation-hooks-mcp/04-transfer-massenaenderung.md) (optional) | [m08-cheatsheet](m08-automation-hooks-mcp/m08-cheatsheet.md) | v4 → `steps/m08/` |
| 9 | [Spec-Driven Development](m09-spec-driven-development/) | [01 Spec-Driven-Prinzip](m09-spec-driven-development/01-spec-driven-prinzip.md), [02 OpenSpec-Workflow](m09-spec-driven-development/02-openspec-workflow.md) | [m09-cheatsheet](m09-spec-driven-development/m09-cheatsheet.md) | v6 → `steps/m09/` |
| 10 | [Rückblick & Ausblick](m10-lessons-learned/) | [01 Rückblick](m10-lessons-learned/01-rueckblick.md), [02 Best Practices und Ausblick](m10-lessons-learned/02-best-practices-und-ausblick.md) | – | Endstand v7 (`catch-up.mjs <stack> final`), `focuslist/codex/` |

## Projektdateien

Details, Setup und Ordnerlayout: [project/README.md](project/README.md).

| Ordner | Zweck |
| --- | --- |
| [project/focuslist/js-ts/](project/focuslist/js-ts/), [project/focuslist/python/](project/focuslist/python/) | FocusList je Stack: `start/` + Schritte `steps/m03/` … `steps/m09/` (nur Änderungen), zusammengesetzt mit [`catch-up.mjs`](project/focuslist/catch-up.mjs) |
| [project/focuslist/codex/](project/focuslist/codex/) | Vergleich: fertige Kette mit OpenAI Codex (Modul 10) |
| [project/sample-project/](project/sample-project/), [project/sample-project-python/](project/sample-project-python/) | Beispielprojekt für "Selbst ausprobieren" |
| [project/snippets/](project/snippets/) | KI-generierte Snippets und Passwort-Szenario (Module 1, 2) |
| [project/practice/](project/practice/) | Arbeitsmaterial für Konzeptteile (Module 8, 10) |
| [project/focuslist-tickets/](project/focuslist-tickets/) | externe Tickets für den MCP-Server (Module 8, 9); liegt neben dem eigenen `focuslist/`-Ordner |

---

<div align="center">

<sub>© Nextise GmbH · <a href="https://www.kodschul.com">kodschul.com</a> · Kompetenz aufbauen – von der sicheren KI-Anwendung bis zur modernen IT-Basis</sub>

</div>
