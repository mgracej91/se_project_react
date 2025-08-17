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
  handleUpdateUser,
  defaultItemLikes = {},
}) {
  const currentUser = useContext(CurrentUserContext);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

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
          defaultItemLikes={defaultItemLikes}
        />
      </section>
      {isEditProfileOpen && (
        <EditProfileModal
          currentUser={currentUser}
          isOpen={isEditProfileOpen}
          onClose={() => setIsEditProfileOpen(false)}
          onUpdateUser={(data) => {
            handleUpdateUser(data);
            setIsEditProfileOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default Profile;
