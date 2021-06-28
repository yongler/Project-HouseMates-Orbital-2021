import React from 'react'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Container, Grid, Typography } from '@material-ui/core'
import { activate } from '../redux/auth/actions'

// Activate consists of title and activate button, from top to bottom.
const Activate = ({ authLoading, activationSuccess, activate }) => {
  // Styling
  const useStyles = makeStyles((theme) => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    button: {
      margin: theme.spacing(3, 0, 2),
    },
  }))

  // Hooks
  const classes = useStyles()
  const history = useHistory()
  const { uid, token } = useParams()

  // Handlers
  const handleActivation = e => {
    e.preventDefault()
    activate(uid, token)
  }
  const handleRedirect = e => {
    e.preventDefault()
    history.push('/login')
  }

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        {activationSuccess
          ?
          <form onSubmit={handleRedirect}>
            {/* Confirmation text */}
            <Typography variant="h6" noWrap style={{ textAlign: "center" }}>
              You have successfully activated your account.
            </Typography>

            {/* Login button */}
            <Button
              autoFocus
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Proceed to Login
            </Button>
          </form>
          :
          <form onSubmit={handleActivation}>
            {/* Activate button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={authLoading}
              autoFocus
            >
              Activate
            </Button>

            {/* Resend activation email link */}
            <Grid container justify="flex-end">
              <Grid item>
                <NavLink to="/resend-activation-email" variant="body2">
                  Resend activation email
                </NavLink>
              </Grid>
            </Grid>
          </form>
        }
      </div>
    </Container >
  )
}

const mapStateToProps = state => ({
  authLoading: state.auth.authLoading,
  activationSuccess: state.auth.activationSuccess,
})

const mapDispatchToProps = {
  activate,
}

export default connect(mapStateToProps, mapDispatchToProps)(Activate)
