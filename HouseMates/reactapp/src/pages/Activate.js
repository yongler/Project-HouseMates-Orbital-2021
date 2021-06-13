import React, { useEffect } from 'react'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Container, Grid, Typography } from '@material-ui/core'
import { activate, resetErrorMsg } from '../redux/auth/actions'

// Activate consists of title and activate button, from top to bottom.
const Activate = ({ activationSuccess, activate, resetErrorMsg }) => {
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
  const handleActivation = (e) => {
    e.preventDefault()

    resetErrorMsg()
    activate(uid, token)
  }
  const handleRedirect = () => { history.push('/login') }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        {/* Title */}
        <Typography variant="h6" gutterBottom>
          Account Activation
        </Typography>

        {activationSuccess
          ?
          <div>
            {/* Confirmation text */}
            <Typography variant="h6" noWrap style={{ textAlign: "center" }}>
              You have successfully activated your account.
            </Typography>

            {/* Login button */}
            < Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleRedirect}
              className={classes.button}
            >
              Proceed to Login
            </Button>
          </div>
          :
          <div>
            {/* Activate button */}
            < Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleActivation}
              className={classes.button}
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
          </div>
        }
      </div>
    </Container >
  )
}

const mapStateToProps = state => ({
  activationSuccess: state.auth.activationSuccess,
})

const mapDispatchToProps = {
  activate,
  resetErrorMsg: () => dispatch => dispatch(resetErrorMsg()),
}

export default connect(mapStateToProps, mapDispatchToProps)(Activate)
