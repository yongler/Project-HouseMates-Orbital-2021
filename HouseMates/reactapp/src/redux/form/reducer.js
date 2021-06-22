import { ROOMMATE_FORM, HOUSING_FORM, PROFILE_FORM } from '../../globalConstants';
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
<<<<<<< HEAD
      if (payload.formType.toString() === "2") {
=======
      if (payload.formType === ROOMMATE_FORM) {
>>>>>>> 14d7751b217a8a2e8d9c3a4befa85b28a3f57771
        return {
          ...state,
          formLoading: false,
          roommateQuestions: payload.questions,
          roommateCategories: uniqueCategories,
        }
<<<<<<< HEAD
      } else if (payload.formType.toString() === "3") {
=======
      } else if (payload.formType === HOUSING_FORM) {
>>>>>>> 14d7751b217a8a2e8d9c3a4befa85b28a3f57771
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
<<<<<<< HEAD
      if (payload.formType.toString() === "2") {
=======
      if (payload.formType === ROOMMATE_FORM) {
>>>>>>> 14d7751b217a8a2e8d9c3a4befa85b28a3f57771
        return {
          ...state,
          formLoading: false,
          roommateQuestions: [],
          roommateCategories: [],
          formErrorMsg: payload.formErrorMsg,
        }
<<<<<<< HEAD
      } else if (payload.formType.toString() === "3") {
=======
      } else if (payload.formType === HOUSING_FORM) {
>>>>>>> 14d7751b217a8a2e8d9c3a4befa85b28a3f57771
        return {
          ...state,
          formLoading: false,
          housingQuestions: [],
          housingCategories: [],
          formErrorMsg: payload.formErrorMsg,
        }
      } else {
        return {
          ...state,
          formLoading: false,
          profileQuestions: [],
          profileCategories: [],
          formErrorMsg: payload.formErrorMsg,
        }
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
