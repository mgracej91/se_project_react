import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

function LoginModal({
  handleCloseClick,
  isOpen,
  onLoginSubmit,
  onSwitchToRegister,
}) {
  const [data, setData] = useState({
    email: "",
    password: "",
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
    onLoginSubmit({
      email: data.email,
      password: data.password,
    });
  };

  useEffect(() => {
    if (isOpen) {
      setData({
        email: "",
        password: "",
      });
    }
  }, [isOpen]);

  const isValid =
    data.email.trim() !== "" &&
    data.password.trim() !== "" &&
    /.+@.+\..+/.test(data.email);

  return (
    <ModalWithForm
      title="Login"
      buttonText="Log In"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSubmit}
      contentClassName="modal__login"
    >
      <label htmlFor="login-email" className="modal__label"></label>
      Email*{" "}
      <input
        type="email"
        className="modal__input"
        id="login-email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={data.email}
        required
      />
      <label htmlFor="password" className="modal__label"></label>
      Password*{" "}
      <input
        type="password"
        className="modal__input"
        id="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        value={data.password}
        required
      />
      <div className="modal__button-row">
        <button type="submit" className="modal__submit" disabled={!isValid}>
          Log In
        </button>
        <button
          type="button"
          className="modal__secondary-button"
          onClick={onSwitchToRegister}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
