# Modul 2 mit OpenAI Codex

Variante von Modul 2 für Teilnehmende, die statt GitHub Copilot **OpenAI Codex** einsetzen. Gleiche Themen, gleiche Übungsprojekte, gleiche Aufgaben; nur das Werkzeug ist anders. Wo Codex eine Copilot-Funktion nicht hat, steht das ausdrücklich dabei.

## Zuordnung zu den Copilot-Dateien

| Copilot-Datei | Codex-Datei | Kernunterschied |
| --- | --- | --- |
| [01-inline-vorschlaege.md](../01-inline-vorschlaege.md) | [01-vorschlaege-und-edits.md](01-vorschlaege-und-edits.md) | Codex hat in VS Code keine Inline-Vorschläge (Ghost Text) und keine Next Edit Suggestions; Ersatz ist ein gezielter Auftrag im Codex-Panel plus Diff-Prüfung. |
| [02-chat-und-kontext.md](../02-chat-und-kontext.md) | [02-chat-und-kontext.md](02-chat-und-kontext.md) | Kontext per `@`-Datei, Markierung und Bild statt `#`-Referenzen; statt Ask/Plan/Agent steuern Berechtigungsstufen und `/plan`, was Codex darf. |
| [03-befehle-und-konfiguration.md](../03-befehle-und-konfiguration.md) | [03-befehle-und-konfiguration.md](03-befehle-und-konfiguration.md) | Kein `/explain`, `/fix`, `/tests`; dafür `/review`, `/diff`, `/permissions`, `codex exec` und `config.toml`. |
| [m02-cheatsheet.md](../m02-cheatsheet.md) | [codex-cheatsheet.md](codex-cheatsheet.md) | eine Seite Tabellen für CLI und IDE-Erweiterung |

Übungsprojekte bleiben dieselben: [`../../project/sample-project/`](../../project/sample-project/) (TypeScript) und [`../../project/sample-project-python/`](../../project/sample-project-python/) (Python). Die Codex-Fassung des FocusList-Endstands steht in [`../../project/focuslist/codex/`](../../project/focuslist/codex/README.md).

## Angenommene Oberflächen

- **Codex IDE-Erweiterung in VS Code** (Marketplace-ID `openai.chatgpt`, Anzeigename "Codex – OpenAI's coding agent"): Seitenleiste mit Chat, Änderungen als Diff neben dem Code.
- **Codex CLI** (`codex`): Terminal-Oberfläche (TUI) im Projektordner, plus `codex exec` für nicht-interaktive Läufe.
- Beide teilen dieselbe Konfiguration (`~/.codex/config.toml`, projektweise `.codex/config.toml`).
- ChatGPT-Desktop-App und Codex Cloud gibt es ebenfalls, sie sind nicht Teil dieses Moduls.

Stand: 10/2026, Quellen: https://learn.chatgpt.com/docs/ide, https://learn.chatgpt.com/docs/cli, https://learn.chatgpt.com/docs/config-file/config-basic, https://marketplace.visualstudio.com/items?itemName=openai.chatgpt

## Installation und Anmeldung

**IDE-Erweiterung:** In VS Code die Erweiterungsansicht öffnen, nach `openai.chatgpt` suchen und installieren. Danach das Codex-Symbol in der Seitenleiste wählen; fehlt es, in der Befehlspalette **Codex: Open Codex Sidebar** ausführen.

**CLI**, eine der Varianten:

```bash
# macOS / Linux, Standalone-Installer
curl -fsSL https://chatgpt.com/codex/install.sh | sh
# Windows (PowerShell)
powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"
# Paketmanager
npm install -g @openai/codex
brew install --cask codex
```

**Anmelden:** Im Projektordner `codex` starten und **Sign in with ChatGPT** wählen; die Anmeldung läuft im Browser. Alternativ `codex login` (Browser), `codex login --device-auth` (Gerätecode) oder ein API-Key über `codex login --with-api-key`. `codex login status` zeigt die aktive Anmeldung.

- Codex ist in den ChatGPT-Plänen Plus, Pro, Business, Edu und Enterprise enthalten; ein API-Key ist möglich, laut Doku sind dann eventuell nicht alle Funktionen verfügbar.
- Vor dem Kurs prüfen: `codex --version` bzw. die Erweiterungsversion in VS Code. Neueste CLI-Version am 29.10.2026: `rust-v0.165.0` (veröffentlicht 27.10.2026, GitHub Releases).
- Vor und nach jeder Aufgabe einen Git-Stand anlegen, damit sich Änderungen zurücknehmen lassen (Empfehlung der Doku).

Stand: 10/2026, Quellen: https://github.com/openai/codex (README), https://learn.chatgpt.com/docs/cli, https://learn.chatgpt.com/docs/ide, https://learn.chatgpt.com/docs/developer-commands?surface=cli (Abschnitt `codex login`), https://learn.chatgpt.com/docs/auth, https://learn.chatgpt.com/docs/quickstart

## Hinweis zur Doku

Die offizielle Codex-Doku lag bis 10/2026 unter `developers.openai.com/codex/...` und leitet jetzt auf `learn.chatgpt.com/docs/...` weiter. Ältere Links funktionieren meist noch über die Weiterleitung. Namen von Modi, Befehlen und Einstellungen ändern sich schnell; vor dem Kurs in der installierten Version gegenprüfen (`/` im Eingabefeld, `/status`).
