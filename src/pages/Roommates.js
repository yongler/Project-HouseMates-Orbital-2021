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
import { getScoreList, resetGetScoreListSuccess } from "../redux/score/actions"

// Posts consists of list of Roommate and post button.
const Roommates = ({
  user,
  postLoading,
  userRoommatePosts, userRoommatePostsCount, getUserPosts,
  posts, count, getPostList,
  searchedPost, searchedPostCount, searchItem, searchPost,
  page, setPage,
  filter, setFilter,
  scoreList, getScoreList, resetGetScoreListSuccess,
}) => {
  // Styling
  const useStyles = makeStyles((theme) => ({
    postBtn: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(3),
      borderRadius: 20,
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
  const [scoreListObj, setScoreListObj] = useState({})

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

  // useEffect
  // Get roommate post list
  useEffect(() => { getPostList(ROOMMATE_FORM, page) }, [])
  // Get roommate user post
  useEffect(() => { if (user) getUserPosts(user.id, ROOMMATE_FORM) }, [user])
  // Get roommate user post score list
  useEffect(() => { if (userRoommatePosts.length > 0) { getScoreList(userRoommatePosts[0].id) } }, [userRoommatePosts])
  // Procees roommate user post score list
  useEffect(() => {
    if (user) {
      const temp = scoreList.reduce((prev, curr) => ({ ...prev, [user.id === curr.owner1 ? curr.post2 : curr.post1]: curr }), {})
      setScoreListObj(temp)
    }
    return () => resetGetScoreListSuccess()
  }, [scoreList, user])

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

      {postToRender?.length !== 0
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
                <RoommateCard post={post} page={page} scoreListObj={scoreListObj} />
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
      {user && userRoommatePosts.length === 0 &&
        <Button variant="contained" color="primary" startIcon={<AddIcon />} className={classes.postBtn} onClick={handlePost}>
          Add post
        </Button>}
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
  scoreList: state.score.scoreList,
})

const mapDispatchToProps = {
  getPostList,
  getUserPosts,
  searchPost,
  setPage,
  setFilter,
  getScoreList,
  resetGetScoreListSuccess,
}

export default connect(mapStateToProps, mapDispatchToProps)(Roommates)
