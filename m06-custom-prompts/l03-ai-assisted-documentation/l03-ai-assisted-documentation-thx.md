# Lab 6.3: Dokumentation mit AI erzeugen und pflegen

Ziel: einen Doku-Prompt bauen, der README, Changelog und Docstrings für FocusList konsistent erzeugt und pflegt.

**Leitfragen:**

<details>
<summary>Warum reicht ein einmalig geschriebenes README nicht dauerhaft?</summary>

Weil sich Code (wie in diesem Kurs v0→v3) laufend ändert — ein Doku-Prompt macht die Aktualisierung wiederholbar statt einmalig.

</details>

<details>
<summary>Was sollte `generate-docs.prompt.md` konkret abdecken?</summary>

README-Abschnitt zu vorhandenen Aktionen, ein Changelog-Eintrag für die letzte Änderung, und fehlende Docstrings/Kommentare an öffentlichen Funktionen.

</details>

<details>
<summary>Kann AI-generierte Dokumentation ungeprüft übernommen werden?</summary>

Nein — wie bei Code muss auch Dokumentation gegen den tatsächlichen Stand geprüft werden, sonst entstehen veraltete oder falsche Angaben.

</details>

## Begriffe & Mentales Modell

- **Doku-Prompt:** ein wiederverwendbarer Prompt, der README/Changelog/Docstrings aus dem aktuellen Codestand ableitet.
- **Changelog-Eintrag:** eine kurze, versionierte Notiz zu einer konkreten Änderung (hier: neue Aktionen aus Modul 5/6).

## Aufbau des Doku-Prompts

- README: Abschnitt "Verfügbare Aktionen" aus den tatsächlich existierenden Dateien in `src/actions/` ableiten.
- Changelog: neuer Eintrag für die zuletzt hinzugefügte Aktion (`set-priority`).
- Docstrings: fehlende Kommentare an öffentlichen Funktionen ergänzen.

## Beispiel

Nach Anwendung des Prompts enthält `README.md` einen aktuellen Abschnitt zu `set-priority`, der vorher fehlte, weil die Aktion erst in Modul 5 entstanden ist.

**Erwartetes Ergebnis:** README, Changelog und Docstrings spiegeln den tatsächlichen v3-Stand von FocusList wider, nicht den älteren v1-Stand.

## Grenzen

Der Prompt erzeugt einen Vorschlag — offensichtlich falsche oder veraltete Angaben müssen trotzdem manuell korrigiert werden.

## Checkpoint & Brücke zur Übung

Checkpoint: Enthält das generierte README tatsächlich alle vier aktuellen FocusList-Aktionen? Die Übung prüft das konkret.
