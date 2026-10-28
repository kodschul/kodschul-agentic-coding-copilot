---
name: add-focuslist-action
description: Fügt FocusList eine neue CLI-Aktion hinzu, z. B. "Priorität ändern" oder "Aufgabe umbenennen". Verwenden, wenn eine neue Aktion, ein neuer Unterbefehl oder eine neue Operation auf Tasks gebaut werden soll.
---

# Neue FocusList-Aktion hinzufügen

Folge diesen Schritten in genau dieser Reihenfolge.

1. **Datenmodell prüfen:** Braucht die Aktion ein neues Feld in `src/models/task.ts`? Wenn ja, optional (`?`) ergänzen, damit bestehende Daten gültig bleiben.
2. **Aktion schreiben:** Neue Datei `src/actions/<aktion>.ts` nach dem Muster in [action-template.ts](./action-template.ts). Eingaben über `src/actions/validation.ts` prüfen, Fehler als `Error` werfen.
3. **CLI verdrahten:** In `src/cli.ts` einen `case` für den Unterbefehl ergänzen und die Zeile in `USAGE` erweitern.
4. **Test schreiben:** `tests/actions/<aktion>.test.ts` mit Erfolgsfall und Fehlerfall (unbekannte id oder ungültige Eingabe).
5. **Prüfen:** `npm run lint` und `npm test` ausführen. Erst fertig melden, wenn beides grün ist.

## Ergebnis

Am Ende die geänderten Dateien und den CLI-Aufruf nennen, mit dem die Aktion ausprobiert werden kann.
