import React, { useState, useEffect, useRef } from "react"
import { useHistory } from 'react-router-dom'
import { connect } from "react-redux"
import { makeStyles } from "@material-ui/core"
import { Box, Button, Container, ClickAwayListener, Fab, Grid, Grow, MenuList, MenuItem, Paper, Popper, Tooltip, Typography } from "@material-ui/core"
import Pagination from '@material-ui/lab/Pagination'
import AddIcon from "@material-ui/icons/Add"
import FilterListIcon from '@material-ui/icons/FilterList'
import RoommateCard from '../components/RoommateCard'
import { getPostList, getUserPosts, searchPost, setPage, setFilter } from "../redux/post/actions"
import { ALL_POSTS, MY_POSTS, PAGINATION, ROOMMATE_FORM } from '../globalConstants'

// Posts consists of list of Roommate and post button.
const Roommates = ({
  user,
  postLoading,
  userRoommatePosts, userRoommatePostsCount, getUserPosts,
  posts, count, getPostList,
  searchedPost, searchedPostCount, searchItem, searchPost,
  page, setPage,
  filter, setFilter,
}) => {
  // Styling
  const useStyles = makeStyles((theme) => ({
    tooltip: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
    grid: {
      display: "flex",
      flexDirection: "column",
    },
  }))

  // Hooks
  const classes = useStyles()
  const history = useHistory()
  const anchorRef = useRef(null);

  // States
  const [open, setOpen] = useState(false);

  // Handlers
  const handlePost = () => { history.push('/roommate-form') }
  const handlePageChange = (event, value) => {
    setPage(value)
    if (searchedPost) {
      searchPost(ROOMMATE_FORM, searchItem, value)
    } else if (filter === MY_POSTS) {
      getUserPosts(user.id, ROOMMATE_FORM, value)
    } else {
      getPostList(ROOMMATE_FORM, value)
    }
    window.scroll(0, 0)
  }

  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };
  const handleMyPosts = () => {
    setFilter(MY_POSTS)
    setPage(1)
    setOpen(false)
    getUserPosts(user.id, ROOMMATE_FORM)
  }
  const handleAllPosts = () => {
    setFilter(ALL_POSTS)
    setPage(1)
    setOpen(false)
    getPostList(ROOMMATE_FORM)
  }

  // componentDidMount
  useEffect(() => { getPostList(ROOMMATE_FORM, page) }, [])
  useEffect(() => { if (filter === MY_POSTS && user) getUserPosts(user.id, ROOMMATE_FORM, page) }, [user])

  const postToRender = searchedPost ? searchedPost : filter === MY_POSTS ? userRoommatePosts : posts
  const countToRender = searchedPost ? searchedPostCount : filter === MY_POSTS ? userRoommatePostsCount : count

  return (
    <div>
      {/* Filter button */}
      {user &&
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginLeft: 30, marginRight: 30 }}>
          <Typography variant="h6">Roommate Dashboard</Typography>
          <Button
            ref={anchorRef}
            onClick={handleOpen}
            startIcon={<FilterListIcon />}
            style={{ textDecoration: "none" }}
          >
            {filter}
          </Button>
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal placement={'bottom-end'}>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center bottom' : 'center top' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList>
                      <MenuItem onClick={handleMyPosts}>My post(s)</MenuItem>
                      <MenuItem onClick={handleAllPosts}>All posts</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>}

      {postToRender.length !== 0
        ?
        // List of posts 
        <Container>
          <Grid container spacing={2}>
            {postToRender.map((post) => (
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                key={post.id}
                className={classes.grid}
              >
                <RoommateCard post={post} page={page} />
              </Grid>))}
          </Grid>
        </Container>
        :
        <>
          {/* No post */}
          {!postLoading && (
            <div style={{ textAlign: "center" }}>
              <Typography variant="subtitle1">No post.</Typography>
            </div>)}
        </>}

      {/* Pagination */}
      {postToRender.length !== 0
        ?
        <Box style={{ width: "100%", display: 'flex', justifyContent: 'center', marginTop: 60 }}>
          <Pagination color="primary" count={Math.ceil(countToRender / PAGINATION)} page={page} onChange={handlePageChange} />
        </Box>
        :
        null}

      {/* Post button */}
      {user && userRoommatePosts?.length === 0 &&
        <Tooltip title="" onClick={handlePost}>
          <Fab color="primary" className={classes.tooltip}>
            <AddIcon />
          </Fab>
        </Tooltip>}
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  userRoommatePosts: state.post.userRoommatePosts,
  posts: state.post.posts,
  postLoading: state.post.postLoading,
  searchedPost: state.post.searchedPost,
  count: state.post.count,
  userRoommatePostsCount: state.post.userRoommatePostsCount,
  searchedPostCount: state.post.searchedPostCount,
  searchItem: state.post.searchItem,
  page: state.post.page,
  filter: state.post.filter,
})

const mapDispatchToProps = {
  getPostList,
  getUserPosts,
  searchPost,
  setPage,
  setFilter,
}

export default connect(mapStateToProps, mapDispatchToProps)(Roommates)
