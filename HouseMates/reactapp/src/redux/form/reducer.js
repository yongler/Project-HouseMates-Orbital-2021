import {
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAIL,
  FORM_LOADING,
  RESET_FORM_LOADING,
  RESET_FORM_ERROR_MSG,
} from './types'

const initialState = {
  formLoading: false,
  roommateQuestions: [],
  roommateCategories: [],
  housingQuestions: [],
  housingCategories: [],
  profileQuestions: [],
  profileCategories: [],
  formErrorMsg: '',
}

const formReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_QUESTIONS_SUCCESS:
      const rawCategories = payload.questions.map(question => question.category)
      const uniqueCategories = [...new Set(rawCategories)]
      uniqueCategories.push("Confirmation")
      if (payload.formType.toString() === "7") {
        return {
          ...state,
          formLoading: false,
          roommateQuestions: payload.questions,
          roommateCategories: uniqueCategories,
        }
      } else if (payload.formType.toString() === "8") {
        return {
          ...state,
          formLoading: false,
          housingQuestions: payload.questions,
          housingCategories: uniqueCategories,
        }
      } else {
        return {
          ...state,
          formLoading: false,
          profileQuestions: payload.questions,
          profileCategories: uniqueCategories,
        }
      }

    case GET_QUESTIONS_FAIL:
      switch (payload.formType) {
        case 7:
          return {
            ...state,
            formLoading: false,
            roommateQuestions: [],
            roommateCategories: [],
          }

        case 8:
          return {
            ...state,
            formLoading: false,
            housingQuestions: [],
            housingCategories: [],
          }

        case 9:
          return {
            ...state,
            formLoading: false,
            profileQuestions: [],
            profileCategories: [],
          }

        default:
          return state
      }

    case FORM_LOADING:
      return {
        ...state,
        formLoading: true,
      };

    case RESET_FORM_LOADING:
      return {
        ...state,
        formLoading: false,
      };

    case RESET_FORM_ERROR_MSG:
      return {
        ...state,
        formErrorMsg: '',
      };

    default:
      return state;
  }
};

export default formReducer;
