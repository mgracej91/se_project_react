import "./ModalWithForm.css";
import xIcon from "../../assets/x.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  handleCloseClick,
  isOpen,
  onSubmit,
  contentClassName = "",
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div
        className={`modal__content${
          contentClassName ? ` ${contentClassName}` : ""
        }`}
      >
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          <img src={xIcon} alt="Close" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
