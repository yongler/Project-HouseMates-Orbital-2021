import {
  GET_ROOM_LIST_SUCCESS,
  GET_ROOM_LIST_FAIL,
  CHECK_CHAT_HISTORY_SUCCESS,
  CHECK_CHAT_HISTORY_FAIL,
  GET_ROOM_DETAIL_SUCCESS,
  GET_ROOM_DETAIL_FAIL,
  POST_ROOM_LIST_SUCCESS,
  POST_ROOM_LIST_FAIL,
  SET_CHAT_USER,
  RESET_CHAT_HISTORY,
} from "./types";

const initialState = {
  messages: [],
  roomList: [],
  room: null,
  chatErrorMsg: "",
  chatUser: null,
  chatHistory: null,
};

const chatReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ROOM_LIST_SUCCESS:
      return {
        ...state,
        roomList: payload,
      };

    case GET_ROOM_LIST_FAIL:
      return {
        ...state,
        chatErrorMsg: payload,
      };

    case CHECK_CHAT_HISTORY_SUCCESS:
      return {
        ...state,
        chatHistory: payload,
      };

    case CHECK_CHAT_HISTORY_FAIL:
      return {
        ...state,
        chatErrorMsg: payload,
      };

    case GET_ROOM_DETAIL_SUCCESS:
      return {
        ...state,
        room: payload,
      };

    case GET_ROOM_DETAIL_FAIL:
      return {
        ...state,
        chatErrorMsg: payload,
      };

    case POST_ROOM_LIST_SUCCESS:
      return {
        ...state,
      };

    case POST_ROOM_LIST_FAIL:
      return {
        ...state,
        chatErrorMsg: payload,
      };

    case SET_CHAT_USER:
      return {
        ...state,
        chatUser: payload,
      }

    case RESET_CHAT_HISTORY:
      return {
        ...state,
        chatHistory: null,
      }

    default:
      return state;
  }
};

export default chatReducer;
