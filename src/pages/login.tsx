import React, { ReactElement, SyntheticEvent, useState } from "react";
import { Auth } from "aws-amplify";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField, Grid, Alert, Snackbar } from "@mui/material";
import { useUser } from "../context/AuthContext";
import { CognitoUser } from "amazon-cognito-identity-js";

import { useRouter } from "next/router";

interface Props {}

interface IFormInput {
  username: string;
  password: string;
}

const Login = ({}: Props): ReactElement => {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loginError, setLoginError] = useState<string>("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { username, password } = data;
    try {
      const amplifyUser = await Auth.signIn(username, password);
      console.log("Signed in a user:", user);
      router.push("/");
    } catch (err) {
      throw err;
    }
  };

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifySelf="center"
        spacing={0.5}
      >
        <Grid item>
          <TextField
            id="userName"
            label="Username"
            type="text"
            error={errors.username ? true : false}
            helperText={errors.username ? errors.username.message : null}
            {...register("username", {
              required: { value: true, message: "Please enter Username" },
              minLength: {
                value: 3,
                message: "Please enter a Username between 3-16 characters",
              },
              maxLength: {
                value: 16,
                message: "Please enter a Username between 3-16 characters",
              },
            })}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            id="password"
            label="Password"
            type="password"
            error={errors.password ? true : false}
            helperText={errors.password ? errors.password.message : null}
            {...register("password", {
              required: {
                value: true,
                message: "Please enter a valid password",
              },
              minLength: {
                value: 8,
                message: "Please enter a password greater than 8 characters",
              },
            })}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" color="error">
          {loginError}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default Login;
