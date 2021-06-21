import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Container, Grid, TextField, Typography } from '@material-ui/core'
import { resetPassword } from '../redux/auth/actions'

// ResetPassword consists of title, and ((confirmation text), or (email input and (cancel and submit buttons), dependent of submission)), from top to bottom. 
const ResetPassword = ({ authLoading, resetPasswordSuccess, resetPassword }) => {
  // Styling
  const useStyles = makeStyles(theme => ({
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    buttons: {
      margin: theme.spacing(3, 0, 2),
    },
  }))

  // Hooks
  const classes = useStyles()
  const history = useHistory()

  // States
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState(false)

  // Handlers
  const handleEmailChange = e => {
    setEmail(e.target.value)
    if (e.target.value === "") { setEmailError(true) } else { setEmailError(false) }
  }
  const handleCancel = () => history.go(-1)
  const handleSubmit = e => {
    e.preventDefault()

    setEmailError(false)

    if (email === "") { setEmailError(true) }

    if (email) {
      resetPassword(email)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        {resetPasswordSuccess
          ?
          // Confirmation text
          <div>
            <Typography variant="h6" noWrap style={{ textAlign: "center" }}>
              Kindly check your email to reset your password.
            </Typography>
            <Typography variant="h6" noWrap style={{ textAlign: "center" }}>
              You may close this window.
            </Typography>
          </div>
          :
          <form noValidate onSubmit={handleSubmit}>
            {/* Email input */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              autoFocus
              onChange={handleEmailChange}
              error={emailError}
              helperText={emailError ? "This is a required field" : ""}
            />

            {/* Cancel and submit buttons */}
            <Grid container spacing={2} className={classes.buttons}>
              <Grid item xs={12} sm={6}>
                <Button
                  type="button"
                  fullWidth
                  onClick={handleCancel}
                >
                  Cancel
              </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={authLoading}
                >
                  Submit
              </Button>
              </Grid>
            </Grid>
          </form>
        }
      </div>
    </Container>
  )
}

const mapStateToProps = state => ({
  authLoading: state.auth.authLoading,
  resetPasswordSuccess: state.auth.resetPasswordSuccess,
})

const mapDispatchToProps = {
  resetPassword,
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
