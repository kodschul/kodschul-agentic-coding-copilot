from focuslist.store import load_tasks


def test_anlegen_speichert_aufgabe(client, app):
    response = client.post("/tasks", data={"title": "  Bericht schreiben  ", "priority": "high"})

    assert response.status_code == 302
    task = load_tasks(app.config["DATA_PATH"])[-1]
    assert task == {"id": 4, "title": "Bericht schreiben", "priority": "high", "done": False, "due": None}


def test_anlegen_zeigt_hinweis(client):
    response = client.post("/tasks", data={"title": "Bericht schreiben", "priority": "low"}, follow_redirects=True)

    assert "Aufgabe „Bericht schreiben“ angelegt." in response.get_data(as_text=True)


def test_erledigt_setzt_done(client, app):
    response = client.post("/tasks/1/complete")

    assert response.status_code == 302
    assert load_tasks(app.config["DATA_PATH"])[0]["done"] is True


def test_erledigt_unbekannte_id_liefert_404(client):
    response = client.post("/tasks/999/complete")

    assert response.status_code == 404
