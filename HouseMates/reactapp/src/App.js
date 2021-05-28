import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
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
import RoommateDetail from "./components/RoommateDetail";
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
}));

const App = () => {
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <Provider store={store}>
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
                  open={open}
                  handleDrawerOpen={handleDrawerOpen}
                />

                <SideNav
                  drawerWidth={drawerWidth}
                  open={open}
                  handleDrawerClose={handleDrawerClose}
                />

                <main className={classes.content}>
                  <div className={classes.toolbar} />
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

                  <div className={classes.toolbar} />

                  <Box mt={8}>
                    <Footer />
                  </Box>
                </main>
              </div>
            </>
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
