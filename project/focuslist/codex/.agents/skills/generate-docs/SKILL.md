---
name: generate-docs
description: Aktualisiert README, CHANGELOG und Doc-Kommentare von FocusList aus dem aktuellen Code. Nur explizit aufrufen mit $generate-docs.
---

# Dokumentation aus dem Code aktualisieren

Bringe die Dokumentation auf den Stand des Codes:

1. **README.md**, Abschnitt "Befehle": eine Zeile pro Unterbefehl aus `src/cli.ts` mit einem Beispielaufruf. Nichts aufnehmen, was es im Code nicht gibt.
2. **CHANGELOG.md**: einen Eintrag unter `## [Unreleased]` für jede Aktion in `src/actions/`, die im Changelog noch fehlt.
3. **Doc-Kommentare**: jede exportierte Funktion in `src/actions/` bekommt einen einzeiligen `/** ... */`-Kommentar, falls er fehlt. Bestehende Kommentare nicht löschen.

Nenne am Ende jede geänderte Datei.
