import axios from "axios";
import S3FileUpload from "react-s3";
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
} from "./types";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

// Error messages
// Register
const unableToRegisterErrorMsg = "Unable to register";
const userAldExistsErrorMsg = "User already exists";
const passwordTooWeakErrorMsg = "Password too weak";

// Activate
const unableToActivateErrorMsg = "Unable to activate account";
const expiredActivationTokenErrorMsg = "Expired activation token";

// Resend activation email
const userDoesNotExistResendActivationEmailErrorMsg =
  "User does not exists or user has already successfully activated account";

// Login
const incorrectPasswordErrorMsg = "Incorrect password";

// Delete account
const unableToDeleteAccountErrorMsg = "Unable to delete account";

// Reset password
const unableToResetPasswordErrorMsg = "Unable to reset passowrd";
const userDoesNotExistResetPasswordErrorMsg = "User does not exist";

// Reset password confirm
const expiredResetPasswordTokenErrorMsg = "Expired reset password token";

// Change password
const changePasswordFailErrorMsg = "Unable to change password";
const incorrectCurrentPasswordErrorMsg = "Incorrect current password";
const newPasswordTooWeakErrorMsg = "New password too weak";

// Change profile pic
const changeProfilePicFailErrorMsg = "Unable to change profile pic";

// Edit bio
const editBioFailErrorMsg = "Unable to edit bio";
const bioCannotBeEmptyErrorMsg = "Bio cannot be empty";

// Edit favourites
const editFavouritesFailErrorMsg = "Unable to edit favourites";

// Async Action Creators
// Register
export const register =
  (first_name, last_name, email, password, re_password) => async (dispatch) => {
    // Loading
    dispatch(authLoading());

    // Draft request
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      first_name,
      last_name,
      email,
      password,
      re_password,
    });

    // Post request
    try {
      await axios.post(`/auth/users/`, body, config);
      dispatch(registerSuccess());
    } catch (err) {
      if (err.response.data.password) {
        dispatch(registerFail(passwordTooWeakErrorMsg));
      } else if (err.response.data.email) {
        dispatch(registerFail(userAldExistsErrorMsg));
      } else {
        dispatch(registerFail(unableToRegisterErrorMsg));
      }
    }
  };

// Activate
export const activate = (uid, token) => async (dispatch) => {
  // Loading
  dispatch(authLoading());

  // Draft request
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ uid, token });

  // Post request
  try {
    await axios.post(`/auth/users/activation/`, body, config);
    dispatch(activateSuccess());
  } catch (err) {
    if (err.response.data.uid || err.response.data.token) {
      dispatch(activateFail(expiredActivationTokenErrorMsg));
    } else {
      dispatch(activateFail(unableToActivateErrorMsg));
    }
  }
};

// Resend activation email
export const resendActivationEmail = (email) => async (dispatch) => {
  // Loading
  dispatch(authLoading());

  // Draft request
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });

  // Post request
  try {
    await axios.post(`/auth/users/resend_activation/`, body, config);
    dispatch(resendActivationEmailSuccess());
  } catch (err) {
    dispatch(
      resendActivationEmailFail(userDoesNotExistResendActivationEmailErrorMsg)
    );
  }
};

// Load user
export const loadUser = () => async (dispatch) => {
  // Loading
  dispatch(authLoading());

  // Get access token from local storage
  const token = localStorage.getItem("access");

  if (token) {
    // Draft request
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
        Accept: "application/json",
      },
    };

    // Get request
    try {
      const res = await axios.get(`/auth/users/me/`, config);
      dispatch(loadUserSuccess(res.data));
    } catch (err) {
      dispatch(loadUserFail());
    }
  } else {
    dispatch(loadUserFail());
  }
};

// Check authentication
export const checkAuthentication = () => async (dispatch) => {
  // Get access token from local storage
  const token = localStorage.getItem("access");

  if (token) {
    // Draft request
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const body = JSON.stringify({ token });

    // Post request
    try {
      const res = await axios.post(`/auth/jwt/verify/`, body, config);
      if (res.data.code !== "token_not_valid") {
        dispatch(checkAuthenticationSuccess());
        dispatch(loadUser());
      } else {
        dispatch(checkAuthenticationFail());
      }
    } catch (err) {
      dispatch(checkAuthenticationFail());
    }
  } else {
    dispatch(checkAuthenticationFail());
  }
};

// Login
export const login = (email, password) => async (dispatch) => {
  // Loading
  dispatch(authLoading());

  // Draft request
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  // Post request
  try {
    const res = await axios.post(`/auth/jwt/create/`, body, config);
    dispatch(loginSuccess(res.data));
    dispatch(checkAuthentication());
  } catch (err) {
    dispatch(loginFail(incorrectPasswordErrorMsg));
  }
};

// Delete account
export const deleteAccount = (current_password) => async (dispatch) => {
  // Loading
  dispatch(authLoading());

  // Get access token from local storage
  const token = localStorage.getItem("access");

  if (token) {
    // Draft request
    const request = {
      data: JSON.stringify({ current_password }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    };

    // Delete request
    try {
      await axios.delete(`/auth/users/me/`, request);
      dispatch(deleteAccountSuccess());
    } catch (err) {
      if (err.response.data.current_password) {
        dispatch(deleteAccountFail(incorrectPasswordErrorMsg));
      } else {
        dispatch(deleteAccountFail(unableToDeleteAccountErrorMsg));
      }
    }
  } else {
    dispatch(deleteAccountFail(unableToDeleteAccountErrorMsg));
  }
};

// Reset password
export const resetPassword = (email) => async (dispatch) => {
  // Loading
  dispatch(authLoading());

  // Draft request
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });

  // Post request
  try {
    await axios.post(`/auth/users/reset_password/`, body, config);
    dispatch(resetPasswordSuccess());
  } catch (err) {
    if (err.response.data) {
      dispatch(resetPasswordFail(userDoesNotExistResetPasswordErrorMsg));
    } else {
      dispatch(resetPasswordFail(unableToResetPasswordErrorMsg));
    }
  }
};

// Reset password confirm
export const resetPasswordConfirm =
  (uid, token, new_password, re_new_password) => async (dispatch) => {
    // Loading
    dispatch(authLoading());

    // Draft request
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    // Post request
    try {
      await axios.post(`/auth/users/reset_password_confirm/`, body, config);
      dispatch(resetPasswordConfirmSuccess());
    } catch (err) {
      if (err.response.data.uid || err.response.data.token) {
        dispatch(resetPasswordConfirmFail(expiredResetPasswordTokenErrorMsg));
      } else if (err.response.data.new_password) {
        dispatch(resetPasswordFail(newPasswordTooWeakErrorMsg));
      } else {
        dispatch(resetPasswordConfirmFail(unableToResetPasswordErrorMsg));
      }
    }
  };

// Change password
export const changePassword =
  (current_password, new_password, re_new_password) => async (dispatch) => {
    // Loading
    dispatch(authLoading());

    // Get access token from local storage
    const token = localStorage.getItem("access");

    // Draft request
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    };
    const body = JSON.stringify({
      current_password,
      new_password,
      re_new_password,
    });

    // Post request
    try {
      await axios.post(`/auth/users/set_password/`, body, config);
      dispatch(changePasswordSuccess());
    } catch (err) {
      if (err.response.data.current_password) {
        dispatch(changePasswordFail(incorrectCurrentPasswordErrorMsg));
      } else if (err.response.data.new_password) {
        dispatch(changePasswordFail(newPasswordTooWeakErrorMsg));
      } else {
        dispatch(changePasswordFail(changePasswordFailErrorMsg));
      }
    }
  };

// Change Profile Picture
export const changeProfilePic =
  (first_name, last_name, id, picture) => async (dispatch) => {
    // Loading
    dispatch(profileLoading());

    // Get access token from local storage
    const token = localStorage.getItem("access");

    const s3config = {
      bucketName: "housematesorbital",
      dirName: "images",
      region: "us-east-2",
      accessKeyId: "AKIA2VQMUMOWCECPYUOU",
      secretAccessKey: "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",
    };

    // Draft request
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    };

    // Patch request
    let body;
    let profile_pic;
    try {
      S3FileUpload.uploadFile(picture, s3config)
        .then((data) => {
          profile_pic = data.location;
          body = JSON.stringify({ first_name, last_name, profile_pic });
        })
        .then(async () => {
          await axios.put(`/accounts/profiles/${id}/`, body, config);
          dispatch(changeProfilePicSuccess(profile_pic));
        });
    } catch (err) {
      dispatch(changeProfilePicFail(changeProfilePicFailErrorMsg));
    }
  };

// Edit bio
export const editBio = (first_name, last_name, id, bio) => async (dispatch) => {
  // Loading
  dispatch(profileLoading());

  // Get access token from local storage
  const token = localStorage.getItem("access");

  // Draft request
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  };
  const body = JSON.stringify({ first_name, last_name, bio });
  console.log(body);

  // Put request
  try {
    await axios.put(`/accounts/profiles/${id}/`, body, config);
    dispatch(editBioSuccess());
  } catch (err) {
    if (err.response.data.bio) {
      dispatch(editBioFail(bioCannotBeEmptyErrorMsg));
    } else {
      dispatch(editBioFail(editBioFailErrorMsg));
    }
  }
};

// Edit favourites
export const editFavourites =
  (first_name, last_name, id, favourites) => async (dispatch) => {
    // Get access token from local storage
    const token = localStorage.getItem("access");

    // Draft request
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    };
    const body = JSON.stringify({ first_name, last_name, favourites });

    // Put request
    try {
      await axios.put(`/accounts/profiles/${id}/`, body, config);
      dispatch(editFavouritesSuccess());
    } catch (err) {
      dispatch(editFavouritesFail(editFavouritesFailErrorMsg));
    }
  };

// Action Creators
export const registerSuccess = () => ({ type: REGISTER_SUCCESS });
export const registerFail = (authErrorMsg) => ({
  type: REGISTER_FAIL,
  payload: authErrorMsg,
});

export const activateSuccess = () => ({ type: ACTIVATE_SUCCESS });
export const activateFail = (authErrorMsg) => ({
  type: ACTIVATE_FAIL,
  payload: authErrorMsg,
});

export const resendActivationEmailSuccess = () => ({
  type: RESEND_ACTIVATION_EMAIL_SUCCESS,
});
export const resendActivationEmailFail = (authErrorMsg) => ({
  type: RESEND_ACTIVATION_EMAIL_FAIL,
  payload: authErrorMsg,
});

export const loadUserSuccess = (user) => ({
  type: LOAD_USER_SUCCESS,
  payload: user,
});
export const loadUserFail = () => ({ type: LOAD_USER_FAIL });

export const checkAuthenticationSuccess = () => ({
  type: CHECK_AUTHENTICATION_SUCCESS,
});
export const checkAuthenticationFail = () => ({
  type: CHECK_AUTHENTICATION_FAIL,
});

export const loginSuccess = (tokens) => ({
  type: LOGIN_SUCCESS,
  payload: tokens,
});
export const loginFail = (authErrorMsg) => ({
  type: LOGIN_FAIL,
  payload: authErrorMsg,
});

export const logout = () => ({ type: LOGOUT });

export const deleteAccountSuccess = () => ({ type: DELETE_ACCOUNT_SUCCESS });
export const deleteAccountFail = (authErrorMsg) => ({
  type: DELETE_ACCOUNT_FAIL,
  payload: authErrorMsg,
});

export const resetPasswordSuccess = () => ({ type: RESET_PASSWORD_SUCCESS });
export const resetPasswordFail = (authErrorMsg) => ({
  type: RESET_PASSWORD_FAIL,
  payload: authErrorMsg,
});

export const resetPasswordConfirmSuccess = () => ({
  type: RESET_PASSWORD_CONFIRM_SUCCESS,
});
export const resetPasswordConfirmFail = (authErrorMsg) => ({
  type: RESET_PASSWORD_CONFIRM_FAIL,
  payload: authErrorMsg,
});

export const changePasswordSuccess = () => ({ type: CHANGE_PASSWORD_SUCCESS });
export const changePasswordFail = (authErrorMsg) => ({
  type: CHANGE_PASSWORD_FAIL,
  payload: authErrorMsg,
});

export const authLoading = () => ({ type: AUTH_LOADING });
export const resetAuthLoading = () => ({ type: RESET_AUTH_LOADING });

export const profileLoading = () => ({ type: PROFILE_LOADING });

export const resetAuthErrorMsg = () => ({ type: RESET_AUTH_ERROR_MSG });

export const resetChangePasswordSuccess = () => ({
  type: RESET_CHANGE_PASSWORD_SUCCESS,
});
export const resetEditBioSuccess = () => ({ type: RESET_EDIT_BIO_SUCCESS });
export const resetEditFavouritesSuccess = () => ({
  type: RESET_EDIT_FAVOURITES_SUCCESS,
});

export const changeProfilePicSuccess = (picture) => ({
  type: CHANGE_PROFILE_PIC_SUCCESS,
  payload: picture,
});
export const changeProfilePicFail = (authErrorMsg) => ({
  type: CHANGE_PROFILE_PIC_FAIL,
  payload: authErrorMsg,
});

export const editBioSuccess = () => ({ type: EDIT_BIO_SUCCESS });
export const editBioFail = (authErrorMsg) => ({
  type: EDIT_BIO_FAIL,
  payload: authErrorMsg,
});

export const editFavouritesSuccess = () => ({ type: EDIT_FAVOURITES_SUCCESS });
export const editFavouritesFail = (authErrorMsg) => ({
  type: EDIT_FAVOURITES_FAIL,
  payload: authErrorMsg,
});

export const setPrevPath = (path) => ({
  type: SET_PREV_PATH,
  payload: path,
});
