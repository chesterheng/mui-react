import React, { cloneElement, Fragment } from 'react'
import { 
  AppBar, 
  Toolbar, 
  useScrollTrigger,
  Tabs,
  Tab
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import logo from '../../assets/logo.svg'

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
    ...theme.mixins.toolbar,
    marginBottom: "3em"
  },
  logo: {
    height: "7em"
  },
  tabContainer: {
    marginLeft: "auto"
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px"
  }
}))

const Header = () => {
  const classes = useStyles()

  return (
    <Fragment>
      <ElevationScroll>
        <AppBar position="fixed" color="primary">
          <Toolbar disableGutters>
            <img src={logo} alt="company logo" className={classes.logo}/>
            <Tabs className={classes.tabContainer}>
              <Tab className={classes.tab} label="Home" />
              <Tab className={classes.tab} label="Services" />
              <Tab className={classes.tab} label="The Revolution" />
              <Tab className={classes.tab} label="About Us" />
              <Tab className={classes.tab} label="Contact Us" />
            </Tabs>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </Fragment>
  )
}

export default Header;
