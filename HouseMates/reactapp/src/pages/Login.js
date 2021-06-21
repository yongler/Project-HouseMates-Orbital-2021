import React, { useState, useEffect } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Container, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import { login } from '../redux/auth/actions'

// Login consists of title, email input, password input, account input, login button, and (forgot password and register links), from top to bottom.
const Login = ({ isAuthenticated, authLoading, login }) => {
  // Styling
  const useStyles = makeStyles(theme => ({
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }))
  
  // Hooks
  const classes = useStyles()

  // States
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [account, setAccount] = useState("tenant")
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [accountError, setAccountError] = useState(false)

  // Handlers
  const handleEmailChange = e => {
    setEmail(e.target.value)
    if (e.target.value === "") { setEmailError(true); } else { setEmailError(false) }
  }
  const handlePasswordChange = e => {
    setPassword(e.target.value)
    if (e.target.value === "") { setPasswordError(true); } else { setPasswordError(false) }
  }
  const handleAccountChange = e => {
    setAccount(e.target.value)
    if (e.target.value === "") { setAccountError(true); } else { setAccountError(false) }
  }
  const handleSubmit = e => {
    e.preventDefault()
    
    setEmailError(false)
    setPasswordError(false)
    setAccountError(false)

    if (email === "") { setEmailError(true) }
    if (password === "") { setPasswordError(true) }
    if (account === "") { setAccountError(true) }

    if (email && password && account) {
      login(email, password)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (isAuthenticated) { return <Redirect to="/dashboard" /> }

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
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

          {/* Password input */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={handlePasswordChange}
            error={passwordError}
            helperText={passwordError ? "This is a required field" : ""}
          />

          {/* Account input */}
          <FormControl
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={accountError}
          >
            <InputLabel>Account</InputLabel>
            <Select
              value={account}
              onChange={handleAccountChange}
              label="Account"
            >
              <MenuItem value="tenant">Tenant</MenuItem>
              <MenuItem value="host">Host</MenuItem>
            </Select>
            <FormHelperText>
              {accountError ? "This is a required field" : ""}
            </FormHelperText>
          </FormControl>

          {/* Login button*/}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={authLoading}
          >
            Login
          </Button>

          {/* Forgot password and register links */}
          <Grid container>
            <Grid item xs>
              <NavLink to="/reset-password" variant="body2">
                Forgot password?
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink to="/register" variant="body2">
                Don't have an account? Register now!
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

const mapStateToProps = state => ({ 
  isAuthenticated: state.auth.isAuthenticated,
  authLoading: state.auth.authLoading,
})

const mapDispatchToProps = {
  login,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
