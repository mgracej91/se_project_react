import { defaultClothingItems } from "../../utils/constants";
import React, { useContext } from "react";

import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit.jsx";

function Main({
  weatherData,
  onCardClick,
  clothingItems,
  onCardLike,
  isLoggedIn,
  defaultItemLikes = {},
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const allItems = [
    ...clothingItems,
    ...defaultClothingItems.map((item) => ({
      ...item,
      imageUrl: item.link,
      isDefault: true,
    })),
  ];

  const filteredItems = allItems.filter(
    (item) =>
      item.weather === weatherData.type &&
      item.imageUrl &&
      item.imageUrl.trim() !== ""
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
          {filteredItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              isLoggedIn={isLoggedIn}
              isLiked={
                item.isDefault ? !!defaultItemLikes[item._id] : undefined
              }
              isDefault={item.isDefault}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
