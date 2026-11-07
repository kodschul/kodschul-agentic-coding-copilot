import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { startTestServer } from "./helpers.js";

let app;
before(async () => (app = await startTestServer()));
after(() => app.close());

test("GET / zeigt die Aufgabenliste", async () => {
  const res = await fetch(`${app.baseUrl}/`);
  assert.equal(res.status, 200);
  const html = await res.text();
  assert.match(html, /Kursunterlagen lesen/);
});
