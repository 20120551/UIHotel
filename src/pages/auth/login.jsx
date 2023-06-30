import { useAuth } from "@hooks/context-hooks";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { auth as authAction } from "@store/actions";
import { authService } from "@services/index";
import { isExpire } from "@utls/ttl";
import { createNotification } from "@utls/notification";

export default function Login() {
    const navigator = useNavigate();
    const [state, dispatch] = useAuth();
    const [auth, setAuth] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
        if (!isExpire(state.accessToken.ttl || 0)) {
            navigator("/hotel");
        }
    }, []);

    const handleLogin = function () {
        authService.login(auth)
            .then(data => {
                dispatch(authAction.login({
                    accessToken: data.token,
                    user: data.user
                }))

                navigator("/hotel");
            })
            .catch(err => {
                const { message = "", code = err.response.data } = err.response?.data;
                createNotification({ type: "error", title: message, message: code });
            })
    }

    return (
        <div className="main-wrapper login-body">
            <div className="login-wrapper">
                <div className="container">
                    <div className="loginbox">
                        <div className="login-left"> <img className="img-fluid" src="/assets/img/hotel_logo3.png" alt="Logo" /> </div>
                        <div className="login-right">
                            <div className="login-right-wrap">
                                <h1>Login</h1>
                                <p className="account-subtitle">Access to our dashboard</p>
                                <div>
                                    <div className="form-group">
                                        <input
                                            onChange={(e) => setAuth(prev => ({ ...prev, username: e.target.value }))}
                                            className="form-control" type="text" placeholder="Email" /> </div>
                                    <div className="form-group">
                                        <input
                                            onChange={(e) => setAuth(prev => ({ ...prev, password: e.target.value }))}
                                            className="form-control" type="password" placeholder="Password" /> </div>
                                    <div className="form-group">
                                        <button
                                            onClick={() => handleLogin()}
                                            className="btn btn-primary btn-block" type="submit">Login</button>
                                    </div>
                                </div>
                                <div className="text-center forgotpass"><Link to="/forgot">Forgot Password?</Link> </div>
                                <div className="login-or"> <span className="or-line"></span> <span className="span-or">or</span> </div>
                                <div className="social-login">
                                    <span>Login with</span>
                                    <Link to="/login" className="facebook"><i className="fab fa-facebook-f"></i></Link>
                                    <Link to="/login" className="google"><i className="fab fa-google"></i></Link> </div>
                                <div className="text-center dont-have">Do you want to book some rooms?
                                    <Link to="/">Booking</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}