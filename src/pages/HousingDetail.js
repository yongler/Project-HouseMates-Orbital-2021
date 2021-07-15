import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, Chip, Fab, Grid, IconButton, Paper, Tooltip, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { getPostDetail, getUserPosts } from "../redux/post/actions";
import { getQuestions } from "../redux/form/actions";
import { HOUSING_FORM } from "../globalConstants";
import Pic from '../static/housing.jpg'
import ImageGallery from "../components/ImageGallery";

// HousingDetail consists of profile pic, name, categories of tags and post button.
const HousingDetail = ({
  user,
  userHousingPosts,
  housingPost,
  housingCategories,
  getPostDetail,
  getQuestions,
  getUserPosts,
  prevPath,
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
      marginLeft: 23,
      marginRight: 23,
    },
    tooltip: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
    media: {
      width: 400,
      height: 300,
      margin: "auto",
      // marginLeft: 30,
      // marginRight: 30,
    },
  }));

  // Hooks
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  // Handlers
  const handleBack = () => { history.push(prevPath); };
  const handleClick = () => { history.push("/housing-form"); };

  // componentDidMount
  useEffect(() => {
    if (housingCategories.length === 0) getQuestions(HOUSING_FORM);
    getPostDetail(id);
  }, []);
  useEffect(() => (user ? getUserPosts(user.id) : null), [user]);

  return (
    <div className={classes.card}>
      {housingPost?.id.toString() === id.toString()
        ?
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
              {/* <CardMedia
                className={classes.media}
                image={Pic}
                title={housingPost.selected_choices[0][0].choice}
              /> */}
              <ImageGallery tutorialSteps={housingPost.images} />

              <br />

              <Typography variant="h5">{housingPost.selected_choices[0][0].choice}</Typography>
              <Typography variant="body2" color="textSecondary">{housingPost.selected_choices[0][1].choice}</Typography>

              <br /><br />

              <Grid container>
                <Grid item xs={0} md={1} />
                <Grid item xs={12} md={6}>
                  {housingPost.selected_choices.map((category, index) => (
                    index !== 0
                      ?
                      <div key={category} className={classes.category}>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          gutterBottom
                        >
                          {housingCategories[index]}
                        </Typography>

                        {category.map((question) => (Array.isArray(question.choice)
                          ?
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
                          :
                          <Chip
                            key={question}
                            className={classes.tag}
                            label={question.choice}
                            color="primary"
                          />
                        ))}
                      </div>
                      :
                      null
                  ))}
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper style={{ padding: 20 }}>
                    {/* Price */}
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                      <Typography variant="h6">SGD {housingPost.selected_choices[0][3].choice}</Typography>
                      <Typography variant="body2" color="textSecondary">&nbsp;/ night</Typography>
                    </div>

                    {/* Location */}
                    <Typography variant="body2" color="textSecondary">Located at {housingPost.selected_choices[0][2].choice}</Typography>

                    <br />

                    <div style={{ display: "flex", flexDirection: "row" }}>
                      {/* Profile pic */}
                      <Avatar
                        className={classes.avatar}
                        src={housingPost.owner.profile_pic}
                      />

                      <div>
                        {/* Name */}
                        <Typography>{housingPost.owner.first_name} {housingPost.owner.last_name}</Typography>
                        {/* Bio */}
                        <Typography variant="body1" color="textSecondary">{housingPost.owner.bio}</Typography>
                      </div>
                    </div>

                    <br />

                    {/* Chat button */}
                    <Button variant="contained" color="primary" fullWidth>Chat with me</Button>
                  </Paper>
                </Grid>
                <Grid item xs={0} md={1} />
              </Grid>
            </CardContent>
          </Card>

          {user && userHousingPosts?.length === 0 && (
            <Tooltip title="" onClick={handleClick}>
              <Fab color="primary" className={classes.tooltip}>
                <AddIcon />
              </Fab>
            </Tooltip>
          )}
        </>
        :
        null}
    </div>
  );
};

const mapPropsToState = (state) => ({
  user: state.auth.user,
  userHousingPosts: state.post.userHousingPosts,
  housingPost: state.post.housingPost,
  housingCategories: state.form.housingCategories,
  prevPath: state.auth.prevPath,
});

const mapDispatchToProps = {
  getQuestions,
  getPostDetail,
  getUserPosts,
};

export default connect(mapPropsToState, mapDispatchToProps)(HousingDetail);
