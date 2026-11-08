# Beispiel-Hook `audit`: jeden Werkzeugaufruf mitschreiben

Erster Hook zum Ausprobieren aus Lab 7.1. Er läuft im Copilot-Harness vor jedem Werkzeugaufruf (`preToolUse`), schreibt nur den Namen des Werkzeugs in `.github/hooks/tool-use.log` und blockiert nichts.

| Datei | Inhalt |
| --- | --- |
| `.github/hooks/audit.json` | Hook-Datei: bei `preToolUse` startet `node .github/hooks/log-tool-use.cjs`, Zeitlimit 10 Sekunden |
| `.github/hooks/log-tool-use.cjs` | liest das Ereignis als JSON von stdin, hängt `toolName` an `tool-use.log` an, antwortet mit `{}` |

Voraussetzung: Node.js (in beiden Stacks installiert).

## Kopieren

Kopiere den Ordner `.github` dieses Beispiels in die Wurzel des Arbeitsordners (Tag 2: `$HOME/kurs/focuslist-m05`; Terminal im Ordner `output/`):

```bash
cp -r m07-hooks-mcp/samples/audit/.github $HOME/kurs/focuslist-m05/
```

Danach liegen beide Dateien in `$HOME/kurs/focuslist-m05/.github/hooks/` (nach einem Catch-up, z. B. `$HOME/kurs/focuslist-m07`, entsprechend dort). Eine Einstellung ist im Copilot-Harness nicht nötig.

## Prüfen, ob es funktioniert

1. Prüfe in der Chat-Ansicht unter „Open Customizations“ → „Hooks“ oder mit `/hooks`, ob `audit.json` erscheint.
2. Wähle das Session-Ziel „Copilot“, starte eine neue Sitzung und sende eine harmlose Aufgabe, z. B. „Zeige die Dateien im Ordner data“.
3. Öffne `.github/hooks/tool-use.log`: Pro Werkzeugaufruf steht dort eine Zeile wie `"view"` oder `"bash"`.

Ohne Agent testen (im Projektordner):

```bash
echo '{"toolName":"view","toolArgs":{"path":"data/tasks.json"}}' | node .github/hooks/log-tool-use.cjs
# Ausgabe: {}   und in .github/hooks/tool-use.log steht "view"
```

`{}` trifft keine Entscheidung: Der Aufruf wird nicht automatisch erlaubt, die normale Freigabe-Abfrage bleibt. `tool-use.log` lässt sich jederzeit löschen.

Hooks sind Preview (Stand: 11/2026); die Organisation kann einschränken, welche Hooks laufen dürfen.

## Quelle und Lizenz

Offizielles Beispiel „Create your first Copilot hook“ aus [Hooks (VS Code Docs)](https://code.visualstudio.com/docs/agent-customization/hooks), abgerufen am 08.11.2026. © Microsoft, [CC BY 3.0 US](https://creativecommons.org/licenses/by/3.0/us/). Änderungen: Code formatiert und deutsche Kommentare ergänzt.
