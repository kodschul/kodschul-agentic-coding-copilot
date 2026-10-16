# Prompt: "Schreibe eine Funktion, die eine hochgeladene Datei prüft, bevor wir sie speichern."
ALLOWED = [".png", ".jpg", ".pdf"]


def is_upload_allowed(file_name: str, size_in_bytes: int) -> bool:
    extension = file_name[file_name.rfind(".") :]
    return extension in ALLOWED and size_in_bytes > 0
