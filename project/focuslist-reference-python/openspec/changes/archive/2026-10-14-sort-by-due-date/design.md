# Design

- Das Datum wird als ISO-String `JJJJ-MM-TT` gespeichert; ISO-Strings lassen sich mit `sorted()` korrekt sortieren.
- `sort_by_due_date` ist eine reine Funktion auf einer Kopie der Liste und schreibt nichts in die JSON-Datei.
- Die Datumsprüfung liegt in `focuslist/actions/validation.py` (`assert_iso_date`), damit spätere Aktionen sie wiederverwenden.
