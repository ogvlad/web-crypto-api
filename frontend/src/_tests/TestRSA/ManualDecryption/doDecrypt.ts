import { IState, SetStateFunc } from "./IState"
import { WebCryptoRSA } from "../../../WebCryptoRSA"

export async function doDecrypt(state: Partial<IState>, setState: SetStateFunc) {
  
  if (!state.encryptedMessage) return
  if (!state.privateKeyBase64) return
  
  try {
    const rsaWebCrypto = new WebCryptoRSA()
    const result = await rsaWebCrypto.decrypt2(state.encryptedMessage, state.privateKeyBase64)
    
    setState(prev => ({
      ...prev,
      plainMessage: result
    }))
  } catch (error: any) {
    setState(prev => ({
      ...prev,
      plainMessage: error
    }))
  }
}
