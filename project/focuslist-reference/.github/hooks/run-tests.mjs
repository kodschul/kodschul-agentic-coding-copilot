// Stop-Hook: Der Agent darf erst fertig melden, wenn die Tests grün sind.
import { spawnSync } from "node:child_process";

let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (input += chunk));
process.stdin.on("end", () => {
  const event = JSON.parse(input || "{}");
  if (event.stop_hook_active) return; // schon einmal blockiert: keine Endlosschleife

  const result = spawnSync("npm", ["test"], { encoding: "utf8", shell: process.platform === "win32" });
  if (result.status === 0) return;

  const output = `${result.stdout}\n${result.stderr}`.split("\n").slice(-30).join("\n");
  console.log(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "Stop",
        decision: "block",
        reason: `npm test schlägt fehl. Behebe die Fehler, bevor du fertig meldest:\n${output}`,
      },
    }),
  );
});
