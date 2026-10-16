# Lab 8.2 – Übung: FocusList v4 → v5 mit Pre-Commit-Hook

**Ändert die FocusList-Projektbasis?** Ja — fügt einen Pre-Commit-Hook hinzu, der Tests automatisch ausführt.

## Ausgangslage

FocusList v4 aus Modul 7 (vollständige Testabdeckung aller vier Aktionen).

## Prerequisites

- Ein lokales Git-Repository für FocusList ist initialisiert.

## Aufgaben

1. Lege `.github/hooks/pre-commit-test.md` als Dokumentation an und richte den tatsächlichen Git-Hook (`.git/hooks/pre-commit` bzw. via Tool wie `husky`) ein, der die Testsuite ausführt.
2. Versuche einen Commit mit absichtlich kaputtem Test — bestätige, dass der Commit blockiert wird.
3. Behebe den Test und bestätige, dass der Commit danach durchläuft.
4. Dokumentiere in `.github/hooks/pre-commit-test.md`, wie der Hook umgangen werden kann (`--no-verify`) und warum das bewusst dokumentiert, nicht versteckt wird.

## Checkpoint

- Ein Commit mit fehlschlagendem Test wird nachweislich blockiert.
- Nach Behebung des Tests läuft der Commit durch.

## Abschlusskriterien

- Der Hook ist eingerichtet, dokumentiert, und sein blockierendes Verhalten wurde tatsächlich getestet — das ist FocusList v5.

## Fallback

Falls kein Git-Hook-Mechanismus in der Umgebung verfügbar ist: den Hook als Task simulieren (Task "pre-commit-check" manuell vor jedem Commit ausführen) und das als dokumentierte Einschränkung festhalten.
