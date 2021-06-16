import {
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAIL,
  FORM_LOADING,
  RESET_FORM_LOADING,
} from './types'

const initialState = {
  loading: false,
  questions: [],
  categories: [],
  errorMsg: '',
}

const formReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_QUESTIONS_SUCCESS:
      const rawCategories = payload.map(question => question.category)
      const uniqueCategories = [...new Set(rawCategories)] 
      return {
        ...state,
        loading: false,
        questions: payload,
        categories: uniqueCategories,
      }

    case GET_QUESTIONS_FAIL:
      return {
        ...state,
        loading: false,
        questions: [],
        categories: [],
        errorMsg: payload,
      }

    case FORM_LOADING:
      return {
        ...state,
        loading: true,
      }

    case RESET_FORM_LOADING:
      return {
        ...state,
        loading: false,
      }

    default:
      return state
  }
}

export default formReducer