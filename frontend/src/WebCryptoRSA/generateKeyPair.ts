const MODULUS_LENGTH = 2048
const PUBLIC_EXPONENT = new Uint8Array([0x01, 0x00, 0x01]) // 65537

export function generateKeyPair() {
  return window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: MODULUS_LENGTH,
      publicExponent: PUBLIC_EXPONENT,
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  )
}
