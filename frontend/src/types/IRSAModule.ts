import { GetTokenFunc } from "./GetTokenFunc"

export interface IRSAModule {
  generateKeyPair: (getToken: GetTokenFunc) => any
  encrypt: (data: string, publicKey: any) => any
  decrypt: (encryptedData: string, privateKey: any) => any
}
