import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header className="header-section">
            <div className="menu-item">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2">
                            <div className="logo">
                                <Link to="/">
                                    <img src="/assets/img/logomain.png" alt="" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-10">
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
                                    <Link to="/login">Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}