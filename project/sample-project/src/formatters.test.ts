// Eigenständiger Test, unabhängig von den leeren Rümpfen in formatters.ts,
// damit "npm test" im Ausgangszustand des Projekts sauber durchläuft.
import test from "node:test";
import assert from "node:assert/strict";

test("project test runner is wired up correctly", () => {
  assert.equal(1 + 1, 2);
});
