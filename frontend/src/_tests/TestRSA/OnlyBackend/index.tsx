import React, { useEffect, useState } from "react"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Button,
  Box
} from "@mui/material"

import { FullWidthTextarea } from "../../parts/FullWidthTextarea"
import { IState } from "./IState"
import { step2_Encrypt } from "./step2_Encrypt"
import { step3_Decrypt } from "./step3_Decrypt"

export const TestRSA_OnlyBackend = () => {
  
  const [state, setState] = React.useState<Partial<IState>>({ type: "binary" })
  const [privateKey, setPrivateKey] = useState("")
  const [publicKey, setPublicKey] = useState("")
  const [encryptedMessage, setEncryptedMessage] = useState("")
  const [decryptedMessage, setDecryptedMessage] = useState("")
  const [log, setLog] = useState("")

  useEffect(() => {
    step2_Encrypt(publicKey, setEncryptedMessage, setLog)
  }, [publicKey])
  
  useEffect(() => {
    step3_Decrypt(privateKey, encryptedMessage, setDecryptedMessage, setLog)
  }, [privateKey])

  return (
    <>
      <h1>Test RSA Only on Backend</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableBody>
            <TableRow>
              <TableCell>Public Key Base64</TableCell>
              <TableCell>
                <FullWidthTextarea maxRows={14} minRows={8}
                                   value={publicKey}
                                   onChange={e => setPublicKey(e.target.value)}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Private Key Base64</TableCell>
              <TableCell>
                <FullWidthTextarea maxRows={14} minRows={8}
                                   value={privateKey}
                                   onChange={e => setPrivateKey(e.target.value)}
                />
              </TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell>Encrypted Message</TableCell>
              <TableCell>
                <FullWidthTextarea maxRows={14} minRows={8}
                                   value={encryptedMessage}
                                   onChange={e => setEncryptedMessage(e.target.value)}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Log</TableCell>
              <TableCell>
                <FullWidthTextarea maxRows={4} minRows={2} value={log} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Decrypted Message</TableCell>
              <TableCell>
                <FullWidthTextarea maxRows={6} minRows={3} value={decryptedMessage} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

