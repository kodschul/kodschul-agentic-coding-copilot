// Stop-Hook (Codex): Codex darf erst fertig melden, wenn npm test grün ist.
// Format: Stop erwartet bei Exit-Code 0 JSON auf stdout; {"decision":"block","reason":…}
// erzeugt eine Folgeanweisung mit dem reason-Text. Quelle: https://learn.chatgpt.com/docs/hooks (Stand: 10/2026)
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../..", import.meta.url));

let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (input += chunk));
process.stdin.on("end", () => {
  const event = JSON.parse(input || "{}");
  if (event.stop_hook_active) {
    console.log("{}"); // schon einmal fortgesetzt: keine Endlosschleife
    return;
  }

  const result = spawnSync("npm", ["test"], {
    cwd: projectRoot,
    encoding: "utf8",
    shell: process.platform === "win32",
  });
  if (result.status === 0) {
    console.log("{}");
    return;
  }

  const output = `${result.stdout}\n${result.stderr}`.split("\n").slice(-30).join("\n");
  console.log(
    JSON.stringify({
      decision: "block",
      reason: `npm test schlägt fehl. Fehler beheben, erst danach fertig melden:\n${output}`,
    }),
  );
});
