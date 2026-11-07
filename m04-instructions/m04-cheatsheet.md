# Cheatsheet Modul 4: Instructions

Stand: 11/2026. Quellen: [Custom instructions](https://code.visualstudio.com/docs/agent-customization/custom-instructions), [Migrate customizations](https://code.visualstudio.com/docs/agent-customization/migrate-customizations)

## Dateien

| Datei | Ort | Gilt für | Frontmatter | Gelesen von |
| --- | --- | --- | --- | --- |
| `AGENTS.md` | Projektwurzel | jede Anfrage | nein | Copilot, Codex |
| `.github/copilot-instructions.md` | `.github/` | jede Anfrage | nein | Copilot |
| `.github/instructions/<name>.instructions.md` | `.github/instructions/` | Dateien, die `applyTo` trifft | ja, `applyTo` | Copilot |
| `CLAUDE.md` | Projektwurzel | jede Anfrage | nein | Claude Code, Claude-Harness |

Kursstandard: `AGENTS.md` + zwei Scoped-Dateien. Eine Projektdatei pflegen, nicht zwei.

## Gerüst AGENTS.md (max. 40 Zeilen)

| Abschnitt | Inhalt | Beispiel FocusList |
| --- | --- | --- |
| Kopf | ein Satz: was, welcher Stack | „Flask 3 + Jinja2, Tailwind CSS v4, Daten in `data/tasks.json`, Tests mit pytest.“ |
| Ordner | je Ordner/Datei eine Zeile | `focuslist/tasks.py` – Fachlogik |
| Befehle | Start, Tests, CSS | `pytest` bzw. `npm test` |
| Konventionen | Regeln, die der Code nicht (richtig) zeigt | „Neue ID immer `max(id) + 1`“ |
| Verbote | klare Grenzen | „Keine neuen Abhängigkeiten ohne Rückfrage.“ |

## Hinein / nicht hinein

| Hinein | Nicht hinein |
| --- | --- |
| Stack mit Versionen | Einführung in das Framework |
| Ordner mit Aufgabe | vollständiger Dateibaum |
| Start-, Test-, CSS-Befehl | Installationsanleitung |
| Konventionen, Testpflicht | Selbstverständliches |
| Verbote | Secrets, Passwörter, interne URLs |

## Vage → prüfbar

| Vage | Prüfbar |
| --- | --- |
| „Sauberer Code“ | „Route → `tasks.py` → `store.py`, keine Dateizugriffe in Routen“ |
| „Achte auf Tests“ | „Jede neue Route: Normalfall und Fehlerfall, vor Übergabe `pytest`“ |
| „Vorsicht mit Paketen“ | „Keine Laufzeit-Pakete (kein Express)“ |

Test: Lässt sich an den Änderungen mit Ja oder Nein entscheiden, ob die Regel eingehalten wurde?

## Scoped Instructions

```markdown
---
applyTo: "tests/**"
---

# Regeln für Tests

- …
```

| `applyTo` | Gilt für |
| --- | --- |
| `"tests/**"` / `"test/**"` | Tests Python / Node.js |
| `"focuslist/templates/**"` | Jinja2-Templates |
| `"src/views/**"` | Node.js-Views |
| `"**/*.py"` | alle Python-Dateien |
| `"**/*.test.js"` | alle Node.js-Testdateien |
| `"src/**/*.js,test/**/*.js"` | mehrere Muster |
| `"**"` | alles → besser in `AGENTS.md` |

| Ebene | Inhalt FocusList |
| --- | --- |
| `AGENTS.md` | Stack, Ordner, Befehle, Schichten, IDs, Testpflicht, Verbote |
| `tests.instructions.md` | Framework, Dateinamen, Fixtures/Testhelfer, Kopie der Daten, deutsche Testnamen, Normal- und Fehlerfall |
| `templates.instructions.md` | Layout, Escaping, nur Tailwind-Klassen, Badge-Farben, deutsche Texte, `aria-label` |

## Prüfen, ob Regeln geladen sind

| Weg | Aussagekraft |
| --- | --- |
| Referenzen unter der Antwort aufklappen | zeigt, welche Dateien mitgingen |
| Ask: „Welche Projektregeln gelten hier? Nenne die Datei.“ | mittel (Agent kann die Datei erst dann lesen) |
| Plan: Auftrag gegen ein Verbot | am besten (Verhalten) |

## Vorher-Nachher-Vergleich

| Schritt | Befehl / Handlung |
| --- | --- |
| zwei gleiche Stände | `node project/focuslist/catch-up.mjs <python\|node> m04 ~/kurs/vergleich/ohne` und `…/mit` |
| Regeln nur in `mit/` | `cp ~/kurs/focuslist/AGENTS.md ~/kurs/vergleich/mit/`, `cp -r ~/kurs/focuslist/.github ~/kurs/vergleich/mit/` |
| getrennte Fenster | je Ordner ein VS-Code-Fenster, neue Sitzung, gleiches Modell |
| gleicher Prompt | „Füge einen Button "Löschen" hinzu, der eine Aufgabe entfernt.“ |
| vergleichen | Ordner `~/kurs/vergleich` öffnen, Datei in `ohne/` → „Select for Compare“, gleiche Datei in `mit/` → „Compare with Selected“ |
| messen | Checkliste: Service-Schicht, `max(id) + 1`, unbekannte ID, Tests, keine Pakete, Stil |
| nächster Stand | `node project/focuslist/catch-up.mjs <python\|node> m05 <ordner>` = v1 |

## Typische Fehler

| Symptom | Lösung |
| --- | --- |
| `AGENTS.md` nicht in den Referenzen | Projektordner selbst öffnen, Datei in die Wurzel |
| neue Regel wirkt nicht | neue Chat-Sitzung |
| Scoped-Regeln greifen nie | `applyTo` relativ zur Wurzel, Endung `.instructions.md`, `---` in Zeile 1 |
| Widersprüche | jede Regel nur an einer Stelle |

## Was Instructions nicht leisten

| Grenze | Baustein | Modul |
| --- | --- | --- |
| bestehenden Code prüfen (z. B. `\|safe`, Path Traversal) | Skill `security-checker` | m05 |
| wiederkehrende Abläufe mit Vorlage (Tests schreiben) | Skill `test-writer` | m05 |
| unabhängig prüfen | Custom Agent | m06 |
| erzwingen statt bitten | Hook | m07 |
