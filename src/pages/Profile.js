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
  loadUser,
  changeProfilePic,
  editBio,
  resetEditBioSuccess,
  editJustRegistered,
} from "../redux/auth/actions";
import { getPostDetail, getUserPosts } from "../redux/post/actions";
import { getRoomList } from "../redux/chat/actions";
import ProfileComponent from "../components/ProfileComponent";
import UserGuide from "../pages/UserGuide";
import { HOUSING_FORM, ROOMMATE_FORM } from "../globalConstants";

// Profile consists of profile pic, name and list of settings.
const Profile = ({
  isAuthenticated,
  user,
  loadUser,
  changeProfilePic,
  editBio,
  editBioSuccess,
  resetEditBioSuccess,
  userRoommatePosts,
  getUserPosts,
  post,
  housingPost,
  getPostDetail,
  roomList,
  getRoomList,
  editJustRegistered,
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
      marginLeft: 23,
      marginRight: 23,
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
  const [starredHousings, setStarredHousings] = useState([]);

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
    loadUser();
    resetEditBioSuccess();
  }, [editBioSuccess]);

  // Top 3 roommates
  // Get user roommate post
  useEffect(() => {
    if (user) {
      getUserPosts(user.id, ROOMMATE_FORM);
      getRoomList(user.id);
    }
  }, [user]);
  // Sort user roommate post score list and get top 3 roommates id
  useEffect(() => {
    if (userRoommatePosts.length > 0) {
      const unsortedScoreList = Object.values(userRoommatePosts[0].score_list);
      const sortedScoreList = unsortedScoreList.sort((a, b) =>
        a.score > b.score
          ? -1
          : a.score === b.score
          ? a.post < b.post
            ? -1
            : 1
          : 1
      );
      const topThreeRoommatesId = [];
      for (let i = 0; i < 3; i++) {
        if (i < sortedScoreList.length)
          topThreeRoommatesId.push(sortedScoreList[i].post);
      }
      setTopThreeRoommatesId(topThreeRoommatesId);
    }
  }, [userRoommatePosts]);
  // Get post detail page of top 3 roommates id
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

  // Starred Housings
  // Get post detail page of starred housings
  useEffect(() => {
    if (
      user?.favourites.length > 0 &&
      starredHousings.length < user.favourites.length
    ) {
      getPostDetail(user.favourites[starredHousings.length]);
    }
  }, [user, starredHousings]);
  // Add to starred housings array
  useEffect(() => {
    if (
      housingPost &&
      housingPost.id === user?.favourites[starredHousings.length]
    ) {
      setStarredHousings([...starredHousings, housingPost]);
    }
  }, [housingPost]);

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
              <Grid container item xs={8}>
                <Paper
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    padding: 10,
                  }}
                >
                  {/* Profile pic */}
                  <Grid item xs={5} align="right">
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
                  <Grid item xs={1} />
                  {/* Name and bio */}
                  <Grid item xs={5} align="center">
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
                  <Grid item xs={1} />
                </Paper>
              </Grid>
              {/* Account settings */}
              <Grid item xs={4}>
                <Paper style={{ padding: 20, height: 200 }}>
                  <MenuList>
                    <AccountBoxIcon style={{ marginRight: 10 }} />
                    <Typography variant="h6" display="inline">
                      Account Settings
                    </Typography>
                    <MenuItem
                      style={{ marginLeft: -10 }}
                      onClick={handleChangePassword}
                    >
                      <Typography>Change password</Typography>
                    </MenuItem>
                    <MenuItem
                      style={{ marginLeft: -10 }}
                      onClick={handleDeleteAccount}
                    >
                      <Typography>Delete account</Typography>
                    </MenuItem>
                  </MenuList>
                </Paper>
              </Grid>
            </Grid>

            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4}>
                <Paper style={{ padding: 10 }}>
                  <span style={{ display: "flex", justifyContent: "center" }}>
                    <PeopleIcon style={{ marginRight: 10 }} />
                    <Typography variant="h6" display="inline">
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
                        scoreList={userRoommatePosts[0]?.score_list}
                        type={ROOMMATE_FORM}
                        id={post.id}
                      />
                    ))
                  )}
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper style={{ padding: 10 }}>
                  <span style={{ display: "flex", justifyContent: "center" }}>
                    <HomeIcon style={{ marginRight: 10 }} />
                    <Typography variant="h6" display="inline">
                      Starred Housings
                    </Typography>
                  </span>
                  {starredHousings.length === 0 ? (
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      align="center"
                    >
                      No starred housings.
                    </Typography>
                  ) : (
                    starredHousings.map((post) => (
                      <ProfileComponent
                        key={post.id}
                        name={post.selected_choices[0][0].choice}
                        desc={post.selected_choices[0][1].choice}
                        pic={post.images[0]}
                        type={HOUSING_FORM}
                        id={post.id}
                      />
                    ))
                  )}
                </Paper>
              </Grid>

              <Grid item xs={4}>
                <Paper style={{ padding: 10 }}>
                  <span style={{ display: "flex", justifyContent: "center" }}>
                    <HomeIcon style={{ marginRight: 10 }} />
                    <Typography variant="h6" display="inline">
                      New messages
                    </Typography>
                  </span>
                  {roomList.length === 0 ? (
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      align="center"
                    >
                      No new messages.
                    </Typography>
                  ) : (
                    roomList
                      .slice(0, 3)
                      .filter((room) =>
                        room.messages.reduce(
                          (prev, curr) =>
                            prev ||
                            (!curr.hasRead &&
                            curr.user_id.toString() !== user.id.toString()
                              ? true
                              : false),
                          false
                        )
                      )
                      .map((room) => (
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
                      ))
                  )}
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
  userRoommatePosts: state.post.userRoommatePosts,
  post: state.post.post,
  housingPost: state.post.housingPost,
  roomList: state.chat.roomList,
});

const mapDispatchToProps = {
  changeProfilePic,
  editBio,
  resetEditBioSuccess,
  loadUser,
  getPostDetail,
  getUserPosts,
  getRoomList,
  editJustRegistered,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
