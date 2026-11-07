---
applyTo: "tests/**"
---

# Regeln für Tests

- Tests mit pytest, eine Datei pro Thema: `tests/test_<thema>.py`.
- Immer die Fixtures `client` bzw. `app` aus `tests/conftest.py` nutzen. Sie arbeiten auf einer Kopie von `data/tasks.json` in `tmp_path`; die echte Datei bleibt unverändert.
- Testnamen beschreiben das Verhalten auf Deutsch: `test_loeschen_entfernt_aufgabe`, `test_unbekannte_id_liefert_404`.
- Aufbau: vorbereiten → ausführen → prüfen, mit je einer Leerzeile dazwischen.
- Pro neue Route mindestens: ein Normalfall und ein Fehlerfall (z. B. unbekannte ID → 404).
- Prüfen, was sichtbar ist: Statuscode, Redirect-Ziel, Text im HTML, JSON der API. Nicht nur `status_code == 200`.
- Gespeicherte Daten über `/api/tasks` oder `load_tasks(app.config["DATA_PATH"])` prüfen.
- Keine Netzwerkzugriffe, kein `sleep`, keine Abhängigkeit von der Reihenfolge der Tests.
- Nach dem Schreiben `pytest` ausführen; ein roter Test wird repariert, nicht gelöscht oder übersprungen.
