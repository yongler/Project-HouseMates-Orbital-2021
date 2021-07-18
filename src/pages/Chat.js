import React, { useState, useEffect, useRef } from "react"
import { connect } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles"
import { uniqueNamesGenerator, adjectives, colors, animals } from "unique-names-generator"
import { w3cwebsocket as W3CWebSocket } from "websocket"
import { Avatar, ButtonBase, Grid, IconButton, List, Paper, TextField, Typography } from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'
import SearchBar from "material-ui-search-bar"
import SendIcon from '@material-ui/icons/Send'
import ChatListItem from "../components/ChatListItem"
import ChatMessage from "../components/ChatMessage"
import { checkChatHistory, getRoomList, postRoom, resetChatHistory } from "../redux/chat/actions"
import "./pages.css"

const Chat = ({
  user,
  roomList, getRoomList,
  postRoom,
  chatUser,
  chatHistory, checkChatHistory, resetChatHistory,
}) => {
  // Styling
  const useStyles = makeStyles(theme => ({
    search: {
      width: "100%",
      height: 40,
    },
    list: {
      overflow: "auto",
      height: "45vh",
    },
    content: {
      width: "100%",
      height: "55vh",
      overflow: "auto",
    },
  }))

  // States
  const [messages, setMessages] = useState([])
  const [activeRoom, setActiveRoom] = useState(null)
  const [msgText, setMsgText] = useState("")
  const [room, setRoom] = useState("kiwi")
  const [roomListByLabel, setRoomListByLabel] = useState([])

  // Hooks
  const classes = useStyles()
  const messagesEndRef = useRef()

  // Constants
  const ws_scheme = window.location.protocol === "https:" ? "wss" : "ws"
  const host = window.location.host === "localhost:8000" ? "localhost:8000/" : "housematesorbital.herokuapp.com/"
  const client = new W3CWebSocket(ws_scheme + "://" + host + "ws/chat/" + room + "/")

  // Helper functions
  const scrollToBottom = () => { messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" }) }

  // Handlers
  const handleChange = e => setMsgText(e.target.value)
  const handleSend = (e) => {
    e.preventDefault()
    client.send(JSON.stringify({
      type: "message",
      message: msgText,
      owner: user.first_name,
    }))
    setMsgText("")
  }

  useEffect(() => { if (user) getRoomList(user.id) }, [user])
  useEffect(() => {
    const temp = roomList.reduce((prev, curr) => ({ ...prev, [curr.label]: curr }), {})
    setRoomListByLabel(temp)
  }, [roomList])
  useEffect(() => {
    setActiveRoom(roomListByLabel[room])
    setMessages(roomListByLabel[room]?.messages)
  }, [roomListByLabel])
  useEffect(() => {
    client.onopen = () => { console.log("WebSocket Client Connected: ", room) }
    setActiveRoom(roomListByLabel[room])
    setMessages(roomListByLabel[room]?.messages)
  }, [room])

  useEffect(() => {
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data)
      console.log("got reply! ", dataFromServer.type)
      if (dataFromServer) {
        setMessages([
          ...messages,
          {
            message: dataFromServer.message,
            owner: dataFromServer.owner,
          },
        ])
      }
    }
  })
  useEffect(() => scrollToBottom(), [messages])

  useEffect(() => { if (chatUser) checkChatHistory(user.id, chatUser.id) }, [chatUser])
  useEffect(() => {
    if (chatHistory) {
      if (chatHistory.length === 0) {
        const shortName = uniqueNamesGenerator({ dictionaries: [colors, adjectives, animals] })
        postRoom(user.id, chatUser.id, shortName)
        getRoomList(user.id)
        setRoom(shortName)
      } else {
        setRoom(chatHistory[0].label)
      }
      resetChatHistory()
    }
  }, [chatHistory])

  return (
    <Grid container spacing={3}>
      {/* Chat list */}
      <Grid container item spacing={2} xs={3} >
        {/* Title */}
        <Grid item xs={12}>
          <Typography variant="h6" style={{ marginLeft: 5 }}>Chat</Typography>
        </Grid>

        {/* Search bar */}
        <Grid item xs={12}>
          <SearchBar
            className={classes.search}
            cancelOnEscape
            searchIcon={<ClearIcon />}
            closeIcon={<ClearIcon />}
            placeholder={"Search..."}
            classes={{
              input: { color: "white" }
            }}
          />
        </Grid>

        {/* Add button */}
        <Grid item xs={12}>
          <ButtonBase style={{ width: "100%" }}>
            <Paper style={{ width: "100%", display: 'flex', padding: 10 }}>
              <AddIcon />
              <Typography variant="body1" style={{ marginLeft: 10 }}>Start a new conversation</Typography>
            </Paper>
          </ButtonBase>
        </Grid>

        {/* Chat list */}
        <Grid item xs={12}>
          <List className={classes.list}>
            {roomList.map((room, index) => (
              <ButtonBase style={{ width: "100%" }}>
                <ChatListItem
                  key={room.id}
                  name={room.user1 === user.id ? room.user2 : room.user1}
                  animationDelay={index + 1}
                  image={room.image}
                  setRoom={setRoom}
                  room={room.label}
                  active={room.id === activeRoom?.id}
                />
              </ButtonBase>
            ))}
          </List>
        </Grid>
      </Grid>

      {/* Chat content */}
      <Grid container item spacing={1} xs={9} style={{ width: "100%" }}>
        {/* Header */}
        <Grid item xs={12}>
          <Paper style={{ width: "100%", display: "flex", padding: 10, alignItems: 'center' }}>
            <Avatar />
            <Typography variant="h6" style={{ marginLeft: 20 }}>{activeRoom?.user1 === user?.id ? activeRoom?.user2 : activeRoom?.user1}</Typography>
          </Paper>
        </Grid>

        {/* Body */}
        <Grid item xs={12} style={{ width: "100%" }}>
          <Paper style={{ width: "100%", padding: 10 }}>
            <div style={{ width: "100%", height: "50vh", overflow: "auto" }}>
              {messages?.map((msg, index) => (
                <ChatMessage
                  animationDelay={index + 2}
                  user={msg.owner === user.first_name}
                  msg={msg.message}
                />))}
              <div ref={messagesEndRef} />
            </div>
          </Paper>
        </Grid>

        {/* Footer */}
        <Grid item xs={12}>
          <Paper style={{ width: "100%", paddingLeft: 10, paddingRight: 10 }}>
            <form
              noValidate
              onSubmit={handleSend}
              style={{ width: "100%", display: "flex", alignItems: 'center', justifyContent: 'center' }}
            >
              <TextField
                variant="outlined"
                value={msgText}
                placeholder="Type here..."
                fullWidth
                size="small"
                className="inputRounded"
                onChange={e => handleChange(e)}
              />
              <IconButton
                color="primary"
                type="submit"
                style={{ margin: 5 }}
              >
                <SendIcon />
              </IconButton>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  roomList: state.chat.roomList,
  chatUser: state.chat.chatUser,
  chatHistory: state.chat.chatHistory,
})

const mapDispatchToProps = {
  getRoomList,
  postRoom,
  checkChatHistory,
  resetChatHistory,
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
