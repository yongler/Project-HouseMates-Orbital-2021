import React, { useState, useEffect, useRef } from "react"
import { useHistory } from 'react-router-dom'
import { connect } from "react-redux"
import { makeStyles } from "@material-ui/core"
import { Box, Button, Container, ClickAwayListener, Fab, Grid, Grow, MenuList, MenuItem, Paper, Popper, Tooltip, Typography } from "@material-ui/core"
import Pagination from '@material-ui/lab/Pagination'
import AddIcon from "@material-ui/icons/Add"
import FilterListIcon from '@material-ui/icons/FilterList'
import RoommateCard from '../components/RoommateCard'
import { getPostList, getUserPosts, searchPost } from "../redux/post/actions"
import { PAGINATION, ROOMMATE_FORM } from '../globalConstants'

// Posts consists of list of Roommate and post button.
const Roommates = ({
  user,
  postLoading,
  getUserPosts, userRoommatePosts, userRoommatePostsCount,
  getPostList, posts, postsType, count,
  searchPost, searchedPost, searchItem, searchedPostCount,

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
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false);
  const [myPosts, setMyPosts] = useState(false)
  const [text, setText] = useState("Filter")

  // Handlers
  const handlePost = () => { history.push('/roommate-form') }
  const handlePageChange = (event, value) => {
    setPage(value)
    if (searchedPost) {
      searchPost(ROOMMATE_FORM, searchItem, value)
    } else if (myPosts) {
      getUserPosts(user.id, ROOMMATE_FORM, value)
    } else {
      getPostList(ROOMMATE_FORM, value)
    }
    window.scroll(0, 0)
  }

  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };
  const handleMyPosts = () => {
    setMyPosts(true)
    setOpen(false)
    setText("My Post(s)")
  }
  const handleAllPosts = () => {
    setMyPosts(false)
    setPage(1)
    setOpen(false)
    setText("Filter")
  }

  // componentDidMount
  useEffect(() => { getPostList(ROOMMATE_FORM) }, [])
  useEffect(() => (user ? getUserPosts(user.id, ROOMMATE_FORM) : null), [user])

  const postToRender = searchedPost ? searchedPost : myPosts ? userRoommatePosts : posts
  const countToRender = searchedPost ? searchedPostCount : myPosts ? userRoommatePostsCount : count

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
            {text}
          </Button>
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal placement={'bottom-end'}>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
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

      {postsType === ROOMMATE_FORM && postToRender.length !== 0
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
  postsType: state.post.postsType,
  postLoading: state.post.postLoading,
  searchedPost: state.post.searchedPost,
  count: state.post.count,
  userRoommatePostsCount: state.post.userRoommatePostsCount,
  searchedPostCount: state.post.searchedPostCount,
  searchItem: state.post.searchItem,
})

const mapDispatchToProps = {
  getPostList,
  getUserPosts,
  searchPost,
}

export default connect(mapStateToProps, mapDispatchToProps)(Roommates)
