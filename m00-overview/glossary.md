# Glossar

| Begriff / Abkürzung | Bereich | Verwendet wenn | Primär genutzt von | Thema |
| --- | --- | --- | --- | --- |
| `#codebase` | Copilot Chat | relevante Stellen im ganzen Workspace gesucht und als Kontext mitgeschickt werden | Teilnehmer:innen | m02/02-chat-und-kontext |
| `#file` | Copilot Chat | der Inhalt einer bestimmten Datei explizit referenziert wird | Teilnehmer:innen | m02/02-chat-und-kontext |
| `#selection` | Copilot Chat | nur der aktuell markierte Codeabschnitt referenziert wird | Teilnehmer:innen | m02/02-chat-und-kontext |
| `*.prompt.md` | Copilot | eine gespeicherte, wiederverwendbare Prompt-Vorlage mit Frontmatter genutzt wird | Teilnehmer:innen | m06/01-prompt-dateien |
| `add-focuslist-action` | Skill | eine neue FocusList-Aktion konsistent zur bestehenden Struktur ergänzt wird | Teilnehmer:innen | m05/02-skill-schreiben |
| Agent-Hook | Automatisierung | ein Skript automatisch bei einem Ereignis im Agent-Ablauf läuft (z. B. Stop-Hook nach jeder Agent-Runde), konfiguriert in `.github/hooks/*.json` | Teilnehmer:innen | m08/02-agent-hooks |
| Agent-Modus | Copilot Chat | Copilot Dateien ändern, Befehle ausführen und das Ergebnis prüfen soll; Änderungen erscheinen als Diff | Teilnehmer:innen | m02/02-chat-und-kontext |
| Agentisches Spektrum | Konzept | eingeordnet wird, wie autonom eine AI-Interaktion abläuft (Autocomplete → Chat → geführt → autonom) | Teilnehmer:innen, Trainer | m01/02-ki-beim-programmieren |
| `applyTo`-Pattern | Copilot/Instructions | eine `*.instructions.md`-Datei per Glob auf bestimmte Dateipfade begrenzt wird | Teilnehmer:innen | m04/02-instructions-dateien |
| Blockierender Hook | Automatisierung | ein Stop-Hook das Beenden der Agent-Runde verhindert, bis z. B. Tests grün sind | Teilnehmer:innen | m08/02-agent-hooks |
| Changelog-Eintrag | Doku | eine versionierte Notiz zu einer konkreten Änderung erzeugt wird | Teilnehmer:innen | m06/03-doku-mit-ki |
| Chat-Modus (Ask, Plan, Agent) | Copilot Chat | festgelegt wird, ob der Chat nur antwortet (Ask), plant (Plan) oder Dateien ändert (Agent) | Teilnehmer:innen | m02/02-chat-und-kontext, m07/01-agent-modi |
| Context Window / Kontextfenster | LLM | die begrenzte Tokenmenge gemeint ist, die ein Modell gleichzeitig berücksichtigen kann | Teilnehmer:innen | m01/01-llm-grundlagen, m10/02-best-practices-und-ausblick |
| `copilot-instructions.md` | Copilot | repoweite Regeln automatisch in jede Chat-Anfrage aufgenommen werden sollen | Teilnehmer:innen | m04/01-copilot-instructions, m04/03-regeln-anwenden |
| Custom Agent (`*.agent.md`) | Copilot | ein eigener Systemprompt mit eingeschränkten Werkzeugen für eine feste Rolle gebraucht wird | Teilnehmer:innen | m07/01-agent-modi, m07/02-eigener-agent |
| Doku-Prompt | Copilot/Prompts | README/Changelog/Docstrings aus dem aktuellen Codestand abgeleitet werden | Teilnehmer:innen | m06/03-doku-mit-ki |
| Explizite Regel | Instructions | eine Konvention konkret genug formuliert werden muss, um in einem Diff überprüfbar zu sein | Teilnehmer:innen | m04/03-regeln-anwenden |
| Falsche Annahme | Qualität/Review | eine unbegründete fachliche Entscheidung des Modells erkannt wird | Teilnehmer:innen | m03/02-ergebnis-reviewen |
| `focuslist-test-agent` | Custom Agent | ein projektspezifischer Agent auf Test-Dateien in `tests/` eingeschränkt wird | Teilnehmer:innen | m07/02-eigener-agent |
| Ghost Text (Inline-Vervollständigung) | Copilot | ein grau angezeigter Vorschlag direkt im Editor erscheint | Teilnehmer:innen | m02/01-inline-vorschlaege |
| Halluzination | LLM/Qualität | ein plausibel aussehender, aber faktisch falscher Vorschlag entsteht | Teilnehmer:innen, Trainer | m01/01-llm-grundlagen, m03/02-ergebnis-reviewen |
| Kontext | LLM | alles für die Anfrage Sichtbare gemeint ist (aktive Datei, Markierung, referenzierte Dateien) | Teilnehmer:innen, Trainer | m01/01-llm-grundlagen, m02/02-chat-und-kontext |
| LLM (Large Language Model) | Grundlagen | ein Modell, das Text inkl. Code tokenweise vorhersagt, erklärt wird | Teilnehmer:innen | m01/01-llm-grundlagen |
| MCP-Client | Automatisierung | die Anwendung gemeint ist, die sich mit einem MCP-Server verbindet (hier VS Code) | Teilnehmer:innen | m08/03-mcp |
| MCP-Konfiguration (`.vscode/mcp.json`) | Automatisierung | einem Client mitgeteilt wird, wie ein MCP-Server gestartet wird (Schlüssel `servers`) | Teilnehmer:innen | m08/03-mcp |
| MCP-Server (Model Context Protocol) | Automatisierung | ein Prozess Tools/Ressourcen über das Protokoll bereitstellt | Teilnehmer:innen | m08/03-mcp |
| Next Edit Suggestions (NES) | Copilot | Copilot nach einer Änderung die nächste passende Änderung an anderer Stelle vorschlägt | Teilnehmer:innen | m02/01-inline-vorschlaege |
| OpenSpec | Spec-Driven Dev | Specs in `openspec/specs/`, Änderungen in `openspec/changes/<name>/` und erledigte Änderungen in `openspec/changes/archive/YYYY-MM-DD-<name>/` verwaltet werden | Teilnehmer:innen | m09/02-openspec-workflow |
| Ownership | Verantwortung | die Verantwortung für Korrektheit, Wartbarkeit, Sicherheit eines Codebestandteils gemeint ist | Teilnehmer:innen, Trainer | m01/04-sicherheit-und-verantwortung |
| Problem Matcher | VS Code | Task-Ausgabe automatisch Fehlern/Warnungen im Editor zugeordnet wird | Teilnehmer:innen | m08/01-vscode-tasks |
| Prompt-Bibliothek | Copilot/Prompts | mehrere klar abgegrenzte `*.prompt.md`-Dateien gesammelt werden | Teilnehmer:innen | m06/02-prompt-bibliothek |
| RAG (Retrieval-Augmented Generation) | LLM | passende Ausschnitte gesucht und der Anfrage als Kontext beigefügt werden | Teilnehmer:innen | m01/01-llm-grundlagen |
| Review-Prompt | Copilot/Prompts | bestehender Code gegen definierte Konventionen geprüft wird, ohne ihn zu ändern | Teilnehmer:innen | m06/02-prompt-bibliothek |
| Risikoarten | Qualität | funktionale Fehler, veraltete/unsichere Muster, Lizenzfragen, übersehene Edge Cases unterschieden werden | Teilnehmer:innen | m01/04-sicherheit-und-verantwortung |
| `SKILL.md` | Copilot | ein wiederverwendbarer, mehrstufiger Ablauf für eine wiederkehrende Aufgabenart definiert wird | Teilnehmer:innen | m05/01-was-ist-ein-skill, m05/02-skill-schreiben |
| Schritt (`steps/mNN/`) | Projektstruktur | nur die Dateien gemeint sind, die Modul NN an FocusList hinzufügt oder ändert; `catch-up.mjs` setzt `start/` und die Schritte zu einem Stand zusammen | Teilnehmer:innen | m00/overview |
| Slash-Befehl (`/explain`, `/fix`, `/tests`) | Copilot Chat | ein vordefinierter Auftrag auf markierten Code angewendet wird | Teilnehmer:innen | m02/03-befehle-und-konfiguration |
| Spec-Driven Development | Methodik | eine Spezifikation vor der Implementierung geschrieben und geprüft wird | Teilnehmer:innen | m09/01-spec-driven-prinzip |
| Stilinkonsistenz | Qualität/Review | unterschiedliche Schreibweisen/Strukturen für vergleichbare Fälle auftreten | Teilnehmer:innen | m03/02-ergebnis-reviewen |
| Strukturiertes Feedback | Kursformat | Rückmeldung sich auf konkrete Module/Übungen statt den Kurs pauschal bezieht | Teilnehmer:innen, Trainer | m10 (Folie Q&A/Feedback) |
| Stand vX | Projektstruktur | ein vollständiger FocusList-Stand der Versionskette gemeint ist, z. B. v1 = Start von Modul 5; erzeugt mit `node project/focuslist/catch-up.mjs <stack> mNN <ziel>` | Teilnehmer:innen | m00/overview |
| Subagent | Copilot | ein Agent von einem anderen Agenten für eine Teilaufgabe aufgerufen wird | Teilnehmer:innen | m07/01-agent-modi |
| Task (VS Code) | VS Code | eine in `.vscode/tasks.json` definierte, wiederverwendbare Befehlskette ausgeführt wird | Teilnehmer:innen | m08/01-vscode-tasks |
| Token | LLM | die kleinste Verarbeitungseinheit eines Modells gemeint ist (oft ein Wortteil); Limits und Kosten werden in Tokens gemessen | Teilnehmer:innen | m01/01-llm-grundlagen |
| Token-Ökonomie | LLM | bewusst mit Kontextgröße umgegangen wird, um Präzision und Kosten auszubalancieren | Teilnehmer:innen | m10/02-best-practices-und-ausblick |
| Ungeleitetes Prompting / Vibecoding | Methodik | Wünsche ohne Regeldateien oder Vorlagen an den Agenten gegeben und das Ergebnis direkt übernommen wird | Teilnehmer:innen | m03/01-vibecoding |
| Versionskette (v0-v7) | Projektstruktur | der gesamte FocusList-Entwicklungsverlauf über alle Module referenziert wird; jeder Stand lässt sich aus `project/focuslist/<stack>/start/` und `steps/mNN/` mit `catch-up.mjs` erzeugen | Teilnehmer:innen, Trainer | m01/02-ki-beim-programmieren, m10/01-rueckblick |
| Vibe-Log (`vibe-log.md`) | Methodik | beim Vibecoden festgehalten wird, was die KI gemacht hat, das nicht gewünscht war | Teilnehmer:innen | m03/01-vibecoding |
