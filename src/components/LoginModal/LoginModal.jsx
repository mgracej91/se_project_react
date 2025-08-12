import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

function LoginModal({ handleCloseClick, isOpen, onLoginSubmit }) {
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

  return (
    <ModalWithForm
      title="Login"
      buttonText="Log In"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label"></label>
      Email*{" "}
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
    </ModalWithForm>
  );
}

export default LoginModal;
