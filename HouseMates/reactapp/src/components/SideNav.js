import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import PeopleIcon from '@material-ui/icons/People'

// SideNav consists of list of tabs.
const SideNav = ({ drawerWidth, menuOpen, hoverOpen, drawerOpen, handleMouseEnter, handleMouseLeave }) => {
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
  }))
  
  // Content
  const categories = [
    {
      text: 'Housings',
      icon: <HomeIcon color="primary" />,
      path: '/housings',
    },
    {
      text: 'Roommates',
      icon: <PeopleIcon color="primary" />,
      path: '/roommates',
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
              // setHoverOpen(true)
              history.push(category.path)
            }}
            className={location.pathname === category.path ? classes.active : null}
          >
            <ListItemIcon>{category.icon}</ListItemIcon>
            <ListItemText primary={category.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default SideNav
