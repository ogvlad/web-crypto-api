import { toBase64 } from "../utils/toBase64"
import { PUBLIC_EXPONENT_1 } from "./generateKeyPair"

export async function exportPublicKey(keyPair: any) {
  const exportedKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey)
  return toBase64(exportedKey)
}

export async function exportPublicKeyXml(keyPair: any) {
  const publicKeyBase64 = await exportPublicKey(keyPair)
  const publicExponentBase64 = toBase64(PUBLIC_EXPONENT_1)
  return `<RSAKeyValue><Modulus>${publicKeyBase64}</Modulus><Exponent>${publicExponentBase64}</Exponent></RSAKeyValue>`
}