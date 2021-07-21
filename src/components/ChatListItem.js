import React, { useState } from "react"
import clsx from 'clsx'
import { Avatar, ButtonBase, ListItem, ListItemAvatar, ListItemText, Paper, makeStyles } from '@material-ui/core'

const ChatListItem = ({ name, pic, msg, animationDelay, active, setRoom, room }) => {
  // Styling
  const useStyles = makeStyles(theme => ({
    active: {
      backgroundColor: theme.palette.action.hover,
    },
  }))

  // Hooks
  const classes = useStyles()

  // States
  const [enter, setEnter] = useState(false)

  // Handlers
  const handleClick = () => { setRoom(room) }
  const handleMouseEnter = () => { setEnter(true) }
  const handleMouseLeave = () => { setEnter(false) }

  return (
    <Paper style={{ width: "100%", marginBottom: 5 }}>
      <ButtonBase
        style={{ width: "100%", borderRadius: 5 }}
        className={clsx({ [classes.active]: (active || enter) })}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ListItem
          style={{ animationDelay: `0.${animationDelay}s`, marginBottom: 10 }}
          onClick={handleClick}
        >
          <ListItemAvatar>
            <Avatar src={pic} />
          </ListItemAvatar>
          <ListItemText primary={name} secondary={msg} style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }} />
        </ListItem>
      </ButtonBase>
    </Paper>
  )
}

export default ChatListItem
