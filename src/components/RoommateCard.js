import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { Card, CardActionArea, CardContent, CardMedia, Chip, IconButton, Tooltip, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { deletePost, getPostList, getUserPost, getUserRoommatePosts, resetDeletePostSuccess } from "../redux/post/actions";
import Confirmation from "../components/Confirmation";
import { ROOMMATE_FORM } from "../globalConstants";
import { loadUser } from "../redux/auth/actions";

// RoommateCard consists of poster's description: pic, name, gender, bio and top 3 preferred roommate tags.fUSER
const RoommateCard = ({
  user,
  userPosts,
  post,
  deletePostSuccess,
  deletePost,
  resetDeletePostSuccess,
  getUserPost,
  getPostList,
  loadUser,
  getUserRoommatePosts
}) => {
  // Styling
  const useStyles = makeStyles((theme) => ({
    card: {
      width: 345,
      cursor: "pointer",
      alignSelf: "center",
    },
    media: {
      height: 160,
    },
    tag: {
      marginRight: 5,
      marginTop: 5,
    },
    text: {
      height: 80,
    },
    edit: {
      float: "right",
      marginRight: 5,
      marginTop: 5,
    },
    delete: {
      float: "right",
      marginRight: -15,
      marginTop: 5,
    },
    icon: {
      color: "black",
    },
  }));

  // Hooks
  const classes = useStyles();
  const history = useHistory();

  // States
  const [open, setOpen] = useState(false);

  // Handlers
  const handleEdit = () => { history.push(`/edit-roommate-form/${post.id}`); };
  const handleOpenConfirmationDialog = () => { setOpen(true); };
  const handleCancel = () => { setOpen(false); };
  const handleDelete = () => { deletePost(post.id); };
  const handleClose = () => {
    resetDeletePostSuccess();
    getPostList(ROOMMATE_FORM);
    getUserRoommatePosts(user.id)
    getUserPost(user.id);
    setOpen(false);
  };

  // Constants
  const priorityChoices = ["Irrelevant", "A little important", "Somewhat important", "Very important", "Mandatory"]

  // Helper Functions
  const getTopThreeTags = (post) => {
    const categories = post.selected_choices
    var topThreeTags = []
    for (let i = priorityChoices.length - 1; i >= 0; i--) {
      for (let j = 0; j < categories.length; j++) {
        for (let k = 0; k < categories[j].length; k++) {
          if (topThreeTags.length < 3 && categories[j][k].priority === priorityChoices[i]) {
            if (Array.isArray(categories[j][k].otherChoice)) {
              for (let h = 0; h < categories[j][k].otherChoice.length; h++) {
                if (topThreeTags.length < 3) topThreeTags.push(categories[j][k].otherChoice[h])
              }
            } else {
              topThreeTags.push(categories[j][k].otherChoice)
            }
          }
        }
      }
    }
    return topThreeTags
  }

  // componentDidMount
  useEffect(() => loadUser(), []);
  useEffect(() => (user ? getUserPost(user.id) : null), [user]);

  return (
    <>
      <Card className={classes.card}>
        {user?.id === post.owner.id && (
          <>
            {/* Edit button */}
            <Tooltip title="" className={classes.edit} onClick={handleEdit}>
              <IconButton className={classes.icon}>
                <EditIcon />
              </IconButton>
            </Tooltip>

            {/* Delete button */}
            <Tooltip
              title=""
              className={classes.delete}
              onClick={handleOpenConfirmationDialog}
            >
              <IconButton className={classes.icon}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        )}

        <Link
          to={`/roommates/${post.id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          {/* Pic */}
          <CardMedia
            className={classes.media}
            image={post.owner.profile_pic}
            title={post.owner.first_name + " " + post.owner.last_name}
          />

          <CardActionArea>
            {/* Poster's description */}
            <CardContent>
              {/* Name */}
              <Typography variant="h5" gutterBottom>
                {post.owner.first_name} {post.owner.last_name}{" "}
                {userPosts?.map(userPost =>
                  userPost.owner.id !== post.owner.id && userPost.post_form_type === ROOMMATE_FORM && post.score_list[userPost.id]?.score
                    ?
                    <Chip label={post.score_list[userPost.id]?.score + "%"} color="secondary"  className={classes.tag}/>
                    :
                    null)}
              </Typography>


              {/* Bio */}
              <Typography
                variant="body2"
                color="textSecondary"
                className={classes.text}
              >
                {post?.owner.bio?.length > 150
                  ? post.owner.bio.substring(0, 150) + "..."
                  : post.owner.bio}
              </Typography>

              <br />

              <Typography variant="body2" color="textSecondary" gutterBottom>
                Looking for roommates who are:
              </Typography>

              {/* Top 3 preferred roommate tags */}
              {getTopThreeTags(post).map(tag =>
                <Chip key={tag} label={tag} color="primary" className={classes.tag} />
              )}
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>

      {/* Confirmation dialog */}
      <Confirmation
        open={open}
        confirmationText={"Are you sure you want to delete?"}
        thankYouText={"You have successfully deleted your post"}
        success={deletePostSuccess}
        handleCancel={handleCancel}
        handleSubmit={handleDelete}
        handleClose={handleClose}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  userPosts: state.post.userPosts,
  deletePostSuccess: state.post.deletePostSuccess,
});

const mapDispatchToProps = {
  deletePost,
  resetDeletePostSuccess,
  getPostList,
  getUserPost,
  loadUser,
  getUserRoommatePosts
};

export default connect(mapStateToProps, mapDispatchToProps)(RoommateCard);
