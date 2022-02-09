import React, { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
export default function MyAccount() {
    const [uid, setuid] = useState([])
    useEffect(() => {
        if (localStorage.getItem("token")) {
            let token = localStorage.getItem("token")
            let decode = jwt_decode(token);
            setuid(decode.uid)
        }
    }, [])
    return (
        <>
            <div style={{ width: "90%" }} className="m-auto">
                <h2 className="mt-3">My Account</h2>
                <hr />
                <div className="row">
                    <div className="col-md-3 d-block text-center ">
                        <img src={uid.profile_image!=undefined?uid.profile_image[0].base64:''} alt="profile_picture" height="230px" width="230px" style={{ borderRadius: "50%", margin: "10px" }} />
                        <p style={{ color: "red", textAlign: "center", fontSize: "20px" }}>{uid.first_name != undefined ? uid.first_name + ' ' + uid.last_name : ''}</p>
                        <Link to="/myAccount/order" className="btn btn-outline-primary myacountLink"><i className="fa fa-bars"> </i> Order</Link><br />
                        <Link to="/myAccount/" className="btn btn-outline-primary myacountLink"><i className="fa fa-user"> </i> Profile</Link><br />
                        <Link to="/myAccount/address" className="btn btn-outline-primary myacountLink"><i className="fa fa-address-card-o"> </i> Address</Link><br />
                        <Link to="/myAccount/changePAssword" className="btn btn-outline-primary myacountLink"><i className="fa fa-unlock-alt"> </i> Change Password</Link>
                    </div>
                    <div style={{ border: "1px solid #ded9d9", padding: "20px" }} className="col-md-9 d-block">
                        <Outlet />
                    </div>
                </div>
                <br />
            </div>
        </>
    )
}
