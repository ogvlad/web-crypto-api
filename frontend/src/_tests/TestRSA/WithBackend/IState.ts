import { IRSAKeyPair } from "../../../types/IWebCryptoRSA"

export type SetStateFunc =  React.Dispatch<React.SetStateAction<Partial<IState>>>

export interface IState {
  type: string
  sample: string
  keyPair: IRSAKeyPair
  encryptedMessage: string
  decryptedMessage: string
  log: string
}
