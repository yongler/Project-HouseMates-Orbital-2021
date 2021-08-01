import {
  CREATE_FAVOURITE_SUCCESS,
  CREATE_FAVOURITE_FAIL,
  DELETE_FAVOURITE_SUCCESS,
  DELETE_FAVOURITE_FAIL,
  RESET_CREATE_FAVOURTIE_SUCCESS,
  RESET_DELETE_FAVOURTIE_SUCCESS,
} from "./types";

const initialState = {
  favouriteErrorMsg: "",
  createFavouriteSuccess: false,
  deleteFavouriteSuccess: false,
};

const favouriteReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_FAVOURITE_SUCCESS:
      return {
        ...state,
        createFavouriteSuccess: true,
      };

    case CREATE_FAVOURITE_FAIL:
      return {
        ...state,
        favouriteErrorMsg: payload,
        createFavouriteSuccess: false,
      };

    case DELETE_FAVOURITE_SUCCESS:
      return {
        ...state,
        deleteFavouriteSuccess: true,
      };

    case DELETE_FAVOURITE_FAIL:
      return {
        ...state,
        favouriteErrorMsg: payload,
        deleteFavouriteSuccess: false,
      };

    case RESET_CREATE_FAVOURTIE_SUCCESS:
      return {
        ...state,
        createFavouriteSuccess: false,
      };

    case RESET_DELETE_FAVOURTIE_SUCCESS:
      return {
        ...state,
        deleteFavouriteSuccess: false,
      };

    default:
      return state;
  }
};

export default favouriteReducer;
