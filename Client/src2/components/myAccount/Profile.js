import React, { useState,useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom'
export default function Profile() {
    const [uid, setuid] = useState([])
    useEffect(() => {
        if (localStorage.getItem("token")) {
            let token = localStorage.getItem("token")
            let decode = jwt_decode(token);
            setuid(decode.uid)
        }
    }, [])
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
                <div className="col-md-8">
                    <p className="profileValue">{uid.first_name!=undefined?uid.first_name:''}</p>
                    <p className="profileValue">{uid.last_name!=undefined?uid.last_name:''}</p>
                    <p className="profileValue">{uid.gender!=undefined?uid.gender:''}</p>
                    <p className="profileValue">{uid.date_of_birth!=undefined?uid.date_of_birth:''}</p>
                    <p className="profileValue">+91-{uid.mobile!=undefined?uid.mobile:''}</p>
                    <p className="profileValue">{uid.email!=undefined?uid.email:''}</p>
                </div>
            </div>
            <hr />
            <Link to="/myAccount/editprofile" className="btn btn-outline-dark">Edit</Link>
        </div>
    )
}
