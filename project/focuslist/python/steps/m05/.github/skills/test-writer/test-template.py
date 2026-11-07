"""Vorlage für FocusList-Tests (Skill test-writer).

Datei: tests/test_<thema>.py
Fixtures: client (Flask-Testclient), app (für app.config["DATA_PATH"]) aus tests/conftest.py
Namen: test_<was>_<erwartung>, auf Deutsch, ohne Umlaute
Aufbau: vorbereiten → ausführen → prüfen (je eine Leerzeile dazwischen)
"""
from focuslist.store import load_tasks


# Normalfall: gültige Eingabe, erwartetes Ergebnis
def test_anlegen_speichert_aufgabe(client, app):
    data = {"title": "Bericht schreiben", "priority": "high"}

    response = client.post("/tasks", data=data)

    assert response.status_code == 302
    titles = [t["title"] for t in load_tasks(app.config["DATA_PATH"])]
    assert "Bericht schreiben" in titles


# Grenzfall: genau an der Grenze einer Regel
def test_titel_mit_100_zeichen_ist_erlaubt(client):
    data = {"title": "x" * 100, "priority": "low"}

    response = client.post("/tasks", data=data)

    assert response.status_code == 302


# Fehlerfall: ungültige Eingabe oder unbekannte ID
def test_unbekannte_id_liefert_404(client):
    response = client.post("/tasks/999/complete")

    assert response.status_code == 404


# JSON-API: Inhalt prüfen, nicht nur den Statuscode
def test_api_liefert_felder(client):
    response = client.get("/api/tasks")

    task = response.get_json()[0]
    assert set(task) >= {"id", "title", "priority", "done"}
