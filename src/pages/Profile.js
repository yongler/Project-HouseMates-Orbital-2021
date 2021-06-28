import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import CreateIcon from "@material-ui/icons/Create"
import Badge from "@material-ui/core/Badge"
import { loadUser, changeProfilePic, editBio, resetEditBioSuccess } from '../redux/auth/actions'
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// Profile consists of profile pic, name and list of settings.
const Profile = ({ user, changeProfilePic, editBio, loadUser, editBioSuccess, resetEditBioSuccess, prevPath }) => {
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
  }))

  // Hooks
  const classes = useStyles()
  const history = useHistory()

  // States
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editBioTextFieldOpen, setEditBioTextFieldOpen] = useState(false)
  const [bio, setBio] = useState('')

  // Handlers
  const handleBack = () => { history.push(prevPath) }
  const handleChangePassword = () => { history.push("/change-password") }
  const handleDeleteAccount = () => { history.push("/delete-account") }
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };
  const handleCapture = ({ target }) => { setSelectedFile(target.files[0]); };
  const handleSubmit = () => {
    changeProfilePic(selectedFile);
    setOpen(false);
  };
  const handleClick = () => { setEditBioTextFieldOpen(true) }
  const handleCancel = () => { setEditBioTextFieldOpen(false) }
  const handleChange = e => { setBio(e.target.value) }
  const handleEditBio = e => {
    e.preventDefault()
    editBio(user.first_name, user.last_name, bio)
    setEditBioTextFieldOpen(false)
  }
  const handleEdit = () => { setEditBioTextFieldOpen(true) }

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
  ]

  // componentDidMount
  useEffect(() => {
    loadUser()
    resetEditBioSuccess()
  }, [editBioSuccess])

  return (
    <div className={classes.card}>
      {user && (
        <Card>
          {/* Back button
          <CardHeader
            avatar={
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            }
          /> */}

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
            <Typography variant="h5" style={{ marginBottom: 10 }}>
              {user.first_name} {user.last_name}
            </Typography>

            {/* Bio */}
            <Box mb={3}>
              {editBioTextFieldOpen
                ?
                // Bio textarea
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
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
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
                :
                user.bio
                  ?
                  // Bio
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="body1" color="textSecondary">{user.bio}</Typography>
                    <Link variant="body2" onClick={handleEdit}>Edit</Link>
                  </div>
                  :
                  // Add bio link
                  <Link variant="body2" onClick={handleClick}>Add bio...</Link>}
            </Box>

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
                </Accordion>))}
            </div>
          </CardContent>
        </Card>
      )
      }
    </div >
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  editBioSuccess: state.auth.editBioSuccess,
  prevPath: state.auth.prevPath,
})

const mapDispatchToProps = {
  changeProfilePic,
  editBio,
  resetEditBioSuccess,
  loadUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
