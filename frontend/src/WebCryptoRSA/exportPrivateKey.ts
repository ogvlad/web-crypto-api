import { toBase64 } from "../utils/toBase64"

export async function exportPrivateKey(keyPair: any) {
  const exportedKey = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey)
  return toBase64(exportedKey)
}
