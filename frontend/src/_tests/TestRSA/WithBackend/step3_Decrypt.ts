import { WebCryptoRSA } from "../../../WebCryptoRSA"
import { IState, SetStateFunc } from "./IState"

export async function step3_Decrypt(state: Partial<IState>, setState: SetStateFunc) {
  
  if (!state.keyPair) return
  if (!state.encryptedMessage) return
  
  try {
    const rsaWebCrypto = new WebCryptoRSA()
    const decrypted = await rsaWebCrypto.decrypt2(state.encryptedMessage, state.keyPair.privateKeyBase64)
    
    setState(prev => ({
      ...prev,
      decryptedMessage: decrypted
    }))
  } catch (error: any) {
    setState(prev => ({
      ...prev,
      decryptedMessage: error
    }))
  }
}
