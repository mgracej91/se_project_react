import avatar from "../../assets/avatar.png";

function SideBar() {
  return (
    <div className="sidebar__user-container">
      <p className="sidebar__username">Terrence Tegegne</p>
      <img src={avatar} alt="Terrence Tegegne" className="sidebar__avatar" />
    </div>
  );
}

export default SideBar;
