# Lab 7.2 – Übung: FocusList v3 → v4 mit dem Test-Agenten

**Ändert die FocusList-Projektbasis?** Ja — fügt `focuslist-test-agent.agent.md` hinzu und ergänzt fehlende Tests.

## Ausgangslage

FocusList v3 aus Modul 6 (vier Aktionen, README/Changelog/Docstrings vorhanden).

## Prerequisites

- Alle vier Aktionen sind lauffähig; mindestens eine Aktion hat noch keinen dedizierten Test.

## Aufgaben

1. Erstelle `.github/agents/focuslist-test-agent.agent.md` mit Schreibrechten nur auf `tests/**` und Leserechten auf `src/**`.
2. Lass den Agenten alle vier Aktionen auf fehlende Tests prüfen und fehlende Tests ergänzen.
3. Prüfe nach dem Lauf, dass keine Datei unter `src/` verändert wurde.
4. Führe alle Tests aus und bestätige, dass sie grün sind.

## Checkpoint

- Alle vier Aktionen haben nach dem Agentenlauf mindestens einen Test.
- `git diff` zeigt ausschließlich Änderungen unter `tests/`.

## Abschlusskriterien

- Die Testsuite läuft vollständig grün — das ist FocusList v4.

## Fallback

Falls der Agent versehentlich eine Datei unter `src/` ändert: die Änderung verwerfen, die Tool-Rechte in der Agent-Definition nachschärfen und den Lauf wiederholen.
