import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import MuiAlert from '@material-ui/lab/Alert'
import { Snackbar } from '@material-ui/core'
import { checkAuthentication, resetAuthErrorMsg } from '../redux/auth/actions'
import { resetFormErrorMsg } from '../redux/form/actions'
import { resetPostErrorMsg } from '../redux/post/actions'
import './layout.css'

const Layout = ({
  children,
  checkAuthentication,
  authErrorMsg, formErrorMsg, postErrorMsg,
  resetAuthErrorMsg, resetFormErrorMsg, resetPostErrorMsg,
}) => {

  // Handlers
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return

    if (authErrorMsg) resetAuthErrorMsg()
    if (formErrorMsg) resetFormErrorMsg()
    if (postErrorMsg) resetPostErrorMsg()
  }
  const handleBlur = e => { e.target.style.backgroundColor = "#f44336" }
  const handleFocus = e => {
    e.target.style.outline = "none"
    e.target.style.backgroundColor = "#d32f2f"
    e.target.classList.add("grow")
  }
  const handleMouseEnter = e => { if (e.target.style.backgroundColor !== "#d32f2f") e.target.style.backgroundColor = "#ea4033" }
  const handleMouseLeave = e => { e.target.style.backgroundColor = "#f44336" }

  // Hooks
  const location = useLocation()

  // componentDidUpdate
  useEffect(() => { window.scroll(0, 0) }, [location.pathname])

  // componentDidMount
  useEffect(() => { checkAuthentication() }, [])

  return (
    <div>
      {/* Error message */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={authErrorMsg || formErrorMsg || postErrorMsg}
        onClose={handleClose}
      >
        <MuiAlert
          action={
            <div className={"buttonHolder"}>
              <button
                autoFocus
                className={"button"}
                onBlur={handleBlur}
                onClick={handleClose}
                onFocus={handleFocus}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                tabIndex={0}
              >
                &#10006;
              </button>
            </div>
          }
          elevation={6}
          severity="error"
          variant="filled"
        >
          {authErrorMsg ? authErrorMsg : formErrorMsg ? formErrorMsg : postErrorMsg}
        </MuiAlert>
      </Snackbar>

      {/* Sheild */}
      {(authErrorMsg || formErrorMsg || postErrorMsg) &&
        <div className={"sheild"} />}

      {/* Layout */}
      {children}
    </div>
  )
}

const mapStateToProps = state => ({
  authErrorMsg: state.auth.authErrorMsg,
  formErrorMsg: state.form.formErrorMsg,
  postErrorMsg: state.post.postErrorMsg,
})

const mapDispatchToProps = {
  checkAuthentication,
  resetAuthErrorMsg,
  resetFormErrorMsg,
  resetPostErrorMsg,
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
