# Lab 5.2: Eine eigene Skill für FocusList schreiben

Ziel: die Skill `add-focuslist-action` schreiben und damit FocusList um eine vierte Aktion ("Priorität ändern") von v1 zu v2 erweitern.

**Leitfragen:**

<details>
<summary>Warum lohnt sich eine Skill gerade für "neue Aktion hinzufügen"?</summary>

Weil diese Aufgabe im Kursverlauf (und in echten Projekten) mehrfach wiederkehrt — jede neue Aktion folgt demselben Muster (Datenmodell → Logik → Test).

</details>

<details>
<summary>Muss die Skill auf FocusList-spezifische Details eingehen?</summary>

Ja, im Unterschied zur generischen Skill aus Lab 5.1 darf diese Skill konkret auf FocusLists Datenmodell und Konventionen aus `copilot-instructions.md` Bezug nehmen.

</details>

<details>
<summary>Ersetzt diese Skill die Instructions-Datei aus Modul 4?</summary>

Nein — beide gelten gleichzeitig: Instructions als Dauerregeln, die Skill als zusätzlicher, aufgabenspezifischer Ablauf.

</details>

## Begriffe & Mentales Modell

- **`add-focuslist-action`:** die projektspezifische Skill, die in diesem Lab entsteht und im Kurs mehrfach als Vorbild referenziert wird.
- **v1 → v2:** die Versionsstufe, die durch das Hinzufügen der Aktion "Priorität ändern" über diese Skill erreicht wird.

## Aufbau der Skill

1. Datenmodell prüfen/erweitern (falls nötig).
2. Aktion in `src/actions/` nach dem in `copilot-instructions.md` festgelegten Muster implementieren.
3. Aktion in der CLI verdrahten.
4. Test für die neue Aktion ergänzen.

## Beispiel

Mit dieser Skill wird "Priorität ändern" konsequent nach demselben Muster wie `complete-task.ts` umgesetzt (wirft `Error` statt `null` zurückzugeben), weil die Skill explizit auf `copilot-instructions.md` verweist.

**Erwartetes Ergebnis:** die neue Aktion `set-priority.ts` folgt sichtbar demselben Fehlerbehandlungsmuster wie die bestehenden v1-Aktionen.

## Grenzen

Diese Skill deckt nur "neue Aktion hinzufügen" ab — für andere wiederkehrende FocusList-Aufgaben (z. B. Filtern/Suchen) entstehen in Modul 6/8 eigene, separate Skills.

## Checkpoint & Brücke zur Übung

Checkpoint: Folgt die neue Aktion sichtbar demselben Muster wie die bestehenden v1-Aktionen? Die Übung führt das konkret durch.
