# Prompt: "Darf diese Person das Dokument löschen? Admins dürfen alles, sonst nur die eigenen Dokumente."
from dataclasses import dataclass


@dataclass
class User:
    id: str
    role: str  # "admin" oder "member"


@dataclass
class Document:
    id: str
    owner_id: str | None


def can_delete(user: User | None, doc: Document) -> bool:
    if user is not None and user.role == "admin":
        return True
    return (user.id if user else None) == doc.owner_id
