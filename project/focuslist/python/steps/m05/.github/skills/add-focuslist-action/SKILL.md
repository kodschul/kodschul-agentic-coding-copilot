---
name: add-focuslist-action
description: Fügt FocusList eine neue CLI-Aktion hinzu, z. B. "Priorität ändern" oder "Aufgabe umbenennen". Verwenden, wenn eine neue Aktion, ein neuer Unterbefehl oder eine neue Operation auf Tasks gebaut werden soll.
---

# Neue FocusList-Aktion hinzufügen

Folge diesen Schritten in genau dieser Reihenfolge.

1. **Datenmodell prüfen:** Braucht die Aktion ein neues Feld in `focuslist/models.py`? Wenn ja, mit Default (`= None`) ergänzen, damit bestehende Daten gültig bleiben.
2. **Aktion schreiben:** Neue Datei `focuslist/actions/<aktion>.py` nach dem Muster in [action_template.py](./action_template.py). Eingaben über `focuslist/actions/validation.py` prüfen, Fehler als `ValueError` werfen.
3. **CLI verdrahten:** In `focuslist/cli.py` einen Subparser in `_parser()` und einen Zweig in `run()` ergänzen und die Zeile in `USAGE` erweitern.
4. **Test schreiben:** `tests/actions/test_<aktion>.py` mit Erfolgsfall und Fehlerfall (unbekannte id oder ungültige Eingabe).
5. **Prüfen:** `uv run ruff check .` und `uv run pytest` ausführen. Erst fertig melden, wenn beides grün ist.

## Ergebnis

Am Ende die geänderten Dateien und den CLI-Aufruf nennen, mit dem die Aktion ausprobiert werden kann.
