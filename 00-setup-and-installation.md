# Setup und Installation

Vor Tag 1 einrichten. Jeder Schritt endet mit einem Prüfbefehl; die erwartete Ausgabe steht daneben. Gearbeitet wird in **einem** Stack: Python oder Node.js.

## Übersicht

| Werkzeug | Version | Wofür | Python-Stack | Node.js-Stack |
| --- | --- | --- | --- | --- |
| VS Code | aktuelle Version | Editor, Copilot-Chat | ja | ja |
| GitHub Copilot | aktive Lizenz (Pro, Business oder Enterprise) | Agent, Vorschläge | ja | ja |
| Node.js | 22 LTS oder neuer (OpenSpec braucht ≥ 22.12) | Tailwind-Build, Playwright-MCP, OpenSpec; im Node-Stack auch die App | ja | ja |
| OpenSpec CLI | 1.3.1 (im Kurs geprüft) | Spec-Driven Development (Modul 8) | ja | ja |
| Python | 3.12 oder neuer | die App | ja | – |

Shell: das integrierte Terminal von VS Code. macOS und Linux: bash/zsh; Windows: PowerShell (vorinstalliert). Die Befehle im Kurs laufen in beiden; die Ausnahmen stehen in der Tabelle unten. Pfade als Argumente beginnen mit `$HOME` (z. B. `$HOME/kurs/focuslist`); das funktioniert in bash, zsh und PowerShell. Unterschiede:

| | macOS/Linux | Windows (PowerShell) |
| --- | --- | --- |
| venv aktivieren | `source .venv/bin/activate` | `.venv\Scripts\Activate.ps1` |
| venv eines anderen Ordners aktivieren | `source $HOME/kurs/focuslist/.venv/bin/activate` | `& "$HOME/kurs/focuslist/.venv/Scripts/Activate.ps1"` |
| Fehler „Ausführen von Skripts ist deaktiviert“ | – | einmalig `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
| Umgebungsvariable für einen Befehl setzen | `PORT=3001 npm run dev` | `$env:PORT=3001; npm run dev` |

## 1. VS Code und Copilot

1. Installiere VS Code von <https://code.visualstudio.com/> bzw. aktualisiere es (Befehlspalette → „Check for Updates“).
2. Melde VS Code mit dem GitHub-Konto an, das die Copilot-Lizenz hat (Kontosymbol unten links).
3. Öffne die Chat-Ansicht und stelle eine Testfrage, z. B. „Was ist eine JSON-Datei?“.

**Prüfung:** Der Chat antwortet. In der Chat-Eingabe lassen sich ein Agent (Ask, Plan, Agent) und ein Modell auswählen.

Bei Firmenkonten: Organisation muss Agent-Modus, MCP-Server und Hooks (Preview) erlauben. Fehlt etwas davon, Administratoren fragen; die Übungen haben dafür Referenzstände.

## 2. Node.js

Installiere die LTS-Version von <https://nodejs.org/>.

```bash
node --version    # v22.12.0 oder höher
npm --version
npx --version
```

**Prüfung:** alle drei Befehle zeigen eine Versionsnummer.

## 3. Python (nur Python-Stack)

Installiere Python von <https://www.python.org/downloads/> (Windows: Haken bei „Add python.exe to PATH“).

```bash
python3 --version         # macOS/Linux: Python 3.12 oder höher
python --version          # Windows: Python 3.12 oder höher
python3 -m venv --help    # zeigt die Hilfe, venv ist vorhanden (Windows: python)
```

**Prüfung:** in einem **neuen** Terminal ohne aktive venv meldet `python3 --version` (macOS/Linux) bzw. `python --version` (Windows) 3.12 oder höher. Genau diesen Befehl nutzen die Hooks in Modul 7; sie laufen ohne venv.

## 3a. OpenSpec CLI

```bash
npm install -g @fission-ai/openspec@1.3.1
openspec --version        # 1.3.1
```

Ist die globale Installation gesperrt (Firmenrechner): im Kurs überall `npx -y @fission-ai/openspec@1.3.1` statt `openspec` schreiben, z. B. `npx -y @fission-ai/openspec@1.3.1 --version`.

**Prüfung:** `openspec --version` bzw. die `npx`-Variante meldet `1.3.1`. Neuere Versionen können andere Befehle und Dateinamen haben; der Kurs ist mit 1.3.1 geprüft (08.11.2026).

## 4. Kursmaterial und FocusList

1. Lade dieses Kursmaterial herunter, entpacke es und öffne einen Terminal im Ordner `output/`.
2. Erzeuge das Startgerüst im eigenen Arbeitsordner `$HOME/kurs/focuslist`; mit ihm wird ab Lab 3.2 gearbeitet:

   ```bash
   node project/focuslist/catch-up.mjs python m03 $HOME/kurs/focuslist   # oder: node … node m03 …
   ```

3. Folge dem Abschnitt „Start“ in `$HOME/kurs/focuslist/README.md` (Abhängigkeiten installieren, CSS bauen, App starten). Ausführlich in Lab 2.1.

**Prüfung:** <http://127.0.0.1:5000> (Python) bzw. <http://localhost:3000> (Node.js) zeigt drei Aufgaben mit Styling; `pytest` bzw. `npm test` meldet einen bestandenen Test.

## Netzwerk

Folgende Zugriffe müssen erlaubt sein: npm-Registry (`npm install`, `npx`), PyPI (`pip install`), Download eines Browsers durch Playwright (Modul 7). Hinter einem Firmen-Proxy die Proxy-Variablen für npm und pip setzen.

## Typische Fehler

| Symptom | Ursache | Lösung |
| --- | --- | --- |
| `python: command not found` | Python nicht im PATH oder heißt `python3` | `python3` verwenden bzw. Python mit PATH-Option neu installieren |
| `npm ERR! network` | Proxy oder Firewall | Proxy für npm konfigurieren (`npm config set proxy …`) |
| Chat zeigt nur Ask | Agent-Modus durch Richtlinie gesperrt | Organisation fragen; Übungen mit Referenzständen nachvollziehen |
| Port 5000 belegt (macOS) | AirPlay-Empfänger nutzt den Port | `flask --app focuslist run --debug --port 5001` |
