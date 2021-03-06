import React, { useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { connect } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import { Avatar, Button, Card, CardContent, CardHeader, Chip, Divider, IconButton, Typography } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import ChatIcon from "@material-ui/icons/Chat"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import { getPostDetail, getUserPosts } from "../redux/post/actions"
import { getQuestions } from "../redux/form/actions"
import { setChatUser } from "../redux/chat/actions"
import { ROOMMATE_FORM } from "../globalConstants"

// RoommateDetail consists of profile pic, name, categories of tags and post button.
const RoommateDetail = ({
  user,
  userRoommatePosts, getUserPosts,
  post, getPostDetail,
  roommateCategories, getQuestions,
  prevPath,
  setChatUser,
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
  }))

  // Hooks
  const classes = useStyles()
  const history = useHistory()
  const { id } = useParams()

  // Handlers
  const handleBack = () => { history.push(prevPath) }
  const handleClick = () => { history.push("/roommate-form") }
  const handleChat = () => {
    setChatUser(post.owner)
    history.push("/chat")
  }

  // useEffect
  // Get roommate categories and roommate post detail
  useEffect(() => {
    if (roommateCategories.length === 0) getQuestions(ROOMMATE_FORM)
    getPostDetail(id)
  }, [])
  // Get user roommate posts
  useEffect(() => (user ? getUserPosts(user.id) : null), [user])

  return (
    <div className={classes.card}>
      {post?.id.toString() === id.toString() ? (
        <>
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
              <Avatar
                className={classes.avatar}
                src={post.owner.profile_pic}
              />

              {/* Name */}
              <span style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 5 }}>
                <Typography variant="h5" display="inline">
                  {post.owner.first_name} {post.owner.last_name}
                </Typography>
                {user && user.id !== post.owner.id &&
                  <IconButton style={{ marginLeft: 5 }} onClick={handleChat} color="primary"><ChatIcon /></IconButton>}
              </span>

              {/* Bio */}
              <div style={{ maxWidth: "60%" }}>
                <Typography variant="body1" style={{ marginTop: -5 }} align="center">
                  {post.owner.bio}
                </Typography>
              </div>

              <Divider style={{ width: "70%", marginBottom: 20, marginTop: 20 }} />

              {/* Text */}
              <Typography
                variant="body1"
                color="textSecondary"
                className={classes.category}
              >
                Looking for roommates who are:
              </Typography>

              {/* Categories of tags */}
              <div>
                {post.selected_choices.map((category, index) => (
                  <div key={category} className={classes.category}>
                    {/* Category */}
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      gutterBottom
                    >
                      {roommateCategories[index]}
                    </Typography>

                    {/* Tags */}
                    {category.map((question) =>
                      Array.isArray(question.otherChoice) ? (
                        // Multiple choice question
                        question.otherChoice.map((choice) => (
                          <Chip
                            key={choice}
                            className={classes.tag}
                            label={choice}
                            color="primary"
                          />
                        ))
                      ) : (
                        // Single choice question
                        <Chip
                          key={question}
                          className={classes.tag}
                          label={question.otherChoice}
                          color="primary"
                        />
                      )
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Post button */}
          {user && userRoommatePosts.length === 0 &&
            <Button variant="contained" color="primary" startIcon={<AddIcon />} className={classes.postBtn} onClick={handleClick}>
              Add post
            </Button>}
        </>
      ) : null}
    </div>
  )
}

const mapPropsToState = (state) => ({
  user: state.auth.user,
  userRoommatePosts: state.post.userRoommatePosts,
  post: state.post.post,
  roommateCategories: state.form.roommateCategories,
  prevPath: state.auth.prevPath,
})

const mapDispatchToProps = {
  getQuestions,
  getPostDetail,
  getUserPosts,
  setChatUser,
}

export default connect(mapPropsToState, mapDispatchToProps)(RoommateDetail)
