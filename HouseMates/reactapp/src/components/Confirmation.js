import React from 'react'
import { connect } from 'react-redux'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core'

// Confirmation dialog
const Confirmation = ({ 
  postLoading, 
  open, confirmationText, thankYouText, success,
  handleCancel, handleSubmit, handleClose 
}) => {

  return (
    <Dialog open={open}>
      {/* Confirmation title */}
      <DialogTitle>Confirmation</DialogTitle>

      {success
        ?
        <>
          {/* Thank you text */}
          <DialogContent><Typography variant="body1">{thankYouText}</Typography></DialogContent>

          {/* Close button */}
          <DialogActions>
            <Button variant="contained" color="primary" type="submit" onClick={handleClose}>Close</Button>
          </DialogActions>
        </>
        :
        <>
          {/* Confirmation text */}
          <DialogContent><Typography variant="body1">{confirmationText}</Typography></DialogContent>

          {postLoading
            ?
            // Loading spinner
            <CircularProgress />
            :
            // Yes and no buttons
            <DialogActions>
              <Button variant="contained" onClick={handleCancel}>No</Button>
              <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>Yes</Button>
            </DialogActions>}
        </>}
    </Dialog>
  )
}

const mapStateToProps = state => ({
  postLoading: state.post.postLoading,
})

export default connect(mapStateToProps)(Confirmation)
