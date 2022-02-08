import React, { Component } from 'react'
import { addUser } from '../../config/Myservices';
import FileBase64 from 'react-file-base64';
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForMob = RegExp(/^[6-9][0-9]{9}$/)

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: null, email: null, first_name: "", last_name: "", mobile: "", dob: "", gender: "", image: "",
            errors: { email: '', password: '', first_name: "", last_name: "", mobile: "" }
        }
    }
    handler = (event) => {
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'email':
                errors.email = regForEmail.test(value) ? '' : 'Email is not valid';
                break;
            case 'password':
                errors.password = value.length >= 8 ? '' : 'Invalid Password';
                break;
            case 'first_name':
                errors.first_name = value.length >= 3 ? '' : 'Invalid Name';
                break;
            case 'last_name':
                errors.last_name = value.length >= 3 ? '' : 'Invalid Name';
                break;
            case 'mobile':
                errors.mobile = regForMob.test(value) ? '' : 'Mobile should be of 10 digits';
                break;
            default:
                break;
        }
        this.setState({ errors, [name]: value }, () => {
            // console.log(errors)
        })
    }
    validate = (errors) => {
        let valid = true;
        Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
        if (this.state.gender === '') {
            valid = false
        }
        else if (this.state.image === '') {
            valid = false
        }
        return valid;
    }
    registerFunc = (e) => {
        e.preventDefault();
        if (this.validate(this.state.errors)) {
            const data = { first_name: this.state.first_name, last_name: this.state.last_name, mobile: this.state.mobile, email: this.state.email, password: this.state.password, date_of_birth: this.state.dob, gender: this.state.gender, profile_image: this.state.image }
            addUser(data)
                .then(res => {
                    if (res.data.success) {
                        window.location.href = "/login"
                    }
                })
        }
        else {
            alert("Please check form data ")
        }
    }
    render() {
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form className="register100-form">
                            <span className="login100-form-title">
                                Registration Form
                            </span>
                            <p className="errorStyling">{this.state.errors.first_name}</p>
                            <div className="wrap-input100 ">
                                <input className="input100" type="text" name="first_name" onChange={this.handler} placeholder="First Name" />
                                <span className="focus-input100"></span>
                            </div>
                            <p className="errorStyling">{this.state.errors.last_name}</p>
                            <div className="wrap-input100">
                                <input className="input100" type="text" name="last_name" onChange={this.handler} placeholder="Last Name" />
                                <span className="focus-input100"></span>
                            </div>
                            <p className="errorStyling">{this.state.errors.mobile}</p>
                            <div className="wrap-input100 ">
                                <input className="input100" type="number" name="mobile" onChange={this.handler} placeholder="Mobile" />
                                <span className="focus-input100"></span>
                            </div>
                            <div className="wrap-input100">
                                <input className="input100" type="date" placeholder="Date Of Birth" name="dob" onChange={this.handler} />
                                <span className="focus-input100"></span>
                            </div>
                            <p className="errorStyling">{this.state.errors.email}</p>
                            <div className="wrap-input100 ">
                                <input className="input100" type="email" name="email" onChange={this.handler} placeholder="Email" />
                                <span className="focus-input100"></span>
                            </div>
                            <p className="errorStyling">{this.state.errors.password}</p>
                            <div className="wrap-input100">
                                <input className="input100" type="password" name="password" onChange={this.handler} placeholder="Password" />
                                <span className="focus-input100"></span>
                            </div>
                            <div className="wrap-radio100">
                                <div className="row">
                                    <div className="col-sm-6 ">
                                        <input type="radio" onClick={(e) => this.setState({ ...this.state, gender: e.target.value })} name="gender" value="Male" /><label> Male</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="radio" onClick={(e) => this.setState({ ...this.state, gender: e.target.value })} name="gender" value="Female" /><label> Female</label>
                                    </div>
                                </div>
                            </div>
                            <div className="wrap-image100">
                                <FileBase64 className="input100" multiple={false} onDone={(base64) => this.setState({ ...this.state, image: base64 })} />
                                <span className="focus-input100"></span>
                            </div>
                            <div className="container-login100-form-btn">
                                <button style={{ marginBottom: "15px" }} onClick={this.registerFunc} className="login100-form-btn">
                                    Register
                                </button>
                            </div>
                        </form>
                        <div className="login100-more" style={{ backgroundImage: "url('https://wallpaperaccess.com/full/2076155.jpg')" }}>
                        </div>
                    </div>
                </div>
            </div>)
    }
}