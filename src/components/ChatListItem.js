import React, { useState } from "react"
import clsx from 'clsx'
import { Avatar, ButtonBase, ListItem, ListItemAvatar, Paper, makeStyles, Typography } from '@material-ui/core'

const ChatListItem = ({ user, name, pic, msg, time, unreadMsgs, active, setRoom, room, editMsg }) => {
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
    <Paper style={{ width: "100%", marginBottom: 5, minWidth: 170 }}>
      <ButtonBase
        style={{ width: "100%", borderRadius: 5 }}
        className={clsx({ [classes.active]: active || enter })}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <ListItem style={{ marginBottom: 10, display: "flex" }}>
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
              <Typography variant="body1" noWrap>{name}</Typography>

              {/* Unread messages */}
              {unreadMsgs !== 0 && (
                <div
                  style={{
                    width: 20,
                    height: 20,
                    minWidth: 20,
                    minHeight: 20,
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
              <Typography variant="body2" color="textSecondary" noWrap style={{ maxWidth: 230, paddingRight: 5 }}>
                {msg}
              </Typography>

              {/* Time */}
              <Typography variant="body2" color="textSecondary" style={{ minWidth: 60 }}>
                {time?.split(" ")[1]}
              </Typography>
            </div>
          </div>
        </ListItem>
      </ButtonBase>
    </Paper>
  );
};

export default ChatListItem;
