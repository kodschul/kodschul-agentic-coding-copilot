# FocusList – Projektregeln

FocusList ist eine CLI-Aufgabenliste in Python 3.11+ (`uv`). Daten liegen in einer JSON-Datei, es gibt keine Datenbank und kein Framework.

## Struktur

- `focuslist/models.py`: Datenklasse `Task` und erlaubte Prioritäten.
- `focuslist/storage.py`: einziger Zugriff auf die JSON-Datei (`read_tasks`, `write_tasks`).
- `focuslist/actions/<aktion>.py`: eine öffentliche Funktion pro Aktion, Dateiname in snake_case.
- `focuslist/cli.py`: verdrahtet jede Aktion als Unterbefehl (`argparse`).
- `tests/actions/test_<aktion>.py`: Tests mit `pytest`.

## Regeln

1. Aktionen werfen bei ungültiger Eingabe einen `ValueError` mit deutscher, konkreter Meldung. Sie geben nie `None` als Fehlersignal zurück.
2. Nur `storage.py` liest oder schreibt die Datei. Aktionen nutzen `read_tasks`/`write_tasks`.
3. Eingabewerte wie Prioritäten werden über `focuslist/actions/validation.py` geprüft, nicht neu implementiert.
4. Aktionen, die mehrere Tasks ändern, arbeiten alles-oder-nichts: erst alle ids prüfen, dann speichern.
5. Jede neue Aktion bekommt einen Test für den Erfolgsfall und mindestens einen Fehlerfall.
6. Type Hints an allen öffentlichen Funktionen. Keine neuen Abhängigkeiten ohne ausdrückliche Anfrage.
