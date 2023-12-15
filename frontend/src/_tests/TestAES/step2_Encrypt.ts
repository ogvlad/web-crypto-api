import { IState, SetStateFunc } from "./IState"
import { WebCryptoAES } from "../../WebCryptoAES"

const PlainMessage = "A quick brown fox jumps over the lazy dog"
export async function step2_Encrypt(state: Partial<IState>, setState: SetStateFunc) {
  
  if (!state.secret) return
  
  const crypto = new WebCryptoAES()
  const encrypted = await crypto.encrypt(PlainMessage, state.secret)
  
  setState(prev => ({
    ...prev,
    plainMessage: PlainMessage,
    encryptedMessage: encrypted
  }))
}