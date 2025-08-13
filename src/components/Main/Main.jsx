import React, { useContext } from "react";

import { defaultClothingItems } from "../../utils/constants.js";
import "../../index.css";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit.jsx";

function Main({ weatherData, onCardClick, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherData.type
  );

  const filteredDefault = defaultClothingItems
    .filter((item) => item.weather === weatherData.type)
    .map((item) => ({
      ...item,
      imageUrl: item.link,
      likes: [],
    }));

  const userItemNames = new Set(filteredItems.map((item) => item.name));
  const uniqueDefaultItems = filteredDefault.filter(
    (item) => !userItemNames.has(item.name)
  );
  const itemsToShow = [...filteredItems, ...uniqueDefaultItems].filter(
    (item) => item.imageUrl && item.imageUrl.trim() !== ""
  );

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
          {itemsToShow.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
