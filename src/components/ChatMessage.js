import React from "react"
import clsx from 'clsx'
import { Typography } from '@material-ui/core'
import { makeStyles } from "@material-ui/styles"

const ChatMessage = ({ user, msg, time }) => {
  // Styling
  const useStyles = makeStyles(theme => ({
    msgBox: {
      display: 'flex',
      alignItems: 'center',
    },
    msg: {
      backgroundColor: theme.palette.grey[400],
      padding: 10,
      marginBottom: 5,
      marginRight: 5,
      borderRadius: 10,
      maxWidth: "50%",
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      display: "flex",
      flexDirection: 'column',
    },
    right: {
      justifyContent: 'flex-end',
    },
    blue: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      alignItems: "flex-end",
    }
  }))

  // Hooks
  const classes = useStyles()

  return (
    <div className={clsx(classes.msgBox, { [classes.right]: user })}>
      <div className={clsx(classes.msg, { [classes.blue]: user })}>
        <Typography variant="body1">{msg}</Typography>
        <Typography variant="body2">{time?.split(" ")?.[1]}</Typography>
      </div>
    </div>
  )
}

export default ChatMessage
