# Design

- Das Datum wird als ISO-String `JJJJ-MM-TT` gespeichert; ISO-Strings lassen sich mit `localeCompare` korrekt sortieren.
- `sortByDueDate` ist eine reine Funktion auf einer Kopie der Liste und schreibt nichts in die JSON-Datei.
- Die Datumsprüfung liegt in `src/actions/validation.ts` (`assertIsoDate`), damit spätere Aktionen sie wiederverwenden.
