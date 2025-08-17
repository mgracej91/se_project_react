import React, { useState, useEffect } from "react";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

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
    <ModalWithForm
      title="Change profile data"
      buttonText="Save"
      isOpen={isOpen}
      handleCloseClick={onClose}
      onSubmit={handleSubmit}
      contentClassName="modal__edit-profile"
    >
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
      <button type="submit" className="modal__submit">
        Save changes
      </button>
    </ModalWithForm>
  );
}

export default EditProfileModal;
