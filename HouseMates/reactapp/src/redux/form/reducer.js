import {
  GET_FORM_SUCCESS,
  GET_FORM_FAIL,
  LOADING,
  RESET_LOADING,
  GET_QUESTIONS_SUCCESS, GET_QUESTIONS_FAIL
} from "./types";

const initialState = {
  loading: false,
  question_list: [],
  errorMsg: "",
};

const formReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        question_list: payload,
      };

    case GET_QUESTIONS_FAIL:
      return {
        ...state,
      };

    case GET_FORM_SUCCESS:
      return {
        ...state,
        loading: false,
        questions: payload,
      };

    case GET_FORM_FAIL:
      return {
        ...state,
        loading: false,
        errorMsg: "payload",
      };

    case LOADING:
      return {
        ...state,
        loading: true,
      };

    case RESET_LOADING:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default formReducer;
