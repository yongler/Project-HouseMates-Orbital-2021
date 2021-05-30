import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { reset_password } from '../actions/auth'

// ResetPassword consists of title, and ((confirmation text), or (email input and (cancel and submit buttons), dependent of submission)), from top to bottom. 
const ResetPassword = ({ reset_password }) => {
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

  const [requestSent, setRequestSent] = useState(false)

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
      reset_password(email)
      setRequestSent(true)
    }
  }

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        {/* Title */}
        <Typography variant="h6" gutterBottom>Reset Password</Typography>

        {requestSent
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

export default connect(null, { reset_password })(ResetPassword)
