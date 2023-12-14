
export interface IWebCryptoAES {
  generate: () => Promise<IAESSecret>
  encrypt: (data: string, secret: IAESSecret) => Promise<string>
  decrypt: (encryptedData: string, secret: IAESSecret) => Promise<string>
}

export interface IAESSecret {
  key: string
  iv: string
}