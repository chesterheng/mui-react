import React from 'react'
import { makeStyles } from '@material-ui/styles'
import footerAdorment from '../../assets/Footer Adornment.svg'

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.common.blue,
    width: "100%",
    zIndex: 1302,
    position: "relative"
  },
  adorment: {
    width: "25em",
    verticalAlign: "bottom",
    [theme.breakpoints.down("md")]: {
      width: "21em"
    },
    [theme.breakpoints.down("xs")]: {
      width: "15em"
    }
  }
}))

const Footer = props => {
  const classes = useStyles()
  return (
    <footer className={classes.footer}>
      <img 
        alt="black decorative slash" 
        src={footerAdorment} 
        className={classes.adorment}
      >
      </img>
    </footer>
  )
}

export default Footer
