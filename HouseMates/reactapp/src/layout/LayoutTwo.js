import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import Footer from '../components/Footer'
import SideNav from '../components/SideNav'
import NavBar from '../components/NavBar'

// LayoutTwo consists of NavBar on top of the component, SideNav at the side and Footer at the bottom.
const LayoutTwo = ({ children, postErrorMsg, postLoading, formErrorMsg, formLoading }) => {
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

  // Components
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }

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

      {/* Error message */}
      {postErrorMsg &&
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={true}
        >
          <Alert severity="error">{postErrorMsg}</Alert>
        </Snackbar>
      }

      {formErrorMsg &&
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={true}
        >
          <Alert severity="error">{formErrorMsg}</Alert>
        </Snackbar>
      }

      {/* Content */}
      <main className={classes.content}>
        {/* Top padding */}
        <div className={classes.toolbar} />

        <div style={{ display: 'flex' }}>
          {/* Side padding */}
          <div className={!menuOpen ? classes.closeSize : classes.openSize} />

          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Loading spinner */}
            {(postLoading || formLoading) && <CircularProgress style={{ marginBottom: 40 }} />}

            {/* Main content */}
            <div style={{ width: '100%'}}>{children}</div>

            {/* Footer */}
            <div style={{ marginTop: 60 }}>
              <Footer/>
            </div>
          </div>
        </div>
      </main>
    </div >
  )
}

const mapStateToProps = state => ({
  postErrorMsg: state.post.errorMsg,
  postLoading: state.post.loading,
  formErrorMsg: state.form.errorMsg,
  formLoading: state.form.loading,
})

export default connect(mapStateToProps)(LayoutTwo)
