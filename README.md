<div align="center">

<img src="assets/kodschul-logo.png" alt="Kodschul" width="220" />

# Agentic Coding mit GitHub Copilot

2-Tage-Workshop · Python oder Node.js · Deutsch

**Vom ersten Prompt zum gesteuerten Coding-Agent**

</div>

---

Im Workshop entsteht FocusList, eine kleine Aufgaben-Web-App. Ein einzelner Prompt liefert eine erste Version. Danach wird die App mit Projektregeln, Skills, eigenen Agents, Hooks, MCP und einer Spec schrittweise ausgebaut, und mit jedem Schritt arbeitet der Agent kontrollierter.

**Für:** Entwickler:innen mit Python- oder JavaScript-Erfahrung
**Vorkenntnisse:** Programmieren, HTML-Grundlagen; Copilot höchstens als Autocomplete oder Chat
**Werkzeuge:** VS Code mit GitHub Copilot, Node.js, für Python zusätzlich Python 3.12+

[Start](#start) · [Tag 1](#tag-1) · [Tag 2](#tag-2) · [Hilfe](#hilfe) · [Kursüberblick](m00-overview/overview.md)

## Start

1. Rechner einrichten: [Setup und Installation](00-setup-and-installation.md)
2. Ziel und Tagesablauf lesen: [Kursüberblick](m00-overview/overview.md)
3. Startprojekt erzeugen, im Terminal von VS Code im Ordner dieser Unterlagen:

```bash
node project/focuslist/catch-up.mjs python m03 ~/kurs/focuslist   # Node.js: … node m03 …
```

## Tag 1

### Modul 1 · KI-Grundlagen für die Softwareentwicklung

Wie LLMs Code erzeugen, wie Agentic Coding entstanden ist und wer für das Ergebnis verantwortlich ist.

- [1.1 LLM-Grundlagen und Agenten-Loop](m01-ai-foundations/l01-llm-agent-loop.md)
- [1.2 Entwicklung von Agentic Coding](m01-ai-foundations/l02-evolution.md)
- [1.3 Werkzeuge und Bausteine](m01-ai-foundations/l03-ecosystem.md)
- [1.4 Verantwortung und Risiken](m01-ai-foundations/l04-responsibility.md)

<sub>Spickzettel: [Modul 1](m01-ai-foundations/m01-cheatsheet.md)</sub>

### Modul 2 · GitHub Copilot in VS Code

Kursprojekt, Harnesses, Vorschläge im Editor und die Kontrolle über den Agenten.

- [2.1 Kursprojekt FocusList](m02-copilot-essentials/l01-project-setup.md)
- [2.2 Harnesses](m02-copilot-essentials/l02-harnesses.md)
- [2.3 Inline-Vorschläge](m02-copilot-essentials/l03-inline-suggestions.md)
- [2.4 Ask, Plan und Agent](m02-copilot-essentials/l04-chat-modes.md)
- [2.5 Agent-Kontrolle](m02-copilot-essentials/l05-agent-control.md)

<sub>Spickzettel: [Modul 2](m02-copilot-essentials/m02-cheatsheet.md)</sub>

### Modul 3 · Vibecoding vs. Agentic Coding

Zwei Arten, mit KI zu bauen; ein Prototyp per Prompt und seine Bewertung.

- [3.1 Die zwei Wege im Vergleich](m03-coding-approaches/l01-comparison.md)
- [3.2 Prototyp per One-Shot-Prompt](m03-coding-approaches/l02-one-shot-prototype.md)
- [3.3 Code-Bewertung des Prototyps](m03-coding-approaches/l03-code-assessment.md)

<sub>Spickzettel: [Modul 3](m03-coding-approaches/m03-cheatsheet.md)</sub>

### Modul 4 · Instructions

Projektregeln, die der Agent bei jeder Anfrage kennt.

- [4.1 Projektregeln für den Agenten](m04-instructions/l01-project-instructions.md)
- [4.2 Regeln für bestimmte Dateien](m04-instructions/l02-scoped-instructions.md)
- [4.3 Vorher und nachher](m04-instructions/l03-compare.md)

<sub>Spickzettel: [Modul 4](m04-instructions/m04-cheatsheet.md)</sub>

## Tag 2

### Modul 5 · Skills

Wiederkehrende Aufgaben als Anleitung, die der Agent bei Bedarf lädt.

- [5.1 Was ist ein Skill](m05-skills/l01-skill-basics.md)
- [5.2 Skill `test-writer`](m05-skills/l02-test-writer.md)
- [5.3 Skill `security-checker`](m05-skills/l03-security-checker.md)

<sub>Spickzettel: [Modul 5](m05-skills/m05-cheatsheet.md)</sub>

### Modul 6 · Custom Agents

Eigene Rollen mit festen Rechten, die zusammenarbeiten.

- [6.1 Agents und Subagents](m06-custom-agents/l01-agent-basics.md)
- [6.2 Agent `reviewer`](m06-custom-agents/l02-reviewer.md)
- [6.3 Agenten-Team](m06-custom-agents/l03-agent-team.md)

<sub>Spickzettel: [Modul 6](m06-custom-agents/m06-cheatsheet.md)</sub>

### Modul 7 · Hooks und MCP

Regeln erzwingen, Prüfungen automatisieren und dem Agenten einen Browser geben.

- [7.1 Hook als Leitplanke](m07-hooks-mcp/l01-guard-hook.md)
- [7.2 Hook als Prüfschritt](m07-hooks-mcp/l02-check-hook.md)
- [7.3 Was ist MCP](m07-hooks-mcp/l03-mcp-basics.md)
- [7.4 Agent mit Browser](m07-hooks-mcp/l04-playwright-mcp.md)

<sub>Spickzettel: [Modul 7](m07-hooks-mcp/m07-cheatsheet.md)</sub>

### Modul 8 · Spec-Driven Development

Erst festlegen, was gebaut wird, dann bauen lassen.

- [8.1 Erst Spec, dann Code](m08-spec-driven/l01-spec-first.md)
- [8.2 OpenSpec mit dem Agenten-Team](m08-spec-driven/l02-openspec.md)

<sub>Spickzettel: [Modul 8](m08-spec-driven/m08-cheatsheet.md)</sub>

### Modul 9 · Abschluss

Was sich verändert hat und wie es im eigenen Projekt weitergeht.

- [9.1 Rückblick und Transfer](m09-wrap-up/l01-recap.md)
- [9.2 Ausblick](m09-wrap-up/l02-outlook.md)

## Hilfe

### Projektstand wiederherstellen

Ein fehlender oder kaputter Stand lässt sich für jedes Modul neu erzeugen, hier für den Start von Modul 5:

```bash
node project/focuslist/catch-up.mjs python m05 ~/kurs/focuslist-m05
```

### Lösungen vergleichen

Jede Übung nennt ihre Referenz. Die fertigen Dateien je Modul liegen im [Projektordner](project/README.md).

### Nachschlagen

[Glossar](m00-overview/glossary.md) · [FAQ](m00-overview/faq.md) · [Best Practices](m00-overview/best-practices.md) · [Module und Labs mit Zeiten](m00-overview/topics.md)

---

<div align="center">

<sub>© Nextise GmbH · <a href="https://www.kodschul.com">kodschul.com</a> · Kompetenz aufbauen – von der sicheren KI-Anwendung bis zur modernen IT-Basis</sub>

</div>
