import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { register } from "../redux/auth/actions";

import GoogleButton from "react-google-button";

import axios from "axios";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

// Register consists of title, ((confirmation text), or (first name input, last name input, email input, password input, confirm password input, account input, register button and login link)), from top to bottom.
const Register = ({
  isAuthenticated,
  authLoading,
  registrationSuccess,
  register,
}) => {
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
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [account, setAccount] = useState("tenant");
  const [lastNameError, setLastNameError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [samePasswordError, setSamePasswordError] = useState(false);
  const [accountError, setAccountError] = useState(false);

  // Handlers
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    if (e.target.value === "") {
      setFirstNameError(true);
    } else {
      setFirstNameError(false);
    }
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    if (e.target.value === "") {
      setLastNameError(true);
    } else {
      setLastNameError(false);
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value === "") {
      setPasswordError(true);
      setSamePasswordError(false);
    } else if (confirmPassword && e.target.value !== confirmPassword) {
      setSamePasswordError(true);
      setPasswordError(false);
    } else {
      setPasswordError(false);
      setSamePasswordError(false);
    }
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value === "") {
      setConfirmPasswordError(true);
      setSamePasswordError(false);
    } else if (e.target.value !== password) {
      setSamePasswordError(true);
      setConfirmPasswordError(false);
    } else {
      setConfirmPasswordError(false);
      setSamePasswordError(false);
    }
  };
  // const handleAccountChange = (e) => {
  //   setAccount(e.target.value);
  //   if (e.target.value === "") {
  //     setAccountError(true);
  //   } else {
  //     setAccountError(false);
  //   }
  // };
  const handleSubmit = (e) => {
    e.preventDefault();

    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setSamePasswordError(false);
    setAccountError(false);

    if (firstName === "") {
      setFirstNameError(true);
    }
    if (lastName === "") {
      setLastNameError(true);
    }
    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }
    if (confirmPassword === "") {
      setConfirmPasswordError(true);
    }
    if (confirmPassword !== password) {
      setSamePasswordError(true);
    }
    if (account === "") {
      setAccountError(true);
    }

    if (
      firstName &&
      lastName &&
      email &&
      password &&
      confirmPassword &&
      !samePasswordError &&
      account
    ) {
      register(firstName, lastName, email, password, confirmPassword);
    }

    window.scroll(0, 0);
  };
  const continueWithGoogle = async () => {
    try {
      const res = await axios.get(
        `/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`
      );

      window.location.replace(res.data.authorization_url);
    } catch (err) {}
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        {registrationSuccess ? (
          // Confirmation text
          <div>
            <Typography variant="h6" noWrap style={{ textAlign: "center" }}>
              Thank you for your registration.
            </Typography>
            <Typography variant="h6" noWrap style={{ textAlign: "center" }}>
              Kindly check your email for account verification to complete the
              registration process.
            </Typography>
            <Typography variant="h6" noWrap style={{ textAlign: "center" }}>
              You may close this window.
            </Typography>
          </div>
        ) : (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {/* First name input */}
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="First Name"
                  name="firstName"
                  margin="normal"
                  autoFocus
                  onChange={handleFirstNameChange}
                  error={firstNameError}
                  helperText={firstNameError ? "This is a required field" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* Last name input */}
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  margin="normal"
                  onChange={handleLastNameChange}
                  error={lastNameError}
                  helperText={lastNameError ? "This is a required field" : ""}
                />
              </Grid>
            </Grid>

            {/* Email input */}
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              margin="normal"
              onChange={handleEmailChange}
              error={emailError}
              helperText={emailError ? "This is a required field" : ""}
            />

            {/* Password input */}
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              margin="normal"
              onChange={handlePasswordChange}
              error={passwordError}
              helperText={
                passwordError
                  ? "This is a required field"
                  : "Minimum 8 characters with a mixture of lower and upper case letters, numbers and symbols"
              }
            />

            {/* Confirm password input */}
            <TextField
              variant="outlined"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              margin="normal"
              onChange={handleConfirmPasswordChange}
              error={confirmPasswordError || samePasswordError}
              helperText={
                confirmPasswordError
                  ? "This is a required field"
                  : samePasswordError
                  ? "Password does not match"
                  : ""
              }
            />

            {/* Account input
            <FormControl
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={accountError}
            >
              <InputLabel>Account</InputLabel>
              <Select
                value={account}
                onChange={handleAccountChange}
                label="Account"
              >
                <MenuItem value="tenant">Tenant</MenuItem>
                <MenuItem value="host">Host</MenuItem>
              </Select>
              <FormHelperText>
                {accountError ? "This is a required field" : ""}
              </FormHelperText>
            </FormControl> */}

            {/* Register button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={authLoading}
            >
              Register
            </Button>
            {/* Login link */}
            <Grid container justify="flex-end">
              <Grid item>
                <NavLink to="/login" variant="body2">
                  Already have an account? Login
                </NavLink>
              </Grid>
            </Grid>
            <br />
            {/* <div className={classes.paper}>
              <GoogleButton
                fullWidth
                className="btn btn-danger mt-3"
                onClick={continueWithGoogle}
              >
                Continue With Google
              </GoogleButton>
            </div> */}
          </form>
        )}
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  authLoading: state.auth.authLoading,
  registrationSuccess: state.auth.registrationSuccess,
});

const mapDispatchToProps = {
  register,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
