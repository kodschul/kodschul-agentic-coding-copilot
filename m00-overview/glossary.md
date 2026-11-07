# Glossar

| Begriff | Bedeutung | Lab |
| --- | --- | --- |
| Agent | LLM, das in einer Schleife Werkzeuge nutzt | 1.1 |
| Agent Host | VS-Code-Prozess, der Copilot, Claude und Codex ausführt | 2.2 |
| Agenten-Loop | planen → Werkzeug nutzen → prüfen → wiederholen | 1.1 |
| Agenten-Team | mehrere Custom Agents mit getrennten Rollen | 6.3 |
| Agentic Coding | KI-Agent erledigt Entwicklungsaufgaben im Loop, gelenkt durch das Repo | 1.1, 3.1 |
| `AGENTS.md` | Projektregeln für alle Agenten, bei jeder Anfrage geladen | 4.1 |
| `agentStop` | Hook-Event, wenn der Agent fertig ist | 7.2 |
| Akzeptanzkriterium | prüfbare Bedingung, wann ein Feature fertig ist | 8.1 |
| `applyTo` | Dateimuster, für das Scoped Instructions gelten | 4.2 |
| Ask / Plan / Agent | eingebaute Agents: antworten / planen / handeln | 2.4 |
| Autopilot | Modus, der Freigaben selbst erteilt; im Kurs aus | 2.5 |
| Change (OpenSpec) | Ordner mit Proposal, Design, Tasks und Spec-Delta | 8.2 |
| Checkpoint | Stand im Chat, auf den Dateiänderungen zurückgehen | 2.5 |
| `CLAUDE.md` | Projektregeln für Claude Code | 4.1 |
| Cloud | Ausführungsziel: Agent arbeitet auf GitHub, liefert PR | 2.2 |
| Copilot-Harness | Standard-Harness in VS Code seit Okt 2026 | 2.2 |
| Custom Agent | eigene Rolle mit Auftrag und erlaubten Werkzeugen | 6.1 |
| Diff | Gegenüberstellung alt/neu einer Änderung | 2.5 |
| Escaping | Sonderzeichen unschädlich machen, bevor sie ins HTML gehen | 5.3 |
| Fehlerklasse | Art eines Problems im KI-Code | 3.3 |
| Freigabe | Bestätigung, bevor der Agent ein Werkzeug nutzt | 2.5 |
| Frontmatter | YAML-Kopf zwischen `---` am Dateianfang | 5.1 |
| Grenzfall | Eingabe am Rand des Erlaubten, z. B. 100 Zeichen | 5.2 |
| Halluzination | plausibel klingende, aber erfundene Aussage oder API | 1.1 |
| Harness | Laufzeit um das Modell: Werkzeuge, Dateien, Ort | 2.2 |
| Hook | eigenes Skript an festen Punkten des Agenten | 7.1 |
| Instructions | Regeln, die der Agent immer mitbekommt | 4.1 |
| Kontext | alles, was das Modell zu einer Anfrage sieht | 2.4 |
| Kontextfenster | begrenzte Menge Text, die ein Modell auf einmal verarbeitet | 1.1 |
| LLM | Sprachmodell, das das nächste Token vorhersagt | 1.1 |
| Local-Harness | bisheriger VS-Code-Harness; hat `/explain`, `@`, Prompt-Dateien | 2.2 |
| MCP | offener Standard, um Agenten Werkzeuge zu geben | 7.3 |
| MCP-Server | Programm, das einem Agenten Tools bereitstellt | 7.3 |
| Next Edit Suggestion | Vorschlag für die nächste passende Änderung | 2.3 |
| One-Shot-Prompt | ein Prompt, der das ganze Ergebnis auf einmal beschreibt | 3.2 |
| OpenSpec | Werkzeug für Spec-Driven Development | 8.1 |
| OWASP Top 10 | Liste der häufigsten Sicherheitsrisiken von Web-Apps | 5.3 |
| Path Traversal | Zugriff auf fremde Dateien über `../` im Pfad | 5.3 |
| `permissionDecision` | Antwort eines Guard-Hooks: `deny` blockiert | 7.1 |
| Playwright MCP | MCP-Server, mit dem der Agent einen Browser bedient | 7.4 |
| `preToolUse` | Hook-Event vor jedem Werkzeugaufruf | 7.1 |
| Prompt-Datei | gespeicherter Prompt `.prompt.md`; nur Local-Harness | 2.2 |
| Scoped Instructions | Regeln nur für bestimmte Dateien (`*.instructions.md`) | 4.2 |
| Secret | Passwort, Token oder Schlüssel | 1.4 |
| Session-Ziel | Auswahl, in welchem Harness eine Sitzung läuft | 2.2 |
| Skill | Ordner mit `SKILL.md`, lädt nur bei Bedarf | 5.1 |
| Slash-Befehl | Kurzbefehl mit `/`; im Copilot-Harness ruft `/` Skills auf | 2.2 |
| Spec | vereinbarte Beschreibung von Verhalten vor dem Code | 8.1 |
| Status-quo-Liste | Mängel von v0 mit Fehlerklasse und Baustein | 3.3 |
| Subagent | Agent, den ein anderer Agent für eine Teilaufgabe startet | 6.1 |
| Szenario | Beispiel in der Spec: WHEN … THEN … | 8.1 |
| Tailwind CSS | CSS über kleine Klassen direkt im HTML | 2.1 |
| Token | Textstück, mit dem ein LLM rechnet | 1.1 |
| `tools` | Feld eines Custom Agents: erlaubte Werkzeuge | 6.1 |
| v0 … v5 | Versionen von FocusList, eine pro Baustein | 3.2 |
| Validierung | Eingaben im Server prüfen | 5.3 |
| Vibecoding | Software nur per Prompt bauen, ohne den Code zu lesen | 3.1 |
| XSS | eingeschleustes JavaScript, das im Browser anderer läuft | 5.3 |
