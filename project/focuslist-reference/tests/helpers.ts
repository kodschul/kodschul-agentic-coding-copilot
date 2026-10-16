import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { beforeEach } from "node:test";

// Jeder Test bekommt eine eigene, leere tasks.json im Temp-Ordner.
export function useTempStore(): void {
  beforeEach(() => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "focuslist-"));
    process.env.FOCUSLIST_FILE = path.join(dir, "tasks.json");
  });
}
