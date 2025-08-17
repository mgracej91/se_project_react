import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import { useState, useEffect } from "react";

function RegisterModal({
  handleCloseClick,
  isOpen,
  onRegisterSubmit,
  onSwitchToLogin,
}) {
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

  const isValid =
    data.name.trim() !== "" &&
    data.email.trim() !== "" &&
    data.password.trim() !== "" &&
    data.confirmPassword.trim() !== "" &&
    data.avatar.trim() !== "" &&
    data.password === data.confirmPassword &&
    /.+@.+\..+/.test(data.email) &&
    /^https?:\/\/.+/.test(data.avatar);

  return (
    <ModalWithForm
      contentClassName="modal__register"
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSubmit}
    >
      <label htmlFor="register-email" className="modal__label">
        Email*{" "}
      </label>
      <input
        type="email"
        className="modal__input"
        id="register-email"
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

      <label htmlFor="register-name" className="modal__label">
        Name{" "}
      </label>
      <input
        type="text"
        className="modal__input"
        id="register-name"
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
      <div className="modal__button-row">
        <button type="submit" className="modal__submit" disabled={!isValid}>
          Sign Up
        </button>
        <button
          type="button"
          className="modal__secondary-button"
          onClick={onSwitchToLogin}
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
