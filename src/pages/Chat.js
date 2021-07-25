import React, { useState, useEffect, useRef } from "react";
import { useLocation, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import { makeStyles } from "@material-ui/core/styles";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {
  Avatar,
  ButtonBase,
  Divider,
  Grid,
  IconButton,
  List,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import SearchBar from "material-ui-search-bar";
import SendIcon from "@material-ui/icons/Send";
import ChatListItem from "../components/ChatListItem";
import ChatMessage from "../components/ChatMessage";
import {
  checkChatHistory,
  editMsg,
  getRoomList,
  postRoom,
  resetChatHistory,
} from "../redux/chat/actions";
import "./pages.css";

const Chat = ({
  user,
  isAuthenticated,
  roomList,
  getRoomList,
  postRoom,
  chatUser,
  chatHistory,
  checkChatHistory,
  resetChatHistory,
  editMsg,
}) => {
  // Styling
  const useStyles = makeStyles((theme) => ({
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
  }));

  // States
  const [messages, setMessages] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [client, setClient] = useState(null);
  const [msgText, setMsgText] = useState("");
  const [room, setRoom] = useState("");
  const [roomListByLabel, setRoomListByLabel] = useState([]);
  const [unreadMsgs, setUnreadMsgs] = useState(null);

  // Hooks
  const classes = useStyles();
  const location = useLocation();
  const textInput = useRef();

  // Constants
  const ws_scheme = window.location.protocol === "https:" ? "wss" : "ws";
  // const ws_scheme = "ws";

  // Handlers
  const handleChange = (e) => setMsgText(e.target.value);
  const handleSend = (e) => {
    e.preventDefault();
    client.send(
      JSON.stringify({
        type: "message",
        message: msgText,
        owner: user.id,
      })
    );
    setMsgText("");
  };
  // Mark as read
  useEffect(() => {
    if (!msgText) {
      messages?.forEach((msg) => {
        if (!msg.hasRead && msg.user_id.toString() !== user.id.toString()) {
          editMsg(msg.id, true);
        }
      });
    }
  }, [msgText]);

  // useEffects
  // Get user room list
  useEffect(() => {
    if (user) getRoomList(user.id);
  }, [user]);
  // Process user room list
  useEffect(() => {
    const temp = roomList.reduce(
      (prev, curr) => ({ ...prev, [curr.label]: curr }),
      {}
    );
    setRoomListByLabel(temp);
    // const temp2 = roomList.reduce((prevRoom, currRoom) => ({
    //   ...prevRoom,
    //   [currRoom.label]: currRoom.messages.reduce((prevMsg, currMsg) =>
    //     prevMsg + (!currMsg.hasRead && currMsg.user_id.toString() !== user.id.toString() ? 1 : 0), 0)
    // }), {})
    // setUnreadMsgs(temp2)
  }, [roomList]);
  // Set active room and messages
  useEffect(() => {
    if (roomListByLabel[room]?.id !== activeRoom?.id)
      setActiveRoom(roomListByLabel[room]);
    setMessages(roomListByLabel[room]?.messages);
  }, [roomListByLabel]);
  // Connect to active room
  useEffect(() => {
    if (room) {
      const temp = new W3CWebSocket(
        ws_scheme + "://" + window.location.host + "/ws/chat/" + room + "/"
      );
      setClient(temp);
    }
  }, [room]);
  useEffect(() => {
    if (client)
      client.onopen = () => {
        console.log("WebSocket Client Connected: ", room);
      };
    if (room) {
      if (roomListByLabel[room]?.id !== activeRoom?.id)
        setActiveRoom(roomListByLabel[room]);
      setMessages(roomListByLabel[room]?.messages);
    }
    if (user) getRoomList(user.id);
  }, [client]);
  // Update messages
  useEffect(() => {
    if (client) {
      client.onopen = () => {
        console.log("WebSocket Client Connected: ", room);
      };

      client.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        console.log("got reply! ", dataFromServer.type);
        if (dataFromServer) {
          setMessages([
            ...messages,
            {
              message: dataFromServer.message,
              user_id: dataFromServer.owner,
            },
          ]);
        }
        getRoomList(user.id);
      };
    }
  });
  // Scroll to bottom of messages
  useEffect(() => {
    const chatBody = document.getElementById("chatBody");
    if (chatBody) chatBody.scrollTo(0, chatBody.scrollHeight);
  }, [messages]);
  // Focus on text field
  useEffect(() => {
    textInput?.current?.focus();
    setMsgText("");
    messages?.forEach((msg) => {
      if (!msg.hasRead && msg.user_id.toString() !== user.id.toString()) {
        editMsg(msg.id, true);
      }
    });
  }, [activeRoom]);
  // Get chat history
  useEffect(() => {
    if (chatUser) checkChatHistory(user.id, chatUser.id);
  }, [chatUser]);
  // Check whether to create new room
  useEffect(() => {
    if (chatHistory) {
      if (chatHistory.length === 0) {
        const shortName = uniqueNamesGenerator({
          dictionaries: [colors, adjectives, animals],
        });
        postRoom(user.id, chatUser.id, shortName);
        getRoomList(user.id);
        setRoom(shortName);
      } else {
        setRoom(chatHistory[0].label);
      }
      resetChatHistory();
    }
  }, [chatHistory]);

  if (!isAuthenticated) {
    return (
      <Redirect
        to={{ pathname: "/login", state: { from: location.pathname } }}
      />
    );
  }

  return (
    <>
      {roomList?.length === 0 ? (
        <>
          {/* No post */}
          <div>
            <Typography variant="h6" style={{ marginLeft: 5 }}>
              Chat
            </Typography>
            <div style={{ textAlign: "center" }}>
              <Typography variant="subtitle1">No chats.</Typography>
            </div>
          </div>
        </>
      ) : (
        <Grid container spacing={3}>
          {/* Chat list */}
          <Grid container item xs={3}>
            {/* Title */}
            <Grid item xs={12} style={{ height: "8vh" }}>
              <Typography variant="h6" style={{ marginLeft: 5 }}>
                Chat
              </Typography>
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
              <List
                dense={true}
                className={classes.list}
                style={{ padding: 0, overflow: "hidden" }}
              >
                {roomList.map((room, index) => (
                  <>
                    <ChatListItem
                      key={room.id}
                      name={
                        user.id === room.owner1.id
                          ? room.owner2.first_name + " " + room.owner2.last_name
                          : room.owner1.first_name + " " + room.owner1.last_name
                      }
                      pic={
                        user.id === room.owner1.id
                          ? room.owner2.profile_pic
                          : room.owner1.profile_pic
                      }
                      msg={
                        (activeRoom?.id === room.id &&
                          messages?.[messages?.length - 1]?.message) ||
                        room?.messages[room?.messages?.length - 1]?.message
                      }
                      time={
                        (activeRoom?.id === room.id &&
                          messages?.[messages?.length - 1]?.timestamp) ||
                        room?.messages[room?.messages?.length - 1]?.timestamp
                      }
                      // unreadMsgs={unreadMsgs?.[room.label]}
                      unreadMsgs={
                        (activeRoom?.id === room.id &&
                          messages?.reduce(
                            (prev, curr) =>
                              prev +
                              (!curr.hasRead &&
                              curr.user_id.toString() !== user.id.toString()
                                ? 1
                                : 0),
                            0
                          )) ||
                        room?.messages.reduce(
                          (prev, curr) =>
                            prev +
                            (!curr.hasRead &&
                            curr.user_id.toString() !== user.id.toString()
                              ? 1
                              : 0),
                          0
                        )
                      }
                      user={user}
                      setRoom={setRoom}
                      editMsg={editMsg}
                      room={room}
                      active={room.id === activeRoom?.id}
                      animationDelay={index + 1}
                    />
                  </>
                ))}
              </List>
            </Grid>
          </Grid>

          {activeRoom ? (
            // Chat content
            <Grid container item spacing={1} xs={9} style={{ width: "100%" }}>
              {/* Header */}
              <Grid item xs={12}>
                <Paper
                  style={{
                    width: "100%",
                    display: "flex",
                    padding: 10,
                    alignItems: "center",
                    elevation: 0,
                  }}
                >
                  <Avatar
                    src={
                      user?.id === activeRoom?.owner1?.id
                        ? activeRoom?.owner2?.profile_pic
                        : activeRoom?.owner1?.profile_pic
                    }
                  />
                  <Typography variant="h6" style={{ marginLeft: 20 }}>
                    {user?.id === activeRoom?.owner1.id
                      ? activeRoom?.owner2.first_name +
                        " " +
                        activeRoom?.owner2.last_name
                      : user?.id === activeRoom?.owner2.id
                      ? activeRoom?.owner1.first_name +
                        " " +
                        activeRoom?.owner1.last_name
                      : ""}
                  </Typography>
                </Paper>
              </Grid>

              {/* Body */}
              <Grid item xs={12} style={{ width: "100%" }}>
                <Paper
                  style={{ width: "100%", padding: 10, elevation: 0 }}
                  elevation={0}
                >
                  <div
                    style={{ width: "100%", height: "50vh", overflow: "auto" }}
                    id="chatBody"
                  >
                    {messages?.map((msg, index) => (
                      <>
                        <ChatMessage
                          animationDelay={index + 2}
                          user={msg.user_id.toString() === user.id.toString()}
                          msg={msg.message}
                          time={msg.timestamp}
                        />
                        {/* <Typography variant="body2" color="textSecondary" align="center" gutterBottom>
                          1/3/2021
                        </Typography> */}
                      </>
                    ))}
                  </div>
                </Paper>
              </Grid>

              {/* Footer */}
              <Grid item xs={12}>
                <Paper
                  style={{
                    width: "100%",
                    paddingLeft: 10,
                    paddingRight: 10,
                    elevation: 0,
                  }}
                  elevation={0}
                >
                  <form
                    noValidate
                    onSubmit={handleSend}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      variant="outlined"
                      value={msgText}
                      placeholder="Type here..."
                      fullWidth
                      size="small"
                      className="inputRounded"
                      onChange={(e) => handleChange(e)}
                      inputRef={textInput}
                    />
                    <IconButton
                      color="primary"
                      type="submit"
                      style={{ margin: 5 }}
                      disabled={
                        !msgText || msgText.replace(/\s/g, "").length === 0
                      }
                    >
                      <SendIcon />
                    </IconButton>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          ) : (
            <Grid item xs={9} style={{ width: "100%", height: "78vh" }}>
              <Paper
                style={{
                  width: "100%",
                  height: "78vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body1"
                  style={{ marginLeft: 20, marginRight: 20 }}
                >
                  Select a user to start chatting!
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  roomList: state.chat.roomList,
  chatUser: state.chat.chatUser,
  chatHistory: state.chat.chatHistory,
});

const mapDispatchToProps = {
  getRoomList,
  postRoom,
  checkChatHistory,
  resetChatHistory,
  editMsg,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
