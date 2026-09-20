# Lab 3.2 – Lösung

## Aufgabe 1: Stil-Abweichungen (Beispiele)

- `add-task.ts` nutzt einen Default-Parameter (`priority: Priority = "medium"`), `complete-task.ts` nutzt eine explizite `find`-Prüfung mit Rückgabe eines `boolean` statt eines geworfenen Fehlers — zwei unterschiedliche Muster für "etwas könnte fehlen".
- Keine Datei nutzt bislang eine gemeinsame Fehlerklasse oder ein einheitliches Rückgabeformat.

## Aufgabe 2: Default-Entscheidungen vs. Konzeptdokument

`focuslist-concept.md` legt `priority`-Default nicht explizit fest — Copilot hat `"medium"` als Default frei gewählt. Das ist keine Halluzination, aber eine unbegründete Annahme, die in `copilot-instructions.md` (Modul 4) explizit festgeschrieben werden sollte, damit sie nicht künftig wieder anders ausfällt.

## Aufgabe 3: API-Verifikation

`crypto.randomUUID()` ist ab Node.js 14.17 (mit `--experimental-global-webcrypto` je nach Version) bzw. global ab Node 19+ verfügbar — für ältere Node-Versionen im Starter-Repo muss das explizit geprüft werden, sonst ein potenzieller Laufzeitfehler.

## Aufgabe 4: Priorisierte Liste (`v0-weaknesses.md`)

```markdown
# v0 – Gefundene Schwächen

## Muss (vor v1 klären)

1. Einheitliches Fehlerbehandlungsmuster (Exception vs. boolean) über alle Aktionen.
2. Node-Versions-Kompatibilität von `crypto.randomUUID()` prüfen/fixieren.

## Kann (spätere Iteration)

3. Default-Priorität explizit in `copilot-instructions.md` festschreiben statt implizit zu lassen.
```
