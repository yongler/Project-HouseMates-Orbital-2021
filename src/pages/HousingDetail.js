import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Fab,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { getPostDetail } from "../redux/post/actions";
import { getQuestions } from "../redux/form/actions";
import { setChatUser } from "../redux/chat/actions";
import { HOUSING_FORM } from "../globalConstants";
import ImageGallery from "../components/ImageGallery";

// HousingDetail consists of profile pic, name, categories of tags and post button.
const HousingDetail = ({
  user,
  housingPost,
  getPostDetail,
  housingCategories,
  getQuestions,
  prevPath,
  setChatUser,
}) => {
  // Styling
  const useStyles = makeStyles((theme) => ({
    avatar: {
      height: 50,
      width: 50,
      marginBottom: 20,
      marginRight: 10,
    },
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    tag: {
      marginRight: 5,
      marginTop: 5,
    },
    category: {
      marginBottom: 30,
    },
    card: {
      width: "100%",
    },
    postBtn: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(3),
      borderRadius: 20,
    },
    media: {
      width: 400,
      height: 300,
      margin: "auto",
    },
  }));

  // Hooks
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  // Handlers
  const handleBack = () => {
    history.push(prevPath);
  };
  const handleClick = () => {
    history.push("/housing-form");
  };
  const handleChat = () => {
    setChatUser(housingPost.owner);
    history.push("/chat");
  };

  // useEffect
  // Get housing categories and housing post detail
  useEffect(() => {
    if (housingCategories.length === 0) getQuestions(HOUSING_FORM);
    getPostDetail(id);
  }, []);

  return (
    <div className={classes.card}>
      {housingPost?.id.toString() === id.toString() ? (
        <>
          <Card>
            <CardHeader
              avatar={
                <IconButton onClick={handleBack}>
                  <ArrowBackIcon />
                </IconButton>
              }
            />

            <CardContent className={classes.content}>
              <ImageGallery tutorialSteps={housingPost.images} />

              <br />

              <Typography variant="h5">
                {housingPost.selected_choices[0][0].choice}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {housingPost.selected_choices[0][1].choice}
              </Typography>

              <br />
              <br />

              <Grid container>
                <Grid container item xs={12} md={6}>
                  <Grid item xs={1} />
                  <Grid item xs={11}>
                    {housingPost.selected_choices.map((category, index) =>
                      index !== 0 ? (
                        <div key={category} className={classes.category}>
                          <Typography
                            variant="body1"
                            color="textPrimary"
                            gutterBottom
                          >
                            {housingCategories[index]}
                          </Typography>

                          {category.map((question) =>
                            Array.isArray(question.choice) ? (
                              <>
                                {question.choice.map((choice) => (
                                  <Chip
                                    key={choice}
                                    className={classes.tag}
                                    label={choice}
                                    color="primary"
                                  />
                                ))}
                              </>
                            ) : (
                              <Chip
                                key={question}
                                className={classes.tag}
                                label={question.choice}
                                color="primary"
                              />
                            )
                          )}
                        </div>
                      ) : null
                    )}
                  </Grid>
                </Grid>
                <Grid container item xs={12} md={6}>
                  <Grid item xs={1} />
                  <Grid item xs={10}>
                    <Paper style={{ padding: 20 }}>
                      {/* Price */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="h6">
                          SGD {housingPost.selected_choices[0][3].choice}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          &nbsp;/ night
                        </Typography>
                      </div>

                      {/* Location */}
                      <Typography variant="body2" color="textSecondary">
                        Located at {housingPost.selected_choices[0][2].choice}
                      </Typography>

                      <br />

                      <div style={{ display: "flex", flexDirection: "row" }}>
                        {/* Profile pic */}
                        <Avatar
                          className={classes.avatar}
                          src={housingPost.owner.profile_pic}
                        />

                        <div>
                          {/* Name */}
                          <Typography>
                            {housingPost.owner.first_name}{" "}
                            {housingPost.owner.last_name}
                          </Typography>
                          {/* Bio */}
                          <Typography variant="body1" color="textSecondary">
                            {housingPost.owner.bio.lengt &&
                              (housingPost.owner.bio.length > 50
                                ? housingPost.owner.bio.substring(0, 50) + "..."
                                : housingPost.owner.bio)}
                          </Typography>
                        </div>
                      </div>

                      {/* Chat button */}
                      {user && user.id !== housingPost.owner.id && (
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={handleChat}
                        >
                          Chat with me
                        </Button>
                      )}
                    </Paper>
                  </Grid>
                  <Grid item xs={1} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {user &&
            <Button variant="contained" color="primary" startIcon={<AddIcon />} className={classes.postBtn} onClick={handleClick}>
              Add post
            </Button>}
        </>
      ) : null}
    </div>
  );
};

const mapPropsToState = (state) => ({
  user: state.auth.user,
  housingPost: state.post.housingPost,
  housingCategories: state.form.housingCategories,
  prevPath: state.auth.prevPath,
});

const mapDispatchToProps = {
  getQuestions,
  getPostDetail,
  setChatUser,
};

export default connect(mapPropsToState, mapDispatchToProps)(HousingDetail);
