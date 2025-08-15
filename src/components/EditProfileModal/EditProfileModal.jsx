import React, { useState, useEffect } from "react";
import "./EditProfileModal.css";
import SideBar from "../Profile/SideBar";
import xIcon from "../../assets/x.svg";

function EditProfileModal({ isOpen, onClose, currentUser, onUpdateUser }) {
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatarUrl(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name, avatarUrl });
  };
  return (
    <div className={`modal${isOpen ? " modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">Change profile data</h2>
        <button className="modal__close" type="button" onClick={onClose}>
          <img src={xIcon} alt="Close" />
        </button>

        <form onSubmit={handleSubmit} className="modal__form">
          <div className="modal__name">
            <label className="modal__label" htmlFor="editprofile-name">
              Name*
            </label>
            <input
              className="modal__input"
              type="text"
              id="editprofile-name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="modal__avatar">
            <label className="modal__label" htmlFor="editprofile-avatar">
              Avatar*
            </label>
            <input
              className="modal__input"
              type="text"
              id="editprofile-avatar"
              name="avatarUrl"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              required
            />
          </div>
          <button className="modal__save_button" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
