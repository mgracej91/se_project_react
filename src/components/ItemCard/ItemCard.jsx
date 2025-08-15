import React, { useContext, useState } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import placeholderImg from "../../assets/Default-Weather.png";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser._id);

  const itemLikeButton = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  function handleLike() {
    if (!currentUser) return;
    onCardLike({ id: item._id, isLiked });
  }

  const [imgSrc, setImgSrc] = useState(item.imageUrl);

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={() => onCardClick(item)}
        className="card__image"
        src={imgSrc}
        alt={item.name}
        onError={() => setImgSrc(placeholderImg)}
      />
      {isLoggedIn && (
        <button
          className={itemLikeButton}
          onClick={handleLike}
          label={isLiked ? "Unlike" : "Like"}
        ></button>
      )}
    </li>
  );
}

export default ItemCard;
