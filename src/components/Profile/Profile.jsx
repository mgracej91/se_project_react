import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";
import "./Profile.css";

function Profile({ clothingItems }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection clothingItems={clothingItems} />
      </section>
    </div>
  );
}

export default Profile;
