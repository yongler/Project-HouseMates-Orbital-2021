import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import MuiAlert from '@material-ui/lab/Alert'
import { Snackbar } from '@material-ui/core'
import { checkAuthentication, resetAuthErrorMsg } from '../redux/auth/actions'
import { resetFormErrorMsg } from '../redux/form/actions'
import { resetPostErrorMsg } from '../redux/post/actions'

const Layout = ({ 
  children, 
  checkAuthentication,
  authErrorMsg, formErrorMsg, postErrorMsg,
  resetAuthErrorMsg, resetFormErrorMsg, resetPostErrorMsg,
 }) => {

  // Custom components
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }

  // Handlers
  const handleClose = () => {
    if (authErrorMsg) resetAuthErrorMsg()
    if (formErrorMsg) resetFormErrorMsg()
    if (postErrorMsg) resetPostErrorMsg()
  }

  // Hooks
  const location = useLocation()

  // componentDidUpdate
  useEffect(() => {
    window.scroll(0, 0)
  }, [location.pathname])

  // componentDidMount
  useEffect(() => {
    checkAuthentication()
  }, [])

  return (
    <div>
      {/* Error message */}
      {(authErrorMsg || formErrorMsg || postErrorMsg) &&
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={authErrorMsg || formErrorMsg || postErrorMsg}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert severity="error">{authErrorMsg ? authErrorMsg : formErrorMsg ? formErrorMsg : postErrorMsg}</Alert>
        </Snackbar>}

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
