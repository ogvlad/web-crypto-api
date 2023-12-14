import React from "react"
import { AppBar, styled, Toolbar, Typography } from "@mui/material"

const AppBarStyled = styled(AppBar)({
  position: "static",
  backgroundColor: "#444159",
})

export function AppHeader(props: any) {
  return (
    <AppBarStyled>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Web Crypto API wrapper
        </Typography>
      </Toolbar>
    </AppBarStyled>
  )
}
