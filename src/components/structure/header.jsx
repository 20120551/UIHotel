import { useAuth } from "@hooks/context-hooks";
import { authService } from "@services/index";
import { auth } from "@store/actions";
import { createNotification } from "@utls/notification";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [state, dispatch] = useAuth();

  const navigator = useNavigate();
  const handleLogout = function () {
    dispatch(auth.logout());
    navigator("/login");
  };

  useEffect(() => {
    authService.profile()
      .then(data => dispatch(auth.profile({ user: data })))
      .catch(err => {
        const { message = "", code = err.response?.data } = err.response?.data;
        createNotification({ type: "error", title: message, message: code });
      });
  }, []);

  return (
    <div className="header">
      <div className="header-left">
        <Link href="/hotel" className="logo">
          <img src={`/assets/img/${state.role}.png`} width="50" height="70"
            alt="logo" /> <span className="logoclassName">HOTEL</span> </Link>
        <Link href="/hotel" className="logo logo-small"> <img src={`/assets/img/${state.role}.png`} alt="Logo" width="30"
          height="30" /> </Link>
      </div>
      <a id="toggle_btn"> <i className="fe fe-text-align-left"></i> </a>
      <a className="mobile_btn" id="mobile_btn"> <i className="fas fa-bars"></i> </a>
      <ul className="nav user-menu">
        <li className="nav-item dropdown has-arrow">
          <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown"> <span className="user-img"><img
            className="rounded-circle" src={`/assets/img/${state.role}.png`} width="31"
            alt="Soeng Souy" /></span> </a>
          <div className="dropdown-menu">
            <div className="user-header">
              <div className="avatar avatar-sm"> <img src={`/assets/img/${state.role}.png`} alt="User Image"
                className="avatar-img rounded-circle" /> </div>
              <div className="user-text">
                <h6>{state?.user?.fullName}</h6>
                <p className="text-muted mb-0">{state.role}</p>
              </div>
            </div>
            <Link className="dropdown-item" to={`profile`}>My Profile</Link>
            <div
              onClick={handleLogout}
              className="dropdown-item"
              href="">Logout</div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Header;
