import React, { useContext, useState } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import placeholderImg from "../../assets/Default-Weather.png";

function ItemCard({
  item,
  onCardClick,
  onCardLike,
  isLoggedIn,
  isLiked: isLikedProp,
  isDefault,
}) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = isDefault
    ? !!isLikedProp
    : Array.isArray(item.likes) && currentUser
    ? item.likes.some((id) => id === currentUser._id)
    : false;

  const itemLikeButton = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  function handleLike() {
    if (!currentUser) return;
    onCardLike({ id: item._id, isLiked, isDefault });
  }

  const [imgSrc, setImgSrc] = useState(item.imageUrl);

  return (
    <li className="card">
      <div className="card__info">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn && (
          <button
            className={itemLikeButton}
            onClick={handleLike}
            label={isLiked ? "Unlike" : "Like"}
          ></button>
        )}
      </div>
      <img
        onClick={() => onCardClick(item)}
        className="card__image"
        src={imgSrc}
        alt={item.name}
        onError={() => setImgSrc(placeholderImg)}
      />
    </li>
  );
}

export default ItemCard;
