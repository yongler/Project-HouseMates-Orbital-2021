import React from 'react'
import { connect } from 'react-redux'
import { CircularProgress, Typography } from '@material-ui/core'
import Footer from '../components/Footer'
import Logo from '../static/housemates-logo-with-text-black.svg'

// LayoutOne consists of logo at the top of the component and footer at the bottom.
const LayoutOne = ({ children, title, authLoading }) => {
 
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
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

      {/* Loading spinner */}
      {authLoading && <CircularProgress />}

      {/* Content */}
      {children}

      {/* Footer */}
      <div style={{ marginTop: 60 }}><Footer /></div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authLoading: state.auth.authLoading,
});

export default connect(mapStateToProps)(LayoutOne)
