import "./ItemModal.css";
import xIcon from "../../assets/x.svg";

function ItemModal({ activeModal, handleCloseClick, card, handleDeleteClick }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content_type_image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          <img src={xIcon} alt="Close" />
        </button>

        <div className="modal__item">
          <img src={card.imageUrl} alt={card.name} className="modal__image" />
          <h2 className="modal__caption">{card.name}</h2>{" "}
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            onClick={() => handleDeleteClick(card)}
            type="button"
            className="modal__delete"
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
