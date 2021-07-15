import axios from "axios";
import {
  GET_ROOM_LIST_SUCCESS,
  GET_ROOM_LIST_FAIL,
  POST_ROOM_LIST_SUCCESS,
  POST_ROOM_LIST_FAIL,
} from "./types";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const getroomListErrorMsg = "Unable to get room list";
const postRoomErrorMsg = "Unable to post room";

export const getRoomList = () => async (dispatch) => {
  // Draft request
  const config = { headers: { "Content-Type": "application/json" } };

  // Get request
  try {
    const res = await axios.get(`/chat/room-list/`, config);

    dispatch(getRoomListSuccess(res.data));
  } catch (err) {
    dispatch(getRoomListFail(getroomListErrorMsg));
  }
};

export const postRoom = (user1, user2, label) => async (dispatch) => {
  // Draft request
  const token = localStorage.getItem("access");

  // Draft request
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  };
  
  const body = JSON.stringify({
    user1,
    user2,
    label,
  });
  // Get request
  try {
    const res = await axios.post(`/chat/room-list/`, body, config);

    dispatch(postRoomSuccess(res.data));
  } catch (err) {
    dispatch(postRoomFail(postRoomErrorMsg));
  }
};

export const getRoomListSuccess = (data) => ({
  type: GET_ROOM_LIST_SUCCESS,
  payload: data,
});
export const getRoomListFail = (err) => ({
  type: GET_ROOM_LIST_FAIL,
  payload: err,
});

export const postRoomSuccess = (data) => ({
  type: POST_ROOM_LIST_SUCCESS,
  payload: data,
});
export const postRoomFail = (err) => ({
  type: POST_ROOM_LIST_FAIL,
  payload: err,
});
