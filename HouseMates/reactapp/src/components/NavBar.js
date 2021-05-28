import React, { useState, Fragment } from "react";
import { useHistory, Redirect, NavLink, Link } from "react-router-dom";
import { makeStyles, fade } from "@material-ui/core/styles";
// import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import InputBase from "@material-ui/core/InputBase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

import { logout } from "../actions/auth";
import { connect } from "react-redux";

const NavBar = ({ drawerWidth, handleDrawerToggle, isAuthenticated, logout }) => {
  const useStyles = makeStyles((theme) => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: 25,
      marginLeft: -20,
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: 400,
      // [theme.breakpoints.up('sm')]: {
      //   marginLeft: theme.spacing(3),
      //   width: 'auto',
      // },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    logo: {
      marginRight: 10,
    },
    toolbar: {
      display: "flex",
    },
    user: {
      marginLeft: 10,
      cursor: "pointer",
    },
    grow: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  // const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    // logout;
    setAnchorEl(null);
    history.push("/login");
  };

  const guestLinks = () => (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>
    </Fragment>
  );

  // const authLinks = () => (
  //   <li className="nav-item">
  //     <a className="nav-link" href="#!" onClick={logout}>
  //       Logout
  //     </a>
  //   </li>
  // );

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <img
            alt="logo"
            src="/housemates-logo-without-text-white.svg"
            width="45"
            height="45"
            className={classes.logo}
          />

          <Typography variant="h6" noWrap classes={classes.title}>
            HouseMates
          </Typography>

          <div className={classes.grow} />

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>

          <div className={classes.grow} />

          <div>{!isAuthenticated && guestLinks()}</div>

          {isAuthenticated && (
            <div>
              <Typography>Welcome User!</Typography>
            </div>
          )}

          {isAuthenticated && (
            <div>
              <Avatar className={classes.user} onClick={handleMenuOpen} />
            </div>
          )}
        </Toolbar>
      </AppBar>

      {isAuthenticated && (
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={logout}> Logout</MenuItem>
        </Menu>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(NavBar);
