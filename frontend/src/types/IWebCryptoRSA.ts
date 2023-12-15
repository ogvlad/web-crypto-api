import { GetTokenFunc } from "./GetTokenFunc"
import { Base64String } from "./Base64String"

export interface IWebCryptoRSA {
  generateKeyPair: (getToken: GetTokenFunc) => Promise<IRSAKeyPair>
  encrypt: (data: string, publicKey: CryptoKey) => Promise<Base64String>
  encrypt2: (plainData: string, publicKey: Base64String) => Promise<Base64String>
  decrypt: (encryptedData: Base64String, privateKey: CryptoKey) => Promise<string>
  decrypt2: (encryptedData: Base64String, privateKey: Base64String) => Promise<string>
}

export interface IRSAKeyPair {
  privateKey: CryptoKey
  privateKeyBase64: Base64String
  publicKey: CryptoKey
  publicKeyBase64: Base64String
  publickKeyPem: string
}