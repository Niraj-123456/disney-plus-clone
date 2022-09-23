import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

import LogoutModal from "./LogoutModal";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { currentUser, setSignOut } from "../features/user/userSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(currentUser);
  const logoutContainerRef = useRef();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // show logout dialog when user icon is clicked
  const handleShowLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };

  // logout the user
  const handleLogOut = (props) => {
    try {
      signOut(auth).then(() => {
        dispatch(setSignOut());
        setShowLogoutModal(false);
        navigate({ pathname: "/login", state: { from: props.location } });
      });
    } catch (err) {
      console.log(err);
    }
  };

  // close the logout dialog when click outside the logout container
  useEffect(() => {
    const handleClickOutsideLogoutContainer = (e) => {
      if (
        showLogoutModal &&
        logoutContainerRef.current &&
        !logoutContainerRef.current.contains(e.target)
      ) {
        setShowLogoutModal(false);
      }
    };
    document.addEventListener("click", handleClickOutsideLogoutContainer, true);

    return () =>
      document.removeEventListener(
        "click",
        handleClickOutsideLogoutContainer,
        true
      );
  }, [showLogoutModal]);

  return (
    <Nav>
      <a href="/">
        <Logo src="/disney-plus-clone/images/logo.svg" alt="Logo" />
      </a>

      {user === null ? (
        <RegisterLoginContainer>
          <Login>
            <Link to="/register">Register</Link>
          </Login>
          <Login>
            <Link to="/login">Login</Link>
          </Login>
        </RegisterLoginContainer>
      ) : (
        <>
          <NavMenu>
            <NavLink to="/home">
              <img src="/disney-plus-clone/images/home-icon.svg" alt="" />
              <span>HOME</span>
            </NavLink>
            <NavLink to="/search">
              <img src="/disney-plus-clone/images/search-icon.svg" alt="" />
              <span>SEARCH</span>
            </NavLink>
            <NavLink to="/watchlist">
              <img src="/disney-plus-clone/images/watchlist-icon.svg" alt="" />
              <span>WATCHLIST</span>
            </NavLink>
            <NavLink to="/originals">
              <img src="/disney-plus-clone/images/original-icon.svg" alt="" />
              <span>ORIGINALS</span>
            </NavLink>
            <NavLink to="/movies">
              <img src="/disney-plus-clone/images/movie-icon.svg" alt="" />
              <span>MOVIES</span>
            </NavLink>
            <NavLink to="/series">
              <img src="/disney-plus-clone/images/series-icon.svg" alt="" />
              <span>SERIES</span>
            </NavLink>
          </NavMenu>

          <LogoutContainer ref={logoutContainerRef}>
            {currentUser?.photoURL ? (
              <UserImg
                src={currentUser?.photoURL}
                onClick={handleShowLogoutModal}
              />
            ) : (
              <FontAwesomeIcon
                icon={faCircleUser}
                style={{
                  fontSize: "33px",
                  cursor: "pointer",
                }}
                onClick={handleShowLogoutModal}
              />
            )}
            {showLogoutModal && <LogoutModal handleLogOut={handleLogOut} />}
          </LogoutContainer>
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

const LogoutContainer = styled.div`
  position: relative;
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
  transition: all 0.2s ease;
  cursor: pointer;

  a {
    color: #fff;
  }

  &:hover {
    background-color: #f9f9f9;
    border-color: transparent;

    a {
      color: #000;
    }
  }
`;

const RegisterLoginContainer = styled.div`
  display: flex;
  flex: 1;
  gap: 10px;
  justify-content: flex-end;
`;
