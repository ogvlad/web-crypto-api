import { FullWidthTextarea } from "../../parts/FullWidthTextarea"
import React from "react"
import { IProps } from "./IState"

export function PublicKey({ state, setState }: IProps) {
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!state.keyPair) return
    setState({
      ...state, keyPair: {
        ...state.keyPair,
        publicKeyBase64: event.target.value
      }
    })
  }
  return (
    <FullWidthTextarea maxRows={14} minRows={8} value={state?.keyPair && state?.keyPair.publicKeyBase64}
                       onChange={onChange} />
  )
}

