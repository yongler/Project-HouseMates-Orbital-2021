import React, { Component, useState, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";

import { connect } from "react-redux";
import { getRoomList, postRoom } from "../redux/chat/actions";

import { makeStyles } from "@material-ui/core/styles";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    boxShadow: "none",
  },
}));

const Chat = ({ user, getRoomList, postRoom }) => {
  const [isLoggedIn] = useState(true);
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [room, setRoom] = useState("kiwi");

  const ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";

  const classes = useStyles();

  // conditional url 
  const host =
    window.location.host === "localhost:8000"
      ? "localhost:8000/"
      : "housematesorbital.herokuapp.com/";

  const client = new W3CWebSocket(
    ws_scheme + "://" + host + "ws/chat/" + room + "/"
  );

  // send message
  const onButtonClicked = (e) => {
    e.preventDefault();

    client.send(
      JSON.stringify({
        type: "message",
        message: value,
        owner: user.first_name,
      })
    );
    setValue("");
  };

  // start new chat 
  const newGroup = () => {
    const shortName = uniqueNamesGenerator({
      dictionaries: [colors, adjectives, animals],
    });
    console.log(shortName)
    postRoom(1, 2, shortName);
    setRoom(shortName);
  };

  useEffect(() => {
    getRoomList();
  });

  // to connect to backend
  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    
    //receive 
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log("got reply! ", dataFromServer.type);
      if (dataFromServer) {
        setMessages([
          ...messages,
          {
            msg: dataFromServer.message,
            name: dataFromServer.name,
          },
        ]);
      }
    };
  });

  return (
    <Container component="main" maxWidth="xs">
      {isLoggedIn ? (
        <div style={{ marginTop: 50 }}>
          Room Name: {room}
          <Paper
            style={{
              height: 500,
              maxHeight: 500,
              overflow: "auto",
              boxShadow: "none",
            }}
          >
            {messages.map((message) => (
              <>
                <Card className={classes.root}>
                  <CardHeader
                    avatar={<Avatar className={classes.avatar}>R</Avatar>}
                    title={message.name}
                    subheader={message.msg}
                  />
                </Card>
              </>
            ))}
          </Paper>
          <form className={classes.form} noValidate onSubmit={onButtonClicked}>
            <TextField
              id="outlined-helperText"
              label="Make a comment"
              defaultValue="Default Value"
              variant="outlined"
              value={value}
              fullWidth
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Start Chatting
            </Button>
          </form>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={newGroup}
          >
            New Group
          </Button>
        </div>
      ) : (
        <div>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              ChattyRooms
            </Typography>
            <form
              className={classes.form}
              noValidate
              // onSubmit={(value) => this.setState({ isLoggedIn: true })}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Chatroom Name"
                name="Chatroom Name"
                autoFocus
                value={room}
                onChange={(e) => {
                  setRoom(e.target.value);
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Username"
                label="Username"
                type="Username"
                id="Username"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Start Chatting
              </Button>
            </form>
          </div>
        </div>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {
  getRoomList,
  postRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
