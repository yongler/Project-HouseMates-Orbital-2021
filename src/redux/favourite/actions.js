import axios from 'axios'
import {
  CREATE_FAVOURITE_SUCCESS,
  CREATE_FAVOURITE_FAIL,
  DELETE_FAVOURITE_SUCCESS,
  DELETE_FAVOURITE_FAIL,
  RESET_CREATE_FAVOURTIE_SUCCESS,
  RESET_DELETE_FAVOURTIE_SUCCESS,
} from './types'


// Error messages
const createFavouriteFailErrorMsg = "Unable to add favourite"
const deleteFavouriteFailErrorMsg = "Unable to delete favourite"


// Async action creators
export const createFavourite = (owner, temp_post_id) =>
  async dispatch => {
    // Get access token from local storage
    const token = localStorage.getItem("access")

    // Draft request
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`,
      }
    }
    const body = JSON.stringify({ owner, temp_post_id })

    // Post request
    try {
      await axios.post('/form/favourite-list/', body, config)
      dispatch(createFavouriteSuccess())
    } catch (err) {
      dispatch(createFavouriteFail(createFavouriteFailErrorMsg))
    }
  }

export const deleteFavourite = (id) =>
  async dispatch => {
    // Get access token from local storage
    const token = localStorage.getItem("access")

    // Draft request
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`,
      }
    }

    // Post request
    try {
      await axios.delete(`/form/favourite-list/${id}/`, config)
      dispatch(deleteFavouriteSuccess())
    } catch (err) {
      dispatch(deleteFavouriteFail(deleteFavouriteFailErrorMsg))
    }
  }


// Action creators
export const createFavouriteSuccess = () => ({ type: CREATE_FAVOURITE_SUCCESS })
export const createFavouriteFail = (favouriteErrorMsg) => ({
  type: CREATE_FAVOURITE_FAIL,
  payload: favouriteErrorMsg,
})

export const deleteFavouriteSuccess = () => ({ type: DELETE_FAVOURITE_SUCCESS })
export const deleteFavouriteFail = (favouriteErrorMsg) => ({
  type: DELETE_FAVOURITE_FAIL,
  payload: favouriteErrorMsg,
})

export const resetCreateFavouriteSuccess = () => ({ type: RESET_CREATE_FAVOURTIE_SUCCESS })
export const resetDeleteFavouriteSuccess = () => ({ type: RESET_DELETE_FAVOURTIE_SUCCESS })