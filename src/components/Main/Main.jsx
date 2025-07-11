import React, { useContext } from "react";
import ReactDom from "react-dom/client";

import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard.jsx";
import Footer from "../Footer/Footer.jsx";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit.jsx";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {weatherData.temp[currentTemperatureUnit] +
            "°" +
            currentTemperatureUnit}{" "}
          / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
        <Footer />
      </section>
    </main>
  );
}

export default Main;
