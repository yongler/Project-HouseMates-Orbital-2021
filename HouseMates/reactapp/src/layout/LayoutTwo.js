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
      minHeight: theme.mixins.toolbar.minHeight + 8,
    },
    flex: {
      display: 'flex',
    },
    closeSize: {
      minHeight: 100,
      width: theme.spacing(8) + 1,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    openSize: {
      minHeight: 100,
      width: drawerWidth + 60,
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
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoverOpen, setHoverOpen] = useState(false)
  const drawerOpen = menuOpen || (!menuOpen && hoverOpen)

  // Handlers
  const handleMenuButton = () => { setMenuOpen(!menuOpen) }
  const handleMouseEnter = () => { setHoverOpen(true) }
  const handleMouseLeave = () => { setHoverOpen(false) }

  return (
    <div className={classes.root}>
      {/* NavBar */}
      <NavBar
        handleMenuButton={handleMenuButton}
      />

      {/* SideNav */}
      <SideNav
        drawerWidth={drawerWidth}
        menuOpen={menuOpen}
        hoverOpen={hoverOpen}
        drawerOpen={drawerOpen}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />

      {/* Component */}
      <main className={classes.content}>
        {/* Top padding */}
        <div className={classes.toolbar} />

        <div className={classes.flex}>
          {/* Side padding */}
          <div className={!menuOpen ? classes.closeSize : classes.openSize} />

          {/* Main content */}
          {children}
        </div>

        {/* Footer */}
        <Box mt={8}><Footer /></Box>
      </main>
    </div>
  )
}

export default LayoutTwo
