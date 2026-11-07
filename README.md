<div align="center">

<img src="assets/kodschul-logo.png" alt="Kodschul" width="220" />

# Agentic Coding mit GitHub Copilot

**2-Tage-Workshop** · Programmierung · Deutsch

</div>

---

Teilnehmerunterlagen des Kurses **„Agentic Coding mit GitHub Copilot“**. Teilnehmende bauen über zwei Tage die **FocusList**, eine kleine Web-App mit Tailwind CSS (Python oder Node.js): erst per One-Shot-Prompt vibecodet, dann agentisch, Schritt für Schritt mit Instructions, Skills, Custom Agents, Hooks, MCP und einer Spec bis zur Version v5.

Jedes Lab ist eine Datei (`lNN-<thema>.md`) mit Leitfragen, Inhalt, Übung bzw. „Selbst ausprobieren“ und Lösungsweg; jedes Modul hat einen Spickzettel (`mNN-cheatsheet.md`). Alle Pfade in dieser Datei sind relativ zu diesem Ordner. Alle Befehle laufen im Terminal von VS Code (macOS/Linux: bash/zsh, Windows: PowerShell).

## Auf einen Blick

| | |
| --- | --- |
| **Dauer** | 2 Tage |
| **Zielgruppe** | Softwareentwickler:innen mit Python- oder JavaScript-Erfahrung, die Copilot höchstens als Autocomplete oder Chat kennen |
| **Vorkenntnisse** | Programmieren, HTML-Grundlagen |
| **Sprache** | Deutsch |
| **Projekt** | FocusList: Flask + Jinja2 oder Node.js ohne Framework, Tailwind CSS v4, VS Code mit GitHub Copilot (Copilot-Harness) |

Details zu Zielen, Voraussetzungen und Tagesablauf: [`m00-overview/overview.md`](m00-overview/overview.md).

## Einstieg

| Datei | Inhalt |
| --- | --- |
| [`00-setup-and-installation.md`](00-setup-and-installation.md) | VS Code, Copilot, Node.js, Python prüfen; Startgerüst holen |
| [`m00-overview/overview.md`](m00-overview/overview.md) | Entwicklung, Begriff, Ziel, Zielgruppe, Projekt, Tagesablauf |
| [`m00-overview/topics.md`](m00-overview/topics.md) | Module, Labs und Kernthemen |
| [`m00-overview/glossary.md`](m00-overview/glossary.md) | Begriffe mit Fundstelle |
| [`m00-overview/best-practices.md`](m00-overview/best-practices.md) | Regeln aus allen Modulen |
| [`m00-overview/faq.md`](m00-overview/faq.md) | Häufige Fragen und Probleme |
| [`project/README.md`](project/README.md) | FocusList: Stacks, Stände v0–v5, `catch-up.mjs` |

## Tag 1

| Modul | Ordner | Spickzettel | Labs |
| --- | --- | --- | --- |
| 1 KI-Grundlagen für die Softwareentwicklung | [`m01-ai-foundations/`](m01-ai-foundations/) | [`m01-cheatsheet.md`](m01-ai-foundations/m01-cheatsheet.md) | `l01-llm-agent-loop`, `l02-evolution`, `l03-ecosystem`, `l04-responsibility` |
| 2 GitHub Copilot in VS Code | [`m02-copilot-essentials/`](m02-copilot-essentials/) | [`m02-cheatsheet.md`](m02-copilot-essentials/m02-cheatsheet.md) | `l01-project-setup`, `l02-harnesses`, `l03-inline-suggestions`, `l04-chat-modes`, `l05-agent-control` |
| 3 Vibecoding vs. Agentic Coding | [`m03-coding-approaches/`](m03-coding-approaches/) | [`m03-cheatsheet.md`](m03-coding-approaches/m03-cheatsheet.md) | `l01-comparison`, `l02-one-shot-prototype`, `l03-code-assessment` |
| 4 Instructions | [`m04-instructions/`](m04-instructions/) | [`m04-cheatsheet.md`](m04-instructions/m04-cheatsheet.md) | `l01-project-instructions`, `l02-scoped-instructions`, `l03-compare` |

## Tag 2

| Modul | Ordner | Spickzettel | Labs |
| --- | --- | --- | --- |
| 5 Skills | [`m05-skills/`](m05-skills/) | [`m05-cheatsheet.md`](m05-skills/m05-cheatsheet.md) | `l01-skill-basics`, `l02-test-writer`, `l03-security-checker` |
| 6 Custom Agents | [`m06-custom-agents/`](m06-custom-agents/) | [`m06-cheatsheet.md`](m06-custom-agents/m06-cheatsheet.md) | `l01-agent-basics`, `l02-reviewer`, `l03-agent-team` |
| 7 Hooks und MCP | [`m07-hooks-mcp/`](m07-hooks-mcp/) | [`m07-cheatsheet.md`](m07-hooks-mcp/m07-cheatsheet.md) | `l01-guard-hook`, `l02-check-hook`, `l03-mcp-basics`, `l04-playwright-mcp` |
| 8 Spec-Driven Development | [`m08-spec-driven/`](m08-spec-driven/) | [`m08-cheatsheet.md`](m08-spec-driven/m08-cheatsheet.md) | `l01-spec-first`, `l02-openspec` |
| 9 Abschluss | [`m09-wrap-up/`](m09-wrap-up/) | – | `l01-recap`, `l02-outlook` |

Lab-Schema: eine Datei pro Lab im Modulordner, `m<NN>-<modul>/l<NN>-<lab>.md`. Beispiel: [`l02-harnesses.md`](m02-copilot-essentials/l02-harnesses.md).

## Projektdateien

[`project/`](project/) enthält FocusList in zwei Stacks (`focuslist/python/`, `focuslist/node/`): das Startgerüst `start/`, je Modul die Änderungen in `steps/m03/` … `steps/m08/` (Referenz für jede Übung) und das Skript `catch-up.mjs`, das jeden Stand in einen eigenen Ordner baut. Dazu der One-Shot-Prompt für das Vibecoding (`focuslist/vibecoding-prompt.md`). Details: [`project/README.md`](project/README.md).

---

<div align="center">

<sub>© Nextise GmbH · <a href="https://www.kodschul.com">kodschul.com</a> · Kompetenz aufbauen – von der sicheren KI-Anwendung bis zur modernen IT-Basis</sub>

</div>
