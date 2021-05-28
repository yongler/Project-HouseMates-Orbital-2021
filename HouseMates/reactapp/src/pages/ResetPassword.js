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

import {reset_password} from '../actions/auth'


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

const ResetPassword = ({reset_password}) => {
  const classes = useStyles()
  const history = useHistory()
  
  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState(false)

  const [requestSent, setRequestSent] = useState(false);

  const handleSubmit = e => {
    e.preventDefault()
    setUsernameError(false)
    if (username === '') { setUsernameError(true) }

    if (username) { history.push("/") }

    reset_password(username)
    setRequestSent(true);
  }

  if (requestSent) {
    return <Redirect to='/' />
}

  const handleUsernameChange = e => {
    setUsername(e.target.value)
    if (e.target.value === '') { setUsernameError(true) } else { setUsernameError(false) }
  }

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <img alt="logo" src="housemates-logo-with-text-black.svg" width="150" height="150" />

        <Typography variant="h6" gutterBottom>Reset Password</Typography>

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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>

        </form>
      </div>

      <Box mt={8}>
        <Footer />
      </Box>
    </Container>
  )
}


export default connect(null, {reset_password}) (ResetPassword)