import React, { useState, useEffect } from "react";
import styled from "styled-components";

import InputField from "./common/InputField";
import Button from "./common/Button";
import { currentUser, setUserLogin } from "../features/user/userSlice";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const history = useHistory();
  const dispatch = useDispatch();

  // get current user
  const user = useSelector(currentUser);

  // validate password and confirm password
  const validatePassword = () => {
    let isValid = true;
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        isValid = false;
        toast.error("Pssword doesn't match");
      }
    }
    return isValid;
  };

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

  // register using email and password
  const registerUser = async (e) => {
    e.preventDefault();

    if (validatePassword()) {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (user) {
          const { user } = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          dispatch(setUserLogin(user));
          history.push("/home");
        }
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  // if user exists, redirect to home page
  useEffect(() => {
    if (user) history.push("/home");
  }, [user, history]);

  return (
    <Container>
      <LoginContainer onSubmit={registerUser}>
        <InputField
          label="Email"
          id="email"
          type="email"
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
        <InputField
          label="Confirm Password"
          type="password"
          id="confirmpassword"
          placeholder="Enter your confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit" label="Register" style={{ marginTop: "15px" }} />
        <p style={{ textAlign: "center" }}>Already have an account?</p>
        <Button
          label="Login"
          type="button"
          onClick={() => history.push("/login")}
          style={{ background: "#fff", color: "#000", fontWeight: "600" }}
        />
      </LoginContainer>
    </Container>
  );
}

export default Register;

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
