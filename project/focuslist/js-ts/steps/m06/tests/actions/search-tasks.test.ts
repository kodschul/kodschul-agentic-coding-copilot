import assert from "node:assert/strict";
import test from "node:test";
import { addTask } from "../../src/actions/add-task.js";
import { listTasks } from "../../src/actions/list-tasks.js";
import { searchTasks } from "../../src/actions/search-tasks.js";
import { useTempStore } from "../helpers.js";

useTempStore();

test("findet Tasks unabhängig von Groß-/Kleinschreibung", () => {
  addTask("Steuererklärung abgeben");
  addTask("Einkaufen");
  assert.deepEqual(searchTasks("STEUER").map((t) => t.title), ["Steuererklärung abgeben"]);
});

test("liefert eine leere Liste ohne Treffer und wirft bei leerem Suchbegriff", () => {
  addTask("Einkaufen");
  assert.deepEqual(searchTasks("Urlaub"), []);
  assert.throws(() => searchTasks("  "), /darf nicht leer sein/);
});

test("ändert gespeicherte Tasks beim Suchen nicht", () => {
  addTask("Steuererklärung abgeben");
  const vorher = listTasks();
  searchTasks("steuer");
  assert.deepEqual(listTasks(), vorher);
});
