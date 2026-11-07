# Sicherheitsbericht FocusList

Geprüft: `focuslist/`, `tests/`, `run.py`, `pyproject.toml`, `requirements.txt`, `package.json`, `.gitignore` (Stand v1) · Checkliste: `.github/skills/security-checker/checklist.md` · Erstellt mit `/security-checker`, Status nach der Reparatur ergänzt.

| Befund | Datei | Schwere | Status |
| --- | --- | --- | --- |
| Reflected XSS: `?created=` aus der URL wird mit `\|safe` ins HTML geschrieben. Ein Link wie `/?created=<script>…</script>` führt fremdes JavaScript aus. | `focuslist/templates/index.html:14` | hoch | behoben: Hinweis per `flash()`, kein `\|safe` mehr (`test_titel_wird_escaped`) |
| Secret im Code: `app.secret_key = "dev"`. Mit bekanntem Schlüssel lassen sich Session-Cookies fälschen. | `focuslist/__init__.py:13` | hoch | behoben: `FOCUSLIST_SECRET` aus der Umgebung, `.env.example` (`test_secret_kommt_aus_umgebung`) |
| Debug-Modus im Code: `app.run(debug=True)`. Der Werkzeug-Debugger erlaubt Codeausführung im Browser, sobald der Server erreichbar ist. | `run.py:6` | hoch | behoben: `run.py` entfernt, Start nur mit `flask --app focuslist run --debug` (`test_debug_ist_standardmaessig_aus`) |
| Keine Validierung des Titels: leere, nur aus Leerzeichen bestehende und beliebig lange Titel werden gespeichert. | `focuslist/routes.py:22` | mittel | behoben: `tasks.validate()`, 1–100 Zeichen, Status 400 (`test_ungueltiger_titel_liefert_400`) |
| Keine Whitelist für die Priorität: beliebige Werte landen in `data/tasks.json`. | `focuslist/routes.py:23` | mittel | behoben: nur `low`/`medium`/`high` (`test_ungueltige_prioritaet_liefert_400`) |
| Status-Filter der API ungeprüft: unbekannte Werte liefern stillschweigend alle Aufgaben. | `focuslist/routes.py:46` | niedrig | behoben: 400 mit Fehlermeldung (`test_api_unbekannter_status_liefert_400`) |
| Kein CSRF-Schutz für die POST-Formulare (anlegen, erledigen, löschen). | `focuslist/templates/index.html` | mittel | offen (bewusst): kein Login in FocusList; bei Konten Flask-WTF `CSRFProtect` einplanen |
| Abhängigkeiten nicht geprüft, nur untere Versionsgrenzen. | `requirements.txt`, `package.json` | niedrig | offen: `pip-audit` und `npm audit` regelmäßig ausführen |

**Ohne Befund:** Autoescaping aktiv (Templates `.html`), IDs per `<int:task_id>`, unbekannte IDs → 404, keine Pfade aus Nutzereingaben (`DATA_PATH` nur aus der Konfiguration), statische Dateien über den eingebauten Handler, `.env` in `.gitignore`.

**Empfehlung zur Reihenfolge:** Zuerst die drei hohen Befunde (XSS, Secret, Debug), weil sie ohne Vorwissen ausnutzbar sind. Danach die Validierung, weil fehlerhafte Daten sonst dauerhaft in `data/tasks.json` liegen. CSRF erst, wenn FocusList Konten bekommt.
