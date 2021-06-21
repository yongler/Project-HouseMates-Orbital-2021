import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Container, TextField, Typography } from '@material-ui/core'
import { deleteAccount } from '../redux/auth/actions'

// DeleteAccount consists of title, and ((confirmation text), or (password input and (cancel and submit buttons), dependent of submission)), from top to bottom. 
const DeleteAccount = ({ authLoading, deleteAccountSuccess, deleteAccount }) => {
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
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)

  // Handlers
  const handlePasswordChange = e => {
    setPassword(e.target.value)
    if (e.target.value === "") { setPasswordError(true) } else { setPasswordError(false) }
  }
  const handleCancel = () => history.go(-1)
  const handleDelete = e => {
    e.preventDefault()

    setPasswordError(false)

    if (password === "") { setPasswordError(true) }

    if (password) {
      deleteAccount(password)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        {deleteAccountSuccess
          ?
          // Confirmation text
          <div>
            <Typography variant="h6" noWrap style={{ textAlign: "center" }}>
              You have successfully deleted your account.
            </Typography>
            <Typography variant="h6" noWrap style={{ textAlign: "center" }}>
              You may close this window.
            </Typography>
          </div>
          :
          <form noValidate onSubmit={handleDelete}>
            {/* Password input */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              name="password"
              type="password"
              autoFocus
              onChange={handlePasswordChange}
              error={passwordError}
              helperText={passwordError ? "This is a required field" : ""}
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
                  disabled={authLoading}
                >
                  Delete
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
  deleteAccountSuccess: state.auth.deleteAccountSuccess,
})

const mapDispatchToProps = {
  deleteAccount,
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount)