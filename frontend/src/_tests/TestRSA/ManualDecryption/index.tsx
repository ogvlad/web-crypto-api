import React, { useEffect } from "react"

import { IState } from "./IState"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import { FullWidthTextarea } from "../../parts/FullWidthTextarea"
import { doDecrypt } from "./doDecrypt"

export const TestRSA_ManualDecryption = () => {
  
  const [state, setState] = React.useState<Partial<IState>>({ plainMessage: "" })
  
  const onMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, encryptedMessage: event.target.value })
  }
  const onKeyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, privateKeyBase64: event.target.value })
  }
  const onRun = () => {
    doDecrypt(state, setState)
  }
  
  return (
    <>
      <h1>Test RSA: Decrypt</h1>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableBody>
            <TableRow>
              <TableCell>Encrypted Message</TableCell>
              <TableCell>
                <FullWidthTextarea maxRows={14}
                                   minRows={8}
                                   value={state?.encryptedMessage ?? ""}
                                   placeholder={"Paste here..."}
                                   onChange={onMessageChange} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Private Key Base64</TableCell>
              <TableCell>
                <FullWidthTextarea maxRows={14}
                                   minRows={8}
                                   value={state?.privateKeyBase64 ?? ""}
                                   onChange={onKeyChange} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Button variant="contained" onClick={onRun}>Run</Button>
              </TableCell>
              <TableCell>
                <FullWidthTextarea maxRows={14}
                                   minRows={8}
                                   value={state?.plainMessage ?? ""}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    
    </>
  )
}

