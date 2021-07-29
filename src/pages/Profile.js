import React, { useState, useEffect, useRef } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import ChatIcon from "@material-ui/icons/Chat";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import {
  changeProfilePic,
  editBio,
  resetEditBioSuccess,
  editJustRegistered,
} from "../redux/auth/actions";
import { getPostDetail } from "../redux/post/actions";
import { getRoomList } from "../redux/chat/actions";
import ProfileComponent from "../components/ProfileComponent";
import UserGuide from "../pages/UserGuide";
import { HOUSING_FORM, ROOMMATE_FORM } from "../globalConstants";
import { getScoreList, resetGetScoreListSuccess } from "../redux/score/actions";

export let noNewMsg;

// Profile consists of profile pic, name and list of settings.
const Profile = ({
  isAuthenticated,
  user,
  changeProfilePic,
  editBio,
  editBioSuccess,
  resetEditBioSuccess,
  post,
  getPostDetail,
  roomList,
  getRoomList,
  editJustRegistered,
  scoreList,
  getScoreList,
  resetGetScoreListSuccess,
}) => {
  // Styling
  const useStyles = makeStyles((theme) => ({
    avatar: {
      height: 200,
      width: 200,
      marginBottom: 20,
    },
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    card: {
      width: "100%",
    },
  }));

  // Hooks
  const classes = useStyles();
  const history = useHistory();
  const fileInput = useRef();

  // States
  const [editBioTextFieldOpen, setEditBioTextFieldOpen] = useState(false);
  const [bio, setBio] = useState("");
  const [topThreeRoommatesId, setTopThreeRoommatesId] = useState([]);
  const [topThreeRoommates, setTopThreeRoommates] = useState([]);
  const [newMsgs, setNewMsgs] = useState([]);
  const [scoreListObj, setScoreListObj] = useState({});

  // Handlers
  // Account settings
  const handleChangePassword = () => {
    history.push("/change-password");
  };
  const handleDeleteAccount = () => {
    history.push("/delete-account");
  };

  // Change profile pic
  const handleClickInput = () => {
    fileInput.current.click();
  };
  const handleUpload = (e) => {
    changeProfilePic(
      user.first_name,
      user.last_name,
      user.id,
      e.target.files[0]
    );
  };

  // Edit bio
  const handleClick = () => {
    setEditBioTextFieldOpen(true);
  };
  const handleCancel = () => {
    setEditBioTextFieldOpen(false);
  };
  const handleChange = (e) => {
    setBio(e.target.value);
  };
  const handleEditBio = (e) => {
    e.preventDefault();
    editBio(user.first_name, user.last_name, user.id, bio);
    setEditBioTextFieldOpen(false);
  };
  const handleEdit = () => {
    setEditBioTextFieldOpen(true);
  };

  // componentDidMount
  useEffect(() => {
    resetEditBioSuccess();
  }, [editBioSuccess]);

  // Top 3 roommates
  // Get user roommate post score list
  useEffect(() => {
    if (user) getScoreList(undefined, user.id);
  }, [user]);
  // Get top 3 roommate post ids and process user roommate post score list
  useEffect(() => {
    if (scoreList.length > 0) {
      const temp = scoreList
        .slice(0, 3)
        .map((post) => (user.id === post.owner1 ? post.post2 : post.post1));
      setTopThreeRoommatesId(temp);
      const temp2 = scoreList.reduce(
        (prev, curr) => ({
          ...prev,
          [user.id === curr.owner1 ? curr.post2 : curr.post1]: curr,
        }),
        {}
      );
      setScoreListObj(temp2);
      return () => resetGetScoreListSuccess();
    }
  }, [scoreList]);
  // Get top 3 roommate post detail pages
  useEffect(() => {
    if (
      topThreeRoommatesId.length > 0 &&
      topThreeRoommates.length < topThreeRoommatesId.length
    ) {
      getPostDetail(topThreeRoommatesId[topThreeRoommates.length]);
    }
  }, [topThreeRoommatesId, topThreeRoommates]);
  // Add to top 3 roommates array
  useEffect(() => {
    if (post && post.id === topThreeRoommatesId[topThreeRoommates.length]) {
      setTopThreeRoommates([...topThreeRoommates, post]);
    }
  }, [post]);

  // New messages
  useEffect(() => {
    if (user) getRoomList(user.id);
  }, [user]);
  useEffect(() => {
    const temp3 = roomList
      .slice(0, 3)
      .filter((room) =>
        room.messages.reduce(
          (prev, curr) =>
            prev ||
            (!curr.hasRead && curr.user_id.toString() !== user.id.toString()
              ? true
              : false),
          false
        )
      );
    setNewMsgs(temp3);
  }, [roomList]);

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <UserGuide user={user} editJustRegistered={editJustRegistered} />
      <div className={classes.card}>
        {user && (
          <Grid container spacing={3}>
            <Grid container item xs={12} spacing={3}>
              {/* Profile */}
              <Grid container item xs={12} md={8}>
                <Paper
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    padding: 10,
                    minWidth: 320,
                  }}
                >
                  {/* Profile pic */}
                  <Grid item xs={12} md={5} align="right">
                    <Badge
                      overlap="circle"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      badgeContent={
                        <IconButton onClick={handleClickInput}>
                          <CreateIcon />
                        </IconButton>
                      }
                    >
                      <Avatar
                        className={classes.avatar}
                        src={user.profile_pic}
                      />
                    </Badge>

                    <input
                      type="file"
                      id="image"
                      accept="image/png, image/jpeg"
                      onChange={(e) => handleUpload(e)}
                      ref={fileInput}
                      style={{ display: "none" }}
                    />
                  </Grid>
                  <Grid item xs={0} md={1} />
                  {/* Name and bio */}
                  <Grid item xs={12} md={5} align="center">
                    {/* Name */}
                    <Typography variant="h5" style={{ marginTop: 50 }}>
                      {user.first_name} {user.last_name}
                    </Typography>
                    {/* Bio */}
                    <Box mb={3}>
                      {editBioTextFieldOpen ? (
                        <form onSubmit={handleEditBio}>
                          <Grid container>
                            <Grid item xs={12}>
                              <TextField
                                variant="outlined"
                                placeholder="Describe yourself..."
                                defaultValue={user.bio}
                                fullWidth
                                multiline
                                rows={3}
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: 8,
                              }}
                            >
                              <Button
                                size="small"
                                onClick={handleCancel}
                                style={{ marginRight: 8 }}
                              >
                                Cancel
                              </Button>
                              <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="small"
                              >
                                Save
                              </Button>
                            </Grid>
                          </Grid>
                        </form>
                      ) : user.bio ? (
                        // Bio
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="body1" color="textSecondary">
                            {user.bio}
                          </Typography>
                          <Link variant="body2" onClick={handleEdit}>
                            Edit
                          </Link>
                        </div>
                      ) : (
                        // Add bio link
                        <Link variant="body2" onClick={handleClick}>
                          Add bio...
                        </Link>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={0} md={1} />
                </Paper>
              </Grid>

              {/* Account settings */}
              <Grid item xs={12} md={4}>
                <Paper style={{ padding: 20, height: 240, minWidth: 320 }}>
                  <MenuList>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <AccountBoxIcon style={{ marginRight: 10 }} />
                      <Typography variant="h6" display="inline" noWrap>
                        Account Settings
                      </Typography>
                    </span>
                    <MenuItem
                      style={{ marginLeft: -10 }}
                      onClick={handleChangePassword}
                    >
                      <Typography noWrap>Change password</Typography>
                    </MenuItem>
                    <MenuItem
                      style={{ marginLeft: -10 }}
                      onClick={handleDeleteAccount}
                    >
                      <Typography noWrap>Delete account</Typography>
                    </MenuItem>
                  </MenuList>
                </Paper>
              </Grid>
            </Grid>

            <Grid container item xs={12} spacing={3}>
              {/* Top 3 roommates */}
              <Grid item xs={12} md={4}>
                <Paper style={{ padding: 10, minWidth: 320 }}>
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <PeopleIcon style={{ marginRight: 10 }} />
                    <Typography variant="h6" display="inline" noWrap>
                      Top 3 Roommates
                    </Typography>
                  </span>
                  {topThreeRoommates.length === 0 ? (
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      align="center"
                    >
                      Create posts to find your ideal roommates now!
                    </Typography>
                  ) : (
                    topThreeRoommates.map((post) => (
                      <ProfileComponent
                        key={post.owner.id}
                        name={
                          post.owner.first_name + " " + post.owner.last_name
                        }
                        desc={post.owner.bio}
                        pic={post.owner.profile_pic}
                        scoreListObj={scoreListObj}
                        type={ROOMMATE_FORM}
                        id={post.id}
                      />
                    ))
                  )}
                </Paper>
              </Grid>

              {/* Starred housings */}
              <Grid item xs={12} md={4}>
                <Paper style={{ padding: 10, minWidth: 320 }}>
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <HomeIcon style={{ marginRight: 10 }} />
                    <Typography variant="h6" display="inline" noWrap>
                      Starred Housings
                    </Typography>
                  </span>
                  {user?.favourite_set?.length === 0 ? (
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      align="center"
                    >
                      No starred housings.
                    </Typography>
                  ) : (
                    user?.favourite_set?.map((post) => (
                      <ProfileComponent
                        key={post.post.id}
                        name={post.post.selected_choices[0][0].choice}
                        desc={post.post.selected_choices[0][1].choice}
                        pic={post.post.images[0]}
                        type={HOUSING_FORM}
                        id={post.post.id}
                      />
                    ))
                  )}
                </Paper>
              </Grid>

              {/* New messages */}
              <Grid item xs={12} md={4}>
                <Paper style={{ padding: 10, minWidth: 320 }}>
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ChatIcon style={{ marginRight: 10 }} />
                    <Typography variant="h6" display="inline" noWrap>
                      New messages
                    </Typography>
                  </span>
                  {newMsgs.length === 0 ? (
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      align="center"
                    >
                      No new messages.
                    </Typography>
                  ) : (
                    <>
                      {newMsgs.map((room) => (
                        <ProfileComponent
                          key={room.id}
                          chatUser={
                            user.id === room.owner1.id
                              ? room.owner2
                              : room.owner1
                          }
                          name={
                            user.id === room.owner1.id
                              ? room.owner2.first_name +
                                " " +
                                room.owner2.last_name
                              : room.owner1.first_name +
                                " " +
                                room.owner1.last_name
                          }
                          desc={room.messages[room.messages.length - 1].message}
                          pic={
                            user.id === room.owner1.id
                              ? room.owner2.profile_pic
                              : room.owner1.profile_pic
                          }
                          unreadMsgs={room.messages.reduce(
                            (prev, curr) =>
                              prev +
                              (!curr.hasRead &&
                              curr.user_id.toString() !== user.id.toString()
                                ? 1
                                : 0),
                            0
                          )}
                        />
                      ))}
                    </>
                  )}
                  {(noNewMsg = newMsgs.length === 0)}
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  editBioSuccess: state.auth.editBioSuccess,
  post: state.post.post,
  roomList: state.chat.roomList,
  scoreList: state.score.scoreList,
});

const mapDispatchToProps = {
  changeProfilePic,
  editBio,
  resetEditBioSuccess,
  getPostDetail,
  getRoomList,
  editJustRegistered,
  getScoreList,
  resetGetScoreListSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
