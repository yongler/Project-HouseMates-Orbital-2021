import React from 'react'
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { indigo } from '@material-ui/core/colors'
import Activate from './pages/Activate'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Housings from './pages/Housings'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import ChangePassword from './pages/ChangePassword'
import DeleteAccount from './pages/DeleteAccount'
import ResendActivationEmail from './pages/ResendActivationEmail'
import ResetPassword from './pages/ResetPassword'
import ResetPasswordConfirm from './pages/ResetPasswordConfirm'
import RoommateDetail from './pages/RoommateDetail'
import RoommateForm from './pages/RoommateForm'
import HousingForm from './pages/HousingForm'
import Roommates from './pages/Roommates'
import LayoutTwo from './layout/LayoutTwo'
import LayoutOne from './layout/LayoutOne'
import RouteWrapper from './layout/RouteWrapper'
import Layout from './hocs/Layout'
import store from './redux/store'
import Matchmaking from './components/Matchmaking'
import EditHousingForm from './pages/EditHousingForm'
import HousingDetail from './pages/HousingDetail'
import EditRoommateForm from './pages/EditRoommateForm'
import Chat from './pages/Chat'

const App = () => {
  // Styling
  const theme = createMuiTheme({
    palette: {
      primary: indigo,
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout>
            <Switch>
              {/* Routes with LayoutOne */}
              <RouteWrapper path="/login" title={"Login"} component={Login} layout={LayoutOne} />
              <RouteWrapper path="/delete-account" title={"Delete Account"} component={DeleteAccount} layout={LayoutOne} />
              <RouteWrapper path="/register" title={"Registration"} component={Register} layout={LayoutOne} />
              <RouteWrapper path="/change-password" title={"Change Password"} component={ChangePassword} layout={LayoutOne} />
              <RouteWrapper path="/reset-password" title={"Reset Password"} component={ResetPassword} layout={LayoutOne} />
              <RouteWrapper
                path="/password/reset/confirm/:uid/:token"
                title={"Reset Password"}
                component={ResetPasswordConfirm}
                layout={LayoutOne} />
              <RouteWrapper path="/activate/:uid/:token" title={"Account Activation"} component={Activate} layout={LayoutOne} />
              <RouteWrapper path="/resend-activation-email" title={"Resend Activation Email"} component={ResendActivationEmail} layout={LayoutOne} />

              {/* Routes with LayoutTwo */}
              <RouteWrapper exact path="/dashboard" component={Dashboard} layout={LayoutTwo} />
              <RouteWrapper exact path="/housings" component={Housings} layout={LayoutTwo} />
              <RouteWrapper path="/housings/:id" component={HousingDetail} layout={LayoutTwo} />
              <RouteWrapper exact path="/roommates" component={Roommates} layout={LayoutTwo} />
              <RouteWrapper path="/roommates/:id" component={RoommateDetail} layout={LayoutTwo} />
              <RouteWrapper path="/roommate-form" component={RoommateForm} layout={LayoutTwo} />
              <RouteWrapper path="/housing-form" component={HousingForm} layout={LayoutTwo} />
              <RouteWrapper path="/edit-roommate-form/:id" component={EditRoommateForm} layout={LayoutTwo} />
              <RouteWrapper path="/edit-housing-form/:id" component={EditHousingForm} layout={LayoutTwo} />
              <RouteWrapper path="/profile" component={Profile} layout={LayoutTwo} />
              <RouteWrapper path="/matchmaking" component={Matchmaking} layout={LayoutTwo} />
              <RouteWrapper exact path="/chat" component={Chat} layout={LayoutTwo} />

              {/* Routes with no layout */}
              <Route exact path="/" component={Home} />
              <Route path="*" component={Home} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;

// import React, { useEffect, useLocalStorage, useMedia } from "react";
// import Button from "@material-ui/core/Button";
// import useDarkMode from './useDarkMode'

// // Usage
// function App() {
//   const [darkMode, setDarkMode] = useDarkMode();
//   return (
//     <div>
//       <div className="navbar">
//         <Button darkMode={darkMode} setDarkMode={setDarkMode} />
//       </div>
//       {/* <Content /> */}
//     </div>
//   );
// }

// export default App;
