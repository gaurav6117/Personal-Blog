import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { setCart } from '../../config/Myservices';
export default function Navbar() {
    let navigate = useNavigate()
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const cartCount = useSelector(state => state.cartCount)
    const Products = useSelector(state => state.Products)
    const dispatch = useDispatch()
    const logoutFunc = () => {
        dispatch({ type: "ISLOGGEDOUT" })
        if (localStorage.getItem("token") !== undefined) {
            if (localStorage.getItem("myCart") !== undefined) {
                let token = localStorage.getItem("token")
                let decode = jwt_decode(token);
                let temp = localStorage.getItem("myCart")
                setCart({ cartData: temp, token: localStorage.getItem('token'), user_id: decode.uid._id })
            }
        }
        navigate("/")
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" style={{ fontSize: "30px", padding: "0px 10px 0px 10px" }} to="/">My<span style={{ color: "red" }}>Blog</span></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" style={{ fontSize: "20px" }} aria-current="page" to="/">Home</Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <Link to="/search" style={{ fontSize: "19px", width: "200px", marginRight: "10px", textAlign: "left" }} className="btn btn-light"><i style={{ display: "inline", fontSize: "24px", padding: "5px 8px 5px 0px", marginRight: "0px" }} className="fa fa-search icon" ></i>Search</Link>
                            <div style={{ marginLeft: "10px" }} className="dropdown">
                                <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i style={{ fontSize: "29px" }} className="fa fa-user-circle-o"></i>
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    {isLoggedIn ?
                                        <li><Link className="dropdown-item" to="/myAccount">Account</Link></li>
                                        :
                                        <li><Link className="dropdown-item" to="/login">Account</Link></li>
                                    }
                                    <li>{isLoggedIn ? <button className="dropdown-item" onClick={logoutFunc}>Logout</button> : <Link className="dropdown-item" to="/login">Login</Link>}</li>
                                </ul>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
            <br />
        </div>
    )
}