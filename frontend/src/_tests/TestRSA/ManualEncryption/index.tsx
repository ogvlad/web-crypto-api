import React, { useEffect } from "react"

import { IState } from "./IState"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import { FullWidthTextarea } from "../../parts/FullWidthTextarea"
import { doEncrypt } from "./doEncrypt"

export const TestRSA_ManualEncryption = () => {
  
  const [state, setState] = React.useState<Partial<IState>>({ plainMessage: "Divide and Conquer" })
  
  const onMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, plainMessage: event.target.value })
  }
  const onKeyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, publicKeyBase64: event.target.value })
  }
  const onRun = () => {
    doEncrypt(state, setState)
  }
  
  return (
    <>
      <h1>Test RSA: Encrypt</h1>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableBody>
            <TableRow>
              <TableCell>Plain Message</TableCell>
              <TableCell>
                <FullWidthTextarea maxRows={14}
                                   minRows={8}
                                   value={state?.plainMessage ?? ""}
                                   placeholder={"Paste here..."}
                                   onChange={onMessageChange} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Public Key Base64</TableCell>
              <TableCell>
                <FullWidthTextarea maxRows={14}
                                   minRows={8}
                                   value={state?.publicKeyBase64 ?? ""}
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
                                   value={state?.encryptedMessage ?? ""}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    
    </>
  )
}

