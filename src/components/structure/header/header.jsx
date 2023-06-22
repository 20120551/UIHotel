import './header.css';
// import './../../../assets/css/style.css'
import icons from '@icon';
import { role } from '@config';
import { ProtectComponent } from '@components/authorization';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks';
import { auth } from '@store/actions';
import { useState } from 'react';

function Header() {
    const [toggle, setToggle] = useState(false);
    const [authState, authDispatch] = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        authDispatch(auth.logout());
        navigate('/login');
    }
    return (
        <header className="header">
            <div className="page home">
                <img src={icons.home} className="icon home-icon" />
                <Link to='/'>Trang chủ</Link>
            </div>
            <div className="page cart">
                <img src={icons.cart} className="icon cart-icon" />
                <Link to='/cart'>Giỏ hàng</Link>
            </div>
            <ProtectComponent allowRoles={[role.OWNER]}>
                <div className="page cart">
                    <img src={icons.home} className="icon cart-icon" />
                    <Link to='/order'>Vé</Link>
                </div>
            </ProtectComponent>
            {authState.accessToken
                ? <ProtectComponent>
                    <div className="user">
                        <div className="user-display" onClick={() => setToggle(!toggle)}>
                            <img src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png" />
                            <p>Trần Vĩnh Phúc</p>
                        </div>
                        {toggle
                            ? <ul className="user-dropdown">
                                <li>
                                    <Link>Thông tin cá nhân</Link>
                                </li>
                                <ProtectComponent allowRoles={[role.OWNER]}>
                                    <li>
                                        <Link>Nhập hàng</Link>
                                    </li>
                                </ProtectComponent>
                                <ProtectComponent allowRoles={[role.STAFF]}>
                                    <li>
                                        <Link>Quản lý món ăn</Link>
                                    </li>
                                    <li>
                                        <Link>Lịch làm việc</Link>
                                    </li>
                                </ProtectComponent>
                                <li>
                                    <Link onClick={handleLogout}>Đăng xuất</Link>
                                </li>
                            </ul>
                            : <></>
                        }
                    </div>
                </ProtectComponent>
                : <div className="login">
                    <Link to='/login'>Đăng nhập</Link>
                </div>
            }
        </header>
    );
}

export default Header;