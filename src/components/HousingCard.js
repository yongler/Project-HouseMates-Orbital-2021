import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { Card, CardActionArea, CardContent, CardMedia, IconButton, Tooltip, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import FavoriteIcon from '@material-ui/icons/Favorite';
import Pic from '../static/housing.jpg'
import { deletePost, resetDeletePostSuccess, getPostList } from "../redux/post/actions";
import Confirmation from "../components/Confirmation";
import { HOUSING_FORM } from '../globalConstants'
import { editFavourites, loadUser, resetEditFavouritesSuccess } from '../redux/auth/actions'

// HousingCardCard consists of housing description: name and facilities, and pic.
const HousingCard = ({
  post, page,
  user, loadUser,
  deletePost, deletePostSuccess, resetDeletePostSuccess,
  getPostList,
  editFavourites, editFavouritesSuccess, resetEditFavouritesSuccess
}) => {
  // Styling
  const useStyles = makeStyles((theme) => ({
    card: {
      display: "flex",
      height: 200,
      cursor: "pointer",
      position: "relative",
    },
    content: {
      flex: "1 0 auto",
    },
    media: {
      width: 400,
    },
    edit: {
      position: "absolute",
      right: 0,
      marginRight: 5,
      marginTop: 5,
    },
    delete: {
      position: "absolute",
      right: 40,
      marginTop: 5,
    },
    icon: {
      color: "black",
    },
    red: {
      color: "red",
    },
    white: {
      color: "white",
    },
  }))

  // Hooks
  const classes = useStyles();
  const history = useHistory();

  // States
  const [open, setOpen] = useState(false);

  // Handlers
  const handleEdit = () => { history.push(`/edit-housing-form/${post.id}`); };
  const handleOpenConfirmationDialog = () => { setOpen(true); };
  const handleCancel = () => { setOpen(false); };
  const handleDelete = () => { deletePost(post.id); };
  const handleClose = () => {
    resetDeletePostSuccess()
    getPostList(HOUSING_FORM, page)
    setOpen(false)
  }
  const handleFavourites = () => {
    resetEditFavouritesSuccess()
    const favourites = user.favourites || []
    if (favourites.includes(post.id)) {
      favourites.splice(favourites.indexOf(post.id), 1)
      editFavourites(favourites)
    } else {
      favourites.push(post.id)
      editFavourites(favourites)
    }
  }

  useEffect(() => loadUser(), [editFavouritesSuccess])

  return (
    <>
      <Card className={classes.card}>
        {user
          ?
          user?.id === post.owner.id
            ?
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
            :
            // Favourite button
            <Tooltip
              title=""
              className={classes.edit}
            >
              <IconButton
                className={clsx({
                  [classes.red]: user?.favourites?.includes(post.id),
                  [classes.white]: !user?.favourites?.includes(post.id),
                })}
                onClick={handleFavourites}
              >
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
          :
          null}

        <Link
          to={`/housings/${post.id}`}
          style={{
            textDecoration: "none",
            color: "black",
            display: "flex",
            height: "100%",
            width: "100%",
          }}
        >
          <CardActionArea>
            {/* HousingCard description */}
            <CardContent className={classes.content}>
              {/* Name */}
              <Typography variant="h5">
                {post.selected_choices[0][0].choice}
              </Typography>

              {/* Location */}
              <Typography variant="body2" color="textSecondary">
                Located at {post.selected_choices[0][2].choice}
              </Typography>

              <br />

              {/* Facilities */}
              <Typography variant="body2" color="textSecondary">
                {post.selected_choices[1][0].choice} &middot;{" "}
                {post.selected_choices[1][1].choice} &middot;{" "}
                {post.selected_choices[1][2].choice.map((facility, index) =>
                  index === 0 ? (
                    <Fragment key={facility}>{facility} </Fragment>
                  ) : (
                    <Fragment key={facility}>&middot; {facility} </Fragment>
                  )
                )}
              </Typography>

              <br />

              {/* Price */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">
                  SGD {post.selected_choices[0][3].choice}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  &nbsp;/ night
                </Typography>
              </div>
            </CardContent>
          </CardActionArea>

          {/* Pic */}
          <CardMedia
            className={classes.media}
            image={post?.images[0]}
            title={post?.selected_choices[0][0].choice}
          />
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
  deletePostSuccess: state.post.deletePostSuccess,
  editFavouritesSuccess: state.auth.editFavouritesSuccess,
});

const mapDispatchToProps = {
  deletePost,
  resetDeletePostSuccess,
  getPostList,
  editFavourites,
  loadUser,
  resetEditFavouritesSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(HousingCard);
