import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import { changePassword } from '../../config/Myservices';
import {useNavigate} from 'react-router-dom'
export default function ChangePAssword() {
    let navigate = useNavigate()
    const uid = useSelector(state => state.uid)
    const [rerender, setrerender] = useState(false)
    const [errorState, seterrorState] = useState({ currentpass: "", newpass: "", cnewpass: '' });
    const currentpassRef = useRef(null)
    const newpassRef = useRef(null)
    const cnewpassRef = useRef(null)
    const handler = (e) => {
        const { name, value } = e.target;
        let errors = errorState;
        switch (name) {
            case 'currentpass':
                errors.currentpass = value.length < 8 ? 'Password should be atleast 8 characters long' : '';
                break;
            case 'newpass':
                errors.newpass = value.length < 8 ? 'Password should be atleast 8 characters long' : '';
                break;
            case 'cnewpass':
                errors.cnewpass = value != newpassRef.current.value ? 'confirm password do not match!' : '';
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
    const change_password_func = () => {
        if (validate(errorState)) {
            const cpdata = { email: uid.email, currentpass: currentpassRef.current.value, newpass: newpassRef.current.value }
            changePassword(cpdata).then(res=>{
                if(res.data.success){
                    navigate('/')
                }
            })
        }
    }
    return (
        <div className="text-center ">
            <h3>Change Password</h3><hr />
            <div style={{ width: "50%", display: "inline" }}>
                <p style={{ color: "red" }}>{errorState.currentpass}</p>
                <div className="wrap-input100">
                    <input className="input100" onChange={handler} type="password" name="currentpass" ref={currentpassRef} placeholder="Current Password" />
                    <span className="focus-input100"></span>
                </div>
            </div>
            <div style={{ width: "50%", display: "inline" }}>
                <p style={{ color: "red" }}>{errorState.newpass}</p>
                <div className="wrap-input100">
                    <input className="input100" onChange={handler} type="password" name="newpass" ref={newpassRef} placeholder="New Password" />
                    <span className="focus-input100"></span>
                </div>
            </div>
            <div style={{ width: "50%", display: "inline" }}>
                <p style={{ color: "red" }}>{errorState.cnewpass}</p>
                <div className="wrap-input100">
                    <input className="input100" onChange={handler} type="password" name="cnewpass" ref={cnewpassRef} placeholder="Confirm New Password" />
                    <span className="focus-input100"></span>
                </div>
            </div>
            <button style={{ width: "200px" }} onClick={change_password_func} className="btn btn-primary">Submit</button>
        </div>
    )
}
