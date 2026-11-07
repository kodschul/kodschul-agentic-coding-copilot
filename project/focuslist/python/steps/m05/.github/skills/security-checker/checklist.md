# Checkliste Web-Sicherheit (FocusList)

Auswahl aus den OWASP Top 10:2025 (A05 Injection, A02 Security Misconfiguration, A03 Software Supply Chain Failures, A01 Broken Access Control), zugeschnitten auf eine kleine Flask-App.

## 1. Ausgabe escapen (XSS)

- [ ] Jinja2-Autoescaping ist aktiv (Templates enden auf `.html`, kein `{% autoescape false %}`).
- [ ] Kein `|safe`, kein `Markup(...)`, kein `render_template_string` mit Nutzerdaten.
- [ ] Werte aus Formularen, URL-Parametern (`request.args`) und `data/tasks.json` werden nur über `{{ … }}` ausgegeben.
- [ ] Probe: Titel `<script>alert(1)</script>` anlegen; im HTML muss `&lt;script&gt;` stehen.

## 2. Eingaben validieren

- [ ] Titel: nach `strip()` 1–100 Zeichen, sonst Fehler (Formular: Meldung + Status 400).
- [ ] Priorität nur aus einer festen Liste (`low`, `medium`, `high`).
- [ ] Status-Filter nur aus einer festen Liste (`all`, `open`, `done`).
- [ ] IDs als `<int:…>` in der Route, unbekannte ID → 404.
- [ ] Validierung liegt im Server (`focuslist/tasks.py`), nicht nur im HTML (`required`, `maxlength`).

## 3. Secrets

- [ ] Kein `secret_key`, Passwort oder Token als Text im Code oder in Tests.
- [ ] Secrets kommen aus Umgebungsvariablen (`FOCUSLIST_SECRET`), Vorlage in `.env.example` ohne echte Werte.
- [ ] `.env` steht in `.gitignore` und ist nicht eingecheckt.

## 4. Debug-Modus und Konfiguration

- [ ] Kein `debug=True` und kein `app.run(debug=True)` im Code. Debug nur über `flask run --debug` lokal.
- [ ] Fehlerseiten zeigen keine Stacktraces, wenn die App ohne `--debug` läuft.

## 5. Pfade und Dateien

- [ ] Kein Dateipfad aus Nutzereingaben (Formular, URL, JSON).
- [ ] Statische Dateien nur über `url_for('static', ...)` und den eingebauten Static-Handler.
- [ ] `DATA_PATH` kommt aus der Konfiguration, nie aus einem Request.

## 6. Abhängigkeiten

- [ ] Nur nötige Pakete in `requirements.txt` / `pyproject.toml` und `package.json`.
- [ ] Untere Versionsgrenzen gesetzt (`flask>=3.1`), keine unbekannten Pakete.
- [ ] Empfehlung: `pip-audit` und `npm audit` regelmäßig ausführen (nur empfehlen, nicht installieren).

## 7. CSRF (Hinweis)

- [ ] Formulare mit `POST` ändern Daten. Ohne CSRF-Token kann eine fremde Seite diese Formulare im Namen eingeloggter Nutzer abschicken.
- [ ] FocusList hat kein Login, daher geringes Risiko. Sobald es Konten gibt: CSRF-Schutz (z. B. Flask-WTF `CSRFProtect`) einplanen. Als Befund `mittel`, Status `offen (bewusst)` melden.

## 8. Tests für Sicherheitsregeln

- [ ] Für jeden behobenen Befund gibt es einen Test (z. B. XSS-Probe, leerer Titel → 400, ungültige Priorität → 400).
