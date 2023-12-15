import { IState, SetStateFunc } from "./IState"
import { WebCryptoRSA } from "../../../WebCryptoRSA"

export async function doEncrypt(state: Partial<IState>, setState: SetStateFunc) {
  
  if (!state.plainMessage) return
  if (!state.publicKeyBase64) return
  
  try {
    const rsaWebCrypto = new WebCryptoRSA()
    const encrypted = await rsaWebCrypto.encrypt2(state.plainMessage, state.publicKeyBase64)
    
    setState(prev => ({
      ...prev,
      encryptedMessage: encrypted
    }))
  } catch (error: any) {
    setState(prev => ({
      ...prev,
      encryptedMessage: error
    }))
  }
}
