import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { Container, Fab, Grid, Tooltip } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { getPostList } from '../redux/post/actions'

// Posts consists of list of Roommate and post button.
const Posts = ({ postType, handlePostButton, PostComponent, xs, md, lg, posts, getPostList }) => {
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

  useEffect(() => {
    window.scrollTo(0, 0)
    // getPostList(postType)
  }, [])

  return (
    <div>
      {/* List of posts */}
      <Container>
        <Grid container spacing={2}>
          {posts.map(post => (
            <Grid item xs={xs} md={md} lg={lg} key={post.id} className={classes.grid}>
              <PostComponent post={post} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Post button */}
      <Tooltip title="" onClick={handlePostButton}>
        <Fab color="primary" className={classes.tooltip}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  )
}

const mapStateToProps = state => ({
  // posts: state.post.posts,
})

const mapDispatchToProps = {
  getPostList,
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)