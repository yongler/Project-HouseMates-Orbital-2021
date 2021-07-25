import {
  GET_SCORE_LIST_SUCCESS,
  GET_SCORE_LIST_FAIL,
  CREATE_SCORE_SUCCESS,
  CREATE_SCORE_FAIL,
  EDIT_SCORE_SUCCESS,
  EDIT_SCORE_FAIL,
  SCORE_LOADING,
  RESET_GET_SCORE_LIST_SUCCESS,
} from './types'

const initialStates = {
  scoreList: [],
  getScoreListSuccess: false,
  scoreErrorMsg: "",
  scoreLoading: false,
}

const scoreReducer = (state = initialStates, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_SCORE_LIST_SUCCESS:
      return { 
        ...state,
        scoreList: payload,
        getScoreListSuccess: true,
        scoreLoading: false,
      }

    case GET_SCORE_LIST_FAIL:
      return {
        ...state,
        scoreList: [],
        getScoreListSuccess: false,
        scoreErrorMsg: payload,
        scoreLoading: false,
      }

    case CREATE_SCORE_SUCCESS:
      return { 
        ...state,
        scoreLoading: false, 
      }

    case CREATE_SCORE_FAIL:
      return {
        ...state,
        scoreErrorMsg: payload,
        scoreLoading: false,
      }

    case EDIT_SCORE_SUCCESS:
      return { 
        ...state,
        scoreLoading: false,
      }

    case EDIT_SCORE_FAIL:
      return {
        ...state,
        scoreErrorMsg: payload,
        scoreLoading: false,
      }

    case SCORE_LOADING:
      return {
        ...state,
        scoreLoading: true,
      }

    case RESET_GET_SCORE_LIST_SUCCESS:
      return {
        ...state,
        getScoreListSuccess: false,
      }

    default:
      return state
  }
}

export default scoreReducer