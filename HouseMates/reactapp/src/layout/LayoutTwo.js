import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import Footer from '../components/Footer'
import SideNav from '../components/SideNav'
import NavBar from '../components/NavBar'
import { resetFormErrorMsg } from '../redux/form/actions'
import { resetPostErrorMsg } from '../redux/post/actions'

// LayoutTwo consists of NavBar on top of the component, SideNav at the side and Footer at the bottom.
const LayoutTwo = ({
  children,
  formErrorMsg, formLoading, postErrorMsg, postLoading,
  resetFormErrorMsg, resetPostErrorMsg,
}) => {

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
  // SideNav
  const handleMenuButton = () => { setMenuOpen(!menuOpen) }
  const handleMouseEnter = () => { setHoverOpen(true) }
  const handleMouseLeave = () => { setHoverOpen(false) }
  // Error message
  const handleClose = () => {
    resetPostErrorMsg()
    resetFormErrorMsg()
  }

  // Components
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }

  return (
    <div>
      {/* Error messages */}
      {(postErrorMsg || formErrorMsg) &&
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={postErrorMsg || formErrorMsg}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert severity="error">{postErrorMsg ? postErrorMsg : formErrorMsg}</Alert>
        </Snackbar>}

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
              <div style={{ width: '100%' }}>{children}</div>

              {/* Footer */}
              <div style={{ marginTop: 60 }}>
                <Footer />
              </div>
            </div>
          </div>
        </main>
      </div >
    </div>
  )
}


// Redux
const mapStateToProps = state => ({
  formErrorMsg: state.form.formErrorMsg,
  formLoading: state.form.formLoading,
  postErrorMsg: state.post.postErrorMsg,
  postLoading: state.post.postLoading,
})

const mapDispatchToProps = {
  resetFormErrorMsg,
  resetPostErrorMsg,
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutTwo)
