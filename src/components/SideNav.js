import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { Badge, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import PeopleIcon from '@material-ui/icons/People'
import ChatIcon from "@material-ui/icons/Chat"
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import NotesIcon from '@material-ui/icons/Notes'
import { setPage } from "../redux/post/actions"
import { getRoomList } from '../redux/chat/actions';

// SideNav consists of list of tabs.
const SideNav = ({
  user,
  drawerWidth,
  menuOpen,
  hoverOpen,
  drawerOpen,
  handleMouseEnter,
  handleMouseLeave,
  setPage,
  roomList, getRoomList,
}) => {
  // Styling
  const useStyles = makeStyles((theme) => ({
    active: {
      background: theme.palette.action.hover,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
      position: "absolute",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerOpenDelay: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      transitionDelay: "1s",
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(7) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      minHeight: theme.mixins.toolbar.minHeight + 8,
    },
    hidden: {
      display: "none",
    },
    noMsg: {
      color: "primary",
    },
    gotMsg: {
      color: "secondary",
    },
  }));

  // Hooks
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  // Constants
  const ws_scheme = window.location.protocol === "https:" ? "wss" : "ws";

  // States
  const [oneTimePass, setOneTimePass] = useState(true)

  // useEffects
  useEffect(() => {
    if (oneTimePass && roomList.length > 0) {
      setOneTimePass(false)
      roomList.forEach((room) => {
        const temp4 = new W3CWebSocket(ws_scheme + "://" + window.location.host + "/ws/chat/" + room.label + "/");
        temp4.onopen = () => { console.log("WebSocket Client Connected: ", room.label); };
        temp4.onmessage = () => { getRoomList(user.id); };
      });
    }
  }, [roomList])

  // Content
  const categories = [
    {
      text: "User dashboard",
      icon: <AccountCircleIcon color="primary" />,
      path: "/profile",
      private: true,
    },
    {
      text: "Housings",
      icon: <HomeIcon color="primary" />,
      path: "/housings",
      private: false,
    },
    {
      text: "Roommates",
      icon: <PeopleIcon color="primary" />,
      path: "/roommates",
      private: false,
    },
    {
      text: 'Chat',
      icon:
        <Badge
          badgeContent={roomList.reduce((prevRoom, currRoom) =>
            prevRoom + currRoom.messages.reduce((prevMsg, currMsg) =>
              prevMsg + (!currMsg.hasRead && currMsg.user_id.toString() !== user.id.toString() ? 1 : 0), 0), 0)}
          color="secondary">
          <ChatIcon color="primary" />
        </Badge>
      ,
      path: '/chat',
      private: true,
    },
    {
      text: 'User dashboard',
      icon: <AccountCircleIcon color="primary" />,
      path: '/profile',
      private: true,
    },
    // {
    //   text: "User guide",
    //   icon: <NotesIcon color="primary" />,
    //   path: "",
    //   private: true,
    // },
  ]

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
        {categories.map((category) => (
          <ListItem
            key={category.text}
            button
            onClick={() => {
              history.push(category.path);
              setPage(1);
            }}
            className={clsx({
              [classes.active]: location.pathname === category.path,
              [classes.hidden]: category.private && !user,
            })}
          >
            <ListItemIcon>{category.icon}</ListItemIcon>
            <ListItemText primary={category.text} style={{ marginLeft: -16 }} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  roomList: state.chat.roomList,
})

const mapDispatchToProps = {
  setPage,
  getRoomList,
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
