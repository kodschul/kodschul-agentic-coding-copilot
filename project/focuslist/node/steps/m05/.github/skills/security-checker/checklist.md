# Sicherheits-Checkliste für FocusList

Auswahl aus den OWASP Top 10:2025 (2021) für eine kleine Web-App ohne Login. Quelle: https://owasp.org/Top10/

## 1. Ausgabe escapen (XSS, OWASP A05 Injection)

- [ ] Jeder Wert aus Nutzereingaben (Titel, Query-Parameter, Formularfehler) läuft in `src/views/` durch `escapeHtml()`.
- [ ] Auch Attribute (`value="…"`) und Hinweise wie „Aufgabe … angelegt“ sind escaped.
- [ ] Kein `innerHTML` mit Nutzerdaten in Browser-Skripten.
- **Test-Eingabe:** `<script>alert(1)</script>` als Titel, `?created=<img src=x onerror=alert(1)>`

## 2. Eingaben validieren (OWASP A05, A06 Insecure Design)

- [ ] Titel: nach `trim()` 1–100 Zeichen.
- [ ] Priorität: nur `low`, `medium`, `high` (Whitelist, keine Blacklist).
- [ ] Filter `status`: nur `all`, `open`, `done`; unbekannte Werte → 400 (API) bzw. Standardwert (Seite).
- [ ] IDs aus der URL werden als Zahl gelesen; unbekannte IDs führen nicht zu Fehlern 500.
- [ ] Ungültige Eingaben werden nicht gespeichert.

## 3. Keine Secrets im Code (OWASP A04 Cryptographic Failures, A02 Security Misconfiguration)

- [ ] Keine Passwörter, Tokens, API-Keys im Code, in Tests oder in `data/`.
- [ ] Konfiguration aus Umgebungsvariablen; `.env` steht in `.gitignore`, nur `.env.example` ist eingecheckt.
- [ ] Fehlermeldungen an den Browser zeigen keine Stacktraces oder Pfade.

## 4. Pfade nicht aus Nutzereingaben (Path Traversal, OWASP A01 Broken Access Control)

- [ ] Statische Dateien: Pfad wird dekodiert, normalisiert und muss innerhalb von `static/` liegen.
- [ ] Test mit rohem Pfad (ohne Normalisierung durch den Client): `/static/../package.json`, `/static/..%2f..%2fpackage.json`.
- [ ] Kein Dateiname aus Formular oder Query wird direkt an `readFile`/`writeFile` gegeben.

## 5. Größenlimits (Denial of Service, OWASP A06)

- [ ] Request-Body hat ein Limit (FocusList: 10 KB) und wird bei Überschreitung mit 413 abgelehnt.
- [ ] Der Body wird nicht unbegrenzt im Speicher gesammelt.

## 6. Abhängigkeiten (OWASP A03 Software Supply Chain Failures)

- [ ] `package.json` hat keine Laufzeit-Abhängigkeiten (`dependencies` leer oder nicht vorhanden).
- [ ] devDependencies nur Tailwind; Versionen mit `npm outdated` prüfen, Lücken mit `npm audit`.
- [ ] Keine neuen Pakete ohne Begründung.

## 7. Formulare und CSRF (Hinweis, OWASP A01)

- [ ] Ändernde Aktionen nur per POST, nie per GET-Link.
- [ ] Hinweis im Bericht: FocusList hat keinen Login, deshalb aktuell kein CSRF-Token. Sobald es Anmeldung oder Sessions gibt, braucht jedes Formular ein CSRF-Token bzw. Cookies mit `SameSite=Lax`.

## 8. Fehlerbehandlung

- [ ] Jeder Fehler führt zu einer kontrollierten Antwort (400, 404, 413, 500), der Server stürzt nicht ab.
- [ ] Interne Fehler werden auf der Konsole geloggt, nicht an den Browser geschickt.
