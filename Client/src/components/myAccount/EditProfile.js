import React, { useState, useEffect, useRef } from 'react'
import jwt_decode from 'jwt-decode'
import { editProfile } from '../../config/Myservices'
import {useNavigate} from "react-router-dom"
export default function EditProfile() {
    let navigate = useNavigate()
    const [uid, setuid] = useState([])
    const firstRef = useRef(null)
    const lastRef = useRef(null)
    const mobileRef = useRef(null)
    const dobRef = useRef(null)
    const genderRef = useRef(null)
    const emailRef = useRef(null)
    useEffect(() => {
        if (localStorage.getItem("token")) {
            let token = localStorage.getItem("token")
            let decode = jwt_decode(token);
            setuid(decode.uid)
        }
    }, [])
    const EditProfileFunc=()=>{
        const data={email:emailRef.current.value, first_name: firstRef.current.value,last_name:lastRef.current.value, mobile:mobileRef.current.value, gender:genderRef.current.value, dob: dobRef.current.value }
        editProfile(data).then(res=>{
            if(res.data.success){
                navigate('/')
            }
        }) 
    }
    return (
        <div>
            <h3>Profile</h3>
            <hr />
            <div className="row">
                <div className="col-md-4">
                    <p className="profiletitle">First Name</p>
                    <p className="profiletitle">Last Name</p>
                    <p className="profiletitle">Gender</p>
                    <p className="profiletitle">Date Of Birth</p>
                    <p className="profiletitle">Mobile Number</p>
                    <p className="profiletitle">Email</p>
                </div>
                <div className="col-md-8 editInput">
                    <input ref={firstRef} type="text" defaultValue={uid.first_name != undefined ? uid.first_name : ''} className="form-control" />
                    <input ref={lastRef} type="text" defaultValue={uid.last_name != undefined ? uid.last_name : ''} className="form-control" />
                    <input ref={genderRef} type="text" defaultValue={uid.gender != undefined ? uid.gender : ''} className="form-control" />
                    <input ref={dobRef} type="text" defaultValue={uid.date_of_birth != undefined ? uid.date_of_birth : ''} className="form-control" />
                    <input ref={mobileRef} type="text" defaultValue={uid.mobile != undefined ? uid.mobile : ''} className="form-control" />
                    <input ref={emailRef} type="text" disabled defaultValue={uid.email != undefined ? uid.email : ''} className="form-control" />
                </div>
            </div>
            <hr />
            <button onClick={EditProfileFunc} className="btn btn-outline-dark">Save</button>
        </div>
    )
}
