import React, { useEffect } from "react"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
  Box
} from "@mui/material"

import { step1_GenerateKeyPair } from "./step1_GenerateKeyPair"
import { FullWidthTextarea } from "../../parts/FullWidthTextarea"
import { IState } from "./IState"
import { step2_Encrypt } from "./step2_Encrypt"
import { step3_Decrypt } from "./step3_Decrypt"
import { EncryptedMessage } from "./EncryptedMessage"
import { PublicKey } from "./PublicKey"
import { PrivateKey } from "./PrivateKey"

export const TestRSA_Manual = () => {
  
  const [state, setState] = React.useState<Partial<IState>>({ keySize: 1024 })
  
  useEffect(() => {
    step1_GenerateKeyPair(state, setState)
  }, [state.keyPair])
  
  useEffect(() => {
    // step2_Encrypt(state, setState)
  }, [state.keyPair, state.type])
  
  useEffect(() => {
    step3_Decrypt(state, setState)
  }, [state.encryptedMessage])
  
  useEffect(() => {
    console.debug(state)
  }, [state])
  
  return (
    <>
      <h1>Test RSA manually</h1>
      <Box>
        <Button onClick={() => {setState({})}}>Regenerate</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableBody>

            <TableRow>
              <TableCell>Public Key Base64</TableCell>
              <TableCell>
                <PublicKey state={state} setState={setState} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Encrypted Message</TableCell>
              <TableCell>
                <EncryptedMessage state={state} setState={setState} />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Private Key Base64</TableCell>
              <TableCell>
                <PrivateKey state={state} setState={setState} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Decrypted Message</TableCell>
              <TableCell>
                <FullWidthTextarea maxRows={6} minRows={3} value={state?.decryptedMessage} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

