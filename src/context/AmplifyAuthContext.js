// Import create data context helper
import createDataContext from "context/createDataContext";
// import aws
import { Auth } from "aws-amplify";
// use history for redirects
import { useHistory } from "react-router-dom";

// Initial state of the context
const initialState = {
  user: null, // user data
  userConfirmed: null, // whether the user has been confirmed in DB
  userEmail: null, // the user's email address
  userSub: null, // user ID
  message: "", // a message to display for the user
  errorMessage: "", // an error message to display for the user
};

// ADD HISTORY.PUSH() HANDLERS

// Reducer tells the context how to interpret payloads
const authReducer = (state, action) => {
  switch (action.type) {
    case "refresh_user":
      return {
        ...state,
        user: action.payload,
        errorMessage: "",
      };
    case "signup":
      return {
        ...state,
        user: action.payload.user,
        userConfirmed: action.payload.userConfirmed,
        userSub: action.payload.userSub,
        message: "Please check your email for a confirmation code.",
        errorMessage: "",
      };
    case "confirm_signup":
      return { ...state, message: "", userConfirmed: action.payload };
    case "signin":
      return { ...state, user: action.payload, message: "", errorMessage: "" };
    case "resend_confirmation_code":
      return {
        ...state,
        message: "A new confirmation code has been sent to your email.",
      };
    case "forgot_password":
      return {
        ...state,
        userEmail: action.payload,
        message:
          "An email has been sent to your email with a code to reset your password.",
      };
    case "forgot_password_submit":
      return {
        ...state,
        message: "Your password has been reset successfully.",
      };
    case "change_password":
      return {
        ...state,
        message: "Your password has been changed successfully.",
      };
    case "signout":
      return initialState;
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

// Action functions to manipulate this context

// get current user from Auth (if not in state)
const refreshUser = (dispatch) => async ({ callback }) => {
  try {
    const response = await Auth.currentAuthenticatedUser();
    dispatch({
      type: "refresh_user",
      payload: response.data,
    });
    console.log(response.data);
    callback();
  } catch (error) {
    console.error("Error fetching current user:", error);
    dispatch({
      type: "add_error",
      payload: "Error fetching current user",
    });
  }
};

// signup function
const signup = (dispatch) => async ({ email, password, callback }) => {
  try {
    // Using email as username - email only authentication
    const username = email;
    // Sign up with AWS Cognito
    const response = await Auth.signUp({
      username,
      password,
      attributes: {
        email,
        // other attributes optional here
      },
    });
    dispatch({
      type: "signup",
      payload: response.data,
    });
    // Do any functionality here
    console.log(response.data);
    callback();
  } catch (error) {
    console.error("Error signing up:", error);
    dispatch({
      type: "add_error",
      payload: "Error signing up",
    });
  }
};

// signup confirm with emailed code
const confirmSignUp = (dispatch) => async ({ email, code, callback }) => {
  try {
    // send confirmation code to AWS
    const response = await Auth.confirmSignUp(email, code);
    dispatch({
      type: "confirm_signup",
      payload: response.data,
    });
    console.log(response.data);
    callback();
  } catch (error) {
    console.log("Error confirming sign up:", error);
    dispatch({
      type: "add_error",
      payload: "Error confirming sign up",
    });
  }
};

// signin function
const signin = (dispatch) => async ({ email, password, callback }) => {
  try {
    const user = await Auth.signIn(email, password);
    dispatch({
      type: "signin",
      payload: user,
    });
    console.log(user);
    callback();
  } catch (error) {
    console.log("Error signing in:", error);
    dispatch({
      type: "add_error",
      payload: "Error signing in",
    });
  }
};

// resend confirmation code
const resendConfirmCode = (dispatch) => async ({ email, callback }) => {
  try {
    // send confirmation code to AWS
    const response = await Auth.resendConfirmationCode(email);
    dispatch({
      type: "resend_confirmation_code",
    });
    console.log(response.data);
    callback();
  } catch (error) {
    console.log("Error resending confirmation code:", error);
    dispatch({
      type: "add_error",
      payload: "Error resending confirmation code",
    });
  }
};

// initiate forgot password request
const forgotPassword = (dispatch) => async ({ email, callback }) => {
  try {
    // send confirmation code to AWS
    const response = await Auth.forgotPassword(email);
    dispatch({
      type: "forgot_password",
      payload: email,
    });
    console.log(response.data);
    callback();
  } catch (error) {
    console.log("Error sending password reset email:", error);
    dispatch({
      type: "add_error",
      payload: "Error sending password reset email",
    });
  }
};

// enter a code to reset password
const forgotPasswordSubmit = (dispatch) => async ({
  email,
  code,
  password,
  callback,
}) => {
  try {
    const response = await Auth.forgotPassword(email, code, password);
    dispatch({
      type: "forgot_password_submit",
    });
    console.log(response.data);
    callback();
  } catch (error) {
    console.log("Error resetting password:", error);
    dispatch({
      type: "add_error",
      payload: "Error resetting password",
    });
  }
};

// change password
const changePassword = (dispatch) => async ({
  user,
  oldPassword,
  newPassword,
  callback,
}) => {
  try {
    const response = await Auth.changePassword(user, oldPassword, newPassword);
    dispatch({
      type: "change_password",
    });
    console.log(response.data);
    callback();
  } catch (error) {
    console.log("Error changing user password:", error);
    dispatch({
      type: "add_error",
      payload: "Error changing user password",
    });
  }
};

// signout function
const signout = (dispatch) => async ({ callback }) => {
  try {
    await Auth.signOut();
    dispatch({ type: "signout" });
    callback();
  } catch (error) {
    console.log("Error signing out:", error);
    dispatch({
      type: "add_error",
      payload: "Error signing out",
    });
  }
};

// create our data context
export const { Provider, Context } = createDataContext(
  authReducer,
  {
    refreshUser,
    signup,
    confirmSignUp,
    signin,
    resendConfirmCode,
    forgotPassword,
    forgotPasswordSubmit,
    changePassword,
    signout,
  },
  initialState
);
