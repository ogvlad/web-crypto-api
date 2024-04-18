import axios from "axios"

export async function step2_Encrypt(publicKeyBase64, setState, setLog) {
  
  if (!publicKeyBase64) return
  
  const url = "http://localhost:5208/crypto/rsa-binary"

  const payload = {
    publicKeyBase64: publicKeyBase64,
    publicKeyXml: publicKeyBase64,
  }
  
  axios.post(url, payload)
    .then(response => {
      console.log("Server encryption successful")
      console.log(response.data)
      setState(response.data.encryptedMessage)
      setLog(response.data.mode)
    })
}
