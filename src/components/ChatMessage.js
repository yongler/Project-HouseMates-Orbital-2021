import React from "react";
import clsx from 'clsx'
import { Typography } from '@material-ui/core'
import { makeStyles } from "@material-ui/styles";

const ChatMessage = ({ user, msg }) => {
  // Styling
  const useStyles = makeStyles(theme => ({
    msg: {
      backgroundColor: theme.palette.grey[400],
      padding: 10,
      marginBottom: 5,
      marginRight: 5,
      borderRadius: 10,
      maxWidth: "50%",
    },
    right: {
      justifyContent: 'flex-end',
    },
    blue: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    }
  }))

  // Hooks
  const classes = useStyles()

  return (
    <div
      style={{ animationDelay: `0.8s`, display: 'flex', alignItems: 'center' }}
      className={clsx({ [classes.right]: user })}
    >
      <div className={clsx(classes.msg, { [classes.blue]: user })} style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
        <Typography
          variant="body1"
          display="inline"
        >
          {msg}
        </Typography>
      </div>
    </div>
  );
}

export default ChatMessage
