import React, { useEffect } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth, provider } from "../firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";

import { selectUserName, setUserLogin } from "../features/user/userSlice";
import InputField from "./common/InputField";
import Button from "./common/Button";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  // get the current user
  const user = useSelector(selectUserName);

  // sign in the user with google provider
  const signIn = () => {
    try {
      signInWithPopup(auth, provider).then((result) => {
        let user = result.user;
        dispatch(
          setUserLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
        history.push("/home");
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // track the user state change
    try {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          dispatch(
            setUserLogin({
              name: user.displayName,
              email: user.email,
              photo: user.photoURL,
            })
          );
          history.push("/home");
        }
      });
      return () => {
        unsubscribe();
      };
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, history]);

  useEffect(() => {
    if (user) history.push("/home");
  }, [user, history]);

  return (
    user === null ||
    user === "" ||
    (user === undefined && (
      <Container>
        <LoginContainer>
          <InputField label="Email" id="email" placeholder="Enter your email" />
          <InputField
            label="Password"
            type="password"
            id="password"
            placeholder="Enter your password"
          />
          <Button label="Login" style={{ marginTop: "15px" }} />
        </LoginContainer>
        <Button label="Login with Google" onClick={signIn} />
      </Container>
    ))
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

const LoginContainer = styled.div`
  background: rgba(9, 11, 19, 0.8);
  border-radius: 4px;
  width: 35%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
