import { Base64String } from "./Base64String"

export interface IWebCryptoAES {
  generate: () => Promise<IAESSecret>
  encrypt: (data: string, secret: IAESSecret) => Promise<Base64String>
  decrypt: (encryptedData: Base64String, secret: IAESSecret) => Promise<string>
}

export interface IAESSecret {
  key: Base64String
  iv: Base64String
}