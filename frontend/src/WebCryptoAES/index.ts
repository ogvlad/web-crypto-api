import { IAESSecret, IWebCryptoAES } from "../types/IWebCryptoAES"
import { Base64String } from "../types/Base64String"
import { generateAESSecret } from "./generateAESSecret"
import { encryptWithBase64AESKeyAndIV } from "./encryptWithBase64AESKeyAndIV"
import { decryptWithAES } from "./decryptWithAES"

export class WebCryptoAES implements IWebCryptoAES {
  async generate(): Promise<IAESSecret> {
    const secret = await generateAESSecret()
    return { key: secret.key, iv: secret.iv }
  }
  
  async encrypt(data: string, secret: IAESSecret): Promise<Base64String> {
    return await encryptWithBase64AESKeyAndIV(data, secret.key, secret.iv)
  }
  
  async decrypt(encryptedData: Base64String, secret: IAESSecret): Promise<string> {
    return await decryptWithAES(encryptedData, secret.key, secret.iv)
  }
}
