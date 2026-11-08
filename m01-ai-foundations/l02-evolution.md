# Lab 1.2: Entwicklung von Agentic Coding 2021–2026

**Leitfragen:**

<details>
<summary>Seit wann nutzt man selbst KI beim Programmieren, und wofür zuerst?</summary>

Bei den meisten Teams begann es zwischen 2021 und 2023 mit Vorschlägen im Editor oder Fragen an ChatGPT: Boilerplate, Regex, Fehlermeldungen erklären. Die eigene Antwort ordnet den eigenen Stand in die Zeitleiste ein.

</details>

<details>
<summary>Was hat sich zwischen „Vorschlag im Editor“ und „Agent macht es“ für die eigene Rolle geändert?</summary>

Früher entschied der Mensch Zeile für Zeile. Beim Agenten formuliert der Mensch Auftrag und Grenzen, prüft Diffs und Tests und übernimmt Verantwortung für Änderungen, die er nicht selbst getippt hat.

</details>

<details>
<summary>Warum einigen sich konkurrierende Firmen auf gemeinsame Dateiformate?</summary>

Teams nutzen mehrere Werkzeuge parallel. Ein gemeinsames Format (z. B. `AGENTS.md`, MCP, `SKILL.md`) muss nur einmal geschrieben werden und funktioniert überall; ein Hersteller ohne Unterstützung wirkt dann unattraktiv.

</details>

- Agentic Coding entstand in drei Stufen: Vorschlag (2021) → Chat (2023) → Agent (2025).
- Die Bausteine, die der Kurs nutzt (MCP, `AGENTS.md`, Skills), sind zwischen Nov 2024 und Dez 2025 entstanden.
- Muster: Ein Hersteller erfindet ein Format, andere übernehmen es, es wird offener Standard.
- Viele Anleitungen im Netz stammen aus früheren Stufen und passen deshalb nicht mehr zum heutigen Stand.

## Begriffe

| Begriff | Bedeutung |
| --- | --- |
| MCP (Model Context Protocol) | offenes Protokoll, über das Agenten Werkzeuge außerhalb des Editors nutzen (Browser, GitHub, Datenbank) |
| `AGENTS.md` | Datei im Repo mit Projektregeln für Agenten, werkzeugübergreifend |
| Agent Skill (`SKILL.md`) | Ordner mit Anleitung für eine wiederkehrende Aufgabe, wird nur bei Bedarf geladen |
| Vibecoding | Programmieren nur über Prompts, ohne den Code zu lesen (Begriff von A. Karpathy, Feb 2025) |
| Agentic AI Foundation (AAIF) | Stiftung unter der Linux Foundation, die seit Dez 2025 MCP und `AGENTS.md` betreut |
| Harness | Laufzeit um das Modell, die Werkzeuge und gelesene Dateien bestimmt (Details: Lab 2.2) |

## Drei Stufen

```mermaid
flowchart LR
    S1["Stufe 1: Vorschlag<br/>ab 2021<br/>grauer Vorschlag im Editor"] --> S2["Stufe 2: Chat<br/>ab 2023<br/>Fragen und Code im Editor"]
    S2 --> S3["Stufe 3: Agent<br/>ab 2025<br/>liest, ändert, führt aus, prüft"]
```

| Stufe | Wer handelt | Was die KI sieht | Wie geprüft wird |
| --- | --- | --- | --- |
| Vorschlag | Mensch, KI ergänzt | aktuelle Datei, offene Tabs | Mensch liest jede Zeile |
| Chat | Mensch kopiert Antwort | Frage plus angehängter Kontext | Mensch testet selbst |
| Agent | KI im Loop (Lab 1.1) | Projekt, Terminal, Werkzeuge | KI testet, Mensch nimmt Diff ab |

**Stufe 1, Vorschlag (2021):**

![Ankündigungsbild „Your AI pair programmer“ der GitHub-Copilot-Technical-Preview: Editor mit der JavaScript-Funktion fetchNASAPictureOfTheDay, deren Rumpf Copilot ergänzt hat](https://github.blog/wp-content/uploads/2021/06/GitHub-Copilot_blog-header.png?resize=1600%2C850)
_Quelle: GitHub Blog, „Introducing GitHub Copilot: your AI pair programmer“ (https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/), © GitHub, Pressebild (extern verlinkt), abgerufen am 07.11.2026._

**Stufe 2, Chat (ab Nov 2022):**

![ChatGPT-Startseite im Browser: Eingabefeld „Message ChatGPT“, Beispielaufgaben und Modellauswahl „ChatGPT 3.5“](https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Chatgpt-screenshot.png/1280px-Chatgpt-screenshot.png)
_Quelle: Wikimedia Commons, „Chatgpt-screenshot.png“ (https://commons.wikimedia.org/wiki/File:Chatgpt-screenshot.png), Public Domain, abgerufen am 07.11.2026._

Ansicht 2024: Programmieren per Gespräch im Browser, der Code wird von Hand in das Projekt kopiert.

**Stufe 3, Agent (ab Feb 2025):**

![Chat-Eingabe von Copilot in VS Code mit geöffneter Modus-Auswahl Ask, Edit und Agent](https://code.visualstudio.com/assets/updates/1_99/chat-modes.png)
_Quelle: VS Code Release Notes 1.99 (https://code.visualstudio.com/updates/v1_99), Microsoft, CC BY 3.0 US, abgerufen am 07.11.2026._

Ansicht März 2025: Der Chat bekommt den Modus „Agent“, der selbst Dateien ändert und Befehle ausführt. Die heutige Oberfläche sieht anders aus (Lab 2.4).

## Zeitleiste 2021–2026

Stand: 11/2026, Quellen je Zeile (abgerufen am 08.11.2026).

| Zeit | Ereignis | Bedeutung |
| --- | --- | --- |
| Jun 2021 | GitHub Copilot als Technical Preview ([GitHub Blog, 29.06.2021](https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/)); allgemein verfügbar Jun 2022 ([GitHub Blog, 21.06.2022](https://github.blog/news-insights/product-news/github-copilot-is-generally-available-to-all-developers/)) | Stufe 1: Vorschläge im Editor |
| Nov 2022 | ChatGPT, veröffentlicht am 30.11.2022 ([Wikipedia: ChatGPT](https://en.wikipedia.org/wiki/ChatGPT)) | Programmieren per Gespräch wird Alltag |
| 2023 | Copilot Chat (angekündigt März, allgemein verfügbar Dez 2023, [GitHub Changelog, 29.12.2023](https://github.blog/changelog/2023-12-29-github-copilot-chat-now-generally-available-for-organizations-and-individuals/)) | Stufe 2: Chat im Editor |
| Nov 2024 | Anthropic veröffentlicht MCP ([Anthropic, 25.11.2024](https://www.anthropic.com/news/model-context-protocol)) | offener Standard, um Agenten Werkzeuge zu geben |
| Feb 2025 | Copilot Agent Mode (Preview) in VS Code ([VS Code Blog, 24.02.2025](https://code.visualstudio.com/blogs/2025/02/24/introducing-copilot-agent-mode)); Claude Code (Research Preview, [Anthropic, 24.02.2025](https://www.anthropic.com/news/claude-3-7-sonnet)); Begriff „Vibecoding“ (A. Karpathy, [Wikipedia: Vibe coding](https://en.wikipedia.org/wiki/Vibe_coding)) | Stufe 3: Agent ändert Dateien und führt Befehle aus |
| Apr–Mai 2025 | OpenAI Codex CLI (Apr, [GitHub: openai/codex](https://github.com/openai/codex)) und Codex Cloud (Mai) ([Wikipedia: Codex](https://en.wikipedia.org/wiki/Codex_(AI_agent))); Copilot Coding Agent auf GitHub (Mai, [GitHub Changelog, 19.05.2025](https://github.blog/changelog/2025-05-19-github-copilot-coding-agent-in-public-preview/)) | Agenten im Terminal und in der Cloud |
| Aug 2025 | OpenAI veröffentlicht `AGENTS.md` ([agents.md](https://agents.md/), Repository seit 19.08.2025: [GitHub: agentsmd/agents.md](https://github.com/agentsmd/agents.md)) | gemeinsame Instructions-Datei für alle Agenten |
| Sep 2025 | Copilot CLI (Public Preview, [GitHub Changelog, 25.09.2025](https://github.blog/changelog/2025-09-25-github-copilot-cli-is-now-in-public-preview/); allgemein verfügbar Feb 2026, [GitHub Changelog 02/2026](https://github.blog/changelog/month/02-2026/)) | Copilot im Terminal |
| Okt 2025 | Anthropic führt Agent Skills (`SKILL.md`) ein ([Agent Skills in VS Code](https://code.visualstudio.com/docs/agent-customization/agent-skills)) | Wissen und Abläufe nur bei Bedarf laden |
| Dez 2025 | Agentic AI Foundation (Linux Foundation) übernimmt MCP und `AGENTS.md`; Agent Skills als offener Standard (agentskills.io) ([Linux Foundation, 09.12.2025](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation)) | aus Hersteller-Formaten werden Standards |
| Jul 2026 | VS Code 1.129: Agent Host für Copilot, Claude und Codex ([Help Net Security, 16.07.2026](https://www.helpnetsecurity.com/2026/07/16/vs-visual-studio-code-agent-host/)) | mehrere Harnesses in einem Editor |
| Okt 2026 | Copilot-Harness wird Standard für neue Sitzungen (ab VS Code 1.142) ([GitHub Changelog, 28.10.2026](https://github.blog/changelog/2026-10-28-github-copilot-in-vs-code-universe-releases/)) | heutiger Arbeitsstand dieses Kurses |

Auffällig: MCP ist älter als der Agent-Modus, und zwischen erstem Agenten (Feb 2025) und gemeinsamen Standards (Dez 2025) liegen weniger als zwölf Monate.

## Das Muster: Hersteller-Format → übernommen → Standard

```mermaid
flowchart LR
    H["Ein Hersteller<br/>erfindet ein Format"] --> U["Andere Werkzeuge<br/>übernehmen es"]
    U --> S["Neutrale Stiftung<br/>betreut es als Standard"]
```

| Format | Erfunden von | Übernommen | Standard |
| --- | --- | --- | --- |
| MCP | Anthropic, Nov 2024 | 2025 u. a. in Copilot und Codex | AAIF (Linux Foundation), Dez 2025 |
| `AGENTS.md` | OpenAI, Aug 2025 | u. a. Copilot liest die Datei als Instructions | AAIF (Linux Foundation), Dez 2025 |
| Agent Skills (`SKILL.md`) | Anthropic, Okt 2025 | u. a. Copilot in VS Code, Codex | offener Standard (agentskills.io), Dez 2025 |

**Folge für die Praxis:** Was im Kurs für Copilot gebaut wird, ist zum großen Teil auch in anderen Werkzeugen nutzbar (Lab 1.3).

**Folge für die Recherche:** Anleitungen aus 2023 oder Anfang 2025 beschreiben oft Funktionen einer früheren Stufe oder eines anderen Harness. Datum einer Quelle immer prüfen.

## Fazit

- Drei Stufen in fünf Jahren: Vorschlag, Chat, Agent.
- Die meisten heutigen Bausteine sind jünger als zwei Jahre; Quellen immer mit Datum lesen.
- Gemeinsame Formate machen das Gelernte übertragbar auf andere Werkzeuge.
