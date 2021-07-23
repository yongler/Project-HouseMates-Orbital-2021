import React, { useState, useRef, Fragment } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles, fade } from "@material-ui/core/styles";
import { AppBar, Avatar, Button, ClickAwayListener, IconButton, InputBase, Grow, Menu, MenuItem, MenuList, Paper, Popper, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from '@material-ui/icons/Clear';
import { logout } from "../redux/auth/actions";
import Logo from "../static/housemates-logo-without-text-white.svg";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import { searchPost, cancelSearch, getPostList, setPage } from "../redux/post/actions";
import { ROOMMATE_FORM } from "../globalConstants";

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
const NavBar = ({
  handleMenuButton,
  user, isAuthenticated,
  logout,
  getPostList,
  searchPost, cancelSearch,
  setPage,
}) => {
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
      cursor: "pointer",
    },
    title: {
      marginRight: 30,
      cursor: "pointer",
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
      height: 40,
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
    white: {
      color: "white",
    }
  }));

  const [theme, setTheme] = useState(true);
  const icon = !theme ? <Brightness7Icon /> : <Brightness3Icon />; // Icons imported from `@material-ui/icons`
  const appliedTheme = createMuiTheme(theme ? light : dark);

  // Hooks
  const location = useLocation();
  const classes = useStyles();
  const history = useHistory();
  const anchorRef = useRef(null);

  // States
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({ search: "" });

  // Handlers
  const handleMenuOpen = () => { setOpen(true); };
  const handleMenuClose = () => { setOpen(false); };
  const handleProfile = () => {
    setOpen(false);
    history.push("/profile");
  };
  const handleLogout = () => {
    setOpen(false);
    logout();
    history.push("/login");
  };
  const handleClick = () => { history.push("/profile"); };
  const handleSearch = (searchItem) => {
    setPage(1)
    searchPost(ROOMMATE_FORM, searchItem);
  };
  const handleCancelSearch = () => {
    cancelSearch();
    setData({ search: "" })
    getPostList(ROOMMATE_FORM)
    setPage(1)
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
            onClick={handleClick}
          />

          {/* Title */}
          <Typography
            variant="h6"
            className={classes.title}
            onClick={handleClick}
          >
            HouseMates
          </Typography>

          <div className={classes.grow} />

          {/* Search bar */}
          {location.pathname === "/roommates" && (
            <SearchBar
              className={classes.search}
              value={data.search}
              onChange={(newValue) => setData({ search: newValue })}
              onRequestSearch={() => handleSearch(data.search)}
              onCancelSearch={handleCancelSearch}
              cancelOnEscape
              searchIcon={<ClearIcon style={{ color: 'white' }} />}
              closeIcon={<ClearIcon style={{ color: 'white' }} />}
              placeholder={"Search..."}
              classes={{
                input: classes.white
              }}
            />
          )}

          <div className={classes.grow} />

          {/* Welcome text and profile pic, or login and register buttons */}
          {isAuthenticated && user
            ?
            <Fragment style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ alignSelf: "center" }}>
                <Typography noWrap>
                  Welcome {user.first_name} {user.last_name}!
                </Typography>
              </div>

              <div>
                {/* Profile pic */}
                <Avatar
                  className={classes.profilePic}
                  onClick={handleMenuOpen}
                  src={user.profile_pic}
                  ref={anchorRef}
                />
                {/* Menu */}
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal placement={'bottom-end'}>
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{ transformOrigin: placement === 'bottom' ? 'center bottom' : 'center top' }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleMenuClose}>
                          <MenuList>
                            <MenuItem onClick={handleProfile}>Profile</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            {/* <MenuItem>
                            <IconButton
                              edge="end"
                              color="inherit"
                              aria-label="mode"
                              onClick={() => setTheme(!theme)}
                            >
                              {icon}
                            </IconButton>
                          </MenuItem> */}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>)}
                </Popper>
              </div>
            </Fragment>
            :
            <>
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
            </>}
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
  searchPost,
  cancelSearch,
  getPostList,
  setPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
