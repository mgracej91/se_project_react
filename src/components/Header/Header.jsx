import React, { useMemo, useState, useContext } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./Header.css";
import logo from "../../assets/logo.svg";
import mobilebtn from "../../assets/hamburger.svg";
import xIcon from "../../assets/x.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ onClick, weatherData, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = useMemo(() => {
    return new Date();
  }, []).toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  const avatarPlaceholder =
    currentUser && currentUser.name
      ? currentUser.name.charAt(0).toUpperCase()
      : "";

  return (
    <header className="header">
      <div className="header__container">
        <Link to={"/"}>
          <img src={logo} alt="WTWR Logo" className="header__logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate},{" "}
          {weatherData && weatherData.city ? weatherData.city : ""}
        </p>
      </div>

      <div
        className={`header__nav ${
          isMobileMenuOpened ? "header__nav_opened" : ""
        }`}
      >
        <ToggleSwitch />

        {isLoggedIn && currentUser ? (
          <>
            <button
              type="button"
              className="header__add-clothes-btn"
              onClick={() => onClick("add clothes")}
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__link">
              <div className="header__user-container">
                <p className="header__username">{currentUser.name}</p>
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="header__avatar"
                  />
                ) : (
                  <span className="header__avatar-placeholder">
                    {avatarPlaceholder}
                  </span>
                )}
              </div>
            </Link>
          </>
        ) : (
          <div className="header__auth-buttons">
            <button onClick={() => onClick("login")}>Login</button>
            <button onClick={() => onClick("register")}>Register</button>
          </div>
        )}

        {isMobileMenuOpened && (
          <button
            className="header__mobile-close"
            onClick={toggleMobileMenu}
            aria-label="Close menu"
          >
            <img src={xIcon} alt="Close menu icon" />
          </button>
        )}
      </div>

      {!isMobileMenuOpened && (
        <button
          className="header__mobile-menu"
          onClick={toggleMobileMenu}
          aria-label="Open menu"
        >
          <img src={mobilebtn} alt="Open menu icon" />
        </button>
      )}
    </header>
  );
}
export default Header;
