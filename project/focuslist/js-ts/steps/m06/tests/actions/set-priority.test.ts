import assert from "node:assert/strict";
import test from "node:test";
import { addTask } from "../../src/actions/add-task.js";
import { listTasks } from "../../src/actions/list-tasks.js";
import { setPriority } from "../../src/actions/set-priority.js";
import { useTempStore } from "../helpers.js";

useTempStore();

test("ändert die Priorität einer bestehenden Task", () => {
  const task = addTask("Prioritäts-Test");
  assert.equal(setPriority(task.id, "high").priority, "high");
});

test("wirft Error bei unbekannter id oder ungültiger Priorität", () => {
  const task = addTask("X");
  assert.throws(() => setPriority("unbekannt", "high"), /existiert nicht/);
  assert.throws(() => setPriority(task.id, "urgent"), /Ungültige Priorität/);
});

test("lässt die gespeicherte Task bei ungültiger Priorität unverändert", () => {
  const task = addTask("Unverändert", "low");
  assert.throws(() => setPriority(task.id, "urgent"), /Ungültige Priorität/);
  assert.equal(listTasks()[0].priority, "low");
});

test("lehnt eine Priorität in Großbuchstaben ab", () => {
  const task = addTask("Großschreibung");
  assert.throws(() => setPriority(task.id, "HIGH"), /Ungültige Priorität/);
});
