# Sicherheitsbericht FocusList (Node.js), Stand v1

Erstellt mit dem Skill `security-checker` (`/security-checker`) auf FocusList v1, danach Funde einzeln behoben. Zeilenangaben beziehen sich auf v1.

| Befund | Datei | Schwere | Status |
| --- | --- | --- | --- |
| Stored XSS: Titel wird ungeschützt ins HTML eingesetzt; `title=<script>alert(1)</script>` läuft bei jedem Aufruf der Liste | `src/views/index.js:31` | hoch | behoben: `escapeHtml()` (`test/security.test.js` „Titel mit <script> …“) |
| Reflected XSS: Hinweis „Aufgabe … angelegt“ übernimmt `?created=` roh; `/?created=<img src=x onerror=alert(1)>` | `src/views/index.js:45` | hoch | behoben: `escapeHtml()` (Test „Hinweis aus ?created= …“) |
| Path Traversal: `path.join(staticDir, req.url…)` ohne Prüfung; roher Request `GET /static/../data/tasks.json` liefert die Datendatei, `GET /static/../package.json` die Projektdatei | `src/static.js:8`, `src/app.js:47` | hoch | behoben: `safePath()` prüft, dass der Pfad in `static/` liegt (Test „Pfade außerhalb von static/ …“) |
| Fehlende Validierung: leerer Titel, beliebig lange Titel und beliebige Priorität (`priority=urgent`) werden gespeichert | `src/app.js:29`, `src/tasks.js:21` | mittel | behoben: `validateTask()`, Antwort 400 mit Formularfehler (Tests „leerer Titel …“, „100 Zeichen …“, „unbekannte Priorität …“) |
| Kein Body-Limit: `readBody()` sammelt beliebig große Requests im Speicher, ein großer POST kann den Server lahmlegen | `src/http.js:5` | mittel | behoben: Limit 10 KB, Antwort 413 (Test „Body über 10 KB …“) |
| Unbekannter Filter in der API (`/api/tasks?status=kaputt`) liefert stillschweigend alle Aufgaben | `src/app.js:43` | niedrig | behoben: 400 mit Fehlermeldung (`test/api.test.js`) |

**Geprüft ohne Befund:** Secrets (keine im Code, `.env` in `.gitignore`), Abhängigkeiten (keine Laufzeit-Abhängigkeiten, nur Tailwind als devDependency), ändernde Aktionen nur per POST, Fehlermeldungen ohne Stacktrace.

**Hinweis CSRF:** FocusList hat keinen Login, daher derzeit kein CSRF-Token nötig. Bei Einführung von Anmeldung oder Sessions für alle Formulare nachrüsten.

**Empfehlung (umgesetzt in dieser Reihenfolge):** XSS → Path Traversal → Validierung → Body-Limit → API-Filter.
