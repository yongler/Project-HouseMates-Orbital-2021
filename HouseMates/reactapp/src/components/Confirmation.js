import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core'

// Confirmation dialog
const Confirmation = ({ createPostSuccess, loading, open, handleCancel, handleSubmit, handleClose }) => {
    // States
    // const [thankYou, setThankYou] = useState(false)

    // Handlers
    // const handleSubmit = () => setThankYou(true)

    return (
        <Dialog open={open}>
            <DialogTitle>Confirmation</DialogTitle>

            {createPostSuccess
                ?
                <Box>
                    <DialogContent>
                        <Typography variant="body1">Thank you for your submission!</Typography>
                    </DialogContent>

                    <DialogActions>
                        <Button variant="contained" color="primary" type="submit" onClick={handleClose}>
                            Close
                        </Button>
                    </DialogActions>
                </Box>
                :
                <Box>
                    <DialogContent>
                        <Typography variant="body1">Are you sure you want to submit?</Typography>
                    </DialogContent>

                    {loading
                        ?
                        <CircularProgress />
                        :
                        <DialogActions>
                            <Button variant="contained" onClick={handleCancel}>No</Button>
                            <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                                Yes
                            </Button>
                        </DialogActions>
                    }
                </Box>
            }
        </Dialog>
    )
}

const mapStateToProps = state => ({
    createPostSuccess: state.post.createPostSuccess,
    loading: state.post.loading,
})

export default connect(mapStateToProps)(Confirmation)
