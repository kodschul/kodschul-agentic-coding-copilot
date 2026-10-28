# Cheatsheet Modul 7: Custom Agents

## Dateien und Orte

| Was | Wo |
| --- | --- |
| Agent im Projekt | `.github/agents/<name>.agent.md` |
| persönlicher Agent | `~/.copilot/agents/<name>.agent.md` |
| neue Agent-Datei anlegen | Command Palette: **Chat: New Custom Agent** |
| Agent auswählen | Dropdown **Agent** im Chat-Eingabefeld |

## Frontmatter

| Feld | Wirkung |
| --- | --- |
| `name` | Anzeigename, sonst Dateiname |
| `description` | was und wann; danach wählt ein Koordinator Subagenten |
| `tools` | erlaubte Tools, steuert die Rechte |
| `agents` | Koordinator: erlaubte Subagenten; braucht das Tool `agent` |
| `user-invocable: false` | nicht im Dropdown, nur als Subagent |
| `disable-model-invocation: true` | nicht als Subagent aufrufbar |

## Tool-Namen

| Name | Erlaubt |
| --- | --- |
| `read`, `search` | lesen, suchen: sicher für Erklären und Review |
| `edit` | Dateien ändern, im ganzen Workspace |
| `execute` | Terminalbefehle, z. B. `npm test` / `uv run pytest` |
| `agent` | Subagenten aufrufen |
| `<server>/*` | alle Tools eines MCP-Servers |

## FocusList-Agenten (v4)

| Agent | `tools` |
| --- | --- |
| `focuslist-code-agent` | `read`, `search`, `edit`, `execute` |
| `focuslist-test-agent` | `read`, `search`, `edit`, `execute` |
| `focuslist-review-agent` | `read`, `search` |
| `focuslist-docs-agent` | `read`, `search`, `edit` |
| `focuslist-feature-team` | `agent`, `read` + `agents: [code, test, review]` |

## Prüfen

| Befehl / Schritt | Wirkung |
| --- | --- |
| Agent um etwas außerhalb seiner Rolle bitten | zeigt, ob Tools und Verbote greifen |
| `git status`, `git diff --stat` | zeigt, welche Dateien ein Agent geändert hat |
| `git restore <pfad>` | verwirft ungewollte Änderungen |

## Faustregeln

| Regel | Grund |
| --- | --- |
| `tools` begrenzt, was ein Agent kann; der Body, was er soll | Pfadgrenzen wie "nur `tests/`" gibt es nur im Body |
| Agent nur für wiederkehrende Rollen | für einmalige Fragen reicht der Chat-Modus |
| Koordinator mit Rundenlimit | verhindert Endlosschleifen zwischen Code und Review |

_Stand: 10/2026, Quelle: [Custom agent file reference](https://code.visualstudio.com/docs/agents/reference/custom-agent-file-reference)._
