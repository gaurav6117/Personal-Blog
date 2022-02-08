import React, { useState, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import { forgotPassword } from "../../config/Myservices"
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
export default function ForgotPassword() {
    let navigate = useNavigate();
    const [rerender, setrerender] = useState(false)
    const emailRef = useRef(null)
    const [errorState, seterrorState] = useState({ email: "" });
    const handlechange = (e) => {
        const { name, value } = e.target;
        let errors = errorState;
        switch (name) {
            case 'email':
                errors.email = regForEmail.test(value) ? '' : 'Enter a valid Email Address';
                break;
            default:
                break;
        }
        seterrorState(errors);
        setrerender(!rerender)
    }
    const validate = (errors) => {
        let valid = true;
        Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
        return valid;
    }
    const forgotPassFunc = (e) => {
        e.preventDefault();
        const data = { email: emailRef.current.value }
        if (validate(errorState)) {
            forgotPassword(data)
                .then(res => {
                    if (res.data.success) {
                        navigate(`/recoverpassword/${emailRef.current.value}`)
                    }
                    else{
                        alert("Invalid Email Address")
                    }
                });
        }
        else {
            alert("invalid data")
        }
    }
    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <form className="login100-form validate-form">
                        <span className="login100-form-title p-b-43">
                            Forget Password
                        </span>
                        <p className="errorStyling">{errorState.email}</p>
                        <div className="wrap-input100 ">
                            <input className="input100" type="email" ref={emailRef} onChange={handlechange} name="email" placeholder="Email" />
                            <span className="focus-input100"></span>
                        </div>
                        <div className="container-login100-form-btn">
                            <button style={{ marginBottom: "15px" }} onClick={forgotPassFunc} className="login100-form-btn">
                                Proceed
                            </button>
                        </div>
                    </form>
                    <div className="login100-more" style={{ backgroundImage: "url('https://wallpaperaccess.com/full/2076155.jpg')" }}>
                    </div>
                </div>
            </div>
        </div>
    )
}