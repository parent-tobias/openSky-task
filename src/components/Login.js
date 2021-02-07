import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import { Container, TextField } from "@material-ui/core";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
// import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    username: "",
    password: "",
    showPassword: false,
    isAuthenticated: false,
    error: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const { username, password, isAuthenticated, error } = values;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === "demo" && password === "demo") {
      setValues({ ...values, isAuthenticated: true });
    } else {
      setValues({ ...values, error: true });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/homepage" />;
  }

  return (
    <Container maxWidth="sm">
      <h2>Sign In To Your Account</h2>

      {error && (
        <Alert
          severity="error"
          onClose={() => {
            setValues({ ...values, error: false });
          }}
        >
          Invalid Credentials! Use 'demo' as username and password
        </Alert>
      )}
      <form
        onSubmit={handleSubmit}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <FormControl
          fullWidth
          className={clsx(classes.margin, classes.textField)}
        >
          <InputLabel htmlFor="outlined-adornment-username">
            Username
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-username"
            value={values.username}
            onChange={handleChange("username")}
          />
        </FormControl>
        <br />
        <FormControl
          fullWidth
          className={clsx(classes.margin, classes.textField)}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disableElevation
        >
          Sign In
        </Button>
      </form>
    </Container>
  );
};

export default Login;
