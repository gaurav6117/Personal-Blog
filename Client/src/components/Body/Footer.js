import React from 'react'
import { Link } from 'react-router-dom'
export default function Footer() {
    return (
        <div className="footerBody">
            <div className="row text-center">
                <div className="col-md-4">
                    <p className="heading">About Company</p>
                    <p>Neostore E-commerece is here at your quick and easy service<br /> for shopping.</p>
                    <p>Contact Information</p>
                    <p>Email: singhgaurav9876@gmail.com</p>
                    <p>Phone: 9340282848</p>
                    <p>Bhopal, India</p>
                </div>
                <div className="col-md-4">
                    <p className="heading">Information</p>
                    <Link to="termsandconditions" style={{textDecoration:"none", color:"white"}}>Terms and Conditions.</Link>
                    <p>Guarantee and Return Policy</p>
                    <p>Contact Us</p>
                    <p>Privacy Policy</p>
                    <p>Locate Us</p>
                </div>
                <div className="col-md-4">
                    <p className="heading">Newsletter</p>
                    <p>signup to get exclusive offer from your favorite brands and to<br />be well up in the news</p>
                    <input type="email" placeholder="Your emial..." /><br />
                    <button className="btn btn-light">Subscribe</button>
                </div>
            </div>
            <p style={{ marginTop: "5px" }} className="text-center">Copyright 2021 NeoStore E-commerce All rights reserved ! Designed by Gaurav Chouhan</p>
        </div>
    )
}
