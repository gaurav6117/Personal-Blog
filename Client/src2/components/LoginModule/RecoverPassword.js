import React, { useRef, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { recoverPassword } from "../../config/Myservices"
export default function RecoverPassword() {
    let navigate = useNavigate();
    let params = useParams()
    const [rerender, setrerender] = useState(false)
    const [errorState, seterrorState] = useState({ password: "", otp: "", confirmpassword: "" });
    const otpRef = useRef(null)
    const confirmpasswordRef = useRef(null)
    const passwordRef = useRef(null)
    const handlechange = (e) => {
        const { name, value } = e.target;
        let errors = errorState; 
        switch (name) {
            case 'password':
                errors.password = value.length < 8 ? 'Password must me 8 characters long' : '';
                break;
            case 'confirmpassword':
                errors.confirmpassword = value !== passwordRef.current.value ? 'Confirm Password do not match' : '';
                break;
            case 'otp':
                errors.otp = value.length !== 6 ? 'OTP must be of 6 digits' : '';
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
    const recoverPassFunc = (e) => {
        e.preventDefault();
        const data = { email: params.email, otp: otpRef.current.value, password: passwordRef.current.value, confirmPassword: confirmpasswordRef.current.value }
        if (validate(errorState)) {
            recoverPassword(data)
                .then(res => {
                    if(res.data.success){
                        navigate("/login")
                    }
                    else{
                        alert(res.data.message)
                    }
                });
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
                        <p style={{ color: "red" }}>* Enter OTP send to your registered email address</p>
                        <p style={{ color: "red" }}>{errorState.otp}</p>
                        <div className="wrap-input100 ">
                            <input className="input100" type="number" ref={otpRef} name="otp" placeholder="OTP" onChange={handlechange} />
                            <span className="focus-input100"></span>
                        </div>
                        <p style={{ color: "red" }}>{errorState.password}</p>
                        <div className="wrap-input100 ">
                            <input className="input100" type="password" ref={passwordRef} name="password" onChange={handlechange} placeholder="Password" />
                            <span className="focus-input100"></span>
                        </div>
                        <p style={{ color: "red" }}>{errorState.confirmpassword}</p>
                        <div className="wrap-input100 ">
                            <input className="input100" type="password" ref={confirmpasswordRef} onChange={handlechange} name="confirmpassword" placeholder="Confirm Password" />
                            <span className="focus-input100"></span>
                        </div>
                        <div className="container-login100-form-btn">
                            <button style={{ marginBottom: "15px" }} onClick={recoverPassFunc} className="login100-form-btn">
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