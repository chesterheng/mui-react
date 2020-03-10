import React, { cloneElement } from 'react'
import { AppBar, Toolbar, useScrollTrigger } from '@material-ui/core'

const ElevationScroll = ({ children }) => {

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

const Header = () => {
  return (
    <ElevationScroll>
      <AppBar position="fixed" color="secondary">
        <Toolbar>Arc Development</Toolbar>
      </AppBar>
    </ElevationScroll>
  )
}

export default Header;
