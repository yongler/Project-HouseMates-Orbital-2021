import axios from 'axios'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ACTIVATE_SUCCESS,
  ACTIVATE_FAIL,
  RESEND_ACTIVATION_EMAIL_FAIL,
  RESEND_ACTIVATION_EMAIL_SUCCESS,
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
} from './types'


// Error messages
// Register
const unableToRegisterErrorMsg = "Unable to register"
const userAldExistsErrorMsg = "User already exists"
const passwordTooWeakErrorMsg = "Password too weak"

// Activate
const unableToActivateErrorMsg = "Unable to activate account"
const expiredActivationTokenErrorMsg = "Expired activation token"

// Resend activation email
const userDoesNotExistResendActivationEmailErrorMsg = "User does not exists or user has already successfully activated account"

// Login
const incorrectPasswordErrorMsg = "Incorrect password"

// Delete account
const unableToDeleteAccountErrorMsg = "Unable to delete account"

// Reset password
const unableToResetPasswordErrorMsg = "Unable to reset passowrd"
const userDoesNotExistResetPasswordErrorMsg = "User does not exist"

// Reset password confirm
const expiredResetPasswordTokenErrorMsg = "Expired reset password token"

// Change password
const changePasswordFailErrorMsg = "Unable to change password"
const incorrectCurrentPasswordErrorMsg = "Incorrect current password"
const newPasswordTooWeakErrorMsg = "New password too weak"


// Async Action Creators
// Register
export const register = (first_name, last_name, email, password, re_password) =>
  async dispatch => {
    dispatch(loading())

    // Request
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify({ first_name, last_name, email, password, re_password })

    // Post request
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config)

      dispatch(registerSuccess())
    } catch (err) {
      if (err.response.data.password) {
        dispatch(registerFail(passwordTooWeakErrorMsg))
      } else if (err.response.data.email) {
        dispatch(registerFail(userAldExistsErrorMsg))
      } else {
        dispatch(registerFail(unableToRegisterErrorMsg))
      }
    }
  }

// Activate
export const activate = (uid, token) =>
  async dispatch => {
    dispatch(loading())

    // Request
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify({ uid, token })

    // Post request
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config)

      dispatch(activateSuccess())
    } catch (err) {
      if (err.response.data.uid || err.response.data.token) {
        dispatch(activateFail(expiredActivationTokenErrorMsg))
      } else {
        dispatch(activateFail(unableToActivateErrorMsg))
      }
    }
  }

// Resend activation email
export const resendActivationEmail = (email) =>
  async dispatch => {
    dispatch(loading())

    // Request
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify({ email })

    // Post request
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/resend_activation/`, body, config)

      dispatch(resendActivationEmailSuccess())
    } catch (err) {
      dispatch(resendActivationEmailFail(userDoesNotExistResendActivationEmailErrorMsg))
    }
  }

// Load user
export const loadUser = () =>
  async dispatch => {
    dispatch(loading())
    
    // Get access token from local storage
    const token = localStorage.getItem('access')

    if (token) {
      // Request
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`,
          'Accept': 'application/json'
        }
      }

      // Get request
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config)

        dispatch(loadUserSuccess(res.data))
      } catch (err) {
        dispatch(loadUserFail())
      }
    } else {
      dispatch(loadUserFail())
    }
  }

// Check authentication
export const checkAuthentication = () =>
  async dispatch => {
    // Get access token from local storage
    const token = localStorage.getItem('access')

    if (token) {
      // Request
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
      const body = JSON.stringify({ token })

      // Post request
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)

        if (res.data.code !== 'token_not_valid') {
          dispatch(checkAuthenticationSuccess())
          dispatch(loadUser())
        } else {
          dispatch(checkAuthenticationFail())
        }
      } catch (err) {
        dispatch(checkAuthenticationFail())
      }
    } else {
      dispatch(checkAuthenticationFail())
    }
  }

// Login
export const login = (email, password) =>
  async dispatch => {
    dispatch(loading())

    // Request
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify({ email, password })

    // Post request
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config)

      dispatch(loginSuccess(res.data))
      dispatch(checkAuthentication())
    } catch (err) {
      dispatch(loginFail(incorrectPasswordErrorMsg))
    }
  }

// Delete account
export const deleteAccount = (current_password) =>
  async dispatch => {
    dispatch(loading())

    // Get access token from local storage
    const token = localStorage.getItem('access')

    // Request
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    }
    const body = JSON.stringify({ current_password })

    // Delete request
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/auth/users/me/`, body, config)

      dispatch(deleteAccountSuccess())
    } catch (err) {
      if (err.response.data.current_password) {
        dispatch(deleteAccountFail(incorrectPasswordErrorMsg))
      } else {
        dispatch(deleteAccountFail(unableToDeleteAccountErrorMsg))
      }
    }
  }

// Reset password
export const resetPassword = (email) =>
  async dispatch => {
    dispatch(loading())

    // Request
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify({ email })

    // Post request
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config)

      dispatch(resetPasswordSuccess())
    } catch (err) {
      if (err.response.data) {
        dispatch(resetPasswordFail(userDoesNotExistResetPasswordErrorMsg))
      } else {
        dispatch(resetPasswordFail(unableToResetPasswordErrorMsg))
      }
    }
  }

// Reset password confirm
export const resetPasswordConfirm = (uid, token, new_password, re_new_password) =>
  async dispatch => {
    dispatch(loading())

    // Request
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify({ uid, token, new_password, re_new_password })

    // Post request
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config)

      dispatch(resetPasswordConfirmSuccess())
    } catch (err) {
      if (err.response.data.uid || err.response.data.token) {
        dispatch(resetPasswordConfirmFail(expiredResetPasswordTokenErrorMsg))
      } else if (err.response.data.new_password) {
        dispatch(resetPasswordFail(newPasswordTooWeakErrorMsg))
      } else {
        dispatch(resetPasswordConfirmFail(unableToResetPasswordErrorMsg))
      }
    }
  }

// Change password
export const changePassword = (current_password, new_password, re_new_password) =>
  async dispatch => {
    dispatch(loading())

    const token = localStorage.getItem('access')

    // Request
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      }
    }
    const body = JSON.stringify({ current_password, new_password, re_new_password })

    // Post request
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/set_password/`, body, config)

      dispatch(changePasswordSuccess())
    } catch (err) {
      if (err.response.data.current_password) {
        dispatch(changePasswordFail(incorrectCurrentPasswordErrorMsg))
      } else if (err.response.data.new_password) {
        dispatch(changePasswordFail(newPasswordTooWeakErrorMsg))
      } else {
        dispatch(changePasswordFail(changePasswordFailErrorMsg))
      }
    }
  }


// Action Creators
export const registerSuccess = () => ({ type: REGISTER_SUCCESS })
export const registerFail = errorMsg => ({
  type: REGISTER_FAIL,
  payload: errorMsg,
})

export const activateSuccess = () => ({ type: ACTIVATE_SUCCESS })
export const activateFail = errorMsg => ({
  type: ACTIVATE_FAIL,
  payload: errorMsg,
})

export const resendActivationEmailSuccess = () => ({ type: RESEND_ACTIVATION_EMAIL_SUCCESS })
export const resendActivationEmailFail = errorMsg => ({
  type: RESEND_ACTIVATION_EMAIL_FAIL,
  payload: errorMsg,
})

export const loadUserSuccess = user => ({
  type: LOAD_USER_SUCCESS,
  payload: user,
})
export const loadUserFail = () => ({ type: LOAD_USER_FAIL })

export const checkAuthenticationSuccess = () => ({ type: CHECK_AUTHENTICATION_SUCCESS })
export const checkAuthenticationFail = () => ({ type: CHECK_AUTHENTICATION_FAIL })

export const loginSuccess = tokens => ({
  type: LOGIN_SUCCESS,
  payload: tokens,
})
export const loginFail = errorMsg => ({
  type: LOGIN_FAIL,
  payload: errorMsg,
})

export const logout = () => ({ type: LOGOUT })

export const deleteAccountSuccess = () => ({ type: DELETE_ACCOUNT_SUCCESS })
export const deleteAccountFail = errorMsg => ({ 
  type: DELETE_ACCOUNT_FAIL,
  payload: errorMsg, 
})

export const resetPasswordSuccess = () => ({ type: RESET_PASSWORD_SUCCESS })
export const resetPasswordFail = errorMsg => ({
  type: RESET_PASSWORD_FAIL,
  payload: errorMsg,
})

export const resetPasswordConfirmSuccess = () => ({ type: RESET_PASSWORD_CONFIRM_SUCCESS })
export const resetPasswordConfirmFail = errorMsg => ({
  type: RESET_PASSWORD_CONFIRM_FAIL,
  payload: errorMsg,
})

export const changePasswordSuccess = () => ({ type: CHANGE_PASSWORD_SUCCESS })
export const changePasswordFail = errorMsg => ({
  type: CHANGE_PASSWORD_FAIL,
  payload: errorMsg,
})

export const loading = () => ({ type: AUTH_LOADING })
export const resetLoading = () => ({ type: RESET_AUTH_LOADING })

export const resetErrorMsg = () => ({ type: RESET_ERORR_MSG })
export const resetChangePasswordSuccess = () => ({ type: RESET_CHANGE_PASSWORD_SUCCESS })