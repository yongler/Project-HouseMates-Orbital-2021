import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  deletePost,
  getPostList,
  getUserPosts,
  resetDeletePostSuccess,
  setPage,
} from "../redux/post/actions";
import Confirmation from "../components/Confirmation";
import {
  A_LITTLE_IMPORTANT,
  IRRELEVANT,
  IS_10000,
  MANDATORY,
  PAGINATION,
  ROOMMATE_FORM,
  SOMEWHAT_IMPORTANT,
  VERY_IMPORTANT,
  TAGS_NUMBER,
} from "../globalConstants";
import { loadUser } from "../redux/auth/actions";
import { getScoreList } from "../redux/score/actions";

// RoommateCard consists of poster's description: pic, name, gender, bio and top 3 preferred roommate tags.fUSER
const RoommateCard = ({
  post,
  scoreListObj,
  user,
  deletePost,
  deletePostSuccess,
  resetDeletePostSuccess,
  getPostList,
  getUserPosts,
  page,
  count,
  setPage,
  getScoreList,
}) => {
  // Styling
  const useStyles = makeStyles((theme) => ({
    card: {
      width: 345,
      height: 423,
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
  const handleEdit = () => {
    history.push(`/edit-roommate-form/${post.id}`);
  };
  const handleOpenConfirmationDialog = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    deletePost(post.id);
  };
  const handleClose = () => {
    resetDeletePostSuccess();
    if (page > 1 && page > Math.ceil((count - 1) / PAGINATION)) {
      getPostList(ROOMMATE_FORM, page - 1);
      setPage(page - 1);
    } else {
      getPostList(ROOMMATE_FORM, page);
    }
    getUserPosts(user.id, ROOMMATE_FORM);
    getScoreList(undefined, user.id);
    setOpen(false);
  };

  // Constants
  const priorityChoices = [
    IRRELEVANT,
    A_LITTLE_IMPORTANT,
    SOMEWHAT_IMPORTANT,
    VERY_IMPORTANT,
    MANDATORY,
    IS_10000,
  ];

  // Helper Functions
  const getTopThreeTags = (post) => {
    const categories = post.selected_choices;
    var topThreeTags = [];
    for (let i = priorityChoices.length - 1; i >= 0; i--) {
      for (let j = 0; j < categories.length; j++) {
        for (let k = 0; k < categories[j].length; k++) {
          if (
            topThreeTags.length < TAGS_NUMBER &&
            categories[j][k].priority === priorityChoices[i]
          ) {
            if (Array.isArray(categories[j][k].otherChoice)) {
              for (let h = 0; h < categories[j][k].otherChoice.length; h++) {
                if (topThreeTags.length < TAGS_NUMBER)
                  topThreeTags.push(categories[j][k].otherChoice[h]);
              }
            } else {
              topThreeTags.push(categories[j][k].otherChoice);
            }
          }
        }
      }
    }
    return topThreeTags;
  };

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

          <CardActionArea style={{ height: 263 }}>
            {/* Poster's description */}
            <CardContent>
              {/* Name */}
              <Typography variant="h5" color="textPrimary">
                {post.owner.first_name} {post.owner.last_name}{" "}
                {scoreListObj?.[post.id] && (
                  <Chip
                    label={scoreListObj[post.id].score + "%"}
                    color="secondary"
                    className={classes.tag}
                  />
                )}
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
              {getTopThreeTags(post).map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  color="primary"
                  className={classes.tag}
                />
              ))}
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
  userRoommatePosts: state.post.userRoommatePosts,
  deletePostSuccess: state.post.deletePostSuccess,
  scoreList: state.score.scoreList,
  page: state.post.page,
  count: state.post.count,
});

const mapDispatchToProps = {
  deletePost,
  resetDeletePostSuccess,
  getPostList,
  getUserPosts,
  loadUser,
  getScoreList,
  setPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoommateCard);
