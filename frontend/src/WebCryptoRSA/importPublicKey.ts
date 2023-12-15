import { Base64String } from "../types/Base64String"
import { fromBase64 } from "../utils/fromBase64"

export function importPublicKey(publicKeyText: Base64String): Promise<CryptoKey> {
  // Decode the Base64-encoded public key string to get the raw key data
  const buffer = fromBase64(publicKeyText)
  
  // Import the public key as a CryptoKey
  return window.crypto.subtle.importKey(
    "spki",
    buffer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["encrypt"]
  )
}
