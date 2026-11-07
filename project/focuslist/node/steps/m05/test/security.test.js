import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { request } from "node:http";
import { startTestServer } from "./helpers.js";
import { escapeHtml } from "../src/views/escape.js";

let app;
beforeEach(async () => (app = await startTestServer()));
afterEach(() => app.close());

// fetch() normalisiert "../" – für Path-Traversal-Tests den Pfad roh senden
function rawGet(path) {
  return new Promise((resolve, reject) => {
    const { port } = new URL(app.baseUrl);
    request({ host: "localhost", port, path }, (res) => {
      res.resume();
      resolve(res.statusCode);
    })
      .on("error", reject)
      .end();
  });
}

test("escapeHtml entschärft HTML-Sonderzeichen", () => {
  assert.equal(escapeHtml(`<script>"x" & 'y'</script>`), "&lt;script&gt;&quot;x&quot; &amp; &#39;y&#39;&lt;/script&gt;");
  assert.equal(escapeHtml(undefined), "");
});

test("Titel mit <script> wird escaped ausgegeben", async () => {
  await app.postForm("/tasks", { title: "<script>alert(1)</script>", priority: "low" });
  const html = await (await fetch(`${app.baseUrl}/`)).text();
  assert.doesNotMatch(html, /<script>alert\(1\)<\/script>/);
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
});

test("Hinweis aus ?created= wird escaped ausgegeben", async () => {
  const html = await (await fetch(`${app.baseUrl}/?created=${encodeURIComponent("<img src=x onerror=alert(1)>")}`)).text();
  assert.doesNotMatch(html, /<img src=x/);
});

test("leerer Titel wird mit 400 abgelehnt und nicht gespeichert", async () => {
  const res = await app.postForm("/tasks", { title: "   ", priority: "low" });
  assert.equal(res.status, 400);
  assert.match(await res.text(), /Bitte einen Titel eingeben/);
  assert.equal((await app.readTasks()).length, 3);
});

test("Titel mit 100 Zeichen ist erlaubt, mit 101 nicht", async () => {
  const ok = await app.postForm("/tasks", { title: "a".repeat(100), priority: "low" });
  assert.equal(ok.status, 302);
  const tooLong = await app.postForm("/tasks", { title: "a".repeat(101), priority: "low" });
  assert.equal(tooLong.status, 400);
  assert.equal((await app.readTasks()).length, 4);
});

test("unbekannte Priorität wird mit 400 abgelehnt", async () => {
  const res = await app.postForm("/tasks", { title: "Test", priority: "urgent" });
  assert.equal(res.status, 400);
  assert.equal((await app.readTasks()).length, 3);
});

test("Body über 10 KB wird mit 413 abgelehnt", async () => {
  const res = await app.postForm("/tasks", { title: "x".repeat(11 * 1024), priority: "low" });
  assert.equal(res.status, 413);
  assert.equal((await app.readTasks()).length, 3);
});

test("Pfade außerhalb von static/ werden nicht ausgeliefert", async () => {
  assert.equal(await rawGet("/static/../package.json"), 404);
  assert.equal(await rawGet("/static/..%2f..%2fpackage.json"), 404);
  assert.equal(await rawGet("/static/%2e%2e/data/tasks.json"), 404);
});

test("Dateien innerhalb von static/ werden ausgeliefert", async () => {
  assert.equal(await rawGet("/static/src/input.css"), 200);
});
