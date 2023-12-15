import React, { PropsWithChildren } from "react"
import { Outlet  } from "react-router-dom";

import { styled } from "@mui/material"

import { Navigation } from "./parts/Navigation"
import { AppHeader } from "./parts/AppHeader"

const GridContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 3fr",
  gridTemplateRows: "auto 1fr auto",
  height: "100vh",
})

const Header = styled("div")({
  gridColumn: "1 / span 2",
  backgroundColor: "#444159",
})

const Sidebar = styled("div")({
  gridRow: "2 / span 2",
  backgroundColor: "#f6f6f6",
})

const Content = styled("div")({
  padding: "16px",
  overflowY: "auto",
  gridRow: "2 / 3",
})

const Footer = styled("div")({
  backgroundColor: "#f6f6f6",
  padding: "16px",
  gridRow: "3 / 4",
})

export function Layout(props: PropsWithChildren<any>) {
  
  const { children } = props
  
  return (
    <GridContainer>
      <Header>
        <AppHeader />
      </Header>
      
      <Sidebar>
        <Navigation />
      </Sidebar>
      
      <Content>
        <Outlet />
      </Content>
      
      <Footer>
      </Footer>
    </GridContainer>
  )
}
