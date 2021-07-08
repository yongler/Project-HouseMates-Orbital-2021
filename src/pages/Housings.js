import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { Container, Fab, Grid, Tooltip, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import HousingCard from '../components/HousingCard'
import { getPostList, getUserPost } from '../redux/post/actions'
import { HOUSING_FORM } from '../globalConstants'

// Posts consists of list of Roommate and post button.
const Housings = ({ 
  user, userPost, posts, postsType,
  getUserPost, postLoading, getPostList, searchedPost
}) => {
  // Styling
  const useStyles = makeStyles(theme => ({
    tooltip: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
    grid: {
      display: 'flex',
      flexDirection: 'column',
    },
  }))

  // Hooks
  const classes = useStyles()
  const history = useHistory()

  // Handlers
  const handlePost = () => { history.push('/housing-form') }

  // componentDidMount
  useEffect(() => { getPostList(HOUSING_FORM) }, [])
  useEffect(() => user ? getUserPost(user.id) : null, [user])
  
  const postToRender = searchedPost ? searchedPost : posts

  return (
    <div>
      {postsType === HOUSING_FORM && postToRender.length !== 0
        ?
        <>
          {/* List of posts */}
          <Container>
            <Grid container spacing={2}>
              {postToRender.map(post => (
                <Grid item xs={12} key={post.id} className={classes.grid}>
                  <HousingCard post={post} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </>
        :
        <>
          {!postLoading &&
            <div style={{ textAlign: 'center' }}>
              {/* No post */}
              <Typography variant="subtitle1">No post.</Typography>
            </div>}
        </>
      }

      {/* Post button */}
      {user && userPost?.length === 0 &&
        <Tooltip title="" onClick={handlePost}>
          <Fab color="primary" className={classes.tooltip}><AddIcon /></Fab>
        </Tooltip>}
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  userPost: state.post.userPost,
  posts: state.post.posts,
  postsType: state.post.postsType,
  postLoading: state.post.postLoading,
  searchedPost: state.post.searchedPost,
})

const mapDispatchToProps = {
  getPostList,
  getUserPost,
}

export default connect(mapStateToProps, mapDispatchToProps)(Housings)
