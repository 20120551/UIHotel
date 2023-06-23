import logo from "assets/img/hotel_logo.png";
import logoSmall from "assets/img/hotel_logo_small.png";
import avatar from "assets/img/logo.png";
function Header() {
  return (
    <div className="header">
      <div className="header-left">
        <a href="/" className="logo">
          <img src={logo} width="50" height="70" alt="logo" />{" "}
        </a>
        <a href="/" className="logo logo-small">
          {" "}
          <img src={logoSmall} alt="Logo" width="30" height="30" />{" "}
        </a>
      </div>
      <div id="toggle_btn">
        {" "}
        <i className="fe fe-text-align-left"></i>{" "}
      </div>
      <ul className="nav user-menu">
        <li className="nav-item dropdown has-arrow">
          <div className="dropdown-toggle nav-link" data-toggle="dropdown">
            {" "}
            <span className="user-img">
              <img
                className="rounded-circle"
                src={avatar}
                width="31"
                alt="Soeng Souy"
              />
            </span>{" "}
          </div>
          <div className="dropdown-menu">
            <div className="user-header">
              <div className="avatar avatar-sm">
                {" "}
                <img
                  src={avatar}
                  alt="User Image"
                  className="avatar-img rounded-circle"
                />{" "}
              </div>
              <div className="user-text">
                <h6>Soeng Souy</h6>
                <p className="text-muted mb-0">Administrator</p>
              </div>
            </div>
            <a className="dropdown-item" href="profile.html">
              My Profile
            </a>
            <a className="dropdown-item" href="settings.html">
              Account Settings
            </a>
            <a className="dropdown-item" href="login.html">
              Logout
            </a>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Header;
