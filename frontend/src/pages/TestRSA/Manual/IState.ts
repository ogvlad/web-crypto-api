import { IRSAKeyPair } from "../../../types/IWebCryptoRSA"
import { Base64String } from "../../../types/Base64String"

export type SetStateFunc =  React.Dispatch<React.SetStateAction<Partial<IState>>>

export interface IState {
  type: string
  keySize: number
  keyPair: {
    privateKeyBase64: Base64String
    publicKeyBase64: Base64String
  }
  encryptedMessage: string
  decryptedMessage: string
  log: string
}

export interface IProps {
  state: Partial<IState>,
  setState: SetStateFunc
}