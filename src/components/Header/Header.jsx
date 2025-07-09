import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import React, { useMemo, useState } from "react";
import mobilebtn from "../../assets/hamburger.svg";
import xIcon from "../../assets/x.svg";
import { coordinates } from "../../utils/constants";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleBtnClick, weatherData }) {
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
  return (
    <header className="header">
      <div className="header__container">
        <img src={logo} alt="WTWR Logo" className="header__logo" />

        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div
        className={`header__nav ${
          isMobileMenuOpened ? "header__nav_opened" : ""
        }`}
      >
        <ToggleSwitch />

        <button
          type="button"
          className="header__add-clothes-btn"
          onClick={handleBtnClick}
        >
          + Add clothes
        </button>
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          {avatar ? (
            <img
              src={avatar}
              alt="Terrence Tegegne"
              className="header__avatar"
            />
          ) : (
            <span className="header__avatar header__avatar_none">
              {username?.toUpperCase().charAt(0) || ""}
            </span>
          )}
        </div>
        {isMobileMenuOpened && (
          <button className="header__mobile-close" onClick={toggleMobileMenu} />
        )}
      </div>
      {!isMobileMenuOpened && (
        <button className="header__mobile-menu" onClick={toggleMobileMenu} />
      )}
    </header>
  );
}
export default Header;
