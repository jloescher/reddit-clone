import React, { ReactElement, SyntheticEvent, useState } from "react";
import { Auth } from "aws-amplify";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField, Grid, Alert, Snackbar } from "@mui/material";
import { useUser } from "../context/AuthContext";
import { CognitoUser } from "amazon-cognito-identity-js";

import { useRouter } from "next/router";

interface Props {}

interface IFormInput {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  code: string;
}

const Signup = ({}: Props): ReactElement => {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [signUpError, setSignUpError] = useState<string>("");
  const [showCode, setShowCode] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const confirmSignUp = async (data: IFormInput) => {
    const { username, password, code } = data;
    try {
      await Auth.confirmSignUp(username, code);
      const amplifyUser = await Auth.signIn(username, password);
      console.log("Success, signed in a user:", amplifyUser);
      if (amplifyUser) {
        router.push("/");
      } else {
        throw new Error("Something went wrong :'(");
      }
    } catch (err) {
      console.error("Error confirming sign up:", err);
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      if (showCode) {
        confirmSignUp(data);
      } else {
        await signUp(data);
        setShowCode(true);
      }
    } catch (err) {
      console.error(err);
      setSignUpError(err.message);
      setOpen(true);
    }
  };

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
  };

  const signUp = async (data: IFormInput): Promise<CognitoUser> => {
    const { username, password, firstName, lastName, email } = data;
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          given_name: firstName,
          family_name: lastName,
          email,
        },
      });
      console.log("Signed up a user:", user);
      return user;
    } catch (err) {
      throw err;
    }
  };

  console.log("The value of the user from the hook is:", user);

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
            id="firstName"
            label="First Name"
            type="text"
            error={errors.firstName ? true : false}
            helperText={errors.firstName ? errors.firstName.message : null}
            {...register("firstName", {
              required: { value: true, message: "Please enter First Name" },
            })}
          />
        </Grid>
        <Grid item>
          <TextField
            id="lastName"
            label="Last Name"
            type="text"
            error={errors.lastName ? true : false}
            helperText={errors.lastName ? errors.lastName.message : null}
            {...register("lastName", {
              required: { value: true, message: "Please enter Last Name" },
            })}
          />
        </Grid>
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
            id="email"
            label="Email"
            type="email"
            error={errors.email ? true : false}
            helperText={errors.email ? errors.email.message : null}
            {...register("email", {
              required: { value: true, message: "Please enter a valid email" },
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
        {showCode && (
          <Grid item>
            <TextField
              variant="outlined"
              id="code"
              label="Verification Code"
              type="text"
              error={errors.code ? true : false}
              helperText={errors.code ? errors.code.message : null}
              {...register("code", {
                required: {
                  value: true,
                  message: "Please enter a valid verification code",
                },
                minLength: {
                  value: 6,
                  message: "Your verification code is 6 characters long.",
                },
                maxLength: {
                  value: 6,
                  message: "Your verification code is 6 characters long.",
                },
              })}
            />
          </Grid>
        )}
        <Grid item>
          <Button variant="contained" type="submit">
            {showCode ? "Confirm Code" : "Sign up"}
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" color="error">
          {signUpError}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default Signup;
