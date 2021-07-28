import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ACTIVATE_SUCCESS,
  ACTIVATE_FAIL,
  RESEND_ACTIVATION_EMAIL_SUCCESS,
  RESEND_ACTIVATION_EMAIL_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  CHECK_AUTHENTICATION_SUCCESS,
  CHECK_AUTHENTICATION_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAIL,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  AUTH_LOADING,
  PROFILE_LOADING,
  RESET_AUTH_LOADING,
  RESET_AUTH_ERROR_MSG,
  RESET_CHANGE_PASSWORD_SUCCESS,
  RESET_EDIT_BIO_SUCCESS,
  RESET_EDIT_FAVOURITES_SUCCESS,
  CHANGE_PROFILE_PIC_SUCCESS,
  CHANGE_PROFILE_PIC_FAIL,
  EDIT_BIO_SUCCESS,
  EDIT_BIO_FAIL,
  EDIT_FAVOURITES_SUCCESS,
  EDIT_FAVOURITES_FAIL,
  SET_PREV_PATH,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_FAIL,
  SET_JUST_REGISTERED_SUCCESS,
  SET_JUST_REGISTERED_FAIL,
  CHANGE_THEME_SUCCESS,
  CHANGE_THEME_FAIL,
} from "./types";

// Initial states
const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: false,
  user: null,
  registrationSuccess: false,
  activationSuccess: false,
  resendActivationEmailSuccess: false,
  deleteAccountSuccess: false,
  resetPasswordSuccess: false,
  resetPasswordConfirmSuccess: false,
  changePasswordSuccess: false,
  editBioSuccess: false,
  editFavouritesSuccess: false,
  authErrorMsg: "",
  authLoading: false,
  profileLoading: false,
  prevPath: "",
};

// Reducer
const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        registrationSuccess: true,
        authLoading: false,
      };

    case REGISTER_FAIL:
      return {
        ...state,
        registrationSuccess: false,
        authErrorMsg: payload,
        authLoading: false,
      };

    case ACTIVATE_SUCCESS:
      return {
        ...state,
        activationSuccess: true,
        authLoading: false,
      };

    case ACTIVATE_FAIL:
      return {
        ...state,
        activationSuccess: false,
        authErrorMsg: payload,
        authLoading: false,
      };

    case RESEND_ACTIVATION_EMAIL_SUCCESS:
      return {
        ...state,
        resendActivationEmailSuccess: true,
        authLoading: false,
      };

    case RESEND_ACTIVATION_EMAIL_FAIL:
      return {
        ...state,
        resendActivationEmailSuccess: false,
        authErrorMsg: payload,
        authLoading: false,
      };

    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        authLoading: false,
      };

    case LOAD_USER_FAIL:
      return {
        ...state,
        user: null,
        authLoading: false,
      };

    case CHECK_AUTHENTICATION_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };

    case CHECK_AUTHENTICATION_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };

    case GOOGLE_AUTH_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("access", payload.access);
      localStorage.setItem("refresh", payload.refresh);
      return {
        ...state,
        access: payload.access,
        refresh: payload.refresh,
        authLoading: false,
      };

    case GOOGLE_AUTH_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        access: null,
        refresh: null,
        authErrorMsg: payload,
        authLoading: false,
      };

    case LOGOUT:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
      };

    case DELETE_ACCOUNT_SUCCESS:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        deleteAccountSuccess: true,
        authLoading: false,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
      };

    case DELETE_ACCOUNT_FAIL:
      return {
        ...state,
        deleteAccountSuccess: false,
        authErrorMsg: payload,
        authLoading: false,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: true,
        authLoading: false,
      };

    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        resetPasswordSuccess: false,
        authErrorMsg: payload,
        authLoading: false,
      };

    case RESET_PASSWORD_CONFIRM_SUCCESS:
      return {
        ...state,
        resetPasswordConfirmSuccess: true,
        authLoading: false,
      };

    case RESET_PASSWORD_CONFIRM_FAIL:
      return {
        ...state,
        resetPasswordConfirmSuccess: false,
        authErrorMsg: payload,
        authLoading: false,
      };

    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordSuccess: true,
        authLoading: false,
      };

    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        changePasswordSuccess: false,
        authErrorMsg: payload,
        authLoading: false,
      };

    case AUTH_LOADING:
      return {
        ...state,
        authLoading: true,
      };

    case RESET_AUTH_LOADING:
      return {
        ...state,
        authLoading: false,
      };

    case RESET_AUTH_ERROR_MSG:
      return {
        ...state,
        authErrorMsg: "",
      };

    case RESET_CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordSuccess: false,
      };

    case PROFILE_LOADING:
      return {
        ...state,
        profileLoading: true,
      };

    case CHANGE_PROFILE_PIC_SUCCESS:
      const updatedUser = { ...state.user };
      updatedUser.profile_pic = payload;

      return {
        ...state,
        profileLoading: false,
        user: updatedUser,
      };

    case CHANGE_PROFILE_PIC_FAIL:
      return {
        ...state,
        profileLoading: false,
        authErrorMsg: payload,
      };

    case EDIT_BIO_SUCCESS:
      return {
        ...state,
        profileLoading: false,
        editBioSuccess: true,
      };

    case EDIT_BIO_FAIL:
      return {
        ...state,
        profileLoading: false,
        authErrorMsg: payload,
        editBioSuccess: false,
      };

    case EDIT_FAVOURITES_SUCCESS:
      return {
        ...state,
        profileLoading: false,
        editFavouritesSuccess: true,
      };

    case EDIT_FAVOURITES_FAIL:
      return {
        ...state,
        profileLoading: false,
        authErrorMsg: payload,
        editFavouritesSuccess: false,
      };

    case RESET_EDIT_BIO_SUCCESS:
      return {
        ...state,
        editBioSuccess: false,
      };

    case RESET_EDIT_FAVOURITES_SUCCESS:
      return {
        ...state,
        editFavouritesSuccess: false,
      };

    case SET_PREV_PATH:
      return {
        ...state,
        prevPath: payload,
      };

    case SET_JUST_REGISTERED_SUCCESS:
      const updatedUser2 = { ...state.user };
      updatedUser2.just_registered = payload;

      return {
        ...state,
        user: updatedUser2,
      };
    
    case CHANGE_THEME_SUCCESS:
      const updatedUser3 = { ...state.user };
      updatedUser3.light_theme = payload;

      return {
        ...state,
        user: updatedUser3,
      };

    case CHANGE_THEME_FAIL:
    case SET_JUST_REGISTERED_FAIL:
    default:
      return state;
  }
};

export default authReducer;
