# Best Practices

## Grundhaltung

| Regel | Warum |
| --- | --- |
| Nichts übernehmen, was nicht verstanden und getestet ist | Verantwortlich ist, wer den Code übernimmt |
| Grenzfälle testen, nicht nur den Normalfall | KI-Code scheitert an den Rändern |
| Datum und Harness jeder Anleitung prüfen | Vieles im Netz beschreibt den Local-Harness |
| Keine Secrets in Prompts oder angehängte Dateien | Was im Chat steht, hat das Netz verlassen |

## Copilot bedienen

| Regel | Warum |
| --- | --- |
| Erst Ask oder Plan, dann Agent | Annahmen werden sichtbar, bevor sie Code werden |
| Jeden Terminal-Befehl vor der Freigabe lesen | Die teuersten Fehler passieren im Terminal |
| Jeden Diff lesen, dann Keep oder Undo | Letzte Stelle, an der Unbestelltes auffällt |
| Verunglückte Runde per Checkpoint zurücksetzen | Setzt alle Dateien der Anfrage auf einmal zurück |
| Löschende Terminal-Befehle nicht freigeben | Checkpoints holen gelöschte Dateien nicht sicher zurück |
| Autopilot erst mit Regeln, Tests und Hooks | Sonst bleiben Fehler unsichtbar |
| Nach Änderungen an Regeln: neue Chat-Sitzung | Alte Sitzungen kennen neue Dateien oft nicht |

## Bausteine

| Regel | Warum |
| --- | --- |
| Eine Projektdatei: `AGENTS.md` **oder** `copilot-instructions.md` | Zwei Dateien widersprechen sich |
| Instructions kurz und prüfbar | Jede Zeile kostet Kontext bei jeder Anfrage |
| Regeln in Instructions, Abläufe in Skills | Skills laden nur bei Bedarf |
| `description` eines Skills: konkret „was“ und „wann“ | Entscheidet, ob der Skill greift |
| Prüf-Skills und Reviewer berichten nur | Prüfen und Reparieren getrennt halten |
| Prüfrollen nur mit `read` und `search` | Grenze gilt technisch, nicht nur als Bitte |
| Team für Features, Einzelagent für Kleinigkeiten | Jeder Subagent kostet Zeit und Anfragen |
| Harte Verbote als Hook, Erklärungen als Instruction | Instructions bitten, Hooks erzwingen |
| Hooks ohne Agent testen: JSON rein, JSON raus | Fehler fallen sonst erst im Ernstfall auf |
| Nur geprüfte MCP-Server, Tokens nie im Repo | Jeder Server läuft mit den Rechten des Rechners |
| Spec nur für Features mit offenen Fragen | Für Kleinigkeiten reicht ein Prompt |
| Change freigeben, bevor Code entsteht | Missverständnisse sind dann noch billig |

## Im eigenen Projekt

| Regel | Warum |
| --- | --- |
| Mit `AGENTS.md` und einem Skill anfangen | Kostet wenig, wirkt überall |
| Weitere Bausteine erst bei konkretem Problem | Jeder Baustein will gepflegt werden |
| Wirkung messen: gleiche Aufgabe vorher/nachher | Bauchgefühl ersetzt keinen Diff |
