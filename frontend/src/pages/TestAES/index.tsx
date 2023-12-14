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

import { IState } from "./IState"
import { step1_GenerateSecret } from "./step1_GenerateSecret"
import { step2_Encrypt } from "./step2_Encrypt"
import { step3_Decrypt } from "./step3_Decrypt"

import { FullWidthTextarea } from "../parts/FullWidthTextarea"
import { SampleEncryptedMessage, SampleSecret } from "./sample"

export const TestAES = () => {
  
  const [state, setState] = React.useState<Partial<IState>>({
    secret: SampleSecret,
    encryptedMessage: SampleEncryptedMessage,
  })
  
  useEffect(() => {
    // step1_GenerateSecret(state, setState)
  }, [state.secret])
  
  useEffect(() => {
    // step2_Encrypt(state, setState)
  }, [state.secret])
  
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
              <TableCell>Secret Key</TableCell>
              <TableCell>
                <FullWidthTextarea maxRows={14} minRows={8} value={state?.secret && state?.secret.key} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Secret IV</TableCell>
              <TableCell>
                <FullWidthTextarea maxRows={14} minRows={8} value={state?.secret && state?.secret.iv} />
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

