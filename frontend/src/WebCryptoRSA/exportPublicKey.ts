import { toBase64 } from "../utils/toBase64"

export async function exportPublicKey(keyPair: any) {
  const exportedKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey)
  return toBase64(exportedKey)
}
