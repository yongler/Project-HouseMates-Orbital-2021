import React, { useState, Fragment } from 'react'
import { useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles, fade } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { logout } from "../redux/auth/actions";
import Logo from "../static/housemates-logo-without-text-white.svg";

import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Paper from "@material-ui/core/Paper";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

export const light = {
  palette: {
    // primary: indigo,
    type: "light",
  },
};

export const dark = {
  palette: {
    type: "dark",
  },
};

// NavBar consists of menu button, logo, title, search bar, and welcome text and profile pic, or login and register buttons, dependent of user authentication, from left to right.
const NavBar = ({ handleMenuButton, isAuthenticated, logout, user }) => {
  // Styling (from left to right)
  const useStyles = makeStyles((theme) => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    toolbar: {
      display: "flex",
      paddingLeft: 24,
      minHeight: theme.mixins.toolbar.minHeight + 8,
    },
    menuButton: {
      marginRight: 25,
      marginLeft: -20,
    },
    logo: {
      marginRight: 10,
    },
    title: {
      marginRight: 30,
    },
    grow: {
      flexGrow: 1,
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
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
    },
    buttons: {
      textDecoration: "none",
      color: "white",
    },
    profilePic: {
      marginLeft: 10,
      cursor: "pointer",
    },
  }));

  const [theme, setTheme] = useState(true);
  const icon = !theme ? <Brightness7Icon /> : <Brightness3Icon />; // Icons imported from `@material-ui/icons`
  const appliedTheme = createMuiTheme(theme ? light : dark);

  // Hooks
  const classes = useStyles();
  const history = useHistory();

  // States
  const [anchorEl, setAnchorEl] = useState(null);

  // Handlers
  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    setAnchorEl(null);
    history.push("/profile");
  };
  const handleLogout = () => {
    setAnchorEl(null);
    logout();
    history.push("/login");
  };

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          {/* Menu button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleMenuButton}
            edge="start"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <img
            alt="logo"
            src={Logo}
            width="45"
            height="45"
            className={classes.logo}
          />

          {/* Title */}
          <Typography variant="h6" className={classes.title}>
            HouseMates
          </Typography>

          <div className={classes.grow} />

          {/* Search bar */}
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

          {/* Welcome text and profile pic, or login and register buttons */}
          {isAuthenticated && user ? (
            <Fragment style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ alignSelf: "center" }}>
                <Typography noWrap>
                  Welcome {user.first_name} {user.last_name}!
                </Typography>
              </div>

              <div>
                <Avatar
                  className={classes.profilePic}
                  onClick={handleMenuOpen}
                />
              </div>

              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem>
                  <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="mode"
                    onClick={() => setTheme(!theme)}
                  >
                    {icon}
                  </IconButton>
                </MenuItem>
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Fragment>
          ) : (
            <Fragment>
              <Button>
                <Link to="/login" className={classes.buttons}>
                  Login
                </Link>
              </Button>
              <Button>
                <Link to="/register" className={classes.buttons}>
                  Register
                </Link>
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

const mapDispatchToProps = {
  logout: () => (dispatch) => dispatch(logout()),
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
