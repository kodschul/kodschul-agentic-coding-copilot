# Lab 2.3 – Übung: Eingebaute Befehle anwenden

**Ändert die FocusList-Projektbasis?** Nein — generische Übung an einem vorbereiteten Snippet mit eingebautem Fehler.

## Ausgangslage

Ein Snippet mit einer Off-by-one-Fehlerquelle in einer Schleifen-/Index-Berechnung liegt bereit (`snippet-buggy-loop.md`).

## Aufgaben

1. Markiere die Funktion und nutze `/explain` — notiere, ob die Erklärung den Fehler von sich aus benennt.
2. Nutze `/fix` auf derselben Funktion und prüfe den Korrekturvorschlag gegen eine konkrete Testeingabe.
3. Nutze `/tests` auf der (korrigierten) Funktion und prüfe, ob ein Grenzfall-Test (z. B. leere Eingabe, Grenzindex) enthalten ist.
4. Öffne `.vscode/settings.json` (falls vorhanden) und identifiziere eine Copilot-relevante Einstellung.

## Checkpoint

- Für alle drei Befehle liegt eine kurze Notiz vor, was sie geliefert haben und was nicht.
- Mindestens ein fehlender Grenzfall-Test aus Aufgabe 3 wurde konkret benannt.

## Abschlusskriterien

- Eine schriftliche Einschätzung liegt vor, welcher der drei Befehle den Fehler am ehesten sichtbar gemacht hat und warum.

## Fallback

Falls `/tests` keine ausführbare Testumgebung vorfindet: das generierte Testgerüst rein inhaltlich prüfen (welche Fälle deckt es ab, welche fehlen), ohne es auszuführen.
