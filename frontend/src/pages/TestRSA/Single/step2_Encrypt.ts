import { WebCryptoRSA } from "../../../WebCryptoRSA"
import { IState, SetStateFunc } from "./IState"

const PlainMessage = "A quick brown fox jumps over the lazy dog"
export async function step2_Encrypt(state: Partial<IState>, setState: SetStateFunc) {
  
  if (!state.keyPair) return

  const rsaWebCrypto = new WebCryptoRSA()
  const encrypted = await rsaWebCrypto.encrypt(PlainMessage, state.keyPair.publicKey)
  
  setState(prev => ({
    ...prev,
    plainMessage: PlainMessage,
    encryptedMessage: encrypted
  }))
}