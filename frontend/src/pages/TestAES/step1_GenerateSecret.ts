import { IState, SetStateFunc } from "./IState"
import { WebCryptoAES } from "../../WebCryptoAES"

export async function step1_GenerateSecret(state: Partial<IState>, setState: SetStateFunc) {
  
  if (state.secret) return
  
  const crypto = new WebCryptoAES()
  
  const secret = await crypto.generate()
  
  setState(prev => ({
    ...prev,
    secret
  }))
}