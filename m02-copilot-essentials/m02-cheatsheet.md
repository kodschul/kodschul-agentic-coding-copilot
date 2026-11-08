# Cheatsheet Modul 2: GitHub Copilot in VS Code

Stand: 11/2026, VS-Code-Standardbelegung. Quellen: [Agent harnesses](https://code.visualstudio.com/docs/agents/run/agent-harnesses), [Copilot Chat cheat sheet](https://docs.github.com/en/copilot/reference/chat-cheat-sheet), [Migrate customizations](https://code.visualstudio.com/docs/agent-customization/migrate-customizations), [Prompt files](https://code.visualstudio.com/docs/agent-customization/prompt-files). Abweichende Tastenbelegungen zeigt die Befehlspalette unter „Preferences: Open Keyboard Shortcuts“.

## FocusList starten

| Schritt | Python | Node.js |
| --- | --- | --- |
| Umgebung | `python -m venv .venv`, `source .venv/bin/activate` (Windows: `.venv\Scripts\activate`) | – |
| Abhängigkeiten | `pip install -r requirements.txt`, `npm install` | `npm install` |
| CSS einmal bauen | `npm run build:css` | `npm run build:css` |
| CSS beobachten | `npm run css` | `npm run css` |
| App starten | `flask --app focuslist run --debug` | `npm run dev` |
| URL | `http://127.0.0.1:5000` | `http://localhost:3000` |
| Tests | `pytest` | `npm test` |
| anderer Port | `--port 5001` | `PORT=3001 npm run dev` |

## Harnesses

| Harness | Kurz | Wann |
| --- | --- | --- |
| Copilot | Standard, Agent Host, läuft weiter bei geschlossenem Fenster | Alltag, alle Kursübungen |
| Local | bisheriger Harness, an das Fenster gebunden | Slash-Befehle, `@`-Teilnehmer, Prompt-Dateien, Handoffs; Firmenvorgabe |
| Claude | Claude Agent SDK, liest `CLAUDE.md`, `.claude/skills` | Team nutzt Claude Code |
| Codex | OpenAI Codex, liest `AGENTS.md`, `.agents/skills` | Team nutzt Codex |
| Cloud | Ausführungsziel auf GitHub, Ergebnis als Pull Request | lange Aufgaben ohne eigenen Rechner |

## Tastenkürzel

| Aktion | Windows / Linux | macOS | Harness |
| --- | --- | --- | --- |
| Snippet / Emmet einsetzen (`!`, `ul>li*3`) | Tab | Tab | ohne KI |
| Vorschlag annehmen | Tab | Tab | alle |
| nächstes Wort annehmen | Ctrl+→ | Cmd+→ | alle |
| Vorschlag ablehnen | Esc | Esc | alle |
| nächste / vorherige Alternative | Alt+] / Alt+[ | Option+] / Option+[ | alle |
| Next Edit Suggestion annehmen | Tab | Tab | alle |
| Chat-Ansicht öffnen | Ctrl+Alt+I | Ctrl+Cmd+I | alle |
| Befehlspalette | Ctrl+Shift+P | Cmd+Shift+P | alle |

## Chat: Copilot-Harness vs. Local-Harness

| Funktion | Copilot-Harness | Local-Harness |
| --- | --- | --- |
| eingebaute Agents Ask, Plan, Agent | ja | ja |
| Autopilot | ja (im Kurs aus) | nicht behandelt |
| Kontext über „Add Context“, Drag & Drop, Screenshot | ja | ja |
| `#file`, `#selection` | – | ja |
| Modellwahl im Eingabefeld | ja | ja |
| Sitzung läuft bei geschlossenem Fenster weiter | ja | nein |
| `/<skill>` eigene Skills aufrufen | ja (m05) | ja |

## Slash-Befehle

| Befehl | Wirkung | Copilot-Harness | Local-Harness |
| --- | --- | --- | --- |
| `/explain` | Code erklären | – (Ask fragen) | ja |
| `/fix` | Korrektur vorschlagen | – (Agent beauftragen) | ja |
| `/tests` | Tests erzeugen | – (Agent beauftragen) | ja |
| `/fixTestFailure` | fehlschlagenden Test reparieren | – (Agent beauftragen) | ja |
| `/new` | Projekt oder Datei anlegen | – (Agent beauftragen) | ja |
| `/clear` | neue Sitzung | – (neue Sitzung öffnen) | ja |
| `/help` | Befehle auflisten | – | ja |

## Chat-Teilnehmer und Wiederverwendung

| Funktion | Wirkung | Copilot-Harness | Local-Harness |
| --- | --- | --- | --- |
| `@vscode` | Fragen zu VS Code | – | ja |
| `@terminal` | Fragen zum Terminal | – | ja |
| `@github` | Fragen zu GitHub | – | ja |
| Prompt-Dateien `.github/prompts/*.prompt.md` | gespeicherte Prompts | – (stattdessen Skills, m05) | ja |
| Handoffs | Übergabe an anderen Agenten | – (stattdessen Subagents, m06) | ja |

## Eingebaute Agents

| Agent | Ändert Dateien | Führt Befehle aus | Einsatz |
| --- | --- | --- | --- |
| Ask | nein | nein | verstehen, nachfragen |
| Plan | nein | nein | Umsetzungsplan |
| Agent | ja | ja, nach Freigabe | umsetzen |

## Freigaben und Kontrolle

| Werkzeug | Wirkung | Kursregel |
| --- | --- | --- |
| Freigabe | Werkzeug oder Befehl erlauben / ablehnen | einmalig oder für die Sitzung; nie „immer“ für Löschen, Installieren, Pushen |
| Diff Keep / Undo | Änderung behalten / verwerfen, pro Runde, Datei oder Abschnitt | jeden Diff lesen |
| Checkpoint | Dateien auf Stand vor einer Anfrage zurücksetzen | bei verunglückter Runde |
| Autopilot | Agent erteilt Freigaben selbst | im Kurs aus |

## Rückgängig und vergleichen

| Was | Wie |
| --- | --- |
| eine Agent-Änderung verwerfen | Undo am Abschnitt, an der Datei oder für die ganze Runde |
| eine ganze Anfrage zurücknehmen | „Restore Checkpoint“ über der Anfrage im Chat |
| eigene Tippänderung zurücknehmen | Strg+Z (macOS: Cmd+Z) im Editor |
| zwei Stände vergleichen | Explorer: Datei → „Select for Compare“, zweite Datei → „Compare with Selected“ |
