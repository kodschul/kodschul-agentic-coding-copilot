def test_filter_open_zeigt_nur_offene(client):
    response = client.get("/?status=open")

    html = response.get_data(as_text=True)
    assert "Kursunterlagen lesen" in html
    assert "Agent-Modus testen" not in html


def test_filter_done_zeigt_nur_erledigte(client):
    response = client.get("/?status=done")

    html = response.get_data(as_text=True)
    assert "Agent-Modus testen" in html
    assert "Kursunterlagen lesen" not in html


def test_ohne_filter_zeigt_alle(client):
    response = client.get("/")

    html = response.get_data(as_text=True)
    assert "Kursunterlagen lesen" in html
    assert "Agent-Modus testen" in html
    assert "3 Aufgaben" in html


def test_filter_ohne_treffer_zeigt_hinweis(client):
    client.post("/tasks/3/delete")

    response = client.get("/?status=done")

    assert "Keine Aufgaben vorhanden." in response.get_data(as_text=True)


def test_unbekannter_filter_zeigt_alle(client):
    response = client.get("/?status=egal")

    assert response.status_code == 200
    assert "3 Aufgaben" in response.get_data(as_text=True)
