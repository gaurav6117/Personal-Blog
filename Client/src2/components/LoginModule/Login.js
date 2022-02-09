import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { getUser } from '../../config/Myservices';
import SocialButton from "./SocialButton";
export default function Login() {
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const [onsuccess, setonsuccess] = useState()
    const [onfailure, setonfailure] = useState()
    const [toast, settoast] = useState({ class: 'toast', message: '' })
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const callToastFunc = (message) => {
        settoast({ ...toast, class: 'myclass', message: message })
        setTimeout(() => {
            settoast({ ...toast, class: 'toast' })
        }, 2000);
    }
    const loginFunc = (e) => {
        e.preventDefault();
        getUser({ email: emailRef.current.value, password: passwordRef.current.value })
            .then(res => {
                if (res.data.success === true) {
                    localStorage.setItem("token", res.data.token);
                    dispatch({ type: "ISLOGGEDIN" })
                    navigate("/")
                }
                else {
                    callToastFunc(res.data.message)
                }
            })
    }
    const handleSocialLogin = (user) => {
        console.log(user);
        setonsuccess(user)
    };
    const handleSocialLoginFailure = (err) => {
        console.error(err);
        setonfailure(err)
    };
    console.log(onsuccess);
    console.log(onfailure);
    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <form className="login100-form validate-form">
                        <span className="login100-form-title p-b-43">
                            Login to continue
                        </span>
                        <div className="wrap-input100 ">
                            <input className="input100" type="text" ref={emailRef} placeholder="Email" />
                            <span className="focus-input100"></span>
                        </div>
                        <div className="wrap-input100">
                            <input className="input100" type="password" ref={passwordRef} placeholder="Password" />
                            <span className="focus-input100"></span>
                        </div>
                        <div style={{ padding: "3px 0px 32px 0px" }}>
                            <div className="text-right">
                                <Link to="/forgotpassword" className="txt1">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>
                        <div className="container-login100-form-btn">
                            <button style={{ marginBottom: "15px" }} className="login100-form-btn" onClick={loginFunc}>
                                Login
                            </button>
                        </div>
                        <div className="text-center">
                            <span className="txt2">
                                or login in using
                            </span>
                        </div>
                        <div className="row m-auto">
                            <div className="col-md-6 col-sm-12 facebookBtnDiv">
                                <i className="fa fa-facebook fbbtnicon"></i>
                                <SocialButton
                                    provider="facebook"
                                    appId="177290744525925"
                                    className="facebookBtn"
                                    onLoginSuccess={handleSocialLogin}
                                    onLoginFailure={handleSocialLoginFailure}
                                >
                                    Login with Facebook
                                </SocialButton>
                            </div>
                            <div className="col-md-6 col-sm-12 googleBtnDiv">
                                <i className="fa fa-google googlebtnicon"></i>
                                <SocialButton
                                    provider="google"
                                    appId="173488185022-879gol0l1na3nlprsfrjmo4eg1ma5022.apps.googleusercontent.com"
                                    onLoginSuccess={handleSocialLogin}
                                    onLoginFailure={handleSocialLoginFailure}
                                    className="googleBtn"
                                >
                                    Login with Google
                                </SocialButton>
                            </div>
                        </div>
                        <div className="text-center">
                            <span className="txt3">
                                Don't have an account? <Link style={{ fontWeight: "bold", fontSize: "20px", color: "rgb(92 89 89)", textDecoration: "none" }} to="/register">Register here!</Link>
                            </span>
                        </div>
                    </form>
                    <div className="login100-more" style={{ backgroundImage: "url('https://wallpaperaccess.com/full/2076155.jpg')" }}>
                    </div>
                </div>

                <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: "11" }}>
                    <div id="liveToast" className={toast.class} role="alert" aria-live="assertive" aria-atomic="true">
                        <div style={{ backgroundColor: "#e24040", color: "white" }} className="toast-header">
                            {/* <img src="..." className="rounded me-2" alt="..."> */}
                            <strong className="me-auto">Message</strong>
                            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div style={{ backgroundColor: "#e24040", color: 'white' }} className="toast-body">
                            {toast.message}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}