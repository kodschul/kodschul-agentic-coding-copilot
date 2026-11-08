# Cheatsheet Modul 9: Abschluss

Stand: 11/2026. Alle Dateien und Befehle stammen aus Modul 4–8; Details im jeweiligen Lab.

## Welcher Baustein wann

| Problem | Baustein | Datei | Aufruf / Prüfung | Lab |
| --- | --- | --- | --- | --- |
| Agent kennt Stack, Befehle, Regeln nicht | Instruction | `AGENTS.md`, `.github/instructions/*.instructions.md` | wirkt in jeder Anfrage; neuer Chat nennt die Testbefehle richtig | 4.1, 4.2 |
| wiederkehrende Aufgabe wird jedes Mal anders erledigt | Skill | `.github/skills/<name>/SKILL.md` | `/<name>` oder automatisch über die `description` | 5.1–5.3 |
| eine Rolle braucht eigene Rechte oder einen frischen Blick | Custom Agent | `.github/agents/<name>.agent.md` | Agent im Chat auswählen; Subagent über Tool `agent` in `tools` | 6.1–6.3 |
| etwas muss immer passieren oder darf nie passieren | Hook | `.github/hooks/*.json` | „Open Customizations“ → „Hooks“ oder `/hooks` | 7.1, 7.2 |
| Agent braucht ein Werkzeug außerhalb des Editors | MCP | `.mcp.json` | „MCP: List Servers“ → Server starten | 7.3, 7.4 |
| unklar, was genau gebaut werden soll | Spec | `openspec/` | OpenSpec-Skills (`/openspec-…`, Namen per `ls .github/skills`): propose, prüfen, apply; `openspec archive <name> -y` | 8.1, 8.2 |

Im Zweifel von oben nach unten: Instructions kosten am wenigsten, Hooks, MCP und Specs lohnen sich bei einem konkreten Problem.

## Einstieg im eigenen Projekt

| Reihenfolge | Artefakt | Fertig, wenn |
| --- | --- | --- |
| 1 | `AGENTS.md` (≤ 40 Zeilen): Stack, Ordner, Befehle, Konventionen, Verbote | Agent nennt im neuen Chat Start- und Testbefehl richtig |
| 2 | ein Skill für den häufigsten Ablauf | Skill greift ohne `/`-Aufruf, wenn die Aufgabe passt |
| 3 | ein Hook für eine harte Grenze (z. B. `.env` sperren) | gesperrter Zugriff wird abgelehnt |
| 4 | messen: gleiche Aufgabe vorher und nachher | weniger Korrekturen im Diff |

## Gleiche Idee, andere Werkzeuge

| Baustein | Copilot | Claude Code | Codex |
| --- | --- | --- | --- |
| Projektregeln | `AGENTS.md`, `.github/copilot-instructions.md` | `CLAUDE.md` | `AGENTS.md` |
| Skills | `.github/skills/` | `.claude/skills/` | `.agents/skills/` |

## Endstand

| Was | Befehl |
| --- | --- |
| FocusList v5 herstellen | `node project/focuslist/catch-up.mjs <python\|node> final $HOME/kurs/focuslist-final` |
| danach | Setup laut `README.md` des Stands (venv und `pip install -r requirements.txt` bei Python, `npm install`, `npm run build:css`) |
