// agentStop-Hook: Der Agent darf erst fertig melden, wenn die Tests grün sind.
import { spawnSync } from "node:child_process";

let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (input += chunk));
process.stdin.on("end", () => {
  const event = JSON.parse(input || "{}");
  if (event.stop_hook_active) return; // schon einmal blockiert: keine Endlosschleife

  const result = spawnSync("npm", ["test"], { encoding: "utf8", shell: process.platform === "win32" });
  if (result.status === 0) return; // grün: keine Ausgabe, der Agent darf beenden

  const output = `${result.stdout}\n${result.stderr}`.split("\n").slice(-30).join("\n");
  const reason = `npm test schlägt fehl. Behebe die Fehler, bevor du fertig meldest:\n${output}`;
  console.log(
    JSON.stringify({
      decision: "block", // Copilot-Harness liest decision/reason auf oberster Ebene
      reason,
      hookSpecificOutput: { hookEventName: "Stop", decision: "block", reason }, // lokaler VS-Code-Harness
    }),
  );
});
