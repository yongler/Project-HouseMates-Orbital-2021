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
          <DialogContent>
            <Typography variant="body1">{thankYouText}</Typography>
          </DialogContent>

          {/* Close button */}
          <DialogActions>
            <Button autoFocus variant="contained" color="primary" type="submit" onClick={handleClose}>Close</Button>
          </DialogActions>
        </>
        :
        <div>
          <DialogContent>
            {/* Confirmation text */}
            <Typography variant="body1">{confirmationText}</Typography>

            {/* Loading spinner */}
            {postLoading &&
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CircularProgress style={{ marginTop: 10, marginBottom: 10 }} />
              </div>
            }
          </DialogContent>

          {/* Yes and no buttons */}
          <DialogActions>
            <Button variant="contained" onClick={handleCancel}>No</Button>
            <Button
              color="primary"
              disabled={postLoading}
              onClick={handleSubmit}
              type="submit"
              variant="contained"
            >
              Yes
            </Button>
          </DialogActions>
        </div>}
    </Dialog>
  )
}

const mapStateToProps = state => ({
  postLoading: state.post.postLoading,
})

export default connect(mapStateToProps)(Confirmation)
