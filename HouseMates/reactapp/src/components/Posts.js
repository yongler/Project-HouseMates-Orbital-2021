import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { Container, Fab, Grid, Tooltip, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { getPostList, searchPost } from '../redux/post/actions'

// Posts consists of list of Roommate and post button.
const Posts = ({ 
  postType, handlePostButton, PostComponent, xs, md, lg, posts, postsType, 
  postLoading, getPostList, searchedPost
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

  // componentDidMount
  useEffect(() => {
    getPostList(postType)
  }, [])

  const postToRender = searchPost ? searchPost : posts

  return (
    <div>
      {postType === postsType && postToRender.length !== 0
        ?
        <>
          {/* List of posts */}
          <Container>
            <Grid container spacing={2}>
              {postToRender.map(post => (
                <Grid item xs={xs} md={md} lg={lg} key={post.id} className={classes.grid}>
                  <PostComponent post={post} />
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
      {user &&
        <Tooltip title="" onClick={handlePost}>
          <Fab color="primary" className={classes.tooltip}><AddIcon /></Fab>
        </Tooltip>}
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  posts: state.post.posts,
  postsType: state.post.postsType,
  postLoading: state.post.postLoading,
  searchedPost: state.post.searchedPost,
})

const mapDispatchToProps = {
  getPostList,
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)