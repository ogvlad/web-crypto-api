import { IState, SetStateFunc } from "./IState"
import axios from "axios"

export async function step2_Encrypt(state: Partial<IState>, setState: SetStateFunc) {
  
  if (!state.keyPair) return
  
  const url = state.type === "xml"
    ? "http://localhost:5208/crypto/rsa-xml"
    : "http://localhost:5208/crypto/rsa-binary"

  const payload = {
    publicKeyBase64: state.keyPair.publicKeyBase64,
  }
  
  axios.post(url, payload)
    .then(response => {
      console.log("Server encryption successful")
      console.log(response.data)
      setState(prev => ({
        ...prev,
        encryptedMessage: response.data.encryptedMessage,
        log: response.data.mode
      }))
    })
  
}
