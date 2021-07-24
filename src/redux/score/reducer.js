import {
  CREATE_SCORE_SUCCESS,
  CREATE_SCORE_FAIL,
  EDIT_SCORE_SUCCESS,
  EDIT_SCORE_FAIL,
} from './types'

const initialStates = {
  scoreErrorMsg = "",
}

const scoreReducer = (state = initialStates, action) => {
  const { type, payload } = action

  switch (type) {
    case CREATE_SCORE_SUCCESS:
      return { ...state }

    case CREATE_SCORE_FAIL:
      return {
        ...state,
        scoreErrorMsg: payload,
      }

    case EDIT_SCORE_SUCCESS:
      return { ...state }

    case EDIT_SCORE_FAIL:
      return {
        ...state,
        scoreErrorMsg: payload,
      }

    default:
      return state
  }
}

export default scoreReducer