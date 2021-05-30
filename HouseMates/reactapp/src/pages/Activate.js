import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { verify } from '../actions/auth'

// Activate consists of title and verify button, from top to bottom.
const Activate = ({ verify, match }) => {
    // Styling
    const useStyles = makeStyles(theme => ({
        paper: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        button: {
            margin: theme.spacing(3, 0, 2),
        },
    }))

    // Hooks
    const classes = useStyles()

    // States
    const [verified, setVerified] = useState(false)

    // Handlers
    const handleVerification = e => {
        e.preventDefault()

        const uid = match.params.uid
        const token = match.params.token
        verify(uid, token)
        setVerified(true)
    }

    if (verified) { return <Redirect to='/' /> }

    return (
        <Container maxWidth="xs">
            <div className={classes.paper}>
                {/* Title */}
                <Typography variant="h6" gutterBottom>Account Verification</Typography>

                {/* Verify button */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleVerification}
                    className={classes.button}
                >
                    Verify
                </Button>
            </div>
        </Container>
    )
}

export default connect(null, { verify })(Activate)
