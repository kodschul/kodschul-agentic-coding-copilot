// Prompt: "Darf diese Person das Dokument löschen? Admins dürfen alles, sonst nur die eigenen Dokumente."
export interface User {
  id: string;
  role: "admin" | "member";
}

export interface Document {
  id: string;
  ownerId: string;
}

export function canDelete(user: User | undefined, doc: Document): boolean {
  if (user?.role === "admin") return true;
  return user?.id === doc.ownerId;
}
