import { Base64String } from "../types/Base64String"

export function fromBase64(base64: Base64String): Uint8Array {
  const binaryString = atob(base64)
  const byteArray = new Uint8Array(binaryString.length)
  
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i)
  }
  
  return byteArray
}
