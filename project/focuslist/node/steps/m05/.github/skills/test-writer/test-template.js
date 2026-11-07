// Vorlage für test/<bereich>.test.js
// Platzhalter in <spitzen Klammern> ersetzen, nicht benötigte Blöcke löschen.
import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { startTestServer } from "./helpers.js";
// Für Unit-Tests reiner Funktionen:
// import { <funktion> } from "../src/<modul>.js";

let app;
// Frischer Server mit eigener Datenkopie für jeden Test
beforeEach(async () => (app = await startTestServer()));
afterEach(() => app.close());

// Normalfall: gültige Eingabe, erwartetes Ergebnis
test("<Route/Funktion> <macht was> bei <gültiger Eingabe>", async () => {
  const res = await fetch(`${app.baseUrl}/<pfad>`);
  assert.equal(res.status, 200);
  // Inhalt prüfen, nicht nur den Status
  assert.match(await res.text(), /<erwarteter Inhalt>/);
});

// Grenzfall: Rand des erlaubten Bereichs
test("<Route/Funktion> akzeptiert <Grenzwert>", async () => {
  const res = await app.postForm("/<pfad>", { "<feld>": "<grenzwert>" });
  assert.equal(res.status, 302);
  const tasks = await app.readTasks();
  assert.equal(tasks.at(-1)["<feld>"], "<grenzwert>");
});

// Fehlerfall: ungültige Eingabe wird abgelehnt und nichts gespeichert
test("<Route/Funktion> lehnt <ungültige Eingabe> mit <Status> ab", async () => {
  const before = await app.readTasks();
  const res = await app.postForm("/<pfad>", { "<feld>": "<ungültiger Wert>" });
  assert.equal(res.status, 400);
  assert.deepEqual(await app.readTasks(), before);
});
