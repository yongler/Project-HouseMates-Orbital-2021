import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { indigo, green, yellow, blue } from "@material-ui/core/colors";
import Activate from "./pages/Activate";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Housings from "./pages/Housings";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ChangePassword from "./pages/ChangePassword";
import DeleteAccount from "./pages/DeleteAccount";
import ResendActivationEmail from "./pages/ResendActivationEmail";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";
import RoommateDetail from "./pages/RoommateDetail";
import RoommateForm from "./pages/RoommateForm";
import HousingForm from "./pages/HousingForm";
import Roommates from "./pages/Roommates";
import LayoutTwo from "./layout/LayoutTwo";
import LayoutOne from "./layout/LayoutOne";
import RouteWrapper from "./layout/RouteWrapper";
import Layout from "./hocs/Layout";
import store from "./redux/store";
import Matchmaking from "./components/Matchmaking";
import EditHousingForm from "./pages/EditHousingForm";
import HousingDetail from "./pages/HousingDetail";
import EditRoommateForm from "./pages/EditRoommateForm";
import Chat from "./pages/Chat";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";

const App = () => {
  // notifications
  // window.OneSignal = window.OneSignal || [];
  // const OneSignal = window.OneSignal;

  // useEffect(() => {
  //   OneSignal.push(() => {
  //     OneSignal.init({
  //       // appId: "7a1f6bc9-67f0-4a47-9bca-6b118e833d42",
  //       appId: "73fde6d7-bcde-4f66-b624-ac2a00bd6cbd",
  //     });
  //   });
  // }, []);
  //   <script
  //   src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
  //   async=""
  // ></script>
  // <script>
  //   window.OneSignal = window.OneSignal || [];
  //   OneSignal.push(function () {
  //     OneSignal.init({
  //       appId: "73fde6d7-bcde-4f66-b624-ac2a00bd6cbd",
  //     });
  //   });
  // </script>
  const OneSignal = 1;

  // Styling
  const light = createMuiTheme({
    palette: {
      primary: indigo,
      background: {
        default: "#ffffff",
      },
    },
  });

  const dark = createMuiTheme({
    palette: {
      // primary: indigo,
      type: "dark",
      background: {
        default: "#424242",
      },
      text: {
        primary: "#ffffff",
      },
    },
  });

  const [theme, setTheme] = useState(true);
  const appliedTheme = theme ? light : dark;

  return (
    <Provider store={store}>
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Layout>
            <Switch>
              {/* Routes with LayoutOne */}
              <RouteWrapper
                path="/login"
                title={"Login"}
                component={Login}
                layout={LayoutOne}
              />
              <RouteWrapper
                path="/delete-account"
                title={"Delete Account"}
                component={DeleteAccount}
                layout={LayoutOne}
              />
              <RouteWrapper
                path="/register"
                title={"Registration"}
                component={Register}
                layout={LayoutOne}
              />
              <RouteWrapper
                path="/change-password"
                title={"Change Password"}
                component={ChangePassword}
                layout={LayoutOne}
              />
              <RouteWrapper
                path="/reset-password"
                title={"Reset Password"}
                component={ResetPassword}
                layout={LayoutOne}
              />
              <RouteWrapper
                path="/password/reset/confirm/:uid/:token"
                title={"Reset Password"}
                component={ResetPasswordConfirm}
                layout={LayoutOne}
              />
              <RouteWrapper
                path="/activate/:uid/:token"
                title={"Account Activation"}
                component={Activate}
                layout={LayoutOne}
              />
              <RouteWrapper
                path="/resend-activation-email"
                title={"Resend Activation Email"}
                component={ResendActivationEmail}
                layout={LayoutOne}
              />

              {/* Routes with LayoutTwo */}
              <RouteWrapper
                exact
                path="/dashboard"
                component={Dashboard}
                layout={LayoutTwo}
                setTheme={setTheme}
                theme={theme}
                OneSignal={OneSignal}
              />
              <RouteWrapper
                exact
                path="/housings"
                component={Housings}
                layout={LayoutTwo}
                setTheme={setTheme}
                theme={theme}
                OneSignal={OneSignal}
              />
              <RouteWrapper
                path="/housings/:id"
                component={HousingDetail}
                layout={LayoutTwo}
                setTheme={setTheme}
                theme={theme}
                OneSignal={OneSignal}
              />
              <RouteWrapper
                exact
                path="/roommates"
                component={Roommates}
                layout={LayoutTwo}
                setTheme={setTheme}
                theme={theme}
                OneSignal={OneSignal}
              />
              <RouteWrapper
                path="/roommates/:id"
                component={RoommateDetail}
                layout={LayoutTwo}
                setTheme={setTheme}
                theme={theme}
                OneSignal={OneSignal}
              />
              <RouteWrapper
                path="/roommate-form"
                component={RoommateForm}
                layout={LayoutTwo}
                setTheme={setTheme}
                theme={theme}
                OneSignal={OneSignal}
              />
              <RouteWrapper
                path="/housing-form"
                component={HousingForm}
                layout={LayoutTwo}
                setTheme={setTheme}
                theme={theme}
                OneSignal={OneSignal}
              />
              <RouteWrapper
                path="/edit-roommate-form/:id"
                component={EditRoommateForm}
                layout={LayoutTwo}
                setTheme={setTheme}
                theme={theme}
                OneSignal={OneSignal}
              />
              <RouteWrapper
                path="/edit-housing-form/:id"
                component={EditHousingForm}
                layout={LayoutTwo}
                setTheme={setTheme}
                theme={theme}
                OneSignal={OneSignal}
              />
              <RouteWrapper
                path="/profile"
                component={Profile}
                layout={LayoutTwo}
                setTheme={setTheme}
                theme={theme}
                OneSignal={OneSignal}
              />
              <RouteWrapper
                path="/matchmaking"
                component={Matchmaking}
                layout={LayoutTwo}
                setTheme={setTheme}
                theme={theme}
                OneSignal={OneSignal}
              />
              <RouteWrapper
                exact
                path="/chat"
                component={Chat}
                layout={LayoutTwo}
                setTheme={setTheme}
                theme={theme}
                OneSignal={OneSignal}
              />
              {/* Routes with no layout */}
              <Route path="/">
                <Home setTheme={setTheme} theme={theme} />
              </Route>
              <Route path="*">
                <Home setTheme={setTheme} theme={theme} />
              </Route>
            </Switch>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
