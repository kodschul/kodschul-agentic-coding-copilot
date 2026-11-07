// Offizielles Beispiel "Create your first Copilot hook" aus der VS-Code-Doku
// https://code.visualstudio.com/docs/agent-customization/hooks (abgerufen 08.11.2026)
// © Microsoft, CC BY 3.0 US; nur formatiert und kommentiert.
//
// Läuft vor jedem Werkzeugaufruf (preToolUse), schreibt nur den Werkzeugnamen
// in .github/hooks/tool-use.log und trifft keine Entscheidung.

const fs = require('node:fs');
const path = require('node:path');

// Ereignis als JSON von stdin lesen (Dateideskriptor 0)
const event = JSON.parse(fs.readFileSync(0, 'utf8'));

if (typeof event.toolName !== 'string') {
  throw new Error('Expected a Copilot preToolUse event with toolName.');
}

// Eine Zeile pro Werkzeugaufruf, z. B. "view"
fs.appendFileSync(path.join(__dirname, 'tool-use.log'), `${JSON.stringify(event.toolName)}\n`);

// {} = keine Entscheidung; die normale Freigabe-Abfrage bleibt bestehen
process.stdout.write('{}');
