# Lab 8.4 – Lösung

## Aufgabe 1: `.github/mcp/focuslist-mcp-config.json`

```json
{
  "servers": {
    "focuslist-search": {
      "command": "npx",
      "args": ["-y", "@example/mcp-search-server", "--root", "."]
    }
  }
}
```

## Aufgabe 2: Verbindung bestätigen

Nach Start erscheinen die vom Server bereitgestellten Tools (z. B. `search_files`) im Chat-Tool-Angebot — sichtbar an der Tool-Liste des Clients.

## Aufgabe 3 & 4: Beispielanfrage und Verifikation

Chat-Anfrage: "Suche nach 'priority' in allen Projektdateien." Die Antwort listet echte Fundstellen (z. B. `src/models/task.ts:5`, `src/actions/set-priority.ts:3`). Eine manuelle Textsuche (`grep -rn "priority" src/`) liefert dieselben Zeilen — die MCP-Antwort ist verifiziert korrekt, nicht erfunden.
