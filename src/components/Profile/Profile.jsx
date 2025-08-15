import { useState } from "react";
import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { updateUserProfile } from "../../utils/api";
import "./Profile.css";

function Profile({
  clothingItems,
  onCardClick,
  onCardLike,
  currentUser,
  setCurrentUser,
  onSignOut,
  onBtnClick,
}) {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  function handleUpdateUser({ name, avatarUrl }) {
    const jwt = localStorage.getItem("jwt");
    updateUserProfile({ name, avatarUrl }, jwt)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setIsEditProfileOpen(false);
      })
      .catch(console.error);
  }

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          onEditProfileClick={() => {
            console.log("Edit profile button clicked");
            setIsEditProfileOpen(true);
          }}
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
