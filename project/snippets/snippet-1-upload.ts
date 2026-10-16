// Prompt: "Schreibe eine Funktion, die eine hochgeladene Datei prüft, bevor wir sie speichern."
const ALLOWED = [".png", ".jpg", ".pdf"];

export function isUploadAllowed(fileName: string, sizeInBytes: number): boolean {
  const extension = fileName.slice(fileName.lastIndexOf("."));
  return ALLOWED.includes(extension) && sizeInBytes > 0;
}
