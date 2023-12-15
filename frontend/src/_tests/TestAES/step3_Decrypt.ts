import { IState, SetStateFunc } from "./IState"
import { WebCryptoAES } from "../../WebCryptoAES"

export async function step3_Decrypt(state: Partial<IState>, setState: SetStateFunc) {
  
  if (!state.secret) return
  if (!state.encryptedMessage) return
  
  const crypto = new WebCryptoAES()
  const decrypted = await crypto.decrypt(state.encryptedMessage, state.secret)
  
  setState(prev => ({
    ...prev,
    decryptedMessage: decrypted
  }))
}
