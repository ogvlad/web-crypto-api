import React, { useEffect } from "react"
import { Table, TableContainer, TableHead, TableRow, TableCell, Paper, TableBody } from "@mui/material"
import { SampleData } from "./SampleData"
import { getFingerprintAsync } from "../getFingerprint"

export const TestFingerprint = () => {
  
  const [data, setData] = React.useState<any[]>([])
  
  useEffect(() => {
    const fetchData = async () => {
      const results = SampleData.map(async (item) => {
        return {
          sample: item,
          fingerprint: {
            cryptojs: "[removed]",
            webCrypto: await getFingerprintAsync(item)
          }
        }
      })
      const newData = await Promise.all(results)
      setData(newData)
    }
    fetchData()
  }, [])

  return (
    <>
      <h1>Test Fingerprint</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell component="th">Sample</TableCell>
              <TableCell component="th">CryptoJS</TableCell>
              <TableCell component="th">Web Crypto API</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow>
                <TableCell>{row.sample}</TableCell>
                <TableCell>{row.fingerprint.cryptojs}</TableCell>
                <TableCell>{row.fingerprint.webCrypto}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}