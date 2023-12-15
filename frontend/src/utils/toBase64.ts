import { Base64String } from "../types/Base64String"

export function toBase64(buffer: ArrayBuffer): Base64String {
  let binary = ""
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  
  return window.btoa(binary)
}
