import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import { useState, useEffect } from "react";

function RegisterModal({ handleCloseClick, isOpen, onRegisterSubmit }) {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    onRegisterSubmit({
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: data.avatar,
    });
  };

  useEffect(() => {
    if (isOpen) {
      setData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        avatar: "",
      });
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Register"
      buttonText="Sign Up"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email*{" "}
      </label>
      <input
        type="email"
        className="modal__input"
        id="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={data.email}
        required
      />

      <label htmlFor="password" className="modal__label">
        Password*{" "}
      </label>

      <input
        type="password"
        className="modal__input"
        id="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        value={data.password}
        required
        autoComplete="new-password"
      />

      <label htmlFor="confirmPassword" className="modal__label">
        Confirm Password*{" "}
      </label>

      <input
        type="password"
        className="modal__input"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Confirm Password"
        onChange={handleChange}
        value={data.confirmPassword}
        required
        autoComplete="new-password"
      />

      <label htmlFor="name" className="modal__label">
        Name{" "}
      </label>
      <input
        type="text"
        className="modal__input"
        id="name"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        value={data.name}
        required
      />

      <label htmlFor="avatar" className="modal__label">
        Avatar URL{" "}
      </label>
      <input
        type="url"
        className="modal__input"
        id="avatar"
        name="avatar"
        placeholder="Avatar URL"
        onChange={handleChange}
        value={data.avatar}
        required
      />
    </ModalWithForm>
  );
}

export default RegisterModal;
