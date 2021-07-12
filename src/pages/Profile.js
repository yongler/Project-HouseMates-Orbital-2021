import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
  MenuItem,
  MenuList,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CreateIcon from "@material-ui/icons/Create";
import ChatIcon from "@material-ui/icons/Chat";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import Badge from "@material-ui/core/Badge";
import {
  loadUser,
  changeProfilePic,
  editBio,
  resetEditBioSuccess,
} from "../redux/auth/actions";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getPostList } from "../redux/post/actions";

// Profile consists of profile pic, name and list of settings.
const Profile = ({
  user,
  changeProfilePic,
  editBio,
  loadUser,
  editBioSuccess,
  resetEditBioSuccess,
  prevPath,
  posts,
  getPostList,
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

  // Handlers
  const handleChangePassword = () => {
    history.push("/change-password");
  };
  const handleDeleteAccount = () => {
    history.push("/delete-account");
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCapture = ({ target }) => {
    setSelectedFile(target.files);
    // setSelectedFile(target.files[0]);
  };
  const handleSubmit = () => {
    changeProfilePic(selectedFile);
    setOpen(false);
  };
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
    editBio(user.first_name, user.last_name, bio);
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

  return (
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
                          multiple
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
                <Typography
                  variant="body1"
                  color="textSecondary"
                  align="center"
                >
                  Create posts to find your ideal roommates now!
                </Typography>
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
                <Typography
                  variant="body1"
                  color="textSecondary"
                  align="center"
                >
                  No starred housings.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper style={{ padding: 10 }}>
                <span style={{ display: "flex", justifyContent: "center" }}>
                  <ChatIcon style={{ marginRight: 10 }} />
                  <Typography variant="h6" display="inline">
                    3 new messages
                  </Typography>
                </span>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  align="center"
                >
                  Start chatting!
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  editBioSuccess: state.auth.editBioSuccess,
  prevPath: state.auth.prevPath,
  posts: state.post.posts,
});

const mapDispatchToProps = {
  changeProfilePic,
  editBio,
  resetEditBioSuccess,
  loadUser,
  getPostList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
