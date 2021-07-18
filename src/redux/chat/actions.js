import axios from "axios";
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

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";



// Error messages
const getRoomListErrorMsg = "Unable to load rooms";
const checkChatHistoryErrorMsg = "Unable to check chat history";
const getRoomDetailErrorMsg = "Unable to load room";
const postRoomErrorMsg = "Unable to post room";



// Async action creators
export const getRoomList = (user1) =>
  async (dispatch) => {
    // Draft request
    const config = { headers: { "Content-Type": "application/json" } };

    // Get request
    try {
      const res = await axios.get(`/chat/room-list/?user1=${user1}`, config);
      dispatch(getRoomListSuccess(res.data));
    } catch (err) {
      dispatch(getRoomListFail(getRoomListErrorMsg));
    }
  };

export const checkChatHistory = (user1, user2) =>
  async (dispatch) => {
    // Draft request
    const config = { headers: { "Content-Type": "application/json" } };

    // Get request
    try {
      const res = await axios.get(`/chat/room-list/?user1=${user1}&user2=${user2}`, config);
      dispatch(checkChatHistorySuccess(res.data));
    } catch (err) {
      dispatch(checkChatHistoryFail(checkChatHistoryErrorMsg));
    }
  };

export const getRoomDetail = (id) =>
  async (dispatch) => {
    // Draft request
    const config = { headers: { "Content-Type": "application/json" } };

    // Get request
    try {
      const res = await axios.get(`/chat/room-list/?id=${id}`, config);
      dispatch(getRoomDetailSuccess(res.data));
    } catch (err) {
      dispatch(getRoomDetailFail(getRoomDetailErrorMsg));
    }
  };

export const postRoom = (user1, user2, label) =>
  async (dispatch) => {
    // Draft request
    const token = localStorage.getItem("access");

    // Draft request
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`,
      },
    };

    const body = JSON.stringify({ user1, user2, label });
    // Get request
    try {
      const res = await axios.post(`/chat/room-list/`, body, config);
      dispatch(postRoomSuccess(res.data));
    } catch (err) {
      dispatch(postRoomFail(postRoomErrorMsg));
    }
  };



// Action creators
export const getRoomListSuccess = (data) => ({
  type: GET_ROOM_LIST_SUCCESS,
  payload: data,
});
export const getRoomListFail = (err) => ({
  type: GET_ROOM_LIST_FAIL,
  payload: err,
});

export const checkChatHistorySuccess = (data) => ({
  type: CHECK_CHAT_HISTORY_SUCCESS,
  payload: data,
});
export const checkChatHistoryFail = (err) => ({
  type: CHECK_CHAT_HISTORY_FAIL,
  payload: err,
});

export const getRoomDetailSuccess = (data) => ({
  type: GET_ROOM_DETAIL_SUCCESS,
  payload: data,
});
export const getRoomDetailFail = (err) => ({
  type: GET_ROOM_DETAIL_FAIL,
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

export const setChatUser = (chatUser) => ({
  type: SET_CHAT_USER,
  payload: chatUser,
})

export const resetChatHistory = () => ({ type: RESET_CHAT_HISTORY })