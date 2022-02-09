import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import {addOrder,setCart} from "../../config/Myservices"
export default function Checkout() {
    let navigate = useNavigate()
    const dispatch = useDispatch(); 
    const [selected_address, setselected_address] = useState(null)
    const cardnumberref = useRef(null)
    const cvvref = useRef(null)
    const validityref = useRef(null)
    const [rerender, setrerender] = useState(false)
    const [errorState, seterrorState] = useState({ cardnumber: "", cvv: "", validity: "" });
    const address = useSelector(state => state.address)
    const uid = useSelector(state => state.uid)
    const [total_amount, settotal_amount] = useState(0)
    const [cartProducts, setcartProducts] = useState({})
    useEffect(() => {
        if (localStorage.getItem("cart_products") != undefined) {
            let temp = JSON.parse(localStorage.getItem("cart_products"))
            settotal_amount((Number(temp.amount)*100)/95)
            setcartProducts(temp)
        }
    }, [])
    const handler = (e) => {
        const { name, value } = e.target;
        let errors = errorState;
        switch (name) {
            case 'cardnumber':
                errors.cardnumber = value.length != 16 ? 'invalid card number' : '';
                break;
            case 'cvv':
                errors.cvv = value.length != 3 ? 'Invalid cvv' : '';
                break;
            case 'validity':
                errors.validity = value.length != 5 ? 'Invalid date' : '';
                break;
            default:
                break;
        }
        seterrorState(errors);
        setrerender(!rerender)
    }
    const addresshandler = (e) => {
        const { value } = e.target
        setselected_address(value)
    }
    const validate = (errors) => {
        let valid = true;
        Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
        selected_address == null ? valid = false : valid = true;
        return valid;
    }
    const proceedToBuyFunc = () => {
        if (validate(errorState)) {
            const final_data = cartProducts
            final_data['_address'] = selected_address
            final_data['token'] = localStorage.getItem('token')
            addOrder(final_data).then(res => {
                if (res.data.success) {
                    localStorage.setItem("myCart",JSON.stringify({}))
                    dispatch({type:"CARTCOUNT", payload:0})
                    setCart({email:uid.email, cartData:JSON.stringify({}), token: localStorage.getItem('token') }) 
                    navigate("/order")
                }
                else {
                    alert(res.data.message)
                }
            })
        }
        else {
            alert("check all fields")
        }
    }
    return (
        <div style={{ width: "95%" }} className="m-auto">
            <div className="row">
                <div className="col-md-9 col-sm-12">
                    <h2>Checkout Page</h2><hr />
                    <div style={{ border: "1px solid rgb(226 225 225)", padding: "10px" }}>
                        <p id="deliveryAddress">DELIVERY ADDRESS</p>
                        {address.map(elem =>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value={uid.first_name + ' ' + uid.last_name + ' ' + elem.address + ', ' + elem.city + ', ' + elem.state + ', ' + elem.country + ', ' + elem.pincode} onChange={addresshandler} />
                                <div>
                                    <p>{uid.first_name + ' ' + uid.last_name} <span>Mobile</span> {uid.mobile}</p>
                                    <p>{elem.address + ', ' + elem.city + ', ' + elem.state + ', ' + elem.country + ', ' + elem.pincode}</p>
                                </div>
                            </div>
                        )}
                        <Link className="btn btn-outline-primary" to="/myAccount/address">+Address</Link>
                    </div>
                    <hr />
                    <div style={{ border: "1px solid rgb(226 225 225)", padding: "10px" }}>
                        <p id="paymentOption">PAYMENT OPTION</p>
                        <div className="cardDetails">
                            <div className="row">
                                <div className="col-md-6">
                                    <p style={{ color: "black", marginBottom: "0px" }}> Card Number <span style={{ color: "red" }}>{errorState.cardnumber}</span></p>
                                    <div className="wrap-input100">
                                        <input className="input100" onChange={handler} type="text" name="cardnumber" ref={cardnumberref} placeholder="xxxx-xxxx-xxxx-xxxx" />
                                        <span className="focus-input100"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <p style={{ color: "black", marginBottom: "0px" }}> Cvv <span style={{ color: "red" }}>{errorState.cvv}</span></p>
                                    <div className="wrap-input100">
                                        <input className="input100" onChange={handler} type="text" name="cvv" ref={cvvref} placeholder="xxx" />
                                        <span className="focus-input100"></span>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <p style={{ color: "black", marginBottom: "0px" }}> Validity <span style={{ color: "red" }}>{errorState.validity}</span></p>
                                    <div className="wrap-input100">
                                        <input className="input100" onChange={handler} type="text" name="validity" ref={validityref} placeholder="xx/20xx" />
                                        <span className="focus-input100"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-12">
                    <div style={{ border: "1px solid rgb(204, 204, 204)", padding: "20px" }}>
                        <h3>Cart Details   </h3><br />
                        <p className="reviewP">Subtotal: <pre className="d-inline">             </pre>{(total_amount > 0 ? total_amount : 0).toFixed(2)}</p><hr />
                        <p className="reviewP">GST(5%): <pre className="d-inline">            </pre> {(total_amount > 0 ? (5 * total_amount) / 100 : 0).toFixed(2)} </p><hr />
                        <p className="reviewP orderTotal">Order Total: <pre className="d-inline">        </pre> {(total_amount > 0 ? (95 * total_amount) / 100 : 0).toFixed(2)}</p><br />
                        <button style={{ width: "100%" }} onClick={proceedToBuyFunc} className="btn btn-primary">Place order</button>
                    </div>
                </div>
            </div><br /><br />
        </div>
    )
}