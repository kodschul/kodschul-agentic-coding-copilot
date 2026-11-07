// Kleine Helfer rund um Request und Response

export async function readBody(req) {
  let body = "";
  for await (const chunk of req) body += chunk;
  return body;
}

export function sendHtml(res, status, html) {
  res.writeHead(status, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
}

export function sendJson(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data));
}

export function sendText(res, status, text) {
  res.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(text);
}

// Nach POST immer umleiten (Post/Redirect/Get)
export function redirect(res, location) {
  res.writeHead(302, { Location: location });
  res.end();
}
