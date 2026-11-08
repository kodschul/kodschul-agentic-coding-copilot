<div align="center">

<img src="assets/kodschul-logo.png" alt="Kodschul" width="220" />

# Agentic Coding mit GitHub Copilot

2-Tage-Workshop · Python oder Node.js · Deutsch

**Coding-Agents steuern, prüfen und absichern – mit GitHub Copilot**

</div>

---

[Worum es geht](#worum-es-geht) · [Start](#start) · [Tag 1](#tag-1) · [Tag 2](#tag-2) · [Hilfe](#hilfe)

## Worum es geht

- Coding-Agents schreiben in Minuten Code, für den früher Stunden nötig waren.
- Ob dieser Code in ein Team-Projekt passt, entscheidet das Repository: Regeln, Skills, Rollen, automatische Prüfungen, eine klare Spec.
- Der Workshop baut genau diese Bausteine Schritt für Schritt auf, an einem durchgehenden Projekt: der Web-App FocusList.
- Ergebnis: ein Projekt, in dem der Agent nach festen Regeln arbeitet, und ein Fahrplan für das eigene Team.

| | |
| --- | --- |
| **Für** | Entwickler:innen mit Python- oder JavaScript-Erfahrung |
| **Vorkenntnisse** | Programmieren, HTML-Grundlagen; Copilot höchstens als Autocomplete oder Chat |
| **Werkzeuge** | VS Code mit GitHub Copilot, Node.js, für Python zusätzlich Python 3.12+ |
| **Projekt** | FocusList, Web-App mit Tailwind CSS, in Python (Flask) oder Node.js |
| **Material** | Handout pro Lab, Spickzettel pro Modul, Projekt mit Referenzstand für jedes Modul |

## Start

1. Rechner einrichten: [Setup und Installation](00-setup-and-installation.md)
2. Ziel und Tagesablauf lesen: [Kursüberblick](m00-overview/overview.md)
3. Startprojekt erzeugen, im Terminal von VS Code im Ordner dieser Unterlagen:

```bash
node project/focuslist/catch-up.mjs python m03 $HOME/kurs/focuslist   # Node.js: … node m03 …
```

## Tag 1

| Modul | Kernthemen | Ergebnis |
| --- | --- | --- |
| 1 [KI-Grundlagen für die Softwareentwicklung](m01-ai-foundations/l01-llm-agent-loop.md) | LLM und Agenten-Loop, Entwicklung 2021–2026, Werkzeuge und Bausteine, Verantwortung | Überblick über das Feld |
| 2 [GitHub Copilot in VS Code](m02-copilot-essentials/l01-project-setup.md) | Kursprojekt, Harnesses, Snippets und Ghost Text, Ask/Plan/Agent, Agent-Kontrolle | Copilot-Grundlagen |
| 3 [Vibecoding vs. Agentic Coding](m03-coding-approaches/l01-comparison.md) | zwei Wege im Vergleich, Prototyp per One-Shot-Prompt, Code-Bewertung | Prototyp v0, Status quo |
| 4 [Instructions](m04-instructions/l01-project-instructions.md) | `AGENTS.md`, Regeln für bestimmte Dateien, Vorher-Nachher | v1 mit Projektregeln |

## Tag 2

| Modul | Kernthemen | Ergebnis |
| --- | --- | --- |
| 5 [Skills](m05-skills/l01-skill-basics.md) | Skill-Aufbau, `test-writer`, `security-checker` | v2: getestet, Lücken geschlossen |
| 6 [Custom Agents](m06-custom-agents/l01-agent-basics.md) | Rollen und Rechte, `reviewer`, Agenten-Team mit Subagents | v3: Feature im Team gebaut |
| 7 [Hooks und MCP](m07-hooks-mcp/l01-guard-hook.md) | Guard- und Check-Hook, Model Context Protocol, Playwright im Browser | v4: Regeln erzwungen, UI geprüft |
| 8 [Spec-Driven Development](m08-spec-driven/l01-spec-first.md) | Spec vor Code, OpenSpec mit dem Agenten-Team | v5: Feature aus einer Spec |
| 9 [Abschluss](m09-wrap-up/l01-recap.md) | Rückblick, Transfer ins eigene Projekt, Ausblick | eigener Fahrplan |

- Jedes Lab ist eine Seite: Leitfragen, Kerninhalt, bei Labs zum Ausprobieren eine Übung mit Lösungsweg.
- Spickzettel liegen im jeweiligen Modulordner.
- Alle Labs mit Zeiten: [Module und Labs](m00-overview/topics.md).

## Hilfe

- **Projektstand wiederherstellen:** jeden Stand für den Start eines Moduls neu erzeugen, z. B. Modul 5:

  ```bash
  node project/focuslist/catch-up.mjs python m05 $HOME/kurs/focuslist-m05
  ```

  Jeder Stand kommt in einen neuen Ordner `$HOME/kurs/focuslist-mNN`; danach Setup laut `README.md` des Stands (venv und `pip install -r requirements.txt` bei Python, `npm install`, `npm run build:css`), dann in diesem Ordner weiterarbeiten. Tag 2 startet für alle mit `m05` in `$HOME/kurs/focuslist-m05`.

- **Lösungen vergleichen:** jede Übung nennt ihre Referenz; die fertigen Dateien je Modul liegen im [Projektordner](project/README.md).
- **Nachschlagen:** [Glossar](m00-overview/glossary.md) · [FAQ](m00-overview/faq.md) · [Best Practices](m00-overview/best-practices.md)

---

<div align="center">

<sub>© Nextise GmbH · <a href="https://www.kodschul.com">kodschul.com</a> · Kompetenz aufbauen – von der sicheren KI-Anwendung bis zur modernen IT-Basis</sub>

</div>
