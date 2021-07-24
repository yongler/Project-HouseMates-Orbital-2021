import React, { useState } from "react";
import clsx from "clsx";
import {
  Avatar,
  ButtonBase,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  makeStyles,
  Typography,
} from "@material-ui/core";

const ChatListItem = ({
  user,
  name,
  pic,
  msg,
  time,
  unreadMsgs,
  animationDelay,
  active,
  setRoom,
  room,
  editMsg,
}) => {
  // Styling
  const useStyles = makeStyles((theme) => ({
    active: {
      backgroundColor: theme.palette.action.hover,
    },
  }));

  // Hooks
  const classes = useStyles();

  // States
  const [enter, setEnter] = useState(false);

  // Handlers
  const handleClick = () => {
    setRoom(room.label);
    room.messages.forEach((msg) => {
      if (!msg.hasRead && msg.user_id.toString() !== user.id.toString())
        editMsg(msg.id, true);
    });
  };
  const handleMouseEnter = () => {
    setEnter(true);
  };
  const handleMouseLeave = () => {
    setEnter(false);
  };

  return (
    <Paper style={{ width: "100%", marginBottom: 5, minWidth: 250 }}>
      <ButtonBase
        style={{ width: "100%", borderRadius: 5 }}
        className={clsx({ [classes.active]: active || enter })}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ListItem
          style={{
            animationDelay: `0.${animationDelay}s`,
            marginBottom: 10,
            display: "flex",
          }}
          onClick={handleClick}
        >
          <ListItemAvatar>
            <Avatar src={pic} />
          </ListItemAvatar>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* Name */}
              <Typography variant="body1">{name}</Typography>

              {/* Unread messages */}
              {unreadMsgs !== 0 && (
                <div
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: "red",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                  }}
                >
                  <div style={{ color: "white", textAlign: "center" }}>
                    {unreadMsgs}
                  </div>
                </div>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {/* Latest message */}
              <Typography variant="body2" color="textSecondary">
                {msg && (msg.length > 15 ? msg.substring(0, 15) + "..." : msg)}
              </Typography>

              {/* Time */}
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ overflow: "hidden" }}
              >
                {time &&
                  time.split(" ")[1].split(":")[0] +
                    ":" +
                    time.split(" ")[1].split(":")[1] +
                    " " +
                    time.split(" ")[2]}
              </Typography>
            </div>
          </div>
        </ListItem>
      </ButtonBase>
    </Paper>
  );
};

export default ChatListItem;
