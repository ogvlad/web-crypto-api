import { Base64String } from "../types/Base64String"
import { fromBase64 } from "../utils/fromBase64"

export async function importKey(aesKeyBase64: Base64String) {
  const aesKeyBytes = fromBase64(aesKeyBase64)
  return crypto.subtle.importKey("raw", aesKeyBytes, { name: "AES-CBC" }, false, ["encrypt"])
}