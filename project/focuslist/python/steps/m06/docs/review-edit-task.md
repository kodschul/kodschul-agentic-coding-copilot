## Review: Feature „Aufgabe bearbeiten“

Erstellt vom Agenten `reviewer` als Subagent von `feature-lead`, zweite Review-Runde. Geprüft: `focuslist/routes.py`, `focuslist/tasks.py`, `focuslist/templates/edit.html`, `focuslist/templates/index.html`, `tests/test_edit.py`. Grundlage: `AGENTS.md`, `.github/instructions/`, Skill `security-checker`.

| Befund | Datei | Schwere | Vorschlag |
| --- | --- | --- | --- |
| Erste Runde: `update_task()` setzte `done` aus dem Formular, ein fehlendes Feld machte erledigte Aufgaben wieder offen. | `focuslist/tasks.py:47` | hoch | Behoben: nur `title` und `priority` ändern; abgesichert durch `test_bearbeiten_behaelt_status_erledigt`. |
| Erste Runde: POST auf eine unbekannte ID lief bis zur Validierung und lieferte 400 statt 404. | `focuslist/routes.py:39` | mittel | Behoben: Aufgabe zuerst laden, sonst `abort(404)`; Test für GET und POST. |
| Eingabefeld mit fester Breite `w-96` (384 px) ist auf Handybreite breiter als der Bildschirm. Dasselbe Muster steht im Formular „Neue Aufgabe“. | `focuslist/templates/edit.html:21`, `focuslist/templates/index.html:22` | mittel | `w-full sm:w-96` verwenden und Formularzeilen auf kleinen Bildschirmen untereinander anordnen. |
| Zuordnung Priorität → deutscher Name steht doppelt in zwei Templates. | `focuslist/templates/edit.html:2`, `focuslist/templates/index.html:2` | niedrig | In `base.html` oder ein gemeinsames Makro (`_macros.html`) verschieben. |
| `update_task()` und `complete_task()` wiederholen dieselbe Such-Schleife. | `focuslist/tasks.py:47`, `focuslist/tasks.py:58` | niedrig | Bei der nächsten Änderung eine Hilfsfunktion `find_task(tasks, task_id)` einführen. |
| Bearbeiten-Formular ohne CSRF-Token (bekannter, bewusst offener Punkt aus `docs/security-report.md`). | `focuslist/templates/edit.html:17` | mittel | Kein neuer Handlungsbedarf, solange FocusList kein Login hat. |

**Ohne Befund geprüft:** Schichten (Route → `tasks.py` → `store.py`), Validierung über `tasks.validate()` mit Status 400, Escaping (kein `|safe`, Probe mit `<b>` im Titel), Redirect nach POST mit `flash()`, deutsche UI-Texte, `<label>` für jedes Feld, Tests mit Normal-, Grenz- und Fehlerfall (`tests/test_edit.py`, 11 Tests grün).

**Fazit:** nach Korrektur freigeben. Die beiden Befunde aus Runde 1 sind behoben; offen ist ein Befund (mittel) zur Darstellung auf Handybreite, der in einem eigenen Schritt folgt.
