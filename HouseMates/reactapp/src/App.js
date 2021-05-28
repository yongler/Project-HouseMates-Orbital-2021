import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { indigo } from "@material-ui/core/colors";

import Box from "@material-ui/core/Box";

import Dashboard from "./pages/Dashboard";
import Housings from "./pages/Housings";
import Roommates from "./pages/Roommates";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";
import Activate from "./pages/Activate";
import Register from "./pages/Register";

import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import RoommateDetail from "./pages/RoommateDetail";
import RoommateForm from "./pages/RoommateForm";

import SideNav from "./components/SideNav";

import Layout from "./hocs/Layout";
import store from "./store";
import { Provider } from "react-redux";

const drawerWidth = 190;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  flex: {
    display: "flex",
  },
  closeSize: {
    minHeight: 100,
    width: theme.spacing(7) + 1,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  openSize: {
    minHeight: 100,
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: indigo,
  },
});

const App = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(true);
  var hoverOpen = true;

  const handleDrawerOpen = () => {
    hoverOpen = true;
    setTimeout(() => (hoverOpen ? setOpen(true) : null), 1000);
  };
  const handleDrawerClose = () => {
    hoverOpen = false;
    setOpen(false);
  };
  const handleDrawerToggle = () => {
    setOpen(!open);
    open === true ? setHover(true) : setHover(false);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/reset-password" component={ResetPassword} />
              <Route
                path="/password/reset/confirm/:uid/:token"
                component={ResetPasswordConfirm}
              />
              <Route path="/activate/:uid/:token" component={Activate} />

              <>
                <div className={classes.root}>
                  <NavBar
                    drawerWidth={drawerWidth}
                    handleDrawerToggle={handleDrawerToggle}
                  />

                  <SideNav
                    drawerWidth={drawerWidth}
                    open={open}
                    hover={hover}
                    handleDrawerOpen={handleDrawerOpen}
                    handleDrawerClose={handleDrawerClose}
                  />

                  <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <div className={classes.flex}>
                      <div
                        className={hover ? classes.closeSize : classes.openSize}
                      />
                      <Route exact path="/">
                        <Dashboard />
                      </Route>

                      <Route path="/housings">
                        <Housings />
                      </Route>

                      <Route exact path="/roommates">
                        <Roommates />
                      </Route>

                      <Route path="/roommates/:id">
                        <RoommateDetail />
                      </Route>

                      <Route path="/form">
                        <RoommateForm />
                      </Route>
                    </div>

                    <Box mt={8}>
                      <Footer />
                    </Box>
                  </main>
                </div>
              </>
            </Switch>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
