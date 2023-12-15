import React, { useEffect } from "react"
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

import { step1_GenerateKeyPair } from "./step1_GenerateKeyPair"
import { FullWidthTextarea } from "../../parts/FullWidthTextarea"
import { IState } from "./IState"
import { step2_Encrypt } from "./step2_Encrypt"
import { step3_Decrypt } from "./step3_Decrypt"

export const TestRSA_Single = () => {
  
  const [state, setState] = React.useState<Partial<IState>>({})
  
  useEffect(() => {
    step1_GenerateKeyPair(state, setState)
  }, [state.keyPair])
  
  useEffect(() => {
    step2_Encrypt(state, setState)
  }, [state.keyPair])
  
  useEffect(() => {
    step3_Decrypt(state, setState)
  }, [state.encryptedMessage])
  
  useEffect(() => {
    // console.log(data)
  }, [state])
  
  return (
    <>
      <h1>Test RSA Process</h1>
      <Box>
        <Button onClick={() => {setState({})}}>Regenerate</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableBody>
            <TableRow>
              <TableCell>Sample</TableCell>
              <TableCell>{state?.sample}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Public Key Base64</TableCell>
              <TableCell>
                <FullWidthTextarea maxRows={14} minRows={8} value={state?.keyPair && state?.keyPair.publicKeyBase64} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Private Key Base64</TableCell>
              <TableCell>
                <FullWidthTextarea maxRows={14} minRows={8} value={state?.keyPair && state?.keyPair.privateKeyBase64} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Plain Message</TableCell>
              <TableCell>
                <FullWidthTextarea maxRows={6} minRows={3} value={state?.plainMessage} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Encrypted Message</TableCell>
              <TableCell>
                <FullWidthTextarea maxRows={14} minRows={8} value={state?.encryptedMessage} />
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

