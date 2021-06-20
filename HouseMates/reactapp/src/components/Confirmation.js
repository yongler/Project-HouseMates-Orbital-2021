import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core'

// Confirmation dialog
const Confirmation = ({ 
  createPostSuccess, deletePostSuccess, postLoading, 
  open, confirmationText, thankYouText, success,
  handleCancel, handleSubmit, handleClose }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>Confirmation</DialogTitle>

      {success
        ?
        <Box>
          <DialogContent>
            <Typography variant="body1">{thankYouText}</Typography>
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
            <Typography variant="body1">{confirmationText}</Typography>
          </DialogContent>

          {postLoading
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
  postLoading: state.post.postLoading,
})

export default connect(mapStateToProps)(Confirmation)
