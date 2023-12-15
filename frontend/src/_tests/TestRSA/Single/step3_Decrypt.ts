import { WebCryptoRSA } from "../../../WebCryptoRSA"
import { IState, SetStateFunc } from "./IState"

export async function step3_Decrypt(state: Partial<IState>, setState: SetStateFunc) {
  
  if (!state.keyPair) return
  if (!state.encryptedMessage) return
  
  const rsaWebCrypto = new WebCryptoRSA()
  const decrypted = await rsaWebCrypto.decrypt(state.encryptedMessage, state.keyPair.privateKey)
  
  setState(prev => ({
    ...prev,
    decryptedMessage: decrypted
  }))
}
