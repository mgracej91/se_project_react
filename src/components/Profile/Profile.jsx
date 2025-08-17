import { useState } from "react";
import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { updateUserProfile } from "../../utils/api";
import "./Profile.css";

import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({
  clothingItems,
  onCardClick,
  onCardLike,
  onSignOut,
  onBtnClick,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  function handleUpdateUser({ name, avatarUrl }) {
    const jwt = localStorage.getItem("jwt");
    updateUserProfile({ name, avatarUrl }, jwt)
      .then(() => {
        setIsEditProfileOpen(false);
      })
      .catch(console.error);
  }

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          onEditProfileClick={() => setIsEditProfileOpen(true)}
          onLogoutClick={onSignOut}
          currentUser={currentUser}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onBtnClick={onBtnClick}
          currentUser={currentUser}
          isLoggedIn={isLoggedIn}
        />
      </section>
      {isEditProfileOpen && (
        <EditProfileModal
          currentUser={currentUser}
          isOpen={isEditProfileOpen}
          onClose={() => setIsEditProfileOpen(false)}
          onUpdateUser={handleUpdateUser}
        />
      )}
    </div>
  );
}

export default Profile;
