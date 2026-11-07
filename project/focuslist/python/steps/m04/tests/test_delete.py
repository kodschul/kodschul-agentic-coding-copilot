from focuslist.store import load_tasks


def test_loeschen_entfernt_aufgabe(client, app):
    response = client.post("/tasks/2/delete")

    assert response.status_code == 302
    ids = [t["id"] for t in load_tasks(app.config["DATA_PATH"])]
    assert ids == [1, 3]


def test_loeschen_zeigt_hinweis(client):
    response = client.post("/tasks/2/delete", follow_redirects=True)

    html = response.get_data(as_text=True)
    assert "Aufgabe gelöscht." in html
    assert "Tailwind ausprobieren" not in html


def test_loeschen_unbekannte_id_liefert_404(client):
    response = client.post("/tasks/999/delete")

    assert response.status_code == 404


def test_neue_id_nach_loeschen_ist_eindeutig(client, app):
    client.post("/tasks/2/delete")

    client.post("/tasks", data={"title": "Neu", "priority": "low"})

    ids = [t["id"] for t in load_tasks(app.config["DATA_PATH"])]
    assert ids == [1, 3, 4]
