import axios from "axios";
import {
  GET_POST_LIST_SUCCESS,
  GET_POST_LIST_FAIL,
  GET_POST_DETAIL_SUCCESS,
  GET_POST_DETAIL_FAIL,
  GET_USER_POST_SUCCESS,
  GET_USER_POST_FAIL,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAIL,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  POST_LOADING,
  RESET_POST_LOADING,
  RESET_POST_ERROR_MSG,
  RESET_CREATE_POST_SUCCESS,
  RESET_EDIT_POST_SUCCESS,
  RESET_DELETE_POST_SUCCESS,
  SEARCH_POST_SUCCESS,
  SEARCH_POST_FAIL,
  CANCEL_SEARCH_SUCCESS,
  CANCEL_SEARCH_FAIL
} from "./types";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

// Error messages
const getPostListErrorMsg = "Unable to load posts"
const getPostDetailErrorMsg = "Unable to load post"
const getUserPostErrorMsg = "Unable to load user post"
const createPostErrorMsg = "Unable to submit form"
const editPostErrorMsg = "Unable to edit post"
const deletePostErrorMsg = "Unable to delete post"

const searchPostErrorMsg = "Unable to search post"
const cancelSearchErrorMsg = " Unable to cancel search"

// Async actions creators
export const getPostList = formType =>
  async dispatch => {
    // Loading
    dispatch(postLoading())

    // Draft request
    const config = { headers: { 'Content-Type': 'application/json' } }

    // Get request
    try {
      const res = await axios.get(`/form/post-list/?form_type=${formType}`, config)

      dispatch(getPostListSuccess(formType, res.data))
    } catch (err) {
      dispatch(getPostListFail(getPostListErrorMsg))
    }
  }

export const getPostDetail = id => 
  async dispatch => {
    // Loading
    dispatch(postLoading())

    // Draft request
    const config = { headers: { 'Content-Type': 'application/json' } }

    // Get request
    try {
      const res = await axios.get(`/form/post-list/${id}/`, config)

      dispatch(getPostDetailSuccess(res.data))
    } catch (err) {
      dispatch(getPostDetailFail(getPostDetailErrorMsg))
    }
  }

export const getUserPost = owner => 
  async dispatch => {
    // Loading
    dispatch(postLoading())

    // Draft request
    const config = { headers: { 'Content-Type': 'application/json' } }

    // Get request
    try {
      const res = await axios.get(`/form/post-list/?owner=${owner}`, config)

      dispatch(getUserPostSuccess(res.data))
    } catch (err) {
      dispatch(getUserPostFail(getUserPostErrorMsg))
    }
  }

export const createPost = (post_form_type, selected_choices, owner) =>
  async dispatch => {
    // Loading
    dispatch(postLoading())

    // Get access token from local storage
    const token = localStorage.getItem("access");

    // Draft request
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    };
    const body = JSON.stringify({ post_form_type, selected_choices, owner });

    // Post request
    try {
      axios.post(
        `/form/post-list/`,
        body,
        config
      );

      dispatch(createPostSuccess());
    } catch (err) {
      dispatch(createPostFail(createPostErrorMsg));
    }
  };

export const editPost = (id, post_form_type, selected_choices, owner, score_list, total_score) =>
  async dispatch => {
    // Loading
    dispatch(postLoading())

    // Get access token from local storage
    const token = localStorage.getItem("access");

    // Draft request
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      }
    }
    const body = JSON.stringify({ post_form_type, selected_choices, owner, score_list, total_score })

    // Put request
    try {
      axios.put(
        `/form/post-list/${id}/`,
        body,
        config
      );

      dispatch(editPostSuccess());
    } catch (err) {
      dispatch(editPostFail(editPostErrorMsg));
    }
  };

export const deletePost = (id) => async (dispatch) => {
  dispatch(postLoading());

  // Get access token from local storage
  const token = localStorage.getItem("access");

  // Draft request
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  };

  // Post request
  try {
    axios.delete(
      `/form/post-list/${id}/`,
      config
    );

    dispatch(deletePostSuccess());
  } catch (err) {
    dispatch(deletePostFail(deletePostErrorMsg));
  }
};

export const searchPost = (formType, searchItem) => async (dispatch) => {
  dispatch(postLoading());

  // Request
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Get request
  try {
    const res = await axios.get(
      `/form/post-list/?form_type=${formType}&search=${searchItem}`,
      config
    );

    dispatch(searchPostSuccess(res.data));
  } catch (err) {
    dispatch(searchPostFail(searchPostErrorMsg));
  }
};

export const cancelSearch = () => async (dispatch) => {
  console.log('in action')
  try {
    dispatch(cancelSearchSuccess());
  } catch (err) {
    dispatch(cancelSearchFail(cancelSearchErrorMsg));
  }
};


// Action Creators
export const getPostListSuccess = (formType, posts) => ({
  type: GET_POST_LIST_SUCCESS,
  payload: { formType, posts },
});
export const getPostListFail = (postErrorMsg) => ({
  type: GET_POST_LIST_FAIL,
  payload: postErrorMsg,
});

export const getPostDetailSuccess = (post) => ({
  type: GET_POST_DETAIL_SUCCESS,
  payload: post,
});
export const getPostDetailFail = (postErrorMsg) => ({
  type: GET_POST_DETAIL_FAIL,
  payload: postErrorMsg,
});

export const getUserPostSuccess = userPost => ({
  type: GET_USER_POST_SUCCESS,
  payload: userPost,
})
export const getUserPostFail = postErrorMsg => ({
  type: GET_USER_POST_FAIL,
  payload: postErrorMsg,
})

export const createPostSuccess = () => ({ type: CREATE_POST_SUCCESS })
export const createPostFail = postErrorMsg => ({
  type: CREATE_POST_FAIL,
  payload: postErrorMsg,
});

export const editPostSuccess = () => ({ type: EDIT_POST_SUCCESS });
export const editPostFail = (postErrorMsg) => ({
  type: EDIT_POST_FAIL,
  payload: postErrorMsg,
});

export const deletePostSuccess = () => ({ type: DELETE_POST_SUCCESS });
export const deletePostFail = (postErrorMsg) => ({
  type: DELETE_POST_FAIL,
  payload: postErrorMsg,
});

export const postLoading = () => ({ type: POST_LOADING });
export const resetPostLoading = () => ({ type: RESET_POST_LOADING });

export const resetPostErrorMsg = () => ({ type: RESET_POST_ERROR_MSG });

export const resetCreatePostSuccess = () => ({
  type: RESET_CREATE_POST_SUCCESS,
});
export const resetEditPostSuccess = () => ({ type: RESET_EDIT_POST_SUCCESS });
export const resetDeletePostSuccess = () => ({
  type: RESET_DELETE_POST_SUCCESS,
});

export const searchPostSuccess = (searchedPost) => ({
  type: SEARCH_POST_SUCCESS,
  payload: searchedPost,
});
export const searchPostFail = (searchPostErrorMsg) => ({
  type: SEARCH_POST_FAIL,
  payload: searchPostErrorMsg,
});

export const cancelSearchSuccess = () => ({ type: CANCEL_SEARCH_SUCCESS });
export const cancelSearchFail = (cancelSearchErrorMsg) => ({
  type: CANCEL_SEARCH_FAIL,
  payload: cancelSearchErrorMsg,
});
