# Cheatsheet Modul 2: GitHub Copilot in VS Code

Stand: 10/2026, VS Code Standardbelegung. Quellen: https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features, https://code.visualstudio.com/docs/copilot/ai-powered-suggestions, https://code.visualstudio.com/docs/agents/reference/tools-reference, https://code.visualstudio.com/docs/copilot/reference/copilot-settings. Namen und Belegungen ändern sich mit VS-Code-Versionen; abweichende Belegungen zeigt **Einstellungen → Tastenkombinationen**.

> Mit OpenAI Codex statt Copilot: [codex-cheatsheet.md](codex/codex-cheatsheet.md).

## Tastenkürzel

| Aktion | macOS | Windows / Linux |
| --- | --- | --- |
| Inline-Vorschlag annehmen | Tab | Tab |
| Nächstes Wort annehmen | Cmd+→ | Ctrl+→ |
| Vorschlag verwerfen | Esc (oder weitertippen) | Esc (oder weitertippen) |
| Alternativen durchblättern | Option+] / Option+[ | Alt+] / Alt+[ |
| Vorschlag manuell anfordern | Option+\ | Alt+\ |
| Next Edit Suggestion anspringen / annehmen | Tab, erneut Tab | Tab, erneut Tab |
| Chat-Ansicht öffnen | Ctrl+Cmd+I | Ctrl+Alt+I |
| Neuer Chat (in der Chat-Ansicht) | Cmd+N | Ctrl+N |
| Inline-Chat im Editor / Terminal | Cmd+I | Ctrl+I |
| Quick Chat | Shift+Option+Cmd+L | Ctrl+Shift+Alt+L |
| Einstellungen | Cmd+, | Ctrl+, |
| Befehlspalette | Shift+Cmd+P | Ctrl+Shift+P |

## Chat-Modi

| Modus | Wirkung | Ändert Dateien? |
| --- | --- | --- |
| Ask | erklärt, vergleicht, recherchiert im Code (nur lesend) | nein |
| Plan (auch `/plan`) | recherchiert und schreibt einen Umsetzungsplan | nein |
| Agent | ändert Dateien, führt Befehle aus, prüft das Ergebnis; Diff mit **Keep**/**Undo** | ja |
| Edit (veraltet) | durch Agent ersetzt, nur über `chat.editMode.hidden` einblendbar | ja |

## Slash-Befehle

| Befehl | Wirkung |
| --- | --- |
| `/explain` | markierten Code erklären |
| `/fix <beobachtung>` | Korrektur vorschlagen; Fehlbeobachtung als Zusatz nennen |
| `/tests <grenzfälle>` | Tests erzeugen; Grenzfälle ausdrücklich nennen |
| `/doc` | Doku-Kommentare erzeugen (Inline-Chat im Editor) |
| `/plan` | Umsetzungsplan recherchieren und vorschlagen |
| `/setupTests` | Testframework auswählen und einrichten (experimentell) |
| `/new`, `/newNotebook` | Workspace, Datei oder Notebook anlegen |
| `/clear` | neuen Chat starten, aktuellen archivieren |
| `/compact` | Chatverlauf verdichten, spart Kontext |
| `/fork` | Chat mit Verlauf abzweigen |
| `/rename <name>` | lokalen Chat umbenennen |
| `/help` | Befehle und Agents auflisten |
| `/models` | Modellauswahl öffnen |
| `/tools` | Werkzeuge für den Chat konfigurieren |
| `/init` | Workspace-Instructions erzeugen oder aktualisieren (Modul 4) |
| `/instructions`, `/skills`, `/prompts`, `/agents`, `/hooks` | jeweilige Anpassung konfigurieren (Module 4–8) |
| `/create-instructions`, `/create-skill`, `/create-prompt`, `/create-agent`, `/create-hook` | Anpassung per Agent erzeugen lassen (Module 4–8) |
| `/<name>` | eigene Skill oder Prompt-Datei per Name aufrufen (Module 5, 6) |
| `/troubleshoot`, `/debug` | Agent-Logs analysieren, Chat-Debug-Ansicht öffnen |

## `#`-Kontext und Werkzeuge

`#` im Eingabefeld zeigt alle verfügbaren Elemente der installierten Version.

| Referenz | Wirkung |
| --- | --- |
| `#<datei>` bzw. `#file:<pfad>` | Datei vollständig anhängen |
| `#<ordner>` | Ordner anhängen |
| `#<symbol>` | Code-Symbol anhängen (Datei vorher öffnen) |
| `#selection` | aktuelle Markierung anhängen |
| `#codebase` (`#search/codebase`) | relevante Stellen im Workspace suchen, nur Treffer mitschicken |
| `#search/usages` | Referenzen, Implementierungen und Definitionen eines Symbols finden |
| `#search/changes` | Änderungen der Versionskontrolle auflisten |
| `#read/problems` | Meldungen aus dem Problems-Panel |
| `#read/terminalLastCommand` | letzten Terminal-Befehl samt Ausgabe |
| `#read/terminalSelection` | Markierung im Terminal |
| `#execute/testFailure` | Informationen zu fehlgeschlagenen Tests |
| `#web/fetch` (`#fetch`) | Webseite abrufen |
| `#githubRepo` | GitHub-Repository (`owner/repo`) durchsuchen |

`@workspace` und andere `@`-Teilnehmer sind als veraltet markiert; statt `@workspace` `#codebase` nutzen.

## Next Edit Suggestions (NES)

| Was | Wie |
| --- | --- |
| Anzeige | Pfeil am Zeilenrand nach einer Änderung |
| Annehmen | Tab springt hin, zweites Tab übernimmt |
| Ein/aus | `github.copilot.nextEditSuggestions.enabled` |

## Wichtige Einstellungen

| Einstellung | Wirkung | Standard |
| --- | --- | --- |
| `github.copilot.enable` | Inline-Vorschläge je Sprache, z. B. `{ "*": true, "markdown": false }` | an, außer `plaintext`, `markdown`, `scminput` |
| `github.copilot.nextEditSuggestions.enabled` | Next Edit Suggestions | an |
| `chat.editMode.hidden` | veralteten Edit-Modus ein- oder ausblenden | ausgeblendet |
| `chat.instructionsFilesLocations` | weitere Ordner für `*.instructions.md` (Modul 4) | `.github/instructions` |

Benutzer-Einstellungen gelten für alle Projekte; Workspace-Einstellungen stehen in `.vscode/settings.json` und können ins Repo.

## Merksätze

- Kommentar mit Zweck und Randfall vor dem Cursor → gezielterer Inline-Vorschlag.
- So viel Kontext wie nötig, nicht wie möglich.
- Ask zum Verstehen, Plan zum Durchdenken, Agent zum Umsetzen.
- Jeden Befehl mit konkreter Eingabe prüfen; Grenzfälle selbst testen.
