import React, { cloneElement, Fragment, useState, useEffect } from 'react'
import { 
  AppBar,
  Button,
  Menu,
  MenuItem,
  Toolbar, 
  useScrollTrigger,
  Tabs,
  Tab
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
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
    height: "8em"
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  tabContainer: {
    marginLeft: "auto"
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px"
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px",
  }
}))

const Header = () => {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  
  const handleChange = (e, value) => {
    setValue(value)
  }
  
  const handleClick = e => {
    setAnchorEl(e.currentTarget)
    setOpen(true)
  }

  const handleClose = e => {
    setAnchorEl(null)
    setOpen(false)
  }

  useEffect(() => {
    if(window.location.pathname === "/" && value !== 0) setValue(0)
    else if(window.location.pathname === "/services" && value !== 1) setValue(1)
    else if(window.location.pathname === "/revolution" && value !== 2) setValue(2)
    else if(window.location.pathname === "/about" && value !== 3) setValue(3)
    else if(window.location.pathname === "/contact" && value !== 4) setValue(4)
    else if(window.location.pathname === "/estimate" && value !== 5) setValue(5)
  }, [value])

  return (
    <Fragment>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar disableGutters>
            <Button 
              component={Link} 
              to="/" 
              disableRipple
              onClick={() => setValue(0)}
              className={classes.logoContainer}
            >
              <img src={logo} alt="company logo" className={classes.logo} />
            </Button>
            <Tabs 
              value={value} 
              onChange={handleChange} 
              className={classes.tabContainer}
              indicatorColor="primary"
            >
              <Tab className={classes.tab} component={Link} to="/" label="Home" />
              <Tab
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup={anchorEl ? "true" : undefined}
                className={classes.tab} 
                component={Link}
                onMouseOver={event => handleClick(event)}
                to="/services" 
                label="Services" 
              />
              <Tab className={classes.tab} component={Link} to="/revolution" label="The Revolution" />
              <Tab className={classes.tab} component={Link} to="/about" label="About Us" />
              <Tab className={classes.tab} component={Link} to="/contact" label="Contact Us" />
            </Tabs>
            <Button 
              variant="contained" 
              color="secondary" 
              className={classes.button}
            >
              Free Estimate
            </Button>
            <Menu 
              id="simple-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{onMouseLeave: handleClose}}
            >
              <MenuItem onClick={handleClose}>
                Custom Software Development
              </MenuItem>
              <MenuItem onClick={handleClose}>
                Mobile App Development
              </MenuItem>
              <MenuItem onClick={handleClose}>
                Website Development
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </Fragment>
  )
}

export default Header;
