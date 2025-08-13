import avatar from "../../assets/avatar.png";
import "./SideBar.css";

function SideBar({ onEditProfileClick, onLogoutClick, currentUser }) {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img
          src={currentUser.avatar || avatar}
          alt={currentUser.name || "User Avatar"}
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{currentUser.name || "User"}</p>
      </div>
      <div className="sidebar__buttons">
        <button
          className="sidebar__changeData-btn"
          onClick={onEditProfileClick}
        >
          Change profile data
        </button>
        <button className="sidebar__logout-btn" onClick={onLogoutClick}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideBar;
