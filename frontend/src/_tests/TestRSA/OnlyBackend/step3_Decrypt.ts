import { WebCryptoRSA } from "../../../WebCryptoRSA"
import { IState, SetStateFunc } from "./IState"

export async function step3_Decrypt(privateKeyBase64, encryptedMessage, setDecryptedMessage, setLog) {
  
  if (!privateKeyBase64) return
  if (!encryptedMessage) return
  
  try {
    const rsaWebCrypto = new WebCryptoRSA()
    const decrypted = await rsaWebCrypto.decrypt2(encryptedMessage, privateKeyBase64)
    
    setDecryptedMessage(decrypted)
  } catch (error: any) {
    setDecryptedMessage(error)
  }
}
