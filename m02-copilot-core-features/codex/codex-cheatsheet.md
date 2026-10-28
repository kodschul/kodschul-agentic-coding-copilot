# Cheatsheet Modul 2: OpenAI Codex (CLI und VS Code)

Stand: 10/2026. Quellen je Tabelle; Basis: https://learn.chatgpt.com/docs/developer-commands (Reiter CLI und IDE), https://learn.chatgpt.com/docs/developer-settings, https://learn.chatgpt.com/docs/agent-approvals-security. Namen ändern sich schnell; `/` im Eingabefeld und `/status` zeigen den Stand der installierten Version. Copilot-Fassung: [m02-cheatsheet.md](../m02-cheatsheet.md).

## Installieren und anmelden

| Aufgabe | Befehl / Weg |
| --- | --- |
| CLI macOS/Linux | `curl -fsSL https://chatgpt.com/codex/install.sh \| sh` |
| CLI Windows | `powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 \| iex"` |
| CLI per Paketmanager | `npm install -g @openai/codex` oder `brew install --cask codex` |
| IDE-Erweiterung | VS Code Marketplace, ID `openai.chatgpt` |
| Anmelden | `codex` → **Sign in with ChatGPT**; oder `codex login`, `--device-auth`, `--with-api-key` |
| Anmeldung prüfen / abmelden | `codex login status` / `codex logout` bzw. `/logout` |
| Diagnose / Update | `codex doctor` / `codex update` |

Quellen: https://github.com/openai/codex (README), https://learn.chatgpt.com/docs/cli, https://marketplace.visualstudio.com/items?itemName=openai.chatgpt, https://learn.chatgpt.com/docs/developer-commands?surface=cli

## Starten

| Aufruf | Wirkung |
| --- | --- |
| `codex` | interaktive Terminal-Oberfläche im aktuellen Ordner |
| `codex "<auftrag>"` | mit erstem Auftrag starten |
| `codex -i bild.png "<auftrag>"` | mit Bild starten |
| `codex resume` / `codex fork` | gespeicherten Chat fortsetzen / abzweigen |
| `codex exec "<auftrag>"` | nicht-interaktiv (Skripte, CI) |
| `codex review` | nicht-interaktives Review |
| VS Code: Codex-Symbol bzw. **Codex: Open Codex Sidebar** | Seitenleiste öffnen |

Quelle: https://learn.chatgpt.com/docs/developer-commands?surface=cli, https://learn.chatgpt.com/docs/ide

## Tastenkürzel

| Aktion | CLI | VS Code |
| --- | --- | --- |
| Datei per Pfad einfügen | `@` | `@` |
| Verlauf früherer Eingaben | ↑ / ↓; Ctrl+R sucht | nicht dokumentiert |
| Lauf steuern (neue Anweisung in den laufenden Schritt) | Enter während Codex arbeitet | Cmd/Ctrl+Shift+Enter (bei Standard `chatgpt.followUpQueueMode = queue`) |
| Nachricht für den nächsten Schritt einreihen | Tab während Codex arbeitet | Senden während eines Laufs (Standard `queue`) |
| Letzte Antwort kopieren | Ctrl+O oder `/copy` | nicht dokumentiert |
| Shell-Befehl direkt ausführen | Zeile mit `!` beginnen | nicht dokumentiert |
| Letzte Nachricht bearbeiten, Chat ab dort abzweigen | Esc zweimal bei leerem Eingabefeld | nicht dokumentiert |
| Langen Prompt im Editor schreiben | Ctrl+G (`VISUAL`/`EDITOR`) | – |
| Terminal leeren (Chat bleibt) | Ctrl+L | – |
| Beenden | Ctrl+C, `/exit`, `/quit` | – |
| Neuer Chat | `/new` | Cmd+N / Ctrl+N (`chatgpt.newChat`) |
| Bild anhängen | einfügen oder Datei ins Terminal ziehen | mit Shift ins Eingabefeld ziehen oder einfügen |
| Kürzel anpassen | `/keymap` (`tui.keymap`) | **Tastenkombinationen**, Suche "Codex" |

Kein vorbelegtes VS-Code-Kürzel für Sidebar, **Add to Codex Thread** oder Befehlsmenü. Quellen: https://learn.chatgpt.com/docs/developer-commands?surface=cli (Interactive shortcuts), https://learn.chatgpt.com/docs/developer-commands?surface=ide, https://learn.chatgpt.com/docs/developer-settings?surface=ide, https://learn.chatgpt.com/docs/cli-customization, https://learn.chatgpt.com/docs/image-inputs

## Slash-Befehle

| Befehl | Wirkung | IDE |
| --- | --- | --- |
| `/review` | Befunde zu Änderungen, ändert nichts | ja |
| `/diff` | Git-Diff inkl. unversionierter Dateien | – |
| `/plan [auftrag]` | Plan-Modus | ja |
| `/init` | `AGENTS.md`-Gerüst anlegen | ja |
| `/permissions` | Berechtigungsstufe wählen | Auswahl unter dem Eingabefeld |
| `/model`, `/fast` | Modell, Fast-Stufe | ja (`/reasoning` für Reasoning-Stufe) |
| `/status` | Konfiguration und Verbrauch der Sitzung | ja |
| `/compact` | Verlauf zusammenfassen | ja |
| `/mention <pfad>` | Datei anhängen | – (`@`, **Add to Codex Thread**) |
| `/ide` | IDE-Kontext in den nächsten Auftrag | `/ide-context` schaltet automatischen Kontext |
| `/new`, `/clear`, `/resume`, `/fork`, `/rename` | Chats verwalten | nur `/fork` |
| `/side` | kurzer Nebenchat | ja |
| `/goal` | dauerhaftes Ziel setzen | ja |
| `/mcp` | MCP-Server und Werkzeuge (Modul 8) | ja |
| `/skills` | Skill wählen (Modul 5) | – |
| `/hooks` | Hooks prüfen und freigeben (Modul 8) | – |
| `/agents`, `/subagents` | Agenten und Subagent-Threads (Modul 7) | – |
| `/approve` | eine abgelehnte automatische Prüfung einmal wiederholen | ja |
| `/debug-config` | Konfigurationsebenen in Rangfolge | – |
| `/export`, `/copy` | Verlauf als Markdown, letzte Antwort kopieren | – |
| `/feedback` | Logs an die Entwickler senden | ja |
| `/local`, `/cloud`, `/worktree` | lokal, in der Cloud oder im Git-Worktree arbeiten | ja (`/worktree` auch CLI) |

Kein `/explain`, `/fix`, `/tests`, `/doc`: diese Aufträge frei formulieren. Quellen: https://learn.chatgpt.com/docs/developer-commands?surface=cli, https://learn.chatgpt.com/docs/developer-commands?surface=ide

## Kontext

| Weg | Wirkung |
| --- | --- |
| offene Dateien (IDE) | automatisch dabei |
| **Add to Codex Thread** / `chatgpt.addFileToThread` | Markierung / ganze Datei anhängen |
| `@<pfad>` | Pfad aus dem Workspace einfügen |
| Bild, `-i` | visueller Kontext |
| `AGENTS.md` | automatisch gelesene Projektregeln (Modul 4) |

Quellen: https://learn.chatgpt.com/docs/prompting, https://learn.chatgpt.com/docs/agent-configuration/agents-md

## Berechtigungsstufen

| Stufe | `sandbox_mode` / `approval_policy` | Flags |
| --- | --- | --- |
| Read Only | `read-only` / `on-request` | `--sandbox read-only --ask-for-approval on-request` |
| Auto (CLI) / Ask for approval (IDE) | `workspace-write` / `on-request` | ohne Flags oder `--sandbox workspace-write -a on-request` |
| Approve for me | wie Auto, `approvals_reviewer = "auto_review"` | `--approve-for-me` |
| Full access | keine Sandbox, keine Freigaben | `--yolo` (`--dangerously-bypass-approvals-and-sandbox`) |
| CI read-only | `read-only` / `never` | `--sandbox read-only -a never` |

`approval_policy = "untrusted"` wird nicht mehr unterstützt. Quellen: https://learn.chatgpt.com/docs/agent-approvals-security, https://learn.chatgpt.com/docs/permission-modes

## Wichtige Konfigurationsschlüssel

| Schlüssel | Werte | Ort |
| --- | --- | --- |
| `model` | z. B. `"gpt-6.1-sol"` (verfügbar laut `/model`) | `config.toml` |
| `model_reasoning_effort` | z. B. `"medium"` | `config.toml` |
| `approval_policy` | `on-request`, `never`, `{ granular = { … } }` | `config.toml` |
| `sandbox_mode` | `read-only`, `workspace-write`, `danger-full-access` | `config.toml` |
| `sandbox_workspace_write.network_access` | `true`/`false` (Standard aus) | `config.toml` |
| `web_search` | `cached` (Standard), `indexed`, `live`, `disabled` | `config.toml` |
| `review_model` | Modell für `/review` | `config.toml` |
| `projects."<pfad>".trust_level` | `"trusted"`, `"untrusted"` | `~/.codex/config.toml` |
| `chatgpt.commentCodeLensEnabled`, `chatgpt.reviewDelivery`, `chatgpt.composerEnterBehavior` | siehe VS Code | VS-Code-Einstellungen |

Rangfolge: Flags/`-c` > `.codex/config.toml` (nur vertrauenswürdig) > `--profile` > `~/.codex/config.toml` > Cloud-verwaltete Vorgaben > System (`/etc/codex/config.toml`) > Standard. Quellen: https://learn.chatgpt.com/docs/config-file/config-basic, https://learn.chatgpt.com/docs/config-file/config-reference, https://learn.chatgpt.com/docs/developer-settings?surface=ide

## `codex exec`-Flags

| Flag | Wirkung |
| --- | --- |
| `--sandbox`, `-s` | `read-only` (Standard), `workspace-write`, `danger-full-access` |
| `--approve-for-me` | automatische Freigabeprüfung mit `workspace-write` |
| `--json` | JSONL-Ereignisse nach stdout |
| `--output-last-message`, `-o <datei>` | letzte Antwort in Datei |
| `--output-schema <datei>` | Antwortform per JSON Schema |
| `--model`, `-m` / `-c key=value` | Modell / beliebiger Konfigurationswert |
| `--cd`, `-C <pfad>` | Arbeitsordner |
| `--image`, `-i` | Bilder anhängen |
| `--ephemeral` | Sitzung nicht speichern |
| `--skip-git-repo-check` | auch außerhalb eines Git-Repositorys |
| `resume [ID]` / `resume --last` | exec-Sitzung fortsetzen |

`--full-auto` entfällt. Quellen: https://learn.chatgpt.com/docs/non-interactive-mode, https://learn.chatgpt.com/docs/developer-commands?surface=cli

## Was Codex gegenüber Copilot fehlt (Modul 2)

Inline-Vorschläge, Alternativen-Blättern, Next Edit Suggestions, `/explain`/`/fix`/`/tests`, `#codebase`-Suche als eigene Referenz, Kontext-Chips zum Abwählen (nicht dokumentiert). Merksatz: Auftrag mit Umfang und Randfall, Diff prüfen, konkrete Eingabe testen.
