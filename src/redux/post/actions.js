import axios from "axios";
import S3FileUpload from "react-s3";
import { HOUSING_FORM, ROOMMATE_FORM } from "../../globalConstants";
import {
  GET_POST_LIST_SUCCESS,
  GET_POST_LIST_FAIL,
  GET_POST_DETAIL_SUCCESS,
  GET_POST_DETAIL_FAIL,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_FAIL,
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
  CANCEL_SEARCH_FAIL,
  SET_PAGE,
} from "./types";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const s3config = {
  bucketName: "housematesorbital",
  dirName: "images",
  region: "us-east-2",
  accessKeyId: "AKIA2VQMUMOWCECPYUOU",
  secretAccessKey: "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",
};

// Error messages
const getPostListErrorMsg = "Unable to load posts";
const getPostDetailErrorMsg = "Unable to load post";
const getUserPostsErrorMsg = "Unable to load user posts";
const getUserRoommatePostsErrorMsg = "Unable to load user roommate posts";
const getUserHousingPostsErrorMsg = "Unable to load user housing posts";
const createPostErrorMsg = "Unable to submit form";
const editPostErrorMsg = "Unable to edit post";
const deletePostErrorMsg = "Unable to delete post";

const searchPostErrorMsg = "Unable to search post";
const cancelSearchErrorMsg = " Unable to cancel search";
const addPicFailErrorMsg = " Unable to add pic";

// Async actions creators
export const getPostList = (type, page) =>
  async (dispatch) => {
    // Loading
    dispatch(postLoading());

    // Draft request
    const config = { headers: { "Content-Type": "application/json" } };

    // Get request
    try {
      var res
      if (type === undefined && page == undefined) {
        res = await axios.get(`/form/post-list/`, config);
      } else if (type !== undefined && page === undefined) {
        res = await axios.get(`/form/post-list/?form_type=${type}`, config);
      } else if (type === undefined && page !== undefined) {
        res = await axios.get(`/form/post-list/?page=${page}`, config);
      } else {
        res = await axios.get(`/form/post-list/?form_type=${type}&page=${page}`, config)
      }
      dispatch(getPostListSuccess(type, res.data));
    } catch (err) {
      dispatch(getPostListFail(getPostListErrorMsg));
    }
  };

export const getPostDetail = (id) =>
  async (dispatch) => {
    // Loading
    dispatch(postLoading());

    // Draft request
    const config = { headers: { "Content-Type": "application/json" } };

    // Get request
    try {
      const res = await axios.get(`/form/post-list/${id}/`, config);
      dispatch(getPostDetailSuccess(res.data));
    } catch (err) {
      dispatch(getPostDetailFail(getPostDetailErrorMsg));
    }
  };

export const getUserPosts = (owner, type, page) =>
  async (dispatch) => {
    // Draft request
    const config = { headers: { "Content-Type": "application/json" } };

    // Get request
    try {
      var res
      if (type !== undefined && page === undefined) {
        res = await axios.get(`/form/post-list/?owner=${owner}&form_type=${type}`, config);
      } else if (type === undefined && page !== undefined) {
        res = await axios.get(`/form/post-list/?owner=${owner}&page=${page}`, config);
      } else if (type !== undefined && page !== undefined) {
        res = await axios.get(`/form/post-list/?owner=${owner}&form_type=${type}&page=${page}`, config);
      } else {
        res = await axios.get(`/form/post-list/?owner=${owner}`, config);
      }
      dispatch(getUserPostsSuccess(type, res.data));
    } catch (err) {
      if (type === ROOMMATE_FORM) {
        dispatch(getUserPostsFail(getUserRoommatePostsErrorMsg));
      } else if (type === HOUSING_FORM) {
        dispatch(getUserPostsFail(getUserHousingPostsErrorMsg));
      } else {
        dispatch(getUserPostsFail(getUserPostsErrorMsg));
      }
    }
  };

export const createPost = (post_form_type, selected_choices, owner, picture) =>
  async (dispatch) => {
    // Loading
    dispatch(postLoading());

    // Get access token from local storage
    const token = localStorage.getItem("access");

    // Draft request
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`,
      },
    };
    if (picture) {
      const images = [];
      const dummy = Array.from(Array(picture.length).keys());

      dummy.forEach((i) => {
        S3FileUpload.uploadFile(picture[i], s3config)
          .then((data) => {
            images.push(data.location);
          })
          .then(async () => {
            if (images.length === picture.length) {
              const body = JSON.stringify({
                post_form_type,
                selected_choices,
                owner,
                images,
              });

              // Post request
              try {
                await axios.post(`/form/post-list/`, body, config);

                dispatch(createPostSuccess());
              } catch (err) {
                dispatch(createPostFail(createPostErrorMsg));
              }
            }
          });
      });
    } else {
      const body = JSON.stringify({
        post_form_type,
        selected_choices,
        owner,
      });

      // Post request
      try {
        await axios.post(`/form/post-list/`, body, config);

        dispatch(createPostSuccess());
      } catch (err) {
        dispatch(createPostFail(createPostErrorMsg));
      }
    }
  };

export const editPost = (id, post_form_type, selected_choices, owner, score_list, total_score, picture) =>
  async (dispatch) => {
    // Loading
    dispatch(postLoading());

    // Get access token from local storage
    const token = localStorage.getItem("access");

    // Draft request
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`,
      },
    };

    if (picture) {
      const images = [];
      const dummy = Array.from(Array(picture.length).keys());

      dummy.forEach((i) => {
        S3FileUpload.uploadFile(picture[i], s3config)
          .then((data) => {
            images.push(data.location);
          })
          .then(async () => {
            if (images.length === picture.length) {
              const body = JSON.stringify({ post_form_type, selected_choices, owner, score_list, total_score, images });

              // Put request
              try {
                await axios.put(`/form/post-list/${id}/`, body, config);
                dispatch(editPostSuccess());
              } catch (err) {
                dispatch(editPostFail(editPostErrorMsg));
              }
            }
          });
      });
    } else {
      const body = JSON.stringify({ post_form_type, selected_choices, owner, score_list, total_score });

      // Put request
      try {
        await axios.put(`/form/post-list/${id}/`, body, config);
        dispatch(editPostSuccess());
      } catch (err) {
        dispatch(editPostFail(editPostErrorMsg));
      }
    }
  };

export const deletePost = (id) =>
  async (dispatch) => {
    // Loading
    dispatch(postLoading());

    // Get access token from local storage
    const token = localStorage.getItem("access");

    // Draft request
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`,
      },
    };

    // Post request
    try {
      await axios.delete(`/form/post-list/${id}/`, config);
      dispatch(deletePostSuccess());
    } catch (err) {
      dispatch(deletePostFail(deletePostErrorMsg));
    }
  };

export const searchPost = (formType, searchItem, page) =>
  async (dispatch) => {
    dispatch(postLoading());

    // Request
    const config = { headers: { "Content-Type": "application/json" } };

    // Get request
    try {
      var res
      if (page !== undefined) {
        res = await axios.get(`/form/post-list/?form_type=${formType}&search=${searchItem}&page=${page}`, config);
      } else {
        res = await axios.get(`/form/post-list/?form_type=${formType}&search=${searchItem}`, config);
      }
      dispatch(searchPostSuccess(res.data, searchItem));
    } catch (err) {
      dispatch(searchPostFail(searchPostErrorMsg));
    }
  };

export const cancelSearch = () =>
  async (dispatch) => {
    try {
      dispatch(cancelSearchSuccess());
    } catch (err) {
      dispatch(cancelSearchFail(cancelSearchErrorMsg));
    }
  };



// Action Creators
export const getPostListSuccess = (type, resdata) => ({
  type: GET_POST_LIST_SUCCESS,
  payload: { type, resdata },
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

export const getUserPostsSuccess = (type, userPosts) => ({
  type: GET_USER_POSTS_SUCCESS,
  payload: { type, userPosts },
});
export const getUserPostsFail = (postErrorMsg) => ({
  type: GET_USER_POSTS_FAIL,
  payload: postErrorMsg,
});

export const createPostSuccess = () => ({ type: CREATE_POST_SUCCESS });
export const createPostFail = (postErrorMsg) => ({
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

export const searchPostSuccess = (searchedPost, searchItem) => ({
  type: SEARCH_POST_SUCCESS,
  payload: { searchedPost, searchItem },
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

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
})
