---
description: Aktualisiert README, Changelog und Doc-Kommentare aus dem aktuellen Code
agent: agent
tools: ['read', 'search', 'edit']
---

Bringe die Dokumentation auf den Stand des Codes:

1. **README.md**, Abschnitt "Befehle": eine Zeile pro Unterbefehl aus `focuslist/cli.py` mit einem Beispielaufruf. Nichts aufnehmen, was es im Code nicht gibt.
2. **CHANGELOG.md**: einen Eintrag unter `## [Unreleased]` für jede Aktion in `focuslist/actions/`, die im Changelog noch fehlt.
3. **Doc-Kommentare**: jede exportierte Funktion in `focuslist/actions/` bekommt einen einzeiligen Docstring, falls er fehlt. Bestehende Kommentare nicht löschen.

Nenne am Ende jede geänderte Datei.
