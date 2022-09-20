import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth, provider } from "../firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { toast } from "react-toastify";

import { currentUser, setUserLogin } from "../features/user/userSlice";
import InputField from "./common/InputField";
import Button from "./common/Button";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  // get the current user
  const user = useSelector(currentUser);

  useEffect(() => {
    // track the user state change
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUserLogin(user));
        history.push("/home");
      }
    });
    return () => unsubscribe();
  }, [dispatch, history]);

  // sign in the user with google provider
  const signIn = () => {
    try {
      signInWithPopup(auth, provider).then((result) => {
        let user = result.user;
        dispatch(setUserLogin(user));
        history.push("/home");
      });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  // sign in with email and password
  const logInWithEmailAndPassword = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUserLogin(user));
      history.push("/home");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  // if user exist, redirect to home
  useEffect(() => {
    if (user) history.push("/home");
  }, [user, history]);

  return (
    (user === null || user === "" || user === undefined) && (
      <Container>
        <LoginContainer onSubmit={logInWithEmailAndPassword}>
          <InputField
            label="Email"
            id="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Password"
            type="password"
            id="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button label="Login" type="submit" style={{ marginTop: "15px" }} />
          <p style={{ textAlign: "center" }}>Don't have an account?</p>
          <Button
            label="Register"
            type="button"
            onClick={() => history.push("/register")}
            style={{ background: "#fff", color: "#000", fontWeight: "600" }}
          />
        </LoginContainer>
        <Button
          label="Login with Google"
          type="button"
          icon={
            <FontAwesomeIcon
              icon={faGoogle}
              style={{ fontSize: "16px", marginLeft: "5px" }}
            />
          }
          onClick={signIn}
        />
      </Container>
    )
  );
}

export default Login;

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;

  &:before {
    width: 100%;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("/images/login-background.jpg");
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    opacity: 0.7;
    z-index: -1;
  }
`;

const LoginContainer = styled.form`
  background: rgba(9, 11, 19, 0.8);
  border-radius: 4px;
  width: 35%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
