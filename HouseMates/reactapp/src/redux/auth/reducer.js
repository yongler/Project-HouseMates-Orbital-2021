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
  RESET_AUTH_LOADING,
  RESET_AUTH_ERROR_MSG,
  RESET_CHANGE_PASSWORD_SUCCESS,
  CHANGE_PROFILE_PIC_SUCCESS,
  CHANGE_PROFILE_PIC_FAIL
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
  authErrorMsg: "",
  authLoading: false,
};

// Reducer
const authReducer =
  (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          registrationSuccess: true,
          authLoading: false,
        }

      case REGISTER_FAIL:
        return {
          ...state,
          registrationSuccess: false,
          authErrorMsg: payload,
          authLoading: false,
        }

      case ACTIVATE_SUCCESS:
        return {
          ...state,
          activationSuccess: true,
          authLoading: false,
        }

      case ACTIVATE_FAIL:
        return {
          ...state,
          activationSuccess: false,
          authErrorMsg: payload,
          authLoading: false,
        }

      case RESEND_ACTIVATION_EMAIL_SUCCESS:
        return {
          ...state,
          resendActivationEmailSuccess: true,
          authLoading: false,
        }

      case RESEND_ACTIVATION_EMAIL_FAIL:
        return {
          ...state,
          resendActivationEmailSuccess: false,
          authErrorMsg: payload,
          authLoading: false,
        }

      case LOAD_USER_SUCCESS:
        return {
          ...state,
          user: payload,
          authLoading: false,
        }

      case LOAD_USER_FAIL:
        return {
          ...state,
          user: null,
          authLoading: false,
        }

      case CHECK_AUTHENTICATION_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
        }

      case CHECK_AUTHENTICATION_FAIL:
        return {
          ...state,
          isAuthenticated: false,
        }

      case LOGIN_SUCCESS:
        localStorage.setItem('access', payload.access)
        localStorage.setItem('refresh', payload.refresh)
        return {
          ...state,
          access: payload.access,
          refresh: payload.refresh,
          authLoading: false,
        }

      case LOGIN_FAIL:
        return {
          ...state,
          access: null,
          refresh: null,
          authErrorMsg: payload,
          authLoading: false,
        }

      case LOGOUT:
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        return {
          ...state,
          access: null,
          refresh: null,
          isAuthenticated: false,
          user: null,
        }
      
      case DELETE_ACCOUNT_SUCCESS:
        return {
          ...state,
          deleteAccountSuccess: true,
          authLoading: false,
        }

      case DELETE_ACCOUNT_FAIL:
        return {
          ...state,
          deleteAccountSuccess: false,
          authErrorMsg: payload,
          authLoading: false
        }
        
      case RESET_PASSWORD_SUCCESS:
        return {
          ...state,
          resetPasswordSuccess: true,
          authLoading: false,
        }

      case RESET_PASSWORD_FAIL:
        return {
          ...state,
          resetPasswordSuccess: false,
          authErrorMsg: payload,
          authLoading: false,
        }

      case RESET_PASSWORD_CONFIRM_SUCCESS:
        return {
          ...state,
          resetPasswordConfirmSuccess: true,
          authLoading: false,
        }

      case RESET_PASSWORD_CONFIRM_FAIL:
        return {
          ...state,
          resetPasswordConfirmSuccess: false,
          authErrorMsg: payload,
          authLoading: false,
        }

      case CHANGE_PASSWORD_SUCCESS:
        return {
          ...state,
          changePasswordSuccess: true,
          authLoading: false,
        }

      case CHANGE_PASSWORD_FAIL:
        return {
          ...state,
          changePasswordSuccess: false,
          authErrorMsg: payload,
          authLoading: false,
        }

      case AUTH_LOADING:
        return {
          ...state,
          authLoading: true,
        }

      case RESET_AUTH_LOADING:
        return {
          ...state,
          authLoading: false,
        }

      case RESET_AUTH_ERROR_MSG:
        return {
          ...state,
          authErrorMsg: '',
        }

      case RESET_CHANGE_PASSWORD_SUCCESS:
        return {
          ...state,
          changePasswordSuccess: false,
        }

      case CHANGE_PROFILE_PIC_SUCCESS:
        const updatedUser = {...state.user};
        updatedUser.profile_pic = "http://localhost:8000/images/" + payload;

        return {
          ...state, 
          user: updatedUser 
        }

      case CHANGE_PROFILE_PIC_FAIL:
        console.log("change pic fail")
        return {
          ...state,
        }

      default:
        return state
    }
  }

export default authReducer
