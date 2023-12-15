import { IRSAKeyPair } from "../../../types/IWebCryptoRSA"

export type SetStateFunc =  React.Dispatch<React.SetStateAction<Partial<IState>>>

export interface IState {
  sample: string
  keyPair: IRSAKeyPair
  plainMessage: string
  encryptedMessage: string
  decryptedMessage: string
}
