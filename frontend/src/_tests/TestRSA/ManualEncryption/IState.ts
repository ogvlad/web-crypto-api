import { Base64String } from "../../../types/Base64String"

export type SetStateFunc =  React.Dispatch<React.SetStateAction<Partial<IState>>>

export interface IState {
  publicKeyBase64: Base64String
  plainMessage: string
  encryptedMessage: string
  log: string
}

export interface IProps {
  state: Partial<IState>,
  setState: SetStateFunc
}