import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Footer from '../components/Footer'
import SideNav from '../components/SideNav'
import NavBar from '../components/NavBar'

// LayoutTwo consists of NavBar on top of the component, SideNav at the side and Footer at the bottom.
const LayoutTwo = ({ children }) => {
  // Styling
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    flex: {
      display: 'flex',
    },
    closeSize: {
      minHeight: 100,
      width: theme.spacing(7) + 1,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    openSize: {
      minHeight: 100,
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  }))

  // Constants
  const drawerWidth = 190

  // Hooks
  const classes = useStyles()

  // States
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(true)
  var hoverOpen = true

  // Handlers
  const handleDrawerOpen = () => {
    hoverOpen = true
    setTimeout(() => (hoverOpen ? setOpen(true) : null), 1000)
  }
  const handleDrawerClose = () => {
    hoverOpen = false
    setOpen(false)
  }
  const handleDrawerToggle = () => {
    setOpen(!open)
    open === true ? setHover(true) : setHover(false)
  }

  return (
    <div className={classes.root}>
      {/* NavBar */}
      <NavBar handleDrawerToggle={handleDrawerToggle} />

      {/* SideNav */}
      <SideNav
        drawerWidth={drawerWidth}
        open={open}
        hover={hover}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />

      {/* Component */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.flex}>
          <div
            className={hover ? classes.closeSize : classes.openSize}
          />
          {children}
        </div>

        {/* Footer */}
        <Box mt={8}><Footer /></Box>
      </main>
    </div>
  )
}

export default LayoutTwo
