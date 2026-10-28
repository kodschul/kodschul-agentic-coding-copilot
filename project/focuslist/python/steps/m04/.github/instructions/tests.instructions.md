---
applyTo: "tests/**/*.py"
---

# Testregeln

- Tests sind einfache `pytest`-Funktionen ohne Klassen; der Name beschreibt das Verhalten auf Deutsch in snake_case.
- Die Fixture `temp_store` in `tests/conftest.py` gibt jedem Test automatisch eine eigene leere Datei.
- Ein Test prüft genau ein Verhalten.
- Fehlerfälle werden mit `with pytest.raises(ValueError, match="Teil der Meldung"):` geprüft.
