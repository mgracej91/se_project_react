import avatar from "../../assets/avatar.png";
import "./SideBar.css";

function SideBar({ onEditProfileClick, onLogoutClick, currentUser }) {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img src={avatar} alt="Terrence Tegegne" className="sidebar__avatar" />
        <p className="sidebar__username">Terrence Tegegne</p>
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
