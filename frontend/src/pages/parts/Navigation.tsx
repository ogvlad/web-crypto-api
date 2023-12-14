import React, { useState } from "react"
// import { useHistory } from "react-router-dom"

import Box from "@mui/material/Box"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import HomeIcon from "@mui/icons-material/Home"
import KeyIcon from "@mui/icons-material/Key"
import VpnKeyIcon from "@mui/icons-material/VpnKey"
import FingerprintIcon from "@mui/icons-material/Fingerprint"
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded"
import { Drawer, List, ListItem, ListItemText, ListItemButton, ListItemIcon, Toolbar } from "@mui/material"

const drawerWidth = 240

export const Navigation = (props: any) => {
  const { drawerOpen, handleDrawerToggle } = props
  
  // const history = useHistory()
  const [value, setValue] = React.useState(0)
  
  const navigate = (url: string) => {
    // history.push(url)
  }
  
  return (
    <List>
      <NavButton onClick={() => navigate("/")} text={"Home"} icon={<HomeIcon />} />
      <NavButton onClick={() => navigate("/fingerprint")} text={"Fingerprint"} icon={<FingerprintIcon />} />
      <NavButton onClick={() => navigate("/aes")} text={"AES Process"} icon={<LockOpenRoundedIcon />} />
      <NavButton onClick={() => navigate("/rsa")} text={"RSA Keys"} icon={<KeyIcon />} />
      <NavButton onClick={() => navigate("/rsa-single")} text={"RSA Process"} icon={<VpnKeyIcon />} />
      <NavButton onClick={() => navigate("/rsa-backend")} text={"RSA With Backend"} icon={<VpnKeyIcon />} />
      <NavButton onClick={() => navigate("/rsa-manual")} text={"RSA Manual"} icon={<VpnKeyIcon />} />
    </List>
  )
}

const NavButton = (props: any) => {
  const { onClick, text, icon } = props
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  )
}