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
  RESET_ERORR_MSG,
  RESET_CHANGE_PASSWORD_SUCCESS,
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
  errorMsg: "",
  loading: false,
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
          loading: false,
        }

      case REGISTER_FAIL:
        return {
          ...state,
          registrationSuccess: false,
          errorMsg: payload,
          loading: false,
        }

      case ACTIVATE_SUCCESS:
        return {
          ...state,
          activationSuccess: true,
          loading: false,
        }

      case ACTIVATE_FAIL:
        return {
          ...state,
          activationSuccess: false,
          errorMsg: payload,
          loading: false,
        }

      case RESEND_ACTIVATION_EMAIL_SUCCESS:
        return {
          ...state,
          resendActivationEmailSuccess: true,
          loading: false,
        }

      case RESEND_ACTIVATION_EMAIL_FAIL:
        return {
          ...state,
          resendActivationEmailSuccess: false,
          errorMsg: payload,
          loading: false,
        }

      case LOAD_USER_SUCCESS:
        return {
          ...state,
          user: payload,
          loading: false,
        }

      case LOAD_USER_FAIL:
        return {
          ...state,
          user: null,
          loading: false,
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
          loading: false,
        }

      case LOGIN_FAIL:
        return {
          ...state,
          access: null,
          refresh: null,
          errorMsg: payload,
          loading: false,
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
          access: null,
          refresh: null,
          isAuthenticated: false,
          user: null,
          deleteAccountSuccess: true,
          loading: false,
        }

        case DELETE_ACCOUNT_FAIL:
          return {
            ...state,
            deleteAccountSuccess: false,
            errorMsg: payload,
            loading: false
          }
      case RESET_PASSWORD_SUCCESS:
        return {
          ...state,
          resetPasswordSuccess: true,
          loading: false,
        }

      case RESET_PASSWORD_FAIL:
        return {
          ...state,
          resetPasswordSuccess: false,
          errorMsg: payload,
          loading: false,
        }

      case RESET_PASSWORD_CONFIRM_SUCCESS:
        return {
          ...state,
          resetPasswordConfirmSuccess: true,
          loading: false,
        }

      case RESET_PASSWORD_CONFIRM_FAIL:
        return {
          ...state,
          resetPasswordConfirmSuccess: false,
          errorMsg: payload,
          loading: false,
        }

      case CHANGE_PASSWORD_SUCCESS:
        return {
          ...state,
          changePasswordSuccess: true,
          loading: false,
        }

      case CHANGE_PASSWORD_FAIL:
        return {
          ...state,
          changePasswordSuccess: false,
          errorMsg: payload,
          loading: false,
        }

      case AUTH_LOADING:
        return {
          ...state,
          loading: true,
        }

      case RESET_AUTH_LOADING:
        return {
          ...state,
          loading: false,
        }

      case RESET_ERORR_MSG:
        return {
          ...state,
          errorMsg: '',
        }

      case RESET_CHANGE_PASSWORD_SUCCESS:
        return {
          ...state,
          changePasswordSuccess: false,
        }

      default:
        return state
    }
  }
};

export default authReducer;
