import {
  GET_POST_LIST_SUCCESS,
  GET_POST_LIST_FAIL,
  GET_POST_DETAIL_SUCCESS,
  GET_POST_DETAIL_FAIL,
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
} from './types'

const initialState = {
  postLoading: false,
  posts: [],
  postsType: [],
  post: null,
  postErrorMsg: '',
  createPostSuccess: false,
  editPostSuccess: false,
  deletePostSuccess: false,
}

const postReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_POST_LIST_SUCCESS:
      return {
        ...state,
        postLoading: false,
        posts: payload.posts,
        postsType: payload.formType,
      }

    case GET_POST_LIST_FAIL:
      return {
        ...state,
        postLoading: false,
        postErrorMsg: payload,
      }

    case GET_POST_DETAIL_SUCCESS:
      return {
        ...state,
        postLoading: false,
        post: payload,
      }

    case GET_POST_DETAIL_FAIL:
      return {
        ...state,
        postLoading: false,
        postErrorMsg: payload,
      }

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        postLoading: false,
        createPostSuccess: true,
      }

    case CREATE_POST_FAIL:
      return {
        ...state,
        postLoading: false,
        postErrorMsg: payload,
        createPostSuccess: false,
      }

    case EDIT_POST_SUCCESS:
      return {
        ...state,
        postLoading: false,
        editPostSuccess: true,
      }

    case EDIT_POST_FAIL:
      return {
        ...state,
        postLoading: false,
        postErrorMsg: payload,
        editPostSuccess: false,
      }

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        postLoading: false,
        deletePostSuccess: true,
      }

    case DELETE_POST_FAIL:
      return {
        ...state,
        postLoading: false,
        postErrorMsg: payload,
        deletePostFail: false,
      }

    case POST_LOADING:
      return {
        ...state,
        postLoading: true,
      }

    case RESET_POST_LOADING:
      return {
        ...state,
        postLoading: false,
      }

    case RESET_POST_ERROR_MSG:
      return {
        ...state,
        postErrorMsg: '',
      }

    case RESET_CREATE_POST_SUCCESS:
      return {
        ...state,
        createPostSuccess: false,
      }
      
    case RESET_EDIT_POST_SUCCESS:
      return {
        ...state,
        editPostSuccess: false,
      }

    case RESET_DELETE_POST_SUCCESS:
      return {
        ...state,
        deletePostSuccess: false,
      }

    default:
      return state
  }
}

export default postReducer