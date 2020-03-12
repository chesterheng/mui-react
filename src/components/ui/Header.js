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
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
    borderRadius: "0px"
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1
    }
  }
}))

const Header = () => {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  
  const handleChange = (e, value) => {
    setValue(value)
  }
  
  const handleClick = e => {
    setAnchorEl(e.currentTarget)
    setOpen(true)
  }

  const handleMenuItemClick = (e, index) => {
    setAnchorEl(null)
    setOpen(false)
    setSelectedIndex(index)
  }

  const handleClose = e => {
    setAnchorEl(null)
    setOpen(false)
  }

  const menuOptions = [
    { name: "Services", link: "/services"},
    { name: "Custom Software Development", link: "/customsoftware"},
    { name: "Mobile App Development", link: "/mobileapps"},
    { name: "Website Development", link: "/websites"}
  ]

  useEffect(() => {
    if(window.location.pathname === "/" && value !== 0) setValue(0)
    else if(window.location.pathname === "/services" && value !== 1) setValue(1)
    else if(window.location.pathname === "/revolution" && value !== 2) setValue(2)
    else if(window.location.pathname === "/about" && value !== 3) setValue(3)
    else if(window.location.pathname === "/contact" && value !== 4) setValue(4)
    else if(window.location.pathname === "/estimate" && value !== 5) setValue(5)

    switch(window.location.pathname) {
      case "/":
        if(value !== 0) setValue(0)
        break;
      case "/services":
        if(value !== 1) { setValue(1); setSelectedIndex(0); }
        break;
      case "/customsoftware":
        if(value !== 1) { setValue(1); setSelectedIndex(1); }
        break;
      case "/mobileapps":
        if(value !== 1) { setValue(1); setSelectedIndex(2); }
        break;
      case "/websites":
        if(value !== 1) { setValue(1); setSelectedIndex(3); }
        break;
      case "/revolution":
        if(value !== 2) setValue(2)
        break;
      case "/about":
        if(value !== 3) setValue(3)
        break;
      case "/contact":
        if(value !== 4) setValue(4)
        break;
      case "/estimate":
        if(value !== 5) setValue(5)
        break;
      default:
        break;
    }
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
              classes={{ paper: classes.menu }}
              MenuListProps={{ onMouseLeave: handleClose }}
              elevation={0}
            >
              {menuOptions.map(( option, index ) => (
                <MenuItem
                  key={index}
                  component={Link}
                  to={option.link}
                  classes={{ root: classes.menuItem }}
                  onClick={ event => { 
                    handleMenuItemClick(event, index); 
                    setValue(1);
                    handleClose(); 
                  }}
                  selected={ 
                    index === selectedIndex  && value === index
                  }
                >
                  {option.name}
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </Fragment>
  )
}

export default Header;
