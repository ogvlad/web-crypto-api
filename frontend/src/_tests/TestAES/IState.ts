import { IAESSecret } from "../../types/IWebCryptoAES"

export type SetStateFunc =  React.Dispatch<React.SetStateAction<Partial<IState>>>

export interface IState {
  secret: IAESSecret
  plainMessage: string
  encryptedMessage: string
  decryptedMessage: string
}
