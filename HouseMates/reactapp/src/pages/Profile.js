<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
import React from "react";
>>>>>>> 14d7751b217a8a2e8d9c3a4befa85b28a3f57771
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CreateIcon from "@material-ui/icons/Create";
import Badge from "@material-ui/core/Badge";

import { changeProfilePic } from "../redux/auth/actions";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// Profile consists of profile pic, name and list of settings.
const Profile = ({ user, changeProfilePic}) => {
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

  const handleChangePassword = () => {
    history.push("/change-password");
  };
  const handleDeleteAccount = () => {
    history.push("/delete-account");
  };

  // Content
  const accordions = [
    {
      summary: "Profile",
      details: [
        <ListItem
          button
          onClick={handleChangePassword}
          style={{ width: "100%" }}
        >
          <ListItemText primary="Change password" />
        </ListItem>,
        <ListItem
          button
          onClick={handleDeleteAccount}
          style={{ width: "100%" }}
        >
          <ListItemText primary="Delete account" />
        </ListItem>,
      ],
    },
  ];

  // Hooks
  const classes = useStyles();
  const history = useHistory();

  // Handlers
  const handleBack = () => {
    history.go(-1);
  };

  // profile picture
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

<<<<<<< HEAD
  const handleClose = () => {
    setOpen(false);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleCapture = ({ target }) => {
    setSelectedFile(target.files[0]);
  };

  const handleSubmit = () => {
    changeProfilePic(selectedFile);
    setOpen(false);
  };

  //  useEffect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

=======
>>>>>>> 14d7751b217a8a2e8d9c3a4befa85b28a3f57771
  return (
    <div className={classes.card}>
      {user && (
        <Card>
          {/* Back button */}
          <CardHeader
            avatar={
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            }
          />

          <CardContent className={classes.content}>
            {/* Profile pic */}
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

            {/* Name */}
            <Typography variant="h5" style={{ marginBottom: 20 }}>
              {user.first_name} {user.last_name}
            </Typography>

            {/* List of settings */}
            <div style={{ width: "100%" }}>
              {accordions.map((accordion) => (
                <Accordion key={accordion}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{accordion.summary}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List style={{ width: "100%" }}>
                      {accordion.details.map((detail) => detail)}
                    </List>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { changeProfilePic })(Profile);
