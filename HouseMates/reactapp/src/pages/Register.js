import React, { useState } from "react";
import { NavLink, useHistory, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Footer from "../components/Footer";

import { register } from "../actions/auth";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = ({ isAuthenticated, register }) => {
  const classes = useStyles();
  const history = useHistory();

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

  const [accountCreated, setAccountCreated] = useState(false);

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
      history.push("/");
    }

    register(firstName, lastName, email, password, confirmPassword);
    setAccountCreated(true);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  if (accountCreated) {
    return <Redirect to="/login" />;
  }

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
    } else {
      setPasswordError(false);
    }
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value === "" || e.target.value !== password) {
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }
  };
  const handleAccountChange = (e) => {
    setAccount(e.target.value);
    if (e.target.value === "") {
      setAccountError(true);
    } else {
      setAccountError(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <img
          alt="logo"
          src="housemates-logo-with-text-black.svg"
          width="150"
          height="150"
        />
        <Typography component="h1" variant="h6">
          {" "}
          Register{" "}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
          />{" "}
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Last Name"
            name="lastName"
            margin="normal"
            autoFocus
            onChange={handleLastNameChange}
            error={lastNameError}
            helperText={lastNameError ? "This is a required field" : ""}
          />
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
          />{" "}
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
            helperText={passwordError ? "This is a required field" : ""}
          />{" "}
          <TextField
            variant="outlined"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            margin="normal"
            onChange={handleConfirmPasswordChange}
            error={confirmPasswordError}
            helperText={
              confirmPasswordError
                ? "This is a required field"
                : samePasswordError
                ? "Password does not match"
                : ""
            }
          />
          <FormControl
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={accountError}
          >
            <InputLabel> Account </InputLabel>{" "}
            <Select
              value={account}
              onChange={handleAccountChange}
              label="Account"
            >
              <MenuItem value="tenant"> Tenant </MenuItem>{" "}
              <MenuItem value="landlord"> Landlord </MenuItem>{" "}
            </Select>{" "}
            <FormHelperText>
              {" "}
              {accountError ? "This is a required field" : ""}{" "}
            </FormHelperText>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register{" "}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NavLink to="/login" variant="body2">
                Already have an account ? Login{" "}
              </NavLink>{" "}
            </Grid>{" "}
          </Grid>{" "}
        </form>{" "}
      </div>
      <Box mt={8}>
        <Footer />
      </Box>{" "}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  register,
})(Register);
