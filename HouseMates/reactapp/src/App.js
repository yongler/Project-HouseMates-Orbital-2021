import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles'
import { indigo } from '@material-ui/core/colors'
import Box from '@material-ui/core/Box'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'
import Housings from './pages/Housings'
import Login from './pages/Login'
import NavBar from './components/NavBar'
import Register from './pages/Register'
import RoommateDetail from './pages/RoommateDetail'
import RoommateForm from './pages/RoommateForm'
import Roommates from './pages/Roommates'
import SideNav from './components/SideNav'
import Testing from './pages/Testing'

const drawerWidth = 190

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  flex: {
    display: 'flex',
  },
  closeSize: {
    minHeight: 100,
    width: theme.spacing(7) + 1,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  openSize: {
    minHeight: 100,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}))

const theme = createMuiTheme({
  palette: {
    primary: indigo,
  },
})

const App = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(true)
  var hoverOpen = true

  const handleDrawerOpen = () => {
    hoverOpen = true
    setTimeout(() => hoverOpen ? setOpen(true) : null, 1000)
  }
  const handleDrawerClose = () => {
    hoverOpen = false
    setOpen(false)
  }
  const handleDrawerToggle = () => {
    setOpen(!open)
    open === true ? setHover(true) : setHover(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route component={Login} path="/login" />
          <Route component={Register} path="/register" />
          <Route component={Testing} path="/testing" />

          <>
            <div className={classes.root}>
              <NavBar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />

              <SideNav drawerWidth={drawerWidth} open={open} hover={hover} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />

              <main className={classes.content}>
                <div className={classes.toolbar} />
                <div className={classes.flex}>
                  <div className={hover ? classes.closeSize : classes.openSize} />
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
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
