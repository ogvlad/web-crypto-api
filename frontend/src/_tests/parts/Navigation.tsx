import React from "react"
import { useNavigate } from "react-router-dom"

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
  const navigate = useNavigate()
  
  const [value, setValue] = React.useState(0)
  
  
  return (
    <List>
      <NavButton onClick={() => navigate("/")} text={"Home"} icon={<HomeIcon />} />
      <NavButton onClick={() => navigate("/fingerprint")} text={"Fingerprint"} icon={<FingerprintIcon />} />
      <NavButton onClick={() => navigate("/aes")} text={"AES Process"} icon={<LockOpenRoundedIcon />} />
      <NavButton onClick={() => navigate("/rsa-single")} text={"RSA Auto"} icon={<VpnKeyIcon />} />
      <NavButton onClick={() => navigate("/rsa-manual-encryption")} text={"RSA Encrypt"} icon={<VpnKeyIcon />} />
      <NavButton onClick={() => navigate("/rsa-manual-decryption")} text={"RSA Decrypt"} icon={<VpnKeyIcon />} />
      <NavButton onClick={() => navigate("/rsa-backend")} text={"RSA With Backend"} icon={<VpnKeyIcon />} />
      <NavButton onClick={() => navigate("/rsa-backend-only")} text={"RSA Only Backend"} icon={<VpnKeyIcon />} />
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