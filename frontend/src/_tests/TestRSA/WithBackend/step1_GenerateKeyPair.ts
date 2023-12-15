import { WebCryptoRSA } from "../../../WebCryptoRSA"
import { IState, SetStateFunc } from "./IState"

const TEST_TOKEN_VALUE = "test token value"

export async function step1_GenerateKeyPair(state: Partial<IState>, setState: SetStateFunc) {
  
  if (state.keyPair) return
  
  const rsaWebCrypto = new WebCryptoRSA()
  
  const getToken = () => TEST_TOKEN_VALUE
  const keyPairWebCrypto = await rsaWebCrypto.generateKeyPair(getToken)
  
  setState(prev => ({
    ...prev,
    sample: TEST_TOKEN_VALUE,
    keyPair: keyPairWebCrypto
  }))
}