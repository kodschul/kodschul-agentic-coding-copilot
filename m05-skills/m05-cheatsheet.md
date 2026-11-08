# Cheatsheet Modul 5: Skills

Stand: 11/2026. Quellen: [Agent skills](https://code.visualstudio.com/docs/agent-customization/agent-skills), [Migrate customizations](https://code.visualstudio.com/docs/agent-customization/migrate-customizations), [agentskills.io](https://agentskills.io), [OWASP Top 10](https://owasp.org/Top10/)

## Instructions oder Skill?

| | Instructions | Skill |
| --- | --- | --- |
| Frage | Was muss der Agent immer wissen? | Wie erledigt man diese Aufgabe? |
| Inhalt | Regeln | Ablauf mit Schritten, Vorlage, Abnahmekriterium |
| Geladen | jede Anfrage bzw. per `applyTo` | nur wenn `description` passt oder per `/<name>` |
| Datei | `AGENTS.md`, `.github/instructions/*.instructions.md` | `.github/skills/<name>/SKILL.md` |

## Aufbau

```text
.github/skills/<name>/
├── SKILL.md          # Pflicht, Ordnername = name
└── <zusatzdatei>     # optional: Vorlage, Checkliste, Skript
```

| Teil von `SKILL.md` | Inhalt |
| --- | --- |
| Frontmatter | `name`, `description`, optional weitere Felder |
| Wann einsetzen | Anlässe, Grenzen („nicht einsetzen für …“) |
| Schritte | nummeriert, mit Dateien und Befehlen |
| Abnahmekriterium | beobachtbar: wann fertig |
| Bericht | festes Ausgabeformat |
| Zusatzdatei | relativer Link `[Vorlage](./test-template.py)` |

## Frontmatter

| Feld | Pflicht | Default | Wirkung |
| --- | --- | --- | --- |
| `name` | ja | – | `a-z0-9-`, max. 64 Zeichen, = Ordnername |
| `description` | ja | – | max. 1024 Zeichen, „was“ und „wann“; steuert automatisches Laden |
| `argument-hint` | nein | – | Hinweis im Eingabefeld beim Aufruf per `/` |
| `user-invocable` | nein | `true` | `false`: nicht im `/`-Menü, nur automatisch |
| `disable-model-invocation` | nein | `false` | `true`: nur per `/<name>`, nie automatisch |

## Aufruf

| Weg | Beispiel |
| --- | --- |
| direkt | `/test-writer GET /api/tasks` |
| automatisch | „Schreib Tests für das Löschen“ → Agent lädt `test-writer` über die `description` |
| Liste anzeigen | `/` im Eingabefeld (Copilot-Harness) |

## Orte

| Werkzeug | Projekt | persönlich |
| --- | --- | --- |
| GitHub Copilot | `.github/skills/<name>/` | `~/.copilot/skills/<name>/` |
| Claude Code | `.claude/skills/<name>/` | – |
| OpenAI Codex | `.agents/skills/<name>/` | – |

Prompt-Dateien `.github/prompts/*.prompt.md`: nur Local-Harness; Migration mit „Convert Prompt to Skills“.

## `test-writer`

| Schritt | Python | Node.js |
| --- | --- | --- |
| Code lesen | `focuslist/routes.py`, `focuslist/tasks.py` | `src/`, vorhandene Tests in `test/` |
| Fälle | Normal · Grenz · Fehler | Normal · Grenz · Fehler |
| Vorlage | `test-template.py` | `test-template.js` |
| Datei | `tests/test_<thema>.py` | `test/<bereich>.test.js` |
| Ausführen | `pytest -q` | `npm test` |
| bei Rot | Test falsch → korrigieren; Code falsch → melden | ebenso |
| Gegenprobe | geprüfte Zeile ändern → Test muss rot werden | ebenso |

## `security-checker`

| Checklistenpunkt | OWASP | Probe | Fix in FocusList v2 |
| --- | --- | --- | --- |
| Ausgabe escapen | A05 | `<script>alert(1)</script>` als Titel | Python: `\|safe` entfernt, `flash()`; Node.js: `escapeHtml()` |
| Eingaben validieren | A05, A06 | leerer Titel, 101 Zeichen, `priority=urgent` | `validate()` bzw. `validateTask()`, 400 |
| Secrets | A04, A02 | Suche nach `secret_key`, Token | Python: `FOCUSLIST_SECRET` + `.env.example`; Node.js: ohne Befund |
| Debug | A02 | `debug=True` im Code | Python: `run.py` entfernt |
| Pfade | A01 | roher Request `/static/../package.json` | Node.js: `safePath()` |
| Größenlimit | A06 | POST > 10 KB | Node.js: `readBody()` mit Limit, 413 |
| Abhängigkeiten | A03 | `requirements.txt`, `package.json` | `pip-audit`, `npm audit` empfehlen |
| CSRF | A01 | POST-Formulare ohne Token | offen (bewusst), kein Login |

| Schwere | Bedeutung |
| --- | --- |
| hoch | direkt ausnutzbar (XSS, Secret, Debug, Path Traversal) |
| mittel | unter Bedingungen ausnutzbar, Datenmüll, Ausfall |
| niedrig | Härtung, gute Praxis |

Regel: Skill berichtet, ändert nichts. Ein Fund pro Anfrage beheben, Test schreiben, Änderungen mit Keep annehmen, Bericht auf `behoben (<Test>)` setzen.

## Typische Fehler

| Symptom | Lösung |
| --- | --- |
| Skill fehlt im `/`-Menü | `name` = Ordnername, Datei exakt `SKILL.md`, neue Sitzung |
| Skill greift nie automatisch | `description` mit konkretem „wann“ |
| Tests grün, prüfen nichts | mehr als Statuscode prüfen, Gegenprobe |
| Prüf-Skill repariert nebenbei | „Ändert keine Datei“ fett nach oben |

## Fundus weiterer Alltags-Skills

| Skill | Zweck in einer Zeile |
| --- | --- |
| `changelog-entry` | fasst die geänderten Dateien einer Agent-Runde als Eintrag für `CHANGELOG.md` zusammen: Was, Warum, wie getestet |
| `api-doc` | beschreibt jede Route (Methode, Pfad, Parameter, Antworten, Fehlercodes) nach fester Vorlage in `docs/api.md` |
| `tailwind-component` | baut ein UI-Element (Button, Badge, Formularzeile) nur mit Tailwind-Klassen nach den Farbregeln des Projekts |
| `dependency-check` | prüft eine neue Abhängigkeit vor der Aufnahme: Zweck, Pflege, Lizenz, bekannte Lücken (`npm audit`, `pip-audit`) |

## Befehle

| Zweck | Python | Node.js |
| --- | --- | --- |
| Stand v1 holen | `node project/focuslist/catch-up.mjs python m05 $HOME/kurs/focuslist-m05` | `node project/focuslist/catch-up.mjs node m05 $HOME/kurs/focuslist-m05` |
| Stand v2 holen | `node project/focuslist/catch-up.mjs python m06 $HOME/kurs/focuslist-m06` | `node project/focuslist/catch-up.mjs node m06 $HOME/kurs/focuslist-m06` |
| danach im neuen Ordner | venv, `pip install -r requirements.txt`, `npm install`, `npm run build:css` | `npm install`, `npm run build:css` |
| Tests | `pytest -q` | `npm test` |
| Abhängigkeiten prüfen | `pip-audit` (falls installiert) | `npm audit` |
