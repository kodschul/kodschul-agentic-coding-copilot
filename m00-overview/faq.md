# FAQ

**Muss vorher schon mit Copilot Instructions/Skills/Agents gearbeitet worden sein?**
Nein. Der Kurs setzt nur Alltagserfahrung mit Autocomplete/Chat voraus; alle weiterführenden Mechanismen werden ab Modul 4 aufgebaut.

**Warum wird FocusList absichtlich zuerst ungeleitet (v0) vibecodet?**
Nur so wird sichtbar, welche Schwächen ungeleitetes Prompting erzeugt (Stilinkonsistenz, falsche Annahmen, Halluzinationen). Ohne diesen Referenzpunkt lässt sich der Nutzen von Instructions, Skills und Co. in den folgenden Modulen nicht konkret zeigen.

**Ist FocusList in JavaScript/TypeScript oder Python?**
Beides liegt vollständig vor (`project/focuslist/js-ts/` und `project/focuslist/python/`); pro Durchführung arbeiten alle im selben Stack. Die Unterlagen zeigen Code und Befehle für beide Stacks, das Konzept (Aufgabenverwaltung mit JSON-Datei) ist identisch.

**Was passiert, wenn der MCP-Server in Modul 8 nicht startet?**
Der Kurs bindet einen fertigen Server ein (`@modelcontextprotocol/server-filesystem`, gestartet per `npx`), es wird kein eigener Server programmiert. Startet er nicht, sind meist Node.js < 20.19 oder ein blockierter npm-Zugriff (Proxy) die Ursache; `m08-automation-hooks-mcp/03-mcp.md` nennt einen Fallback. Die Versionsstufen bis v5 bleiben davon unberührt.

**Muss jede Übung am eigenen FocusList-Stand durchgeführt werden?**
Nein. "Selbst ausprobieren"-Abschnitte laufen am Beispielprojekt `sample-project` und sind unabhängig vom eigenen Fortschritt. Jede Übung nennt einen **Start**-Stand; wer hängt, erzeugt ihn mit `node project/focuslist/catch-up.mjs <stack> mNN focuslist` und steigt dort ein.

**Was, wenn eine Copilot-Antwort im Kurs vom Referenzstand abweicht?**
Abweichungen sind normal, da LLM-Ausgaben nicht deterministisch sind. Relevant ist, ob das Ergebnis den Checkpoint der Übung erfüllt, nicht ob es wortgleich zum Referenzstand ist.

**Werden echte/personenbezogene Projektdaten verwendet?**
Nein. FocusList arbeitet ausschließlich mit Beispieldaten ohne Personenbezug; das gilt als Praxisregel auch über den Kurs hinaus.

**Was, wenn für Modul 9 (Spec-Driven Development) im Kurs keine Zeit bleibt?**
Modul 9 liegt im Puffer am Ende von Tag 2. Beide Themendateien sind vollständig beschrieben und lassen sich mit Stand v6 (`catch-up.mjs <stack> m09 focuslist`) als Start und `steps/m09/` als Referenz selbstständig durcharbeiten.

**Ist ein bestimmtes Copilot-Abo/Modell vorausgesetzt?**
Ein GitHub-Copilot-Plan mit Agent-Modus wird vorausgesetzt. Stand 10/2026 gibt es Copilot Free (mit begrenztem Kontingent), Pro, Pro+, Business und Enterprise; bei Business/Enterprise kann die Organisation einzelne Funktionen (z. B. MCP, Hooks) per Richtlinie sperren (Quelle: https://docs.github.com/en/copilot/get-started/plans). Das konkrete Modell ist für die Übungen nicht entscheidend.

**Was, wenn ein generierter Vorschlag lizenzrechtlich unklar ist?**
Im Zweifel den Vorschlag nicht ungeprüft übernehmen; `m01-ai-coding/04-sicherheit-und-verantwortung.md` ordnet Urheberrechts- und Haftungsfragen genauer ein, ersetzt aber keine rechtliche Einzelfallprüfung.
