import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Container, TextField, Typography } from '@material-ui/core'
import { changePassword, resetChangePasswordSuccess } from '../redux/auth/actions'

// setPassword consists of current password input, new password input, confirm new password input and reset password button, from top to bottom.
const ChangePassword = ({ authLoading, changePasswordSuccess, changePassword, resetChangePasswordSuccess }) => {
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
  }))

  // Hooks
  const classes = useStyles()
  const history = useHistory()

  // States
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [currentPasswordError, setCurrentPasswordError] = useState(false)
  const [newPasswordError, setNewPasswordError] = useState(false)
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(false)
  const [samePasswordError, setSamePasswordError] = useState(false)

  // Handlers
  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value)
    if (e.target.value === '') {
      setCurrentPasswordError(true)
    } else {
      setCurrentPasswordError(false)
    }
  }
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

    setCurrentPasswordError(false)
    setNewPasswordError(false)
    setConfirmNewPasswordError(false)
    setSamePasswordError(false)

    if (currentPassword === '') {
      setCurrentPasswordError(true)
    }
    if (newPassword === '') {
      setNewPasswordError(true)
    }
    if (confirmNewPassword === '') {
      setConfirmNewPasswordError(true)
    }
    if (confirmNewPassword !== newPassword) {
      setSamePasswordError(true)
    }

    if (currentPassword && newPassword && confirmNewPassword && !samePasswordError) {
      changePassword(currentPassword, newPassword, confirmNewPassword)
    }

    window.scroll(0, 0)
  }
  const handleRedirect = e => { 
    e.preventDefault()
    history.go(-1) 
    resetChangePasswordSuccess()
  }

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        {changePasswordSuccess
          ?
          <form onSubmit={handleRedirect}>
            {/* Confirmation text */}
            <Typography variant="h6" noWrap style={{ textAlign: "center" }}>
              You have successfully changed your password.
            </Typography>

            {/* Profile button */}
            < Button
              autoFocus
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Back to Profile
            </Button>
          </form>
      :
          <form noValidate onSubmit={handleSubmit}>
            {/* Current password input */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Current Password"
              name="currentPassword"
              type="password"
              autoFocus
              onChange={handleCurrentPasswordChange}
              error={currentPasswordError}
              helperText={currentPasswordError ? "This is a required field" : ""}
            />

            {/* New password input */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="New Password"
              name="newPassword"
              type="password"
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

            {/* Change password button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={authLoading}
            >
              Change Password
          </Button>
          </form>
        }


      </div>
    </Container>
  )
}

const mapStateToProps = state => ({
  authLoading: state.auth.authLoading,
  changePasswordSuccess: state.auth.changePasswordSuccess,
})

const mapDispatchToProps = {
  changePassword,
  resetChangePasswordSuccess: () => dispatch => dispatch(resetChangePasswordSuccess()),
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)