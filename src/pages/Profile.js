import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, Button, ButtonBase, Card, CardContent, CardHeader, Grid, IconButton, List, ListItem, ListItemText, Paper, TextField, Typography, MenuItem, MenuList } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CreateIcon from "@material-ui/icons/Create";
import ChatIcon from '@material-ui/icons/Chat';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HomeIcon from '@material-ui/icons/Home'
import PeopleIcon from '@material-ui/icons/People'
import Badge from "@material-ui/core/Badge";
import { loadUser, changeProfilePic, editBio, resetEditBioSuccess } from "../redux/auth/actions";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getPostDetail, getUserRoommatePosts } from "../redux/post/actions";
import ProfileComponent from "../components/ProfileComponent";

// Profile consists of profile pic, name and list of settings.
const Profile = ({
  user, loadUser,
  changeProfilePic,
  editBio, editBioSuccess, resetEditBioSuccess,
  userRoommatePosts, getUserRoommatePosts,
  post, getPostDetail,
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

  // States
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editBioTextFieldOpen, setEditBioTextFieldOpen] = useState(false);
  const [bio, setBio] = useState("");
  const [topThreeRoommatesId, setTopThreeRoommatesId] = useState([])
  const [topThreeRoommates, setTopThreeRoommates] = useState([])

  // Handlers
  const handleChangePassword = () => { history.push("/change-password"); };
  const handleDeleteAccount = () => { history.push("/delete-account"); };
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };
  const handleCapture = ({ target }) => { setSelectedFile(target.files[0]); };
  const handleSubmit = () => {
    changeProfilePic(selectedFile);
    setOpen(false);
  };
  const handleClick = () => { setEditBioTextFieldOpen(true); };
  const handleCancel = () => { setEditBioTextFieldOpen(false); };
  const handleChange = (e) => { setBio(e.target.value); };
  const handleEditBio = (e) => {
    e.preventDefault();
    editBio(user.first_name, user.last_name, bio);
    setEditBioTextFieldOpen(false);
  };
  const handleEdit = () => { setEditBioTextFieldOpen(true); };

  // componentDidMount
  useEffect(() => {
    loadUser();
    resetEditBioSuccess();
  }, [editBioSuccess]);

  // Get user roommate post
  useEffect(() => { if (user) getUserRoommatePosts(user.id) }, [user])
  // After getting user roommate post, sort user roommate post score list and extract roommate id of the top 3 scores
  useEffect(() => {
    if (userRoommatePosts.length > 0) {
      const unsortedScoreList = Object.values(userRoommatePosts[0].score_list)
      const sortedScoreList = unsortedScoreList.sort((a, b) => (a.score > b.score) ? -1 : (a.score === b.score) ? ((a.post < b.post) ? -1 : 1) : 1)
      const topThreeRoommatesId = []
      for (let i = 0; i < 3; i++) { if (i <= sortedScoreList.length) topThreeRoommatesId.push(sortedScoreList[i].post) }
      setTopThreeRoommatesId(topThreeRoommatesId)
    }
  }, [userRoommatePosts])
  // After extracting top 3 roommates id, get post detail page of that id
  useEffect(() => {
    if (topThreeRoommates.length < topThreeRoommatesId.length) getPostDetail(topThreeRoommatesId[topThreeRoommates.length])
  }, [topThreeRoommatesId, topThreeRoommates])
  // After getting post detail page, add to top 3 roommates array
  useEffect(() => {
    if (post) topThreeRoommates.push(post)
    setTopThreeRoommates(topThreeRoommates)
  }, [post])

  return (
    <div className={classes.card}>
      {user && (
        <Grid container spacing={3}>
          <Grid container item xs={12} spacing={3}>
            <Grid container item xs={8}>
              <Paper style={{ width: "100%", display: 'flex', flexDirection: 'row', padding: 10 }}>
                {/* Profile pic */}
                <Grid item xs={5} align="right">
                  <Badge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    badgeContent={
                      <IconButton onClick={handleClickOpen}>
                        <CreateIcon />
                      </IconButton>
                    }
                  >
                    <Avatar className={classes.avatar} src={user.profile_pic} />
                  </Badge>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">
                      Edit Profile Picture
                    </DialogTitle>
                    <DialogContent>
                      <Button
                        variant="contained"
                        component="label"
                      // startIcon={<CloudUploadIcon />}
                      >
                        {/* Upload File */}
                        <input
                          type="file"
                          id="image"
                          accept="image/png, image/jpeg"
                          onChange={handleCapture}
                        />
                      </Button>
                    </DialogContent>

                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={() => handleSubmit()} color="primary">
                        Save
                      </Button>
                    </DialogActions>
                  </Dialog>
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
                  <Typography variant="h6" display="inline">Account Settings</Typography>
                  <MenuItem style={{ marginLeft: -10 }} onClick={handleChangePassword}>
                    <Typography>Change password</Typography>
                  </MenuItem>
                  <MenuItem style={{ marginLeft: -10 }} onClick={handleDeleteAccount}>
                    <Typography>Delete account</Typography>
                  </MenuItem>
                </MenuList>
              </Paper>
            </Grid>
          </Grid>

          <Grid container item xs={12} spacing={3}>
            <Grid item xs={4}>
              <Paper style={{ padding: 10 }}>
                <span style={{ display: 'flex', justifyContent: 'center' }}>
                  <PeopleIcon style={{ marginRight: 10 }} />
                  <Typography variant="h6" display="inline">Top 3 Roommates</Typography>
                </span>
                {topThreeRoommates.length === 0
                  ?
                  <Typography variant="body1" color="textSecondary" align="center">Create posts to find your ideal roommates now!</Typography>
                  :
                  topThreeRoommates.map(post => (
                    <ProfileComponent
                      key={post.owner.id}
                      name={post.owner.first_name + " " + post.owner.last_name}
                      desc={post.owner.bio}
                      pic={post.owner.profile_pic}
                    />))}
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper style={{ padding: 10 }}>
                <span style={{ display: 'flex', justifyContent: 'center' }}>
                  <HomeIcon style={{ marginRight: 10 }} />
                  <Typography variant="h6" display="inline">Starred Housings</Typography>
                </span>
                <Typography variant="body1" color="textSecondary" align="center">No starred housings.</Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper style={{ padding: 10 }}>
                <span style={{ display: 'flex', justifyContent: 'center' }}>
                  <ChatIcon style={{ marginRight: 10 }} />
                  <Typography variant="h6" display="inline">3 new messages</Typography>
                </span>
                <Typography variant="body1" color="textSecondary" align="center">Start chatting!</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      )
      }
    </div >
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  editBioSuccess: state.auth.editBioSuccess,
  userRoommatePosts: state.post.userRoommatePosts,
  post: state.post.post,
});

const mapDispatchToProps = {
  changeProfilePic,
  editBio,
  resetEditBioSuccess,
  loadUser,
  getUserRoommatePosts,
  getPostDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
