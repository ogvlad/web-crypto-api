import { Base64String } from "../types/Base64String"
import { fromBase64 } from "../utils/fromBase64"

export function importPrivateKey(privateKeyText: Base64String): Promise<CryptoKey> {
  const buffer = fromBase64(privateKeyText)
  
  return window.crypto.subtle.importKey(
    "pkcs8",
    buffer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["decrypt"]
  )
}
