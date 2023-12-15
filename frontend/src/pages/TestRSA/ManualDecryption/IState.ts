import { Base64String } from "../../../types/Base64String"

export type SetStateFunc =  React.Dispatch<React.SetStateAction<Partial<IState>>>

export interface IState {
  privateKeyBase64: Base64String
  encryptedMessage: string
  plainMessage: string
  log: string
}

export interface IProps {
  state: Partial<IState>,
  setState: SetStateFunc
}