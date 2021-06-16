import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
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
import ResendActivationEmail from './pages/ResendActivationEmail'
import ResetPassword from './pages/ResetPassword'
import ResetPasswordConfirm from './pages/ResetPasswordConfirm'
import RoommateDetail from './pages/RoommateDetail'
import RoommateForm from './pages/RoommateForm'
import Roommates from './pages/Roommates'
import LayoutTwo from './layout/LayoutTwo'
import LayoutOne from './layout/LayoutOne'
import RouteWrapper from './layout/RouteWrapper'
import Layout from './hocs/Layout'
import store from './redux/store'

const App = () => {
  // Styling;
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
              <RouteWrapper path="/login" component={Login} layout={LayoutOne} />
              <RouteWrapper path="/register" component={Register} layout={LayoutOne} />
              <RouteWrapper path="/change-password" component={ChangePassword} layout={LayoutOne} />
              <RouteWrapper path="/reset-password" component={ResetPassword} layout={LayoutOne} />
              <RouteWrapper
                path="/password/reset/confirm/:uid/:token"
                component={ResetPasswordConfirm}
                layout={LayoutOne} />
              <RouteWrapper path="/activate/:uid/:token" component={Activate} layout={LayoutOne} />
              <RouteWrapper path="/resend-activation-email" component={ResendActivationEmail} layout={LayoutOne} />

              {/* Routes with LayoutTwo */}
              <RouteWrapper
                exact
                path="/"
                component={Home}
                layout={LayoutTwo}
              />
              <RouteWrapper
                exact
                path="/dashboard"
                component={Dashboard}
                layout={LayoutTwo}
              />
              <RouteWrapper
                path="/housings"
                component={Housings}
                layout={LayoutTwo}
              />
              <RouteWrapper
                exact
                path="/roommates"
                component={Roommates}
                layout={LayoutTwo}
              />
              <RouteWrapper
                path="/roommates/:id"
                component={RoommateDetail}
                layout={LayoutTwo}
              />
              <RouteWrapper
                path="/form"
                component={RoommateForm}
                layout={LayoutTwo}
              />
              <RouteWrapper
                path="/profile"
                component={Profile}
                layout={LayoutTwo}
              />
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
