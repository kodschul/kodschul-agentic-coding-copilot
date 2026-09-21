# Lab 7.1 – Übung: Einen "Explain-only"-Agenten bauen

**Ändert die FocusList-Projektbasis?** Nein — generische Übung an einem Fremdprojekt.

## Ausgangslage

[`project/sample-project/`](../../project/sample-project/) (bekannt aus vorherigen Modulen).

## Aufgaben

1. Erstelle `.github/agents/explain-only.agent.md` mit einem Systemprompt, der die Rolle auf reines Erklären beschränkt, und schränke die Tool-Rechte auf Lesezugriff ein (keine Datei-Editier-Tools).
2. Bitte den Agenten, eine bestehende Funktion zu erklären, und prüfe, ob er tatsächlich nichts ändert.
3. Bitte denselben Agenten anschließend, eine Änderung vorzunehmen ("ändere Zeile X"), und beobachte, wie er reagiert.
4. Vergleiche das Verhalten mit einer identischen Anfrage im normalen Chat-Modus.

## Checkpoint

- Der Agent liefert bei Aufgabe 2 eine korrekte Erklärung ohne Dateiänderung.
- Bei Aufgabe 3 verweigert oder ignoriert der Agent die Änderungsanfrage nachvollziehbar.

## Abschlusskriterien

- Ein dokumentierter Unterschied zwischen dem Agenten-Verhalten (Aufgabe 3) und dem Chat-Modus-Verhalten (Aufgabe 4) liegt vor.

## Fallback

Falls die Tool-Einschränkung technisch nicht greift: das im Systemprompt zusätzlich explizit als Regel festhalten ("Du darfst niemals Dateien ändern, nur erklären.") und das Verhalten erneut prüfen.
