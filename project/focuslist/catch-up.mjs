#!/usr/bin/env node
// Baut einen FocusList-Stand aus start/ und den Schritten steps/mNN/ zusammen.
//
//   node catch-up.mjs <python|node> <m03…m09|final> <zielordner> [--force]
//
// <modul> = Modul, mit dem es weitergeht: "m05" liefert den Stand nach Modul 4 (v1).
// "m03" liefert das Startgerüst, "final" (= m09) den Endstand v5.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const DELETE_FILE = "_entfernt.txt";
const STEPS = ["m03", "m04", "m05", "m06", "m07", "m08"];
const STACKS = ["python", "node"];

function fail(msg) {
  console.error(`Fehler: ${msg}`);
  console.error("Aufruf: node catch-up.mjs <python|node> <m03…m09|final> <zielordner> [--force]");
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
const [stack, moduleArg, target] = args.filter((a) => a !== "--force");

if (!STACKS.includes(stack)) fail(`Unbekannter Stack "${stack ?? ""}". Erlaubt: ${STACKS.join(", ")}.`);
const mod = moduleArg === "final" ? "m09" : moduleArg;
if (!/^m0[3-9]$/.test(mod ?? "")) fail(`Unbekanntes Modul "${moduleArg ?? ""}". Erlaubt: m03 … m09 oder final.`);
if (!target) fail("Zielordner fehlt.");

const dest = path.resolve(target);
if (fs.existsSync(dest) && fs.readdirSync(dest).length > 0 && !force) {
  fail(`Zielordner ${dest} ist nicht leer. Mit --force wird hineinkopiert.`);
}
fs.mkdirSync(dest, { recursive: true });

// Schritte vor dem Zielmodul: für m05 also m03 und m04
const layers = ["start", ...STEPS.filter((s) => s < mod)];
for (const layer of layers) {
  const dir = path.join(here, stack, layer === "start" ? "start" : path.join("steps", layer));
  if (!fs.existsSync(dir)) fail(`Ordner fehlt: ${dir}`);
  copyTree(dir, dest);
}

console.log(`FocusList (${stack}) für ${moduleArg} erstellt in ${dest}`);
console.log(`Schichten: ${layers.join(" + ")}`);
