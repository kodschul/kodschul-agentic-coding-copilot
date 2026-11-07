from focuslist.store import save_tasks


def test_api_liefert_alle_aufgaben(client):
    response = client.get("/api/tasks")

    assert response.status_code == 200
    tasks = response.get_json()
    assert [t["title"] for t in tasks] == ["Kursunterlagen lesen", "Tailwind ausprobieren", "Agent-Modus testen"]
    assert set(tasks[0]) >= {"id", "title", "priority", "done", "due"}


def test_api_status_all_liefert_alle(client):
    response = client.get("/api/tasks?status=all")

    assert len(response.get_json()) == 3


def test_api_filter_open(client):
    response = client.get("/api/tasks?status=open")

    tasks = response.get_json()
    assert [t["id"] for t in tasks] == [1, 2]
    assert all(t["done"] is False for t in tasks)


def test_api_filter_done(client):
    response = client.get("/api/tasks?status=done")

    assert [t["id"] for t in response.get_json()] == [3]


def test_api_leere_liste(client, app):
    save_tasks(app.config["DATA_PATH"], [])

    response = client.get("/api/tasks")

    assert response.status_code == 200
    assert response.get_json() == []


def test_api_zeigt_neue_aufgabe(client):
    client.post("/tasks", data={"title": "Neu", "priority": "high"})

    response = client.get("/api/tasks?status=open")

    assert {"id": 4, "title": "Neu", "priority": "high", "done": False, "due": None} in response.get_json()


def test_api_unbekannter_status_liefert_400(client):
    response = client.get("/api/tasks?status=egal")

    assert response.status_code == 400
    assert "error" in response.get_json()
