import axios from "axios";
import fetch from "./csrf";

const LOGIN_USER = "LOGIN_USER";
const SET_USER = "session/setUser";
const REMOVE_USER = "DESTROY_SESSION";

//ACTION CREATORS *************
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

//THUNK ACTION CREATOR *******************
export const loginUser = ({ credential, password }) => async (dispatch) => {
  const res = await fetch("/api/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ credential, password }),
  });

  const { user } = res.data;

  dispatch(setUser(user));

  return {
    type: LOGIN_USER,
    payload: user,
  };
};

export const restoreUser = () => async (dispatch) => {
  const res = await fetch("/api/session");
  dispatch(setUser(res.data.user));
  return res;
};

export const signup = (user) => {
  return async (dispatch) => {
    const { profilePic, username, email, password } = user;
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    return axios
      .post("/api/users/", formData, config)
      .then((res) => {
        const user = res.data;
        return dispatch(setUser(user));
      })
      .catch((err) => {
        return err.response;
      });
  };
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

const sessionReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
