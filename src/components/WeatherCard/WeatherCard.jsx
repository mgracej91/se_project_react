import sunny from "../../assets/sunny-day.png";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75°F</p>
      <img src={sunny} alt="sunny" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
