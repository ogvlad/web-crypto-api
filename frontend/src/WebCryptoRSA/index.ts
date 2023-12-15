import { GetTokenFunc } from "../types/GetTokenFunc"
import { IWebCryptoRSA } from "../types/IWebCryptoRSA"
import { Base64String } from "../types/Base64String"
import { getKeyPair } from "./getKeyPair"
import { toBase64 } from "../utils/toBase64"
import { importPublicKey } from "./importPublicKey"
import { fromBase64 } from "../utils/fromBase64"
import { importPrivateKey } from "./importPrivateKey"

const ITERATIONS = 100000

export class WebCryptoRSA implements IWebCryptoRSA {
  
  async generateKeyPair(getToken: GetTokenFunc) {
    return await getKeyPair(getToken(), ITERATIONS)
  }
  
  async encrypt(data: string, publicKey: CryptoKey) {
    const dataBuffer = new TextEncoder().encode(data)
    
    const bytes = await crypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      publicKey,
      dataBuffer
    )
    return toBase64(bytes)
  }
  
  async encrypt2(plainData: string, publicKey: Base64String) {
    const publicKeyCryptoKey = await importPublicKey(publicKey)
    return this.encrypt(plainData, publicKeyCryptoKey)
  }
  
  // ENCRYPT: string > bytes > encrypt > bytes > Base64
  // DECRYPT: Base64 > bytes > decrypt > bytes > string
  
  async decrypt(encryptedData: Base64String, privateKey: CryptoKey) {
    const dataBuffer = fromBase64(encryptedData)
    const bytes = await crypto.subtle.decrypt(
      {
        name: "RSA-OAEP",
      },
      privateKey,
      dataBuffer
    )
    return new TextDecoder().decode(bytes)
  }
  
  async decrypt2(encryptedData: Base64String, privateKey: Base64String): Promise<string> {
    const publicKeyCryptoKey = await importPrivateKey(privateKey)
    return this.decrypt(encryptedData, publicKeyCryptoKey)
  }
}



