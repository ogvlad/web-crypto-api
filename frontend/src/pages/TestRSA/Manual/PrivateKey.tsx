import { FullWidthTextarea } from "../../parts/FullWidthTextarea"
import React from "react"
import { IProps } from "./IState"

export function PrivateKey({ state, setState }: IProps) {
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!state.keyPair) return
    setState({
      ...state, keyPair: {
        ...state.keyPair,
        privateKeyBase64: event.target.value
      }
    })
  }
  return (
    <FullWidthTextarea maxRows={16} minRows={12} value={state?.keyPair && state?.keyPair.privateKeyBase64}
                       onChange={onChange} />
  )
}

