import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import HomeIcon from '@material-ui/icons/Home'
import IconButton from '@material-ui/core/IconButton'
import PeopleIcon from '@material-ui/icons/People'

const SideNav = ({ drawerWidth, open, handleDrawerClose }) => {
  const useStyles = makeStyles(theme => ({
    active: {
      background: theme.palette.action.hover,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
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
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
  }))
  
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

  const history = useHistory()
  const location = useLocation()
  const classes = useStyles()

  return (
    <Drawer
      variant="permanent"
      className={clsx(
        classes.drawer,
        {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }
      )}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>

      <Divider />

      <List>
        {categories.map(category => (
          <ListItem
            key={category.text}
            button
            onClick={() => history.push(category.path)}
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
