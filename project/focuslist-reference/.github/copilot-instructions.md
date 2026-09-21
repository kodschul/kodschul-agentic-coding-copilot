# FocusList – Coding-Konventionen

1. Aktionen in `src/actions/` werfen bei ungültiger Eingabe immer eine
   `Error` mit sprechender Meldung. Sie geben niemals `null` oder
   `undefined` als Fehlersignal zurück.
2. Nur `src/storage/json-store.ts` liest/schreibt `tasks.json` direkt.
   Andere Dateien greifen ausschließlich über `readTasks`/`writeTasks` zu.
3. Neue Aktionen folgen der Signatur `(...args) => Task | never`
   (werfen statt `null` zurückzugeben).
