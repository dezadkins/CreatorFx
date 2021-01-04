import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import styled from ".styled-components";
import FormInput from "../FormInput";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/home" />;

  const loginDemo = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      sessionActions.loginUser({
        credential: "demo@user.io",
        password: "password",
      })
    ).catch((res) => {
      if (res.data && res.data.errors) setErrors(res.data.errors);
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.loginUser({ credential, password })).catch(
      (res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      }
    );
  };

  return (
    <form className="login-form">
      <h2>
        Login to{" "}
        <span>
          <img style={{ width: "100px" }} src="/DarkLogo.png" alt="logo" />
        </span>
      </h2>
      {errors.length > 0 && (
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      )}
      <div className="login-form__input-fields">
        <div className="demo-container">
          <div className="demo-button" onClick={loginDemo}>
            Log in as Demo User
          </div>
        </div>
        <div className="demo-divider">
          <strong className="divider-title">OR</strong>
        </div>

        <FormInput
          name="Email or Username"
          required={true}
          type="text"
          value={credential}
          onChange={({ target }) => setCredential(target.value)}
        />
        <FormInput
          name="Password"
          required={true}
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button
        type="submit"
        className="button button--primary"
        onClick={handleSubmit}
      >
        Log In
      </button>
    </form>
  );
}

export default LoginForm;
