import React, { useState } from 'react'
import { NavLink, useHistory, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box' 
import Container from '@material-ui/core/Container'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Footer from '../components/Footer'
import {login} from '../actions/auth'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Login = ({login, isAuthenticated}) => {
  const classes = useStyles()
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [account, setAccount] = useState('tenant')
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [accountError, setAccountError] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setUsernameError(false)
    setPasswordError(false)
    setAccountError(false)

    if (username === '') { setUsernameError(true) }
    if (password === '') { setPasswordError(true) }
    if (account === '') { setAccountError(true) }

    if (username && password && account) { history.push("/") }

    login(username,password)
  }

  const handleUsernameChange = e => {
    setUsername(e.target.value)
    if (e.target.value === '') { setUsernameError(true) } else { setUsernameError(false) }
  }
  const handlePasswordChange = e => {
    setPassword(e.target.value)
    if (e.target.value === '') { setPasswordError(true) } else { setPasswordError(false) }
  }
  const handleAccountChange = e => {
    setAccount(e.target.value)
    if (e.target.value === '') { setAccountError(true) } else { setAccountError(false) }
  }

  if (isAuthenticated) {
    return <Redirect to='/' />
  }

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <img alt="logo" src="housemates-logo-with-text-black.svg" width="150" height="150" />

        <Typography variant="h6" gutterBottom>Login</Typography>

        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            autoFocus
            onChange={handleUsernameChange}
            error={usernameError}
          />
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
          />

          <FormControl
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={accountError}>
            <InputLabel>Account</InputLabel>
            <Select
              value={account}
              onChange={handleAccountChange}
              label="Account"
            >
              <MenuItem value="tenant">Tenant</MenuItem>
              <MenuItem value="landlord">Landlord</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <NavLink to="/register" variant="body2">
                Don't have an account? Register now!
              </NavLink>
              <br />
              <NavLink to="/reset-password" variant="body2">
                Forgot your password? 
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>

      <Box mt={8}>
        <Footer />
      </Box>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login}) (Login)