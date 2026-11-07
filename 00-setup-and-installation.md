# Setup und Installation

Vor Tag 1 einrichten. Jeder Schritt endet mit einem Prüfbefehl; die erwartete Ausgabe steht daneben. Gearbeitet wird in **einem** Stack: Python oder Node.js.

## Übersicht

| Werkzeug | Version | Wofür | Python-Stack | Node.js-Stack |
| --- | --- | --- | --- | --- |
| VS Code | aktuelle Version | Editor, Copilot-Chat | ja | ja |
| GitHub Copilot | aktive Lizenz (Pro, Business oder Enterprise) | Agent, Vorschläge | ja | ja |
| Node.js | 22 LTS oder neuer (OpenSpec braucht ≥ 22.12) | Tailwind-Build, Playwright-MCP, OpenSpec; im Node-Stack auch die App | ja | ja |
| Python | 3.12 oder neuer | die App | ja | – |

Shell: macOS und Linux nutzen das Terminal (bash/zsh), Windows nutzt **Git Bash** (kommt mit Git für Windows und dient im Kurs nur als Shell; Git-Befehle kommen nicht vor). Alle Befehle im Kurs sind für diese Shells geschrieben.

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
python --version          # Python 3.12 oder höher (macOS/Linux ggf. python3)
python -m venv --help     # zeigt die Hilfe, venv ist vorhanden
```

## 4. Kursmaterial und FocusList

1. Lade dieses Kursmaterial herunter, entpacke es und öffne einen Terminal im Ordner `output/`.
2. Erzeuge das Startgerüst in einem eigenen Arbeitsordner:

   ```bash
   node project/focuslist/catch-up.mjs python m03 ~/kurs/focuslist   # oder: node … node m03 …
   ```

3. Folge dem Abschnitt „Start“ in `~/kurs/focuslist/README.md` (Abhängigkeiten installieren, CSS bauen, App starten). Ausführlich in Lab 2.1.

**Prüfung:** <http://127.0.0.1:5000> (Python) bzw. <http://localhost:3000> (Node.js) zeigt drei Aufgaben mit Styling; `pytest` bzw. `npm test` meldet einen bestandenen Test.

## Netzwerk

Folgende Zugriffe müssen erlaubt sein: npm-Registry (`npm install`, `npx`), PyPI (`pip install`), Download eines Browsers durch Playwright (Modul 7). Hinter einem Firmen-Proxy die Proxy-Variablen für npm und pip setzen.

## Typische Fehler

| Symptom | Ursache | Lösung |
| --- | --- | --- |
| `python: command not found` | Python nicht im PATH oder heißt `python3` | `python3` verwenden bzw. Python mit PATH-Option neu installieren |
| `npm ERR! network` | Proxy oder Firewall | Proxy für npm konfigurieren (`npm config set proxy …`) |
| Chat zeigt nur Ask | Agent-Modus durch Richtlinie gesperrt | Organisation fragen; Übungen mit Referenzständen nachvollziehen |
| Port 5000 belegt (macOS) | AirPlay-Empfänger nutzt den Port | `flask --app focuslist run --port 5001` |
