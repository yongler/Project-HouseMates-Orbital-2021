import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { Box, Container, Fab, Grid, Tooltip, Typography } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import AddIcon from '@material-ui/icons/Add'
import HousingCard from '../components/HousingCard'
import { getPostList, getUserHousingPosts } from '../redux/post/actions'
import { HOUSING_FORM, PAGINATION } from '../globalConstants'

// Posts consists of list of Roommate and post button.
const Housings = ({
  user, userHousingPosts, posts, postsType,
  getUserHousingPosts, postLoading, getPostList, searchedPost, count
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

  // States
  const [page, setPage] = useState(1)

  // Handlers
  const handlePost = () => { history.push('/housing-form') }
  const handlePageChange = (event, value) => {
    setPage(value)
    getPostList(HOUSING_FORM, value)
    window.scroll(0, 0)
  }

  // componentDidMount
  useEffect(() => { getPostList(HOUSING_FORM) }, [])
  useEffect(() => user ? getUserHousingPosts(user.id) : null, [user])

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

      {/* Pagination */}
      {postToRender.length !== 0
        ?
        <Box style={{ width: "100%", display: 'flex', justifyContent: 'center', marginTop: 60 }}>
          <Pagination color="primary" count={Math.ceil(count / PAGINATION)} page={page} onChange={handlePageChange} />
        </Box>
        :
        null}

      {/* Post button */}
      {user && userHousingPosts?.length <= 10 &&
        <Tooltip title="" onClick={handlePost}>
          <Fab color="primary" className={classes.tooltip}><AddIcon /></Fab>
        </Tooltip>}
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  userHousingPosts: state.post.userHousingPosts,
  posts: state.post.posts,
  postsType: state.post.postsType,
  postLoading: state.post.postLoading,
  searchedPost: state.post.searchedPost,
  count: state.post.count,
})

const mapDispatchToProps = {
  getPostList,
  getUserHousingPosts,
}

export default connect(mapStateToProps, mapDispatchToProps)(Housings)
