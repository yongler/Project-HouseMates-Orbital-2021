import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core";
import {
  Box,
  Button,
  Container,
  ClickAwayListener,
  Grid,
  Grow,
  MenuList,
  MenuItem,
  Paper,
  Popper,
  Typography,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import AddIcon from "@material-ui/icons/Add";
import FilterListIcon from "@material-ui/icons/FilterList";
import HousingCard from "../components/HousingCard";
import {
  getPostList,
  getUserPosts,
  searchPost,
  setPage,
  setFilter,
} from "../redux/post/actions";
import {
  HOUSING_FORM,
  ALL_POSTS,
  MY_POSTS,
  MY_HOUSING_POSTS,
  FILTERING,
  PAGINATION,
} from "../globalConstants";

// Posts consists of list of Roommate and post button.
const Housings = ({
  user,
  postLoading,
  housingPosts,
  count,
  getPostList,
  userHousingPosts,
  userHousingPostsCount,
  getUserPosts,
  searchedPost,
  searchedPostCount,
  searchItem,
  searchPost,
  page,
  setPage,
  filter,
  setFilter,
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
  }));

  // Hooks
  const classes = useStyles();
  const history = useHistory();
  const anchorRef = useRef(null);

  // States
  const [open, setOpen] = useState(false);

  // Handlers
  const handlePost = () => {
    history.push("/housing-form");
  };
  const handlePageChange = (event, value) => {
    setPage(value);
    if (searchedPost) {
      searchPost(HOUSING_FORM, searchItem, value);
    } else if (filter === MY_HOUSING_POSTS) {
      getUserPosts(user.id, HOUSING_FORM, value);
    } else {
      getPostList(HOUSING_FORM, value);
    }
    window.scroll(0, 0);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleMyPosts = () => {
    setFilter(MY_HOUSING_POSTS);
    setPage(1);
    setOpen(false);
    getUserPosts(user.id, HOUSING_FORM);
  };
  const handleAllPosts = () => {
    setFilter(ALL_POSTS);
    setPage(1);
    setOpen(false);
    getPostList(HOUSING_FORM);
  };
  const handleFilter = () => {
    setPage(1);
    setOpen(false);
    setFilter(FILTERING);
  };

  // useEffect
  // Get housing post list
  useEffect(() => getPostList(HOUSING_FORM, page), []);
  // Get user housing posts if filter to my posts
  useEffect(() => {
    if (filter === MY_HOUSING_POSTS && user)
      getUserPosts(user.id, HOUSING_FORM, page);
  }, [user]);

  const postToRender = searchedPost
    ? searchedPost
    : filter === MY_HOUSING_POSTS
    ? userHousingPosts
    : housingPosts;
  const countToRender = searchedPost
    ? searchedPostCount
    : filter === MY_HOUSING_POSTS
    ? userHousingPostsCount
    : count;

  return (
    <div>
      {/* Filter button */}
      {user && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
            marginLeft: 30,
            marginRight: 30,
          }}
        >
          <Typography variant="h6">Housing Dashboard</Typography>
          <Button
            ref={anchorRef}
            onClick={handleOpen}
            startIcon={<FilterListIcon />}
            style={{ textDecoration: "none" }}
          >
            {filter === MY_POSTS ? ALL_POSTS : filter}
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
            placement={"bottom-end"}
            style={{ zIndex: 1 }}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center bottom" : "center top",
                }}
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
        </div>
      )}

      {postToRender.length !== 0 ? (
        // List of posts
        <Container>
          <Grid container spacing={2}>
            {postToRender.map((post) => (
              <Grid item xs={12} key={post.id} className={classes.grid}>
                <HousingCard post={post} page={page} />
              </Grid>
            ))}
          </Grid>
        </Container>
      ) : (
        <>
          {/* No post */}
          {!postLoading && (
            <div style={{ textAlign: "center" }}>
              <Typography variant="subtitle1">No post.</Typography>
            </div>
          )}
        </>
      )}

      {/* Pagination */}
      {postToRender.length !== 0 ? (
        <Box
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 60,
          }}
        >
          <Pagination
            color="primary"
            count={Math.ceil(countToRender / PAGINATION)}
            page={page}
            onChange={handlePageChange}
          />
        </Box>
      ) : null}

      {/* Post button */}
      {user && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          className={classes.postBtn}
          onClick={handlePost}
        >
          Add post
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  userHousingPosts: state.post.userHousingPosts,
  housingPosts: state.post.housingPosts,
  postLoading: state.post.postLoading,
  searchedPost: state.post.searchedPost,
  count: state.post.count,
  userHousingPostsCount: state.post.userHousingPostsCount,
  searchedPostCount: state.post.searchedPostCount,
  searchItem: state.post.searchItem,
  page: state.post.page,
  filter: state.post.filter,
});

const mapDispatchToProps = {
  getPostList,
  getUserPosts,
  searchPost,
  setPage,
  setFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Housings);
