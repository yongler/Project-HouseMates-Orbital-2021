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
} from "./types";

const initialState = {
  postLoading: false,
  posts: [],
  postsType: [],
  post: null,
  housingPost: null,
  userPosts: [],
  userRoommatePosts: [],
  userHousingPosts: [],
  count: 0,
  userRoommatePostsCount: 0,
  userHousingPostsCount: 0,
  searchedPost: null,
  searchItem: null,
  searchedPostCount: 0,
  next: null,
  previous: null,
  postErrorMsg: "",
  createPostSuccess: false,
  editPostSuccess: false,
  deletePostSuccess: false,
  searchPostSuccess: false,
  cancelSearchSuccess: false,
};

const postReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_POST_LIST_SUCCESS:
      return {
        ...state,
        postLoading: false,
        posts: payload.resdata.results,
        count: payload.resdata.count,
        next: payload.resdata.next,
        previous: payload.resdata.previous,
        postsType: payload.type,
      };

    case GET_POST_LIST_FAIL:
      return {
        ...state,
        postLoading: false,
        postErrorMsg: payload,
      };

    case GET_POST_DETAIL_SUCCESS:
      if (payload.post_form_type === ROOMMATE_FORM) {
        return {
          ...state,
          postLoading: false,
          post: payload,
        };
      } else {
        return {
          ...state,
          postLoading: false,
          housingPost: payload,
        };
      }


    case GET_POST_DETAIL_FAIL:
      return {
        ...state,
        postLoading: false,
        post: null,
        postErrorMsg: payload,
      };

    case GET_USER_POSTS_SUCCESS:
      if (payload.type === ROOMMATE_FORM) {
        return {
          ...state,
          postLoading: false,
          userRoommatePosts: payload.userPosts.results,
          userRoommatePostsCount: payload.userPosts.count,
        };
      } else if (payload.type === HOUSING_FORM) {
        return {
          ...state,
          postLoading: false,
          userHousingPosts: payload.userPosts.results,
          userHousingPostsCount: payload.userPosts.count,
        };
      } else {
        return {
          ...state,
          postLoading: false,
          userPosts: payload.userPosts.results,
        };
      }

    case GET_USER_POSTS_FAIL:
      return {
        ...state,
        postLoading: false,
        userPosts: null,
        userRoommatePosts: null,
        userHousingPosts: null,
        postErrorMsg: payload,
      };

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        postLoading: false,
        createPostSuccess: true,
      };

    case CREATE_POST_FAIL:
      return {
        ...state,
        postLoading: false,
        postErrorMsg: payload,
        createPostSuccess: false,
      };

    case EDIT_POST_SUCCESS:
      return {
        ...state,
        postLoading: false,
        editPostSuccess: true,
      };

    case EDIT_POST_FAIL:
      return {
        ...state,
        postLoading: false,
        postErrorMsg: payload,
        editPostSuccess: false,
      };

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        postLoading: false,
        deletePostSuccess: true,
      };

    case DELETE_POST_FAIL:
      return {
        ...state,
        postLoading: false,
        postErrorMsg: payload,
        deletePostFail: false,
      };

    case POST_LOADING:
      return {
        ...state,
        postLoading: true,
      };

    case RESET_POST_LOADING:
      return {
        ...state,
        postLoading: false,
      };

    case RESET_POST_ERROR_MSG:
      return {
        ...state,
        postErrorMsg: "",
      };

    case RESET_CREATE_POST_SUCCESS:
      return {
        ...state,
        createPostSuccess: false,
      };

    case RESET_EDIT_POST_SUCCESS:
      return {
        ...state,
        editPostSuccess: false,
      };

    case RESET_DELETE_POST_SUCCESS:
      return {
        ...state,
        deletePostSuccess: false,
      };

    case SEARCH_POST_SUCCESS:
      return {
        ...state,
        postLoading: false,
        searchPostSuccess: true,
        searchedPost: payload.searchPost.results,
        searchItem: payload.searchItem,
        searchedPostCount: payload.searchPost.count,
      };

    case SEARCH_POST_FAIL:
      return {
        ...state,
        postLoading: false,
        postErrorMsg: payload,
      };

    case CANCEL_SEARCH_SUCCESS:
      return {
        ...state,
        postLoading: false,
        cancelSearchSuccess: true,
        searchedPost: null,
        searchedItem: null,
      };

    case CANCEL_SEARCH_FAIL:
      return {
        ...state,
        postLoading: false,
        postErrorMsg: payload,
      };

    default:
      return state;
  }
};

export default postReducer;
