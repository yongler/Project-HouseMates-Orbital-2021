import React, { Fragment } from "react";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Footer from "../components/Footer";
import Logo from "../static/housemates-logo-with-text-black.svg";

// LayoutOne consists of logo at the top of the component and footer at the bottom.
const LayoutOne = ({ children, errorMsg, loading }) => {
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Error message */}
      {errorMsg && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={true}
        >
          <Alert severity="error">{errorMsg}</Alert>
        </Snackbar>
      )}

      {/* Logo */}
      <img
        alt="logo"
        src={Logo}
        width="150"
        height="150"
        style={{ marginTop: 50 }}
      />

      {/* Loading spinner or component*/}
      {loading ? <CircularProgress /> : <Fragment>{children}</Fragment>}

      {/* Footer */}
      <Box mt={8}>
        <Footer />
      </Box>
    </div>
  );
};

const mapStateToProps = (state) => ({
  errorMsg: state.auth.errorMsg,
  loading: state.auth.loading,
});

export default connect(mapStateToProps)(LayoutOne);
