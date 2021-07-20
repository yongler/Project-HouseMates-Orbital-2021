import React, { useState, useEffect, useRef } from "react"
import { useLocation, Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles"
import { uniqueNamesGenerator, adjectives, colors, animals } from "unique-names-generator"
import { w3cwebsocket as W3CWebSocket } from "websocket"
import { Avatar, ButtonBase, Divider, Grid, IconButton, List, Paper, TextField, Typography } from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'
import SearchBar from "material-ui-search-bar"
import SendIcon from '@material-ui/icons/Send'
import ChatListItem from "../components/ChatListItem"
import ChatMessage from "../components/ChatMessage"
import { checkChatHistory, getRoomList, postRoom, resetChatHistory } from "../redux/chat/actions"
import "./pages.css"

const Chat = ({
  user, isAuthenticated,
  roomList, getRoomList,
  postRoom,
  chatUser,
  chatHistory, checkChatHistory, resetChatHistory,
  chatLoading,
}) => {
  // Styling
  const useStyles = makeStyles(theme => ({
    search: {
      width: "100%",
      height: 40,
    },
    list: {
      overflow: "auto",
    },
    content: {
      width: "100%",
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
  const location = useLocation()
  const messagesEndRef = useRef()
  const textInput = useRef()

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
    if (user) getRoomList(user.id)
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
            user_id: dataFromServer.owner,
          },
        ])
      }
    }
  })
  useEffect(() => scrollToBottom(), [messages])
  useEffect(() => { textInput?.current?.focus() }, [activeRoom])

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

  if (!isAuthenticated) { return <Redirect to={{ pathname: "/login", state: { from: location.pathname } }} /> }

  return (
    <>
      {roomList?.length === 0
        ?
        <>
          {/* No post */}
          {!chatLoading &&
            <div>
              <Typography variant="h6" style={{ marginLeft: 5 }}>Chat</Typography>
              <div style={{ textAlign: "center" }}>
                <Typography variant="subtitle1">No chats.</Typography>
              </div>
            </div>}
        </>
        :
        <Grid container spacing={3}>
          {/* Chat list */}
          <Grid container item xs={3} >
            {/* Title */}
            <Grid item xs={12} style={{ height: "8vh" }}>
              <Typography variant="h6" style={{ marginLeft: 5 }}>Chat</Typography>
            </Grid>

            {/* Search bar */}
            {/* <Grid item xs={12}>
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
            </Grid> */}

            {/* Add button */}
            {/* <Grid item xs={12}>
              <ButtonBase style={{ width: "100%" }}>
                <Paper style={{ width: "100%", display: 'flex', padding: 10 }}>
                  <AddIcon />
                  <Typography variant="body1" style={{ marginLeft: 10 }}>Start a new conversation</Typography>
                </Paper>
              </ButtonBase>
            </Grid> */}

            {/* Chat list */}
            <Grid item xs={12} style={{ height: "70vh" }}>
              <List dense={true} className={classes.list} style={{ padding: 0 }}>
                {roomList.map((room, index) => (
                  <>
                    <ChatListItem
                      key={room.id}
                      name={user.id === room.owner1.id
                        ? (room.owner2.first_name + " " + room.owner2.last_name)
                        : (room.owner1.first_name + " " + room.owner1.last_name)}
                      pic={user.id === room.owner1.id
                        ? room.owner2.profile_pic
                        : room.owner1.profile_pic}
                      msg={(activeRoom?.id === room.id && messages?.[messages?.length - 1]?.message) ||
                        room?.messages[room?.messages?.length - 1]?.message}
                      setRoom={setRoom}
                      room={room.label}
                      active={room.id === activeRoom?.id}
                      animationDelay={index + 1}
                    />

                  </>
                ))}
              </List>
            </Grid>
          </Grid>

          {activeRoom ?
            // Chat content
            <Grid container item spacing={1} xs={9} style={{ width: "100%" }}>
              {/* Header */}
              <Grid item xs={12}>
                <Paper style={{ width: "100%", display: "flex", padding: 10, alignItems: 'center' }}>
                  <Avatar />
                  <Typography variant="h6" style={{ marginLeft: 20 }}>
                    {user?.id === activeRoom?.owner1.id
                      ? (activeRoom?.owner2.first_name + " " + activeRoom?.owner2.last_name)
                      : user?.id === activeRoom?.owner2.id
                        ? (activeRoom?.owner1.first_name + " " + activeRoom?.owner1.last_name)
                        : ""}
                  </Typography>
                </Paper>
              </Grid>

              {/* Body */}
              <Grid item xs={12} style={{ width: "100%" }}>
                <Paper style={{ width: "100%", padding: 10 }}>
                  <div style={{ width: "100%", height: "50vh", overflow: "auto" }}>
                    {messages?.map((msg, index) => (
                      <ChatMessage
                        animationDelay={index + 2}
                        user={msg.user_id === user.first_name}
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
                      inputRef={textInput}
                    />
                    <IconButton
                      color="primary"
                      type="submit"
                      style={{ margin: 5 }}
                      disabled={!msgText}
                    >
                      <SendIcon />
                    </IconButton>
                  </form>
                </Paper>
              </Grid>
            </Grid>
            :
            <Grid item xs={9} style={{ width: "100%", height: "78vh" }}>
              <Paper style={{ width: "100%", height: "78vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="body1">Select a user to start chatting!</Typography>
              </Paper>
            </Grid>}
        </Grid>}
    </>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  roomList: state.chat.roomList,
  chatUser: state.chat.chatUser,
  chatHistory: state.chat.chatHistory,
  chatLoading: state.chat.chatLoading,
})

const mapDispatchToProps = {
  getRoomList,
  postRoom,
  checkChatHistory,
  resetChatHistory,
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
