// Grundgerüst jeder Seite
export function layout({ title, body }) {
  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} · FocusList</title>
  <link rel="stylesheet" href="/static/app.css">
</head>
<body class="min-h-screen bg-slate-50 text-slate-800">
  <header class="bg-indigo-600 text-white">
    <div class="mx-auto max-w-2xl px-4 py-4">
      <h1 class="text-xl font-semibold">FocusList</h1>
    </div>
  </header>
  <main class="mx-auto max-w-2xl px-4 py-6">
${body}
  </main>
</body>
</html>`;
}
