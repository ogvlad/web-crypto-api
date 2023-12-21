import { toBase64 } from "../utils/toBase64"
import { fromBase64 } from "../utils/fromBase64"

const MODULUS_LENGTH = 2048
export const PUBLIC_EXPONENT_1 = new Uint8Array([0x01, 0x00, 0x01]) // 65537 // AQAB

export function generateKeyPair() {
    alert('creating keypair');

  return window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: MODULUS_LENGTH,
      publicExponent: PUBLIC_EXPONENT_1,
        //COMMENTS FROM SCD(RUPP):
        // hash: "SHA-256",
        //use only SHA-1 for OAEP mode
        hash: {name: "SHA-1"}

    },
    true,
    ["encrypt", "decrypt"]
  )
}
