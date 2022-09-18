import React from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import {
  selectUserName,
  selectUserPhoto,
  setSignOut,
} from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const history = useHistory();

  // logout the user
  const logOut = () => {
    try {
      signOut(auth).then(() => {
        dispatch(setSignOut());
        history.push("/login");
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Nav>
      <a href="/">
        <Logo src="/images/logo.svg" alt="Logo" />
      </a>

      {userName === null || userName === "" || userName === undefined ? (
        <LoginContainer>
          <Login>
            <Link to="/login">Login</Link>
          </Login>
        </LoginContainer>
      ) : (
        <>
          <NavMenu>
            <NavLink to="/home">
              <img src="/images/home-icon.svg" alt="" />
              <span>HOME</span>
            </NavLink>
            <NavLink to="/search">
              <img src="/images/search-icon.svg" alt="" />
              <span>SEARCH</span>
            </NavLink>
            <NavLink to="/watchlist">
              <img src="/images/watchlist-icon.svg" alt="" />
              <span>WATCHLIST</span>
            </NavLink>
            <NavLink to="/originals">
              <img src="/images/original-icon.svg" alt="" />
              <span>ORIGINALS</span>
            </NavLink>
            <NavLink to="/movies">
              <img src="/images/movie-icon.svg" alt="" />
              <span>MOVIES</span>
            </NavLink>
            <NavLink to="/series">
              <img src="/images/series-icon.svg" alt="" />
              <span>SERIES</span>
            </NavLink>
          </NavMenu>

          <UserImg src={userPhoto} onClick={logOut} />
        </>
      )}
    </Nav>
  );
}

export default Header;

const Nav = styled.nav`
  height: 70px;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow-x: hidden;
`;

const Logo = styled.img`
  width: 80px;
  margin-right: 25px;
`;

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-right: 25px;
  align-items: center;

  a {
    display: flex;
    color: #fff;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;

    img {
      height: 20px;
      padding-right: 2px;
    }

    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;

      &:after {
        content: "";
        height: 2px;
        background: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      }
    }
    &.active {
    }

    &:hover,
    &.active {
      span:after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
`;

const UserImg = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

const Login = styled.div`
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
  border-radius: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.2s ease 0s;
  cursor: pointer;

  a {
    color: #fff;
  }

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;
