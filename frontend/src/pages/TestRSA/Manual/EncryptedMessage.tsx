import { FullWidthTextarea } from "../../parts/FullWidthTextarea"
import React from "react"
import { IProps } from "./IState"

export function EncryptedMessage({state, setState}: IProps) {
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, encryptedMessage: event.target.value })
  }
  return (
    <FullWidthTextarea maxRows={14} minRows={8} value={state?.encryptedMessage} placeholder={"Paste cipher text here..."} onChange={onChange} />
  )
}

