# Best Practices und Ausblick

Die Bausteine des Kurses lassen sich auf neue Projekte übertragen, aber nicht in fester Reihenfolge: Jeder löst ein bestimmtes Problem. Dazu kommt der bewusste Umgang mit Kontext und mit neuen Copilot-Funktionen, die laufend erscheinen.

## Leitfragen

<details>
<summary>Warum kann "mehr Kontext" schlechter statt besser sein?</summary>

Das Kontextfenster ist begrenzt. Irrelevante Inhalte verdrängen Relevantes und verschlechtern die Präzision der Antwort, statt sie zu verbessern.

</details>

<details>
<summary>Was ist eine praktische Faustregel für die Länge von Instructions?</summary>

Wenige, konkrete, prüfbare Regeln statt einer langen Liste allgemeiner Best Practices, wie in Modul 4.

</details>

<details>
<summary>Wie mit einer neuen Copilot-Funktion umgehen, die es beim Kurs noch nicht gab?</summary>

Wie im ganzen Kurs: Baseline ohne die Funktion, Problem sichtbar machen, dann gezielt einführen und prüfen, statt jede Neuerung ungeprüft zu übernehmen.

</details>

## Welcher Baustein für welches Problem?

| Problem | Baustein | Modul |
| --- | --- | --- |
| Antworten werden unscharf | gezielte Kontextreferenzen (`#file`, `#selection`) statt alles offen | 2 |
| Copilot ignoriert Projektkonventionen | wenige, konkrete Instructions | 4 |
| derselbe Ablauf wird immer neu erklärt | Skill (automatisch geladen) oder Prompt-Datei (`/`-Befehl) | 5 / 6 |
| eine Rolle braucht klare Grenzen | Custom Agent mit eingeschränkten Tools | 7 |
| Prüfungen werden vergessen | Task und Stop-Hook als Absicherung, nicht als Review-Ersatz | 8 |
| Daten liegen außerhalb des Projekts | MCP-Server mit minimalen Rechten | 8 |
| Feature mit echten Randfällen | Spec-First mit OpenSpec | 9 |

Die Reihenfolge richtet sich nach dem Bedarf des Projekts, nicht nach der Reihenfolge dieses Kurses.

## Token- und Kontext-Management

- **Kontextfenster:** begrenzte Textmenge, die ein Modell gleichzeitig berücksichtigt; Chatverlauf, offene Dateien, Instructions und Tool-Ergebnisse teilen sich denselben Platz.
- **Token-Ökonomie:** Kontextgröße bewusst steuern, Präzision und Kosten im Gleichgewicht halten.
- **Gezielt statt pauschal:** zwei bis drei relevante Dateien referenzieren liefert präzisere Antworten als das ganze Projekt.
- **Neuer Chat pro Aufgabe:** ein langer Verlauf mit alten Irrwegen verschlechtert spätere Antworten.
- **Kurze Instructions, Details in Skills:** Instructions laden bei jeder Anfrage, Skills nur bei Bedarf.
- **Subagenten für Teilaufgaben:** sie arbeiten im eigenen Kontext und geben nur das Ergebnis zurück (Modul 7).
- **Tool-Ausgaben kürzen:** der Stop-Hook gibt nur die letzten 30 Zeilen der Testausgabe zurück (Modul 8).

## Ausblick auf Copilot-Neuerungen

Auswahl aus dem GitHub-Changelog vom Oktober 2026. Status und Namen ändern sich schnell; vor dem Einsatz die verlinkte Quelle prüfen.

| Datum | Neuerung | Status | Bezug zum Kurs |
| --- | --- | --- | --- |
| 15.10.2026 | Agentic Autofix für Code-Scanning-Alerts: liest relevante Dateien, schlägt einen Fix vor, prüft mit CodeQL erneut und öffnet einen Pull Request | GA für GitHub Code Security / Advanced Security auf GitHub Enterprise Cloud | Agent mit eigener Prüfschleife wie der Stop-Hook (Modul 8) |
| 26.10.2026 | Assisted Permissions: ein Modell prüft Anfragen von Copilot, Befehle auszuführen, Pfade zu lesen oder URLs zu öffnen; Unkritisches läuft automatisch, der Rest braucht eine Freigabe | GA in Copilot CLI, Copilot-App und VS Code | Rechte von Agenten (Modul 7), Freigaben bei MCP (Modul 8) |
| 28.10.2026 | Lokale Sandboxes: geschützte Ausführungsumgebung für agentische Abläufe; begrenzt Dateisystem, Netzwerk und Zugangsdaten nach Richtlinie | GA in Copilot für JetBrains-IDEs | technische Grenze statt Verbot im Agent-Body (Modul 7) |
| 28.10.2026 | Copilot Fusion: Routing zwischen lokalen Modellen auf dem eigenen Gerät und Cloud-Modellen | experimentelle Preview, Opt-in; CLI, Copilot-App, VS Code | Modellwahl und Datenschutz (Modul 1) |
| 19.10.2026 | Abkündigung einzelner Modelle; weitere sind für Mitte November 2026 angekündigt | abgekündigt | feste `model`-Angaben in `.agent.md` regelmäßig prüfen (Modul 7) |

_Stand: 10/2026, Quellen: [Agentic autofix GA](https://github.blog/changelog/2026-10-15-agentic-autofix-for-code-scanning-alerts-general-availability), [Assisted permissions GA](https://github.blog/changelog/2026-10-26-github-copilot-assisted-permissions-generally-available/), [Copilot in JetBrains Universe releases](https://github.blog/changelog/2026-10-28-github-copilot-in-jetbrains-universe-releases/), [Copilot Fusion lokale Modelle](https://github.blog/changelog/2026-10-28-github-copilot-fusion-now-supports-selection-of-local-models/), [Modelle abgekündigt am 19.10.2026](https://github.blog/changelog/2026-10-19-github-copilot-models-deprecated-on-october-19-2026), [Abkündigung Mitte November](https://github.blog/changelog/2026-10-15-upcoming-deprecation-of-selected-github-copilot-models-in-mid-november), [GitHub Changelog: Copilot](https://github.blog/changelog/label/copilot/)._

Umgang mit Neuerungen:

- Erst die Baseline ohne die Funktion, dann das Problem benennen, das sie lösen soll.
- Preview-Funktionen in einem Testprojekt ausprobieren, nicht direkt im Teamprojekt.
- Neue Rechte- und Automatisierungsfunktionen zuerst beobachten, dann scharf schalten, wie die Hooks in Modul 8.

## Dieselbe Kette mit OpenAI Codex

[`project/focuslist/codex/`](../project/focuslist/codex/README.md) enthält denselben Endstand v7, aber mit den Dateien für OpenAI Codex statt `.github/` und `.vscode/`. Code, Tests und `openspec/` sind identisch. Die vollständige Zuordnung mit Quellen steht im [README](../project/focuslist/codex/README.md); die wichtigsten Zeilen:

| Konzept (Modul) | Copilot (Endstand `js-ts`) | Codex (`codex/`) | Unterschied |
| --- | --- | --- | --- |
| Projektregeln (M4) | `.github/copilot-instructions.md` | `AGENTS.md` | Inhalt gleich; Codex liest `AGENTS.md` vom Projekt-Root bis zum Startverzeichnis |
| Pfadbezogene Regeln (M4) | `.github/instructions/tests.instructions.md` mit `applyTo` | `tests/AGENTS.md` | Ordner statt Glob-Muster; die Root-`AGENTS.md` verweist ausdrücklich darauf |
| Skills (M5) | `.github/skills/<name>/SKILL.md` | `.agents/skills/<name>/SKILL.md` | gleiches Format; Aufruf mit `$name` oder automatisch über die `description` |
| Prompt-Dateien (M6) | `.github/prompts/*.prompt.md`, Aufruf `/name` | Skills mit `allow_implicit_invocation: false` | Custom Prompts in Codex sind veraltet und nur benutzerweit; Ersatz: Skill, der nur explizit läuft |
| Custom Agents (M7) | `.github/agents/*.agent.md` mit `tools:` | `.codex/agents/*.toml` | keine Werkzeugliste; Rechte kommen aus `sandbox_mode` und `approval_policy` in `.codex/config.toml` |
| Stop-Hook (M8) | `.github/hooks/run-tests.json` | `.codex/hooks.json` + `.codex/hooks/run-tests.mjs` | gleiche Idee, `{"decision":"block","reason":"…"}`; braucht Projekt-Vertrauen und Bestätigung per `/hooks` |
| MCP-Server (M8) | `.vscode/mcp.json`, `servers` | `.codex/config.toml`, `[mcp_servers.focuslist_tickets]` | TOML statt JSON, keine Variable `${workspaceFolder}` |

Ohne direkte Entsprechung in Codex: `.vscode/tasks.json`, `tools:` pro Agent, `applyTo`-Globmuster, Prompt-Variablen wie `${file}`. OpenSpec läuft mit `openspec init --tools codex` über Skills (`$openspec-propose` statt `/opsx-propose`).

_Stand: 10/2026, Quellen: siehe [`codex/README.md`](../project/focuslist/codex/README.md) (offizielle Codex-Doku, [github.com/openai/codex](https://github.com/openai/codex))._

Die Konzepte des Kurses sind werkzeugunabhängig: Regeln, wiederverwendbare Abläufe, Rollen mit Grenzen, automatische Prüfung, externe Daten, Spec vor Code. Nur Dateinamen und Formate wechseln.

## Selbst ausprobieren

Grundlage: [`practice/neues-projekt-brief.md`](../project/practice/neues-projekt-brief.md), WetterBlick, ein kleines Wetter-Dashboard für eine Hausverwaltung. Ergebnis als schriftliche Entscheidungsnotiz, ca. 15 Min.

1. Wähle aus der Tabelle "Welcher Baustein für welches Problem?" die drei Bausteine, die für WetterBlick zuerst kommen, und begründe je in einem Satz, welches Problem aus dem Brief sie verhindern.
2. Formuliere für einen davon eine konkrete erste Maßnahme, z. B. die erste Regel für `copilot-instructions.md`.
3. Benenne einen Baustein, der vorerst nicht eingeführt wird, mit Begründung.

**Beobachtung:** Naheliegend sind Instructions (API-Schlüssel nie im Repo, Fehlermeldung statt leerer Kachel, z. B. "API-Funktionen werfen bei HTTP-Fehlern eine typisierte `ApiError`, nie `null`"), ein Skill "neue Kachel hinzufügen" (Abruf, Umrechnung, Anzeige, Test, wie `add-focuslist-action`) und Spec-First für die häufig wechselnden Wünsche und die spätere Übergabe an eine dritte Person. MCP ist zunächst nicht nötig: Außer der Wetter-API gibt es kein externes System, und die API ruft der Code selbst auf.

## Fazit

- Bausteine nach Problem wählen, nicht nach Kursreihenfolge.
- Kontext gezielt halten: wenige Dateien, kurze Instructions, Details in Skills, neue Chats pro Aufgabe.
- Neuerungen mit Datum und Quelle prüfen und wie jeden Baustein erst gegen eine Baseline testen.

Zum Abschluss: offene Fragen und Feedback.
