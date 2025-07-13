import "./ItemCard.css";
import xIcon from "../../assets/x.svg";

function ItemCard({ item, onCardClick, handleCloseClick }) {
  const handleClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
