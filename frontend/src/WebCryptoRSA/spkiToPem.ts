import { toBase64 } from "../utils/toBase64"

export async function spkiToPem(publicKey: any) {
  const base64Spki = toBase64(publicKey)
  const pemHeader = "-----BEGIN PUBLIC KEY-----\n"
  const pemFooter = "-----END PUBLIC KEY-----\n"
  const pemChunks: string[] = []
  let index = 0
  
  while (index < base64Spki.length) {
    pemChunks.push(base64Spki.slice(index, index + 64))
    index += 64
  }
  
  return pemHeader + pemChunks.join("\n") + "\n" + pemFooter
}
