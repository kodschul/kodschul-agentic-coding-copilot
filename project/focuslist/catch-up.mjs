#!/usr/bin/env node
// Baut einen FocusList-Stand aus start/ und den Schritten steps/mNN/ zusammen.
//
//   node catch-up.mjs <js-ts|python> <m03…m10|final> <zielordner> [--force]
//   node catch-up.mjs codex <zielordner> [--force]
//
// <modul> = Modul, mit dem es weitergeht: "m06" liefert den Stand nach Modul 5.
// "final" (= m10) liefert den Endstand nach Modul 9.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const DELETE_FILE = "_entfernt.txt";
const MODULES = ["m03", "m04", "m05", "m06", "m07", "m08", "m09"];

function fail(msg) {
  console.error(`Fehler: ${msg}`);
  console.error("Aufruf: node catch-up.mjs <js-ts|python> <m03…m10|final> <zielordner> [--force]");
  console.error("        node catch-up.mjs codex <zielordner> [--force]");
  process.exit(1);
}

function copyTree(from, to) {
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    if (entry.name === DELETE_FILE) continue;
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(dst, { recursive: true });
      copyTree(src, dst);
    } else {
      fs.copyFileSync(src, dst);
    }
  }
  const del = path.join(from, DELETE_FILE);
  if (fs.existsSync(del)) {
    for (const line of fs.readFileSync(del, "utf8").split("\n")) {
      const rel = line.trim();
      if (!rel || rel.startsWith("#")) continue;
      fs.rmSync(path.join(to, rel), { force: true });
      // leere Ordner entfernen, die nur die gelöschte Datei enthielten
      for (let dir = path.dirname(path.join(to, rel)); dir !== to; dir = path.dirname(dir)) {
        if (!fs.existsSync(dir) || fs.readdirSync(dir).length > 0) break;
        fs.rmdirSync(dir);
      }
    }
  }
}

const args = process.argv.slice(2);
const force = args.includes("--force");
const pos = args.filter((a) => a !== "--force");
let layers;
let target;
if (pos[0] === "codex") {
  if (pos.length !== 2) fail("Zielordner fehlt.");
  layers = ["js-ts/start", ...MODULES.map((m) => `js-ts/steps/${m}`), "codex"];
  target = pos[1];
} else {
  const [stack, modul, dir] = pos;
  if (!["js-ts", "python"].includes(stack) || !modul || !dir) fail("Stack, Modul oder Zielordner fehlt.");
  const until = modul === "final" ? 10 : Number(modul.replace(/^m/, ""));
  if (!(until >= 3 && until <= 10)) fail(`Unbekanntes Modul "${modul}".`);
  layers = [`${stack}/start`, ...MODULES.filter((m) => Number(m.slice(1)) < until).map((m) => `${stack}/steps/${m}`)];
  target = dir;
}

target = path.resolve(target);
if (fs.existsSync(target) && fs.readdirSync(target).length > 0 && !force) {
  fail(`${target} ist nicht leer. Mit --force werden vorhandene Dateien überschrieben.`);
}
fs.mkdirSync(target, { recursive: true });
for (const layer of layers) copyTree(path.join(here, layer), target);
console.log(`Stand erstellt in ${target} (${layers.length} Schichten: ${layers.join(", ")})`);
