# FAQ

## Copilot

**Copilot-Harness oder Local-Harness?**

- Copilot: Standard, alle Übungen laufen hier
- Local: nur für `/explain`, `/fix`, `@terminal`, Prompt-Dateien, Handoffs
- → [Lab 2.2](../m02-copilot-essentials/l02-harnesses.md)

**Warum fehlt `/explain` im Chat?**

- Gibt es nur im Local-Harness
- Im Copilot-Harness: Frage in Ask stellen, Datei anhängen

**Wann Claude, Codex oder Cloud?**

- Claude / Codex: wenn das Team diese Werkzeuge schon nutzt
- Cloud: lange Aufgaben, Ergebnis als Pull Request

**Warum bleibt Autopilot aus?**

- Er erteilt Freigaben selbst, Fehler bleiben unsichtbar
- Erst sinnvoll mit Regeln, Tests und Hooks

## Bausteine

**`AGENTS.md` oder `copilot-instructions.md`?**

- Beide wirken gleich; nur eine pflegen
- Kursstandard `AGENTS.md`: lesen auch andere Agenten

**Prompt-Datei oder Skill?**

- Prompt-Dateien laden nur im Local-Harness
- Im Copilot-Harness übernehmen Skills ihre Rolle
- → [Lab 5.1](../m05-skills/l01-skill-basics.md)

**Instruction, Skill oder Agent?**

- Instruction: was immer gilt
- Skill: wie eine Aufgabe abläuft
- Agent: wer was darf

**Skill oder Agent greift nicht?**

- Neue Chat-Sitzung öffnen
- Skill: `name` = Ordnername, Datei `SKILL.md`, klare `description`
- Agent: `.github/agents/<name>.agent.md`

**Was kostet ein Agenten-Team?**

- Jeder Subagent ist eine eigene Modell-Sitzung
- Review-Runden begrenzen, Team nur für echte Features

## Hooks und MCP

**Hooks sind Preview – trotzdem nutzen?**

- Ja, als Sicherheitsnetz; Format kann sich noch ändern
- In Firmen muss die Organisation Hooks erlauben

**Schützt ein Guard-Hook vollständig?**

- Nein: prüft nur, was im Skript steht
- Freigaben bleiben aktiv

**Ist MCP sicher?**

- Ein MCP-Server ist Code mit den Rechten des Rechners
- Nur bekannte Server, Tokens mit minimalen Rechten

## Projekt

**`/opsx-propose` ist unbekannt?**

- Prompt-Datei, lädt nur im Local-Harness
- Im Copilot-Harness: OpenSpec-Skills in `.github/skills/`

**Übung verpasst – wie weiter?**

```bash
node project/focuslist/catch-up.mjs python mNN $HOME/kurs/focuslist-mNN   # bzw. node; mNN = Modul, z. B. m05
```

Danach Setup laut `README.md` des Stands (venv und `pip install -r requirements.txt` bei Python, `npm install`, `npm run build:css`) und im neuen Ordner weiterarbeiten. Tag 2 startet für alle mit dem Stand `m05`.

**Python oder Node.js?**

- Gleichwertig: gleiche Übungen, gleiche Stände
- Node.js wird in beiden gebraucht (Tailwind, MCP, OpenSpec)

**Port 5000 belegt (macOS)?**

- `flask --app focuslist run --debug --port 5001`
