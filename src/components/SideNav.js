import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import PeopleIcon from '@material-ui/icons/People'
import ChatIcon from "@material-ui/icons/Chat"
import { setPage } from "../redux/post/actions"

// SideNav consists of list of tabs.
const SideNav = ({ 
  user,
  drawerWidth, 
  menuOpen, hoverOpen, drawerOpen, 
  handleMouseEnter, handleMouseLeave, 
  setPage,
}) => {
  // Styling
  const useStyles = makeStyles(theme => ({
    active: {
      background: theme.palette.action.hover,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      position: 'absolute',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerOpenDelay: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      transitionDelay: '1s'
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(7) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      minHeight: theme.mixins.toolbar.minHeight + 8,
    },
    hidden: {
      display: "none",
    },
  }))

  // Content
  const categories = [
    {
      text: 'Housings',
      icon: <HomeIcon color="primary" />,
      path: '/housings',
      private: false,
    },
    {
      text: 'Roommates',
      icon: <PeopleIcon color="primary" />,
      path: '/roommates',
      private: false,
    },
    {
      text: 'Chat',
      icon: <ChatIcon color="primary" />,
      path: '/chat',
      private: true,
    },
  ]

  // Hooks
  const history = useHistory()
  const location = useLocation()
  const classes = useStyles()

  return (
    <Drawer
      variant="permanent"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: drawerOpen,
        [classes.drawerOpenDelay]: !menuOpen && hoverOpen,
        [classes.drawerClose]: !drawerOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerOpenDelay]: !menuOpen && hoverOpen,
          [classes.drawerClose]: !drawerOpen,
        }),
      }}
    >
      <div className={classes.toolbar} />

      {/* List of tabs */}
      <List>
        {categories.map(category => (
          <ListItem
            key={category.text}
            button
            onClick={() => {
              history.push(category.path)
              setPage(1)
            }}
            className={clsx({
              [classes.active]: location.pathname === category.path,
              [classes.hidden]: category.private && !user
            })}
          >
            <ListItemIcon>{category.icon}</ListItemIcon>
            <ListItemText primary={category.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

const mapDispatchToProps = {
  setPage,
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav)
