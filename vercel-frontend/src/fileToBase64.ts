// Local replacement for the space-sdk `fileToBase64` helper (used by the
// admin logo upload). Reads a File into a base64 data payload.
export async function fileToBase64(
  file: File,
): Promise<{ dataBase64: string; mimeType: string }> {
  // The UI promises "under 5 MB" — enforce it here, not just in the label:
  // a bigger file becomes a base64 data: URI that alone can exceed the
  // ~5 MB localStorage quota and silently break every later write.
  if (file.size > 5 * 1024 * 1024) throw new Error("File must be under 5 MB.");
  const buf = await file.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(buf);
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(
      null,
      Array.from(bytes.subarray(i, i + chunk)),
    );
  }
  return { dataBase64: btoa(binary), mimeType: file.type || "image/png" };
}
