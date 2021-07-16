import {
  GET_ROOM_LIST_SUCCESS,
  GET_ROOM_LIST_FAIL,
  POST_ROOM_LIST_SUCCESS,
  POST_ROOM_LIST_FAIL,
} from "./types";

const initialState = {
  messages: [],
  roomList: [],
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
      return { ...state };
    case POST_ROOM_LIST_SUCCESS:
      return {
        ...state,
        roomList: [...state.roomList, payload],
      };
    case POST_ROOM_LIST_FAIL:
      return { ...state };

    default:
      return state;
  }
};

export default chatReducer;
