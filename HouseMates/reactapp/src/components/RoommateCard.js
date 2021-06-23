import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Link, useHistory } from 'react-router-dom'
import { Card, CardActionArea, CardContent, CardMedia, Chip, IconButton, Tooltip, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { deletePost, getPostList, resetDeletePostSuccess } from '../redux/post/actions'
import Confirmation from '../components/Confirmation'
import { ROOMMATE_FORM } from '../globalConstants'

// RoommateCard consists of poster's description: pic, name, gender, bio and top 3 preferred roommate tags.fUSER
const RoommateCard = ({ user, post, deletePostSuccess, deletePost, resetDeletePostSuccess, getPostList }) => {
  // Styling
  const useStyles = makeStyles(theme => ({
    card: {
      width: 345,
      cursor: 'pointer',
      alignSelf: 'center',
    },
    media: {
      height: 160,
    },
    tag: {
      marginRight: 5,
      marginTop: 5,
    },
    text: {
      height: 150,
    },
    edit: {
      float: 'right',
      marginRight: 5,
      marginTop: 5,
    },
    delete: {
      float: 'right',
      marginRight: -15,
      marginTop: 5,
    },
    icon: {
      color: 'black',
    },
  }))

  // Hooks
  const classes = useStyles()
  const history = useHistory()

  // States
  const [open, setOpen] = useState(false)

  // Handlers
  const handleEdit = () => { history.push(`/edit-form/${post.id}`) }
  const handleOpenConfirmationDialog = () => { setOpen(true) }
  const handleCancel = () => { setOpen(false) }
  const handleDelete = () => { deletePost(post.id) }
  const handleClose = () => {
    resetDeletePostSuccess()
    getPostList(ROOMMATE_FORM)
    setOpen(false)
  }

  return (
    <>
      <Card className={classes.card}>
        {user?.id === post.owner.id &&
          <>
            {/* Edit button */}
            < Tooltip title="" className={classes.edit} onClick={handleEdit}>
              <IconButton className={classes.icon}><EditIcon /></IconButton>
            </Tooltip>

            {/* Delete button */}
            <Tooltip title="" className={classes.delete} onClick={handleOpenConfirmationDialog}>
              <IconButton className={classes.icon}><DeleteIcon /></IconButton>
            </Tooltip>
          </>
        }

        <Link to={`/roommates/${post.id}`} style={{ textDecoration: 'none', color: 'black' }}>
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
                {post.owner.first_name} {post.owner.last_name}
              </Typography>

              {/* Age, gender and bio */}
              <Typography variant="body2" color="textSecondary" className={classes.text}>
                {post?.owner.bio?.length > 220 ? post.owner.bio.substring(0, 220) + "..." : post.owner.bio}
              </Typography>

              <br />

              <Typography variant="body2" color="textSecondary" gutterBottom>
                Looking for roommates who are:
              </Typography>

              {/* Top 3 preferred roommate tags */}
              {/* {post?.specs.map(spec => */}
                {/* <Chip key={spec} label={spec} color="primary" className={classes.tag} /> */}
              {/* )} */}
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
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  deletePostSuccess: state.post.deletePostSuccess,
})

const mapDispatchToProps = {
  deletePost,
  resetDeletePostSuccess,
  getPostList,
}

export default connect(mapStateToProps, mapDispatchToProps)(RoommateCard)
