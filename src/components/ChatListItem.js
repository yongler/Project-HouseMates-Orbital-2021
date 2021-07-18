import React from "react"
import clsx from 'clsx'
import { Avatar, ListItem, ListItemAvatar, ListItemText, makeStyles } from '@material-ui/core'

const ChatListItem = ({ image, name, animationDelay, active, setRoom, room }) => {
  // Styling
  const useStyles = makeStyles(theme => ({
    active: {
      backgroundColor: theme.palette.action.hover,
    },
  }))

  // Hooks
  const classes = useStyles()

  // Handlers
  const handleClick = (e) => { setRoom(room) }

  return (
    <ListItem
      style={{ animationDelay: `0.${animationDelay}s`, marginBottom: 10 }}
      onClick={handleClick}
      className={clsx({ [classes.active]: active })}
    >
      <ListItemAvatar>
        <Avatar/>
      </ListItemAvatar>
      <ListItemText primary={name} />
    </ListItem>
  )
}

export default ChatListItem
