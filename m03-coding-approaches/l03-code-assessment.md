# Lab 3.3: Code-Bewertung des Prototyps

**Leitfragen:**

<details>
<summary>Was sieht man im Browser nicht, was im Code steckt?</summary>

Wie der Code aufgebaut ist, ob Eingaben geprüft und Ausgaben geschützt werden, ob es Tests gibt, ob Geheimnisse im Code stehen und welche Pakete dazugekommen sind. Der Browser zeigt nur den Normalfall.

</details>

<details>
<summary>Welcher Mangel wäre in Produktion am teuersten?</summary>

Meist eine Sicherheitslücke: Ein präparierter Link oder eine Eingabe kann fremden Code im Browser anderer Nutzer ausführen oder Dateien vom Server lesen. Danach Fehler, die Daten still verfälschen, etwa doppelt vergebene IDs.

</details>

- Bewertet wird der Referenzstand v0 (oder ein eigenes v0 aus Lab 3.2) mit einem Raster aus sechs Fragen.
- Jeder Mangel gehört zu einer von fünf Fehlerklassen.
- Ergebnis ist die Status-quo-Liste: die wichtigsten Mängel, jeder mit dem Baustein aus Lab 1.3, der ihn behebt.
- Ab hier arbeitet der Kurs agentisch: Modul 4 bis 8 arbeiten die Status-quo-Liste ab.

## Begriffe

| Begriff | Bedeutung |
| --- | --- |
| Status quo | der aktuelle Zustand, ehrlich beschrieben; Ausgangspunkt für jede Verbesserung |
| Status-quo-Liste | Liste der wichtigsten Mängel von v0, jeder mit Fehlerklasse und Baustein; steht am Ende dieses Labs und begleitet die Module 4–9 |
| Fehlerklasse | Gruppe ähnlicher Fehler mit gemeinsamer Ursache |
| Inkonsistenz | dasselbe Problem an zwei Stellen unterschiedlich gelöst |
| Falsche Annahme | der Agent rät etwas über das Projekt, das niemand gesagt hat |
| XSS (Cross-Site Scripting) | Eingabe eines Nutzers wird im Browser als HTML/JavaScript ausgeführt statt als Text angezeigt |
| Escaping | Sonderzeichen wie `<` und `>` so umwandeln, dass der Browser sie als Text zeigt |
| Validierung | Eingaben prüfen, bevor sie gespeichert werden (z. B. Titel nicht leer) |
| Path Traversal | ein Angreifer verlässt mit `../` im Pfad den erlaubten Ordner und liest fremde Dateien |

## Bewertungsraster

Sechs Fragen, jede mit einer einfachen Prüfung. Kein vollständiges Code-Review: Ziel ist ein ehrlicher Status quo in zehn Minuten.

| Frage | So prüfen | Fehlerklasse |
| --- | --- | --- |
| Läuft es? | Normalfall im Browser; dann leeren Titel absenden; `/api/tasks?status=all` aufrufen | Falsche Annahme |
| Einheitlich? | Welche Dateien hat der Agent geändert (Chat-Sitzung aus Lab 3.2)? Ist dieselbe Aufgabe (z. B. Filter) an zwei Stellen gelöst? | Inkonsistenz |
| Tests? | `pytest` bzw. `npm test`: Wie viele Tests, ist ein neuer dabei? | Fehlende Tests |
| Sicher? | Titel `<b>fett</b>` anlegen: fett oder als Text? Im Diff nach `\|safe`, `${…}` im HTML, festen Passwörtern suchen | Sicherheitslücke |
| Unnötige Pakete? | `package.json` bzw. `requirements.txt` mit dem Startgerüst vergleichen; wollte der Agent etwas installieren? | Überflüssige Abhängigkeit |
| Wartbar? | Findet ein neues Teammitglied die Logik an einer Stelle? Gibt es genau einen Startbefehl? | Inkonsistenz, Falsche Annahme |

Was der Agent geändert hat, zeigt die Chat-Sitzung aus Lab 3.2: Die Antwort nennt die geänderten Dateien, die Ansicht „Changes“ zeigt jede Änderung als Diff.

![VS Code, Agent-Sitzung: links die Antwort des Agenten, in der Mitte „Session Changes“ mit dem Diff von index.html (neue Zeilen grün), rechts der Reiter „Changes“ mit der Liste der geänderten Dateien](https://code.visualstudio.com/assets/docs/agents/agents-quickstart/review-changes-panel.png)
_Quelle: VS Code Docs, „Agents quickstart“ (https://code.visualstudio.com/docs/agents/quickstart), Microsoft, CC BY 3.0 US, abgerufen am 07.11.2026._

Ohne die Sitzung: Startgerüst per `node project/focuslist/catch-up.mjs <python|node> m03 $HOME/kurs/focuslist-m03` holen und eine Datei mit ihrem Gegenstück vergleichen. Im Explorer: Rechtsklick auf die Datei im Startgerüst → **Select for Compare**, dann Rechtsklick auf dieselbe Datei im eigenen Projekt → **Compare with Selected**.

## Fünf Fehlerklassen

| Fehlerklasse | Woran erkennbar | Prüffrage |
| --- | --- | --- |
| Inkonsistenz | gleiche Aufgabe, zwei Lösungen; gemischte Stile; Logik mal hier, mal dort | „Wo steht das noch einmal, und warum anders?“ |
| Falsche Annahme | Verhalten, das niemand bestellt hat; Grenzfälle falsch | „Wer hat das so festgelegt?“ |
| Fehlende Tests | neue Routen ohne Test; nur der alte Beispieltest läuft | „Welcher Test schlägt fehl, wenn das kaputtgeht?“ |
| Sicherheitslücke | ungeprüfte Eingaben, ungeschützte Ausgabe, Secrets im Code, Pfade aus der URL | „Was passiert mit böswilliger Eingabe?“ |
| Überflüssige Abhängigkeit | neues Paket für etwas, das die Plattform schon kann | „Kann die Plattform das schon?“ |

Ein Beispiel aus dem Referenzstand v0 (Python, `focuslist/store.py`), Klasse „Falsche Annahme“: Die neue ID zählt die Liste. Sobald eine Aufgabe gelöscht wird, entstehen doppelte IDs.

```python
task = {"id": len(tasks) + 1, "title": title, "priority": priority, "done": False}
```

## Vom Mangel zum Baustein

Die Bausteine aus der Landkarte von Lab 1.3, angewendet auf den Status quo:

| Mangel aus dem Status quo | Baustein | Modul |
| --- | --- | --- |
| Agent kennt Stack, Struktur und Regeln nicht | Instructions | m04 |
| Wiederkehrende Aufgabe (Tests, Sicherheitsprüfung) wird jedes Mal anders erledigt | Skill | m05 |
| Ein Chat macht alles, niemand prüft unabhängig | Custom Agent | m06 |
| Agent tut Riskantes oder vergisst die Tests | Hook | m07 |
| Agent sieht die laufende App nicht | MCP | m07 |
| Unklar, was genau gebaut werden soll | Spec | m08 |

Faustregel: Was mit einem Satz erklärbar ist → Instructions. Was eine Checkliste braucht → Skill. Was nie passieren darf → Hook.

## Typische Fehler

| Symptom | Ursache | Lösung |
| --- | --- | --- |
| Chat-Sitzung aus Lab 3.2 ist geschlossen | neue Sitzung geöffnet | Startgerüst nach `$HOME/kurs/focuslist-m03` holen (`catch-up.mjs … m03`) und Dateien per „Compare with Selected“ vergleichen |
| Bewertung bleibt bei „sieht gut aus“ | nur im Browser geprüft | jede Rasterfrage mit ihrer Prüfung beantworten, auch Tests und Diff |
| Eigenes v0 startet nicht | One-Shot-Ergebnis unvollständig | „läuft nicht“ ist der erste Befund; restliche Fragen am Referenzstand v0 beantworten |

## Mängel im Referenzstand v0

Das Raster angewendet auf den Referenzstand v0 (`steps/m03/`), mit Fehlerklasse und Baustein:

**Python**

| Fund | Stelle | Fehlerklasse | Baustein (Modul) |
| --- | --- | --- | --- |
| `\|safe` im Hinweis: `Aufgabe „{{ request.args.get('created')\|safe }}“ angelegt.` – ein Link mit `?created=<script>…` führt Code aus | `templates/index.html` | Sicherheitslücke (ungeschützte Ausgabe) | Regel in Instructions für Templates (m04), Fix per Skill `security-checker` (m05) |
| `app.secret_key = "dev"` fest im Code | `__init__.py` | Sicherheitslücke (Secret im Code) | Skill `security-checker` (m05) |
| `app.run(debug=True)` in neuer Datei `run.py`, obwohl `flask --app focuslist run --debug` existiert: zweiter, fest verdrahteter Startweg mit Debug-Modus, der auch in Produktion an wäre (Debug nie in Produktion) | `run.py` | Sicherheitslücke, Inkonsistenz | Instructions: ein Startbefehl (m04); `security-checker` (m05) |
| leerer Titel, beliebige Priorität werden gespeichert | `__init__.py` | Sicherheitslücke (ungeprüfte Eingabe) | `security-checker` (m05) |
| `len(tasks) + 1` als ID | `store.py` | Falsche Annahme | Instructions (m04) |
| Anlegen im Store, Erledigen direkt in der Route | `__init__.py`, `store.py` | Inkonsistenz | Instructions: eine Schicht (m04) |
| Filter zweimal, unterschiedlich | `__init__.py` | Inkonsistenz | Instructions (m04) |
| Farben als Dictionary in Python, deutsche Namen im Template | `__init__.py`, `templates/index.html` | Inkonsistenz | Instructions für Templates (m04) |
| `/api/tasks?status=all` liefert nur offene Aufgaben (Folge des doppelten Filters) | `__init__.py` | Falsche Annahme | Instructions: eine Filterfunktion (m04) |
| unbekannte ID beim Erledigen: still Redirect statt 404 | `__init__.py` | Falsche Annahme | Instructions (m04) |
| Fußzeile zählt nur gefilterte Aufgaben | `templates/index.html` | Falsche Annahme | Spec (m08) |
| feste Breiten `w-96`, `w-40`, auf Handybreite zu breit | `templates/index.html` | Falsche Annahme | MCP Playwright (m07) |
| keine Tests für neue Routen | `tests/` | Fehlende Tests | Instructions (m04), Skill `test-writer` (m05), Hook (m07) |

![FocusList v0 nach Aufruf eines präparierten Links mit ?created=: Ein roter Balken „XSS: Dieses Skript kam über die URL und läuft im Browser“ liegt über der Seite, im grünen Hinweis „Aufgabe … angelegt.“ steht statt eines Titels ein eingeschleustes HTML-Element](../assets/images/m03/v0-xss-alert.png)
_Quelle: eigener Screenshot, FocusList v0, 07.11.2026._

Der erste Fund aus der Tabelle im Browser: Das Skript aus dem URL-Parameter `?created=` läuft tatsächlich; den roten Balken hat es selbst eingefügt.

**Node.js**

| Fund | Stelle | Fehlerklasse | Baustein (Modul) |
| --- | --- | --- | --- |
| Titel ohne Escaping im HTML: `<span …>${task.title}</span>` und `Aufgabe „${created}“ angelegt.` | `src/views/index.js` | Sicherheitslücke (ungeschützte Ausgabe, XSS) | Regel in Instructions für Templates (m04, Lab 4.2), Fix per Skill `security-checker` (m05) |
| `path.join(ROOT, "static", req.url.replace("/static/", ""))` ohne Prüfung: `../` verlässt `static/` | `src/app.js` | Sicherheitslücke (Path Traversal) | `security-checker` (m05) |
| `req.on("data", (chunk) => { body += chunk; })` ohne Größenlimit | `src/app.js` | Sicherheitslücke (Speicher volllaufen lassen) | `security-checker` (m05) |
| leerer Titel, beliebige Priorität werden gespeichert | `src/app.js` | Sicherheitslücke (ungeprüfte Eingabe) | `security-checker` (m05) |
| `tasks.length + 1` als ID | `src/store.js` | Falsche Annahme | Instructions (m04) |
| Callbacks in `addTask()`, sonst `async/await` | `src/store.js` | Inkonsistenz | Instructions (m04) |
| alle Routen als `if`-Kette in `app.js`, Erledigen-Logik in der Route | `src/app.js` | Inkonsistenz | Instructions (m04) |
| Filter zweimal (`==` und `===`) | `src/app.js` | Inkonsistenz | Instructions (m04) |
| feste Breiten `w-96`, `w-32` | `src/views/index.js` | Falsche Annahme | MCP Playwright (m07) |
| keine Tests für neue Routen | `test/` | Fehlende Tests | Instructions (m04), `test-writer` (m05), Hook (m07) |

Überflüssige Abhängigkeit: Im Referenzlauf kam kein Paket dazu (`package.json` und `requirements.txt` unverändert). In anderen Läufen schlägt der Agent im Node.js-Stack vor, Express zu installieren, „damit das Routing einfacher wird“; das Projekt kommt bewusst ohne Laufzeit-Pakete aus. Baustein: Instructions mit Verbot (m04), Guard-Hook (m07).

## Status-quo-Liste

Die Befunde beider Stacks, zusammengefasst und nach Kosten in Produktion sortiert. Diese Liste arbeiten die Module 4 bis 8 ab:

| # | Mangel | Fehlerklasse | Baustein | Modul |
| --- | --- | --- | --- | --- |
| 1 | Titel ungeschützt im HTML (XSS) | Sicherheitslücke | Regel in Instructions für Templates, Fix per Skill `security-checker` | m04 (Regel, Lab 4.2), m05 (Fix) |
| 2 | Eingaben ungeprüft: leerer Titel, beliebige Priorität | Sicherheitslücke | Skill `security-checker` | m05 |
| 3 | Secret und fest verdrahteter Debug-Modus im Code (Python); Path Traversal, Body ohne Limit (Node.js) | Sicherheitslücke | Skill `security-checker` | m05 |
| 4 | neue ID = Anzahl + 1, doppelte IDs nach dem Löschen | Falsche Annahme | Instructions | m04 |
| 5 | Logik verstreut, Filter doppelt (Python: `?status=all` liefert nur offene), Stile gemischt, zweiter Startweg | Inkonsistenz | Instructions | m04 |
| 6 | keine neuen Tests, niemand prüft unabhängig | Fehlende Tests | Skill `test-writer`, Custom Agents, Check-Hook | m05, m06, m07 |
| 7 | feste Breiten, Formular bricht auf Handybreite; Agent hat die Seite nie gesehen | Falsche Annahme | MCP (Playwright) | m07 |
| 8 | Fußzeile zählt nur gefilterte Aufgaben (Python-Referenz): fachlich ungeklärt, was sie zählen soll | Falsche Annahme | Spec | m08 |

## Ab jetzt agentisch

Die Status-quo-Liste ist der Fahrplan für den Rest des Kurses. Jedes Modul fügt einen Baustein ins Repo ein und hakt Zeilen ab:

| Modul | Baustein im Repo | Behebt (Status-quo-Liste) | Stand |
| --- | --- | --- | --- |
| m04 | Instructions: `AGENTS.md`, `*.instructions.md` | Zeilen 4, 5; Regel für Zeile 1 | v1 |
| m05 | Skills `test-writer`, `security-checker` | Zeilen 1, 2, 3, Teil von 6 | v2 |
| m06 | Custom Agents `reviewer`, `tester`, `feature-lead` | Teil von 6 | v3 |
| m07 | Hooks und Playwright-MCP | Teil von 6, Zeile 7 | v4 |
| m08 | Spec mit OpenSpec | Weg für Zeile 8 (am Beispiel Fälligkeitsdatum; die Fußzeile ist der nächste Change) | v5 |

Ab Modul 4 wird der Diff gelesen, Tests laufen, und der Mensch nimmt ab: der agentische Weg aus Lab 3.1.

## Fazit

- Im Browser lief v0, die Mängel stecken in Struktur, Annahmen, Tests und Sicherheit.
- Fünf Fehlerklassen ordnen jeden Befund; jede hat einen passenden Baustein.
- Die Status-quo-Liste ist der Ausgangspunkt des agentischen Wegs.
