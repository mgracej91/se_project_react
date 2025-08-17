import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
  getItems,
  postItems,
  addCardLike,
  removeCardLike,
  deleteItems,
  updateUserProfile,
} from "../../utils/api.js";
import { login, register, getUserData, checkToken } from "../../utils/auth.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [defaultItemLikes, setDefaultItemLikes] = useState({});

  const handleLogin = ({ email, password }) => {
    login({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          return getUserData(res.token);
        } else {
          throw new Error("Login failed: No token received");
        }
      })
      .then((userData) => {
        setCurrentUser(userData);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
  };

  const handleRegister = ({ name, email, password, avatar }) => {
    register({ name, email, password, avatar })
      .then(() => login({ email, password }))
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        const jwt = localStorage.getItem("jwt");
        return getItems(jwt);
      })
      .then((items) => {
        setClothingItems(items);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Registration error:", err);
      });
  };

  const handleCardLike = ({ id, isLiked, isDefault }) => {
    if (isDefault) {
      setDefaultItemLikes((prev) => ({ ...prev, [id]: !isLiked }));
      return;
    }
    const jwt = localStorage.getItem("jwt");
    if (!isLiked) {
      addCardLike(id, jwt)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => {});
    } else {
      removeCardLike(id, jwt)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => {});
    }
  };

  const handleUpdateUser = ({ name, avatarUrl }) => {
    const jwt = localStorage.getItem("jwt");
    updateUserProfile({ name, avatarUrl }, jwt)
      .then((updatedUser) => {
        setCurrentUser((prev) => ({
          ...prev,
          name: updatedUser.name,
          avatar: updatedUser.avatar,
        }));
      })
      .catch(console.error);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    setClothingItems([]);
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const jwt = localStorage.getItem("jwt");
    postItems({ name, imageUrl, weather }, jwt)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleBtnClick = (modalType) => {
    if (modalType === "login") {
      setIsLoginModalOpen(true);
    } else if (modalType === "register") {
      setIsRegisterModalOpen(true);
    } else if (modalType === "add clothes") {
      setActiveModal("add garment");
    }
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  const deleteItemModal = (card) => {
    const jwt = localStorage.getItem("jwt");
    deleteItems(card, jwt)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== card._id));
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;
    checkToken(jwt)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        return getItems(jwt);
      })
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setCurrentUser({});
        setClothingItems([]);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{
          currentTemperatureUnit,
          handleToggleSwitchChange,
        }}
      >
        <div className="app">
          <Header
            onClick={handleBtnClick}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onCardLike={handleCardLike}
                  isLoggedIn={isLoggedIn}
                  defaultItemLikes={defaultItemLikes}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onBtnClick={handleBtnClick}
                    currentUser={currentUser}
                    isLoggedIn={isLoggedIn}
                    defaultItemLikes={defaultItemLikes}
                    onSignOut={handleSignOut}
                    handleUpdateUser={handleUpdateUser}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          {isLoginModalOpen && (
            <LoginModal
              isOpen={isLoginModalOpen}
              handleCloseClick={() => setIsLoginModalOpen(false)}
              onLoginSubmit={handleLogin}
              onSwitchToRegister={() => {
                setIsLoginModalOpen(false);
                setIsRegisterModalOpen(true);
              }}
            />
          )}
          {isRegisterModalOpen && (
            <RegisterModal
              isOpen={isRegisterModalOpen}
              handleCloseClick={() => setIsRegisterModalOpen(false)}
              onRegisterSubmit={handleRegister}
              onSwitchToLogin={() => {
                setIsRegisterModalOpen(false);
                setIsLoginModalOpen(true);
              }}
            />
          )}
          <AddItemModal
            isOpen={activeModal === "add garment"}
            handleCloseClick={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            handleCloseClick={closeActiveModal}
            onDeleteItem={deleteItemModal}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
          />
          <Footer />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
