import React, { cloneElement, Fragment } from 'react'
import { 
  AppBar, 
  Toolbar, 
  useScrollTrigger, 
  Typography 
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const ElevationScroll = ({ children }) => {

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar
  }
}))

const Header = () => {
  const classes = useStyles()

  return (
    <Fragment>
      <ElevationScroll>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Typography variant="h3">Arc Development</Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </Fragment>
  )
}

export default Header;
