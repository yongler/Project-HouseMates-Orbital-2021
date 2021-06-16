import React, { useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core'

// Confirmation dialog
const Confirmation = ({ open, handleClose, handleRedirect }) => {
    // States
    const [thankYou, setThankYou] = useState(false)

    // Handlers
    const handleSubmit = () => setThankYou(true)

    return (
        <Dialog open={open}>
            <DialogTitle>Confirmation</DialogTitle>

            {thankYou
                ?
                <Box>
                    <DialogContent>Thank you for your submission!</DialogContent>

                    <DialogActions>
                        <Button variant="contained" color="primary" type="submit" onClick={handleRedirect}>
                            Close
                        </Button>
                    </DialogActions>
                </Box>
                :
                <Box>
                    <DialogContent>Are you sure you want to submit?</DialogContent>

                    <DialogActions>
                        <Button variant="contained" onClick={handleClose}>No</Button>
                        <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                            Yes
                        </Button>
                    </DialogActions>
                </Box>
            }
        </Dialog>
    )
}

export default Confirmation
