// preToolUse-Hook: blockiert Zugriffe auf .env-Dateien und "rm -rf"
// Eingabe (stdin): { toolName, toolArgs, ... }  Ausgabe (stdout): JSON

const RULES = [
  {
    // .env, .env.local, config/.env … aber nicht .env.example (und nicht process.env)
    pattern: /(^|[^\w.])\.env(?!\.example)(?![\w-])/,
    reason: "Zugriff auf .env-Dateien ist gesperrt (Secrets). Nur .env.example ist erlaubt.",
  },
  {
    // rm -rf, rm -fr, rm -Rf …
    pattern: /\brm\s+-(?=[a-zA-Z]*[rR])(?=[a-zA-Z]*f)[a-zA-Z]+/,
    reason: "Rekursives Löschen mit rm -rf ist gesperrt. Dateien einzeln und nach Rückfrage löschen.",
  },
];

async function readStdin() {
  let text = "";
  for await (const chunk of process.stdin) text += chunk;
  return text;
}

function parse(text) {
  try {
    return JSON.parse(text) ?? {};
  } catch {
    return {};
  }
}

const input = parse(await readStdin());
const args = typeof input.toolArgs === "string" ? input.toolArgs : JSON.stringify(input.toolArgs ?? {});
const haystack = `${input.toolName ?? ""} ${args}`;

const hit = RULES.find((rule) => rule.pattern.test(haystack));
if (hit) {
  console.log(JSON.stringify({ permissionDecision: "deny", permissionDecisionReason: hit.reason }));
} else {
  // Leeres Objekt = Standardverhalten (normale Freigabe-Abfrage)
  console.log("{}");
}
