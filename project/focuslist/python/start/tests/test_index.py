def test_index_zeigt_aufgaben(client):
    response = client.get("/")

    assert response.status_code == 200
    assert "Kursunterlagen lesen" in response.get_data(as_text=True)
