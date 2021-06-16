import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { CircularProgress, Snackbar, Typography } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import Footer from '../components/Footer'
import Logo from '../static/housemates-logo-with-text-black.svg'
import { resetErrorMsg } from '../redux/auth/actions'

// LayoutOne consists of logo at the top of the component and footer at the bottom.
const LayoutOne = ({ children, title, errorMsg, loading, resetErrorMsg }) => {
  // Handlers
  const handleClose = () => { 
    resetErrorMsg() 
  }

  // Components
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Error message */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={errorMsg}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity="error">{errorMsg}</Alert>
      </Snackbar>

      {/* Logo */}
      <img
        alt="logo"
        src={Logo}
        width="150"
        height="150"
        style={{ marginTop: 50 }}
      />

      {/* Title */}
      <Typography variant="h6" gutterBottom>{title}</Typography>

      {/* Loading spinner or component*/}
      {loading ? <CircularProgress /> : <Fragment>{children}</Fragment>}

      {/* Footer */}
      <div style={{ marginTop: 60 }}><Footer /></div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  errorMsg: state.auth.errorMsg,
  loading: state.auth.loading,
});

const mapDispatchToProps = {
  resetErrorMsg,
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutOne)
