## Context

FocusList speichert Aufgaben als Array in `data/tasks.json` (`id`, `title`, `priority`, `done`). Validierung liegt in `validateTask()` in `src/tasks.js`, Views erhalten fertige Daten. Es gibt keine Datenbank und keine Migrationen.

## Goals / Non-Goals

**Goals:**
- Fälligkeitsdatum optional erfassen, ändern und entfernen
- Überfällige offene Aufgaben auf einen Blick erkennen
- Offene Aufgaben nach Dringlichkeit sortieren

**Non-Goals:**
- Uhrzeiten und Zeitzonen-Auswahl
- Benachrichtigungen oder Erinnerungen

## Decisions

- **Speicherformat `YYYY-MM-DD` als String, sonst `null`.** Entspricht dem Wert von `<input type="date">`, ist ohne Umrechnung vergleichbar (`"2026-11-11" < "2026-11-12"`) und in JSON lesbar. Alternative Zeitstempel verworfen: Zeitzonenfehler beim Vergleich mit „heute“.
- **„Heute“ = lokales Datum des Servers** über `today()`. `isOverdue(task, today)` bekommt das Datum als Parameter, damit Tests ohne Uhr-Manipulation auskommen.
- **Überfällig nur bei `due < heute`.** Heute fällig ist nicht überfällig (Grenzfall aus den Akzeptanzkriterien).
- **Validierung mit echtem Kalenderdatum.** Format per Regex, danach Rundreise über `Date`, damit `2026-02-30` abgelehnt wird.
- **Alte Daten ohne Migration.** `loadTasks()` ergänzt fehlendes `due` als `null`; beim nächsten Speichern steht das Feld in der Datei.
- **Sortierung in `listTasks()`.** Liste und API nutzen dieselbe Funktion `sortTasks()`; offene Aufgaben stabil nach `due`, `null` zuletzt, erledigte Aufgaben unverändert dahinter.

## Risks / Trade-offs

- Server und Browser in unterschiedlichen Zeitzonen können um Mitternacht einen Tag abweichen → für eine persönliche App akzeptiert.
- Die Reihenfolge in `GET /api/tasks` ändert sich → betrifft nur Tests im Projekt, keine externen Nutzer.
