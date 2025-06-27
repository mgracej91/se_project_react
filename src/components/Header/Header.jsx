import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import React, { useMemo, useState } from "react";
import mobilebtn from "../../assets/hamburger.svg";
//import xIcon from "../../assets/x.svg";
import { coordinates } from "../../utils/constants";

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
      <div>
        <img src={logo} alt="WTWR Logo" className="header__logo" />
        <button
          onClick={toggleMobileMenu}
          type="button"
          className="mobileMenuBtn"
        >
          <img
            src={mobilebtn}
            alt="Mobile menu button"
            className="hambugerBtn"
          />
        </button>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <button
        type="button"
        onClick={handleBtnClick}
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
      <div
        className={`navigation-container ${
          isMobileMenuOpened ? "mobile-open" : ""
        }`}
      >
        <button type="button" className="header__add-clothes-btn">
          + Add clothes
        </button>
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>
      </div>
    </header>
  );
}
export default Header;
