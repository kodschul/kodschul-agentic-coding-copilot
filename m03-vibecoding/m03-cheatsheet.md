# Cheatsheet Modul 3: Vibecoding

## Vibecoden ([01](01-vibecoding.md))

| Befehl / Schritt | Wirkung |
| --- | --- |
| Start kopieren | `project/focuslist/<stack>/start/` → `arbeitsordner/focuslist/` |
| `npm install` / `uv sync` | Starter installieren |
| Modus **Agent**, ein Wunsch pro neuem Chat | Feature umsetzen lassen, Diff mit **Keep**/**Undo** |
| `npm start -- add-task "Titel"` / `uv run focuslist add-task "Titel"` | Aufgabe anlegen (Befehlsname je nach eigenem Stand) |
| `npm start -- list-tasks` / `uv run focuslist list-tasks` | Aufgaben auflisten |
| `npm start -- complete-task <id>` / `uv run focuslist complete-task <id>` | Aufgabe erledigen |
| `vibe-log.md` | Wunsch \| Was die KI gemacht hat \| Warum unerwünscht |
| Referenz / Rettungsanker | Stand v0: `node project/focuslist/catch-up.mjs <stack> m04 focuslist` |

## Reviewen ([02](02-ergebnis-reviewen.md))

| Kategorie | Vorgehen |
| --- | --- |
| Stil | Fehlerbehandlung, Speicherzugriff, Rückgabetyp vergleichbarer Dateien vergleichen |
| Falsche Annahme | Defaults und Verhalten gegen den Wunsch prüfen |
| Fehlender Kontext | vorhandene Funktion ignoriert? (`complete-task` ohne `storage`) |
| Halluzination | API gegen offizielle Doku und `node --version` / `uv run python --version` |
| Fehlende Tests | `npm test` / `uv run pytest` findet nichts |
| Randfälle | `add-task` ohne Titel, `add-task "X" urgent`, `complete-task 123`, danach `echo $?` |
| Ergebnis | `v0-weaknesses.md` mit Muss/Kann und Datei:Zeile |
| Ursache | die KI kennt die Projektregeln nicht → Modul 4 |
