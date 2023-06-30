import { useAuth } from "@hooks/context-hooks";
import { isExpire } from "@utls/ttl";
import { Link } from "react-router-dom"

export default function Header() {
    const [auth, _] = useAuth();
    return (
        <header className="header-section">
            <div className="menu-item">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 d-flex align-items-center justify-content-end">
                            <div className="logo">
                                <Link to="/">
                                    <img src="/assets/img/myRoomee.png" className="w-50"  alt="" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-10  d-flex align-items-center justify-content-end">
                            <div className="nav-menu">
                                <nav className="mainmenu">
                                    <ul>
                                        <li className="active"><Link to="/">Home</Link></li>
                                        <li><Link to="/">Rooms</Link></li>
                                        <li><Link to="/">About Us</Link></li>
                                        <li><Link to="/">News</Link></li>
                                        <li><Link to="/">Contact</Link></li>
                                    </ul>
                                </nav>
                                <div className="nav-right search-switch float-right">
                                    <Link to="/login">
                                        {isExpire(auth.accessToken?.ttl || 0) ? "login" : "Go to hotel"}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}