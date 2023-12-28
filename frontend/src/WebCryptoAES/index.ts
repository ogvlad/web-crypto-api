import { IAESSecret, IWebCryptoAES } from "../types/IWebCryptoAES"
import { Base64String } from "../types/Base64String"
import { generateAESSecret } from "./generateAESSecret"
import { decryptWithAES } from "./decryptWithAES"
import { importKey } from "./importKey"
import { fromBase64 } from "../utils/fromBase64"
import { toBase64 } from "../utils/toBase64"

export class WebCryptoAES implements IWebCryptoAES {
  async generate(): Promise<IAESSecret> {
    const secret = await generateAESSecret()
    return { key: secret.key, iv: secret.iv }
  }
  
  async encrypt(data: string, secret: IAESSecret): Promise<Base64String> {
    try {
      const aesKey = await importKey(secret.key)
      const iv = fromBase64(secret.iv)
      const binary = new TextEncoder().encode(data)
    
      const encryptedData = await crypto.subtle.encrypt({ name: "AES-CBC", iv }, aesKey, binary)
    
      return toBase64(encryptedData)
    } catch (error) {
      console.error("Error encrypting with AES:", error)
      throw error
    }
  }
  
  async decrypt(encryptedData: Base64String, secret: IAESSecret): Promise<string> {
    return await decryptWithAES(encryptedData, secret.key, secret.iv)
  }
}
