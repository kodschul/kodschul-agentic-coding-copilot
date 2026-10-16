// Prüft nur, dass der Test-Runner läuft. Eigene Tests entstehen in den Übungen.
import assert from "node:assert/strict";
import test from "node:test";

test("Test-Runner ist eingerichtet", () => {
  assert.equal(1 + 1, 2);
});
