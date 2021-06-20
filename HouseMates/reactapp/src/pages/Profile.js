import React, { useEffect } from "react";
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
import {changeProfilePic} from '../redux/auth/actions'

// Profile consists of profile pic, name and list of settings.
const Profile = ({ user }) => {
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
          <ListItemText primary="Delete Account" />
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

  const handleClick = picture => {
    changeProfilePic(picture);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.card}>
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
              <IconButton onClick={handleClick}>
                <CreateIcon />
              </IconButton>
            }
          >
            <Avatar className={classes.avatar} src={user.profile_pic} />
          </Badge>

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
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {changeProfilePic})(Profile);
