import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { reset_password_confirm } from "../actions/auth";

// ResetPasswordConfirm consists of new password input, confirm new password input and reset password button, from top to bottom.
const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
  // Styling
  const useStyles = makeStyles((theme) => ({
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  // Hooks
  const classes = useStyles();

  // States
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(false);
  const [samePasswordError, setSamePasswordError] = useState(false);

  const [requestSent, setRequestSent] = useState(false);

  // Handlers
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    if (e.target.value === "") {
      setNewPasswordError(true);
    } else {
      setNewPasswordError(false);
    }
  };
  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
    if (e.target.value === "") {
      setConfirmNewPasswordError(true);
      setSamePasswordError(false);
    } else if (e.target.value !== newPassword) {
      setSamePasswordError(true);
      setConfirmNewPasswordError(false);
    } else {
      setConfirmNewPasswordError(false);
      setSamePasswordError(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setNewPasswordError(false);
    setConfirmNewPasswordError(false);
    setSamePasswordError(false);

    if (newPassword === "") {
      setNewPasswordError(true);
    }
    if (confirmNewPassword === "") {
      setConfirmNewPasswordError(true);
    }
    if (confirmNewPassword !== newPassword) {
      setSamePasswordError(true);
    }

    if (newPassword && confirmNewPassword && !samePasswordError) {
      const uid = match.params.uid;
      const token = match.params.token;
      reset_password_confirm(uid, token, newPassword, confirmNewPassword);
      setRequestSent(true);
    }
  };

  if (requestSent) {
    return <Redirect to="/login" />;
  }

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        {/* Title */}
        <Typography variant="h6" gutterBottom>
          Reset Password
        </Typography>

        <form noValidate onSubmit={handleSubmit}>
          {/* New password input */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="New Password"
            name="newPassword"
            type="password"
            autoFocus
            onChange={handleNewPasswordChange}
            error={newPasswordError}
            helperText={newPasswordError ? "This is a required field" : ""}
          />

          {/* Confirm new password input */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confim New Password"
            name="confirmNewPassword"
            type="password"
            onChange={handleConfirmNewPasswordChange}
            error={confirmNewPasswordError || samePasswordError}
            helperText={
              confirmNewPasswordError
                ? "This is a required field"
                : samePasswordError
                ? "Password does not match"
                : ""
            }
          />

          {/* Reset password button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Reset Password
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
