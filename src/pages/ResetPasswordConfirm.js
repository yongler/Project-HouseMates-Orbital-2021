import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Container, TextField, Typography } from '@material-ui/core'
import { resetPasswordConfirm } from '../redux/auth/actions'

// ResetPasswordConfirm consists of new password input, confirm new password input and reset password button, from top to bottom.
const ResetPasswordConfirm = ({ authLoading, resetPasswordConfirmSuccess, resetPasswordConfirm }) => {
  // Styling
  const useStyles = makeStyles((theme) => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    buttons: {
      margin: theme.spacing(3, 0, 2),
    },
  }))

  // Hooks
  const classes = useStyles()
  const history = useHistory()
  const { uid, token } = useParams()

  // States
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [newPasswordError, setNewPasswordError] = useState(false)
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(false)
  const [samePasswordError, setSamePasswordError] = useState(false)

  // Handlers
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value)
    if (e.target.value === '') {
      setNewPasswordError(true)
      setSamePasswordError(false)
    } else if (confirmNewPassword && e.target.value !== confirmNewPassword) {
      setSamePasswordError(true)
      setNewPasswordError(false)
    } else {
      setNewPasswordError(false)
      setSamePasswordError(false)
    }
  }
  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value)
    if (e.target.value === '') {
      setConfirmNewPasswordError(true)
      setSamePasswordError(false)
    } else if (e.target.value !== newPassword) {
      setSamePasswordError(true)
      setConfirmNewPasswordError(false)
    } else {
      setConfirmNewPasswordError(false)
      setSamePasswordError(false)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    setNewPasswordError(false)
    setConfirmNewPasswordError(false)
    setSamePasswordError(false)

    if (newPassword === '') {
      setNewPasswordError(true)
    }
    if (confirmNewPassword === '') {
      setConfirmNewPasswordError(true)
    }
    if (confirmNewPassword !== newPassword) {
      setSamePasswordError(true)
    }

    if (newPassword && confirmNewPassword && !samePasswordError) {
      resetPasswordConfirm(uid, token, newPassword, confirmNewPassword)
    }
  }
  const handleRedirect = e => { 
    e.preventDefault()
    history.push('/login') 
  }

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        {resetPasswordConfirmSuccess
          ?
          <form onSubmit={handleRedirect}>
            {/* Confirmation text */}
            <Typography variant="h6" noWrap style={{ textAlign: "center" }}>
              You have successfully reset your password.
            </Typography>

            {/* Login button */}
            < Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
              autoFocus
            >
              Proceed to Login
            </Button>
          </form>
          :
          <form noValidate onSubmit={handleSubmit}>
            {/* New password input */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="New Password"
              name="newPassword"
              type="password"
              autoFocus
              onChange={handleNewPasswordChange}
              error={newPasswordError}
              helperText={newPasswordError ? "This is a required field" : "Minimum 8 characters with a mixture of lower and upper case letters, numbers and symbols"}
            />

            {/* Confirm new password input */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Confim New Password"
              name="confirmNewPassword"
              type="password"
              onChange={handleConfirmNewPasswordChange}
              error={confirmNewPasswordError || samePasswordError}
              helperText={
                confirmNewPasswordError
                  ? "This is a required field"
                  : samePasswordError
                    ? "Password does not match"
                    : ""
              }
            />

            {/* Reset password button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={authLoading}
            >
              Reset Password
          </Button>
          </form>
        }
      </div>
    </Container>
  )
}

const mapStateToProps = state => ({
  authLoading: state.auth.authLoading,
  resetPasswordConfirmSuccess: state.auth.resetPasswordConfirmSuccess,
})

const mapDispatchToProps = {
  resetPasswordConfirm,
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordConfirm)
