import axios from "axios";

import { GET_QUESTIONS_SUCCESS, GET_QUESTIONS_FAIL } from "./types";

export const getQuestions = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/form/question-list/`,
        config
      );
      dispatch({
        type: GET_QUESTIONS_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_QUESTIONS_FAIL,
      });
    }
  } else {
    dispatch({
      type: GET_QUESTIONS_FAIL,
    });
  }
};
