import React, { cloneElement } from 'react'
import { 
  AppBar, 
  Toolbar, 
  useScrollTrigger, 
  Typography 
} from '@material-ui/core'

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
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h3">
            Arc Development
          </Typography>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  )
}

export default Header;
