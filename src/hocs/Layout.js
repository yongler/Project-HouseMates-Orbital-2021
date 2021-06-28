import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import MuiAlert from '@material-ui/lab/Alert'
import { Snackbar } from '@material-ui/core'
import { checkAuthentication, resetAuthErrorMsg, setPrevPath } from '../redux/auth/actions'
import { resetFormErrorMsg } from '../redux/form/actions'
import { resetPostErrorMsg } from '../redux/post/actions'
import './layout.css'

const Layout = ({
  children,
  checkAuthentication,
  prevPath, setPrevPath,
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
  const handleFocus = e => {
    e.target.style.outline = "none"
    e.target.style.backgroundColor = "rgb(211, 47, 47)"
    e.target.classList.add("grow")
  }
  const handleBlur = e => {
    button.current.style.backgroundColor = "rgb(244, 67, 54)"
    button.current.classList.remove("grow")
    e.target.classList.remove("grow")
  }
  const handleMouseEnter = e => {
    if (button.current.style.backgroundColor !== "rgb(211, 47, 47)")
      button.current.style.backgroundColor = "rgb(234, 64, 51)"
  }
  const handleMouseLeave = e => {
    button.current.style.backgroundColor = "rgb(244, 67, 54)"
    button.current.classList.remove("grow")
    e.target.classList.remove("grow")
  }

  // Hooks
  const location = useLocation()
  const button = useRef()

  // componentDidUpdate
  useEffect(() => { 
    window.scroll(0, 0) 
    return () => { if (location.pathname !== prevPath) setPrevPath(location.pathname) }
  }, [location.pathname])

  // componentDidMount
  useEffect(() => { checkAuthentication() }, [])

  return (
    <div>
      {/* Error message */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={authErrorMsg || formErrorMsg || postErrorMsg}
        onClose={handleClose}
        style={{ zIndex: 1502 }}
      >
        <MuiAlert
          action={
            <div className={"buttonHolder"}>
              <div
                className={"div"}
                style={{ zIndex: 1504 }}
                onClick={handleClose}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
              <div
                className={"close"}
                style={{ zIndex: 1503 }}
              >
                &#10006;
              </div>
              <button
                autoFocus
                onFocus={handleFocus}
                onBlur={handleBlur}
                onClick={handleClose}
                ref={button}
                className={"button"}
              />
            </div>
          }
          severity="error"
          variant="filled"
        >
          {authErrorMsg ? authErrorMsg : formErrorMsg ? formErrorMsg : postErrorMsg}
        </MuiAlert>
      </Snackbar>

      {/* Sheild */}
      {(authErrorMsg || formErrorMsg || postErrorMsg) &&
        <div
          className={"sheild"}
          style={{ zIndex: 1501 }}
        />}

      {/* Layout */}
      {children}
    </div>
  )
}

const mapStateToProps = state => ({
  authErrorMsg: state.auth.authErrorMsg,
  formErrorMsg: state.form.formErrorMsg,
  postErrorMsg: state.post.postErrorMsg,
  prevPath: state.auth.prevPath,
})

const mapDispatchToProps = {
  checkAuthentication,
  resetAuthErrorMsg,
  resetFormErrorMsg,
  resetPostErrorMsg,
  setPrevPath,
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)