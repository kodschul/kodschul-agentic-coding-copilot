// agentStop-Hook: führt die Tests aus, wenn der Agent fertig ist.
// Bei Rot bekommt der Agent eine weitere Runde mit der Fehlermeldung.
import { spawnSync } from "node:child_process";

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

// Schon eine Zusatzrunde wegen dieses Hooks? Dann nicht erneut blockieren (keine Endlosschleife)
if (input.stop_hook_active === true) {
  console.log("{}");
  process.exit(0);
}

const result = spawnSync(process.execPath, ["--test", "--test-reporter=dot", "test/**/*.test.js"], {
  cwd: input.cwd || process.cwd(),
  encoding: "utf8",
  timeout: 50_000,
});

if (result.status === 0) {
  console.log("{}");
} else {
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`.trim();
  const tail = output.split("\n").slice(-30).join("\n");
  const reason = result.error
    ? `Die Tests konnten nicht ausgeführt werden (${result.error.message}). Prüfe die Ursache und behebe sie.`
    : `npm test ist rot. Behebe die fehlschlagenden Tests, ohne Tests zu löschen oder abzuschwächen, und führe danach npm test erneut aus.\n\n${tail}`;
  console.log(JSON.stringify({ decision: "block", reason }));
}
