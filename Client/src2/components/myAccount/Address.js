import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import { setAddress } from '../../config/Myservices';
export default function Address() {
    const address = useSelector(state => state.address)
    const uid = useSelector(state => state.uid)
    const [rerender, setrerender] = useState(false)
    const addressRef = useRef(null)
    const [errorState, seterrorState] = useState({ address: "", city: "", pincode: "", state: "", country: "" });
    const pincodeRef = useRef(null)
    const cityRef = useRef(null)
    const stateRef = useRef(null)
    const countryRef = useRef(null)
    const submitAddressFunc = () => {
        if (validate(errorState)) {
            if (uid.email != undefined) {
                let arr = address;
                const data = { address: addressRef.current.value, pincode: pincodeRef.current.value, city: cityRef.current.value, state: stateRef.current.value, country: countryRef.current.value }
                arr.push(data)
                setAddress({ user_id: uid._id, token:localStorage.getItem("token") ,addressArr: JSON.stringify(arr) })
                setrerender(!rerender)
            }
        }
    }
    const cancelAddressFunc = () => {
        alert("cancelled")
    }
    const handler = (e) => {
        const { name, value } = e.target;
        let errors = errorState;
        switch (name) {
            case 'address':
                errors.address = value.length < 10 ? 'Enter detailed Address' : '';
                break;
            case 'pincode':
                errors.pincode = value.length != 6 ? 'Invalid Pincode' : '';
                break;
            case 'city':
                errors.city = value.length < 3 ? 'Invalid field' : '';
                break;
            case 'state':
                errors.state = value.length < 3 ? 'Invalid field' : '';
                break;
            case 'country':
                errors.country = value.length < 3 ? 'Invalid field' : '';
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
    const deleteAddressFunc=(id)=>{
        let temp_arr = address;
        temp_arr.splice(id,1)
        setAddress({ email: uid.email, addressArr: JSON.stringify(temp_arr) }).then(res => {
            if (res.data.success) {
                alert("done")
            }
        })
        setrerender(!rerender)
    }
    return (
        <div>
            <h3>Add new address</h3><hr />
            <div className="addressForm">
                <div className="row">
                    <div className="col-md-6">
                        <p style={{ color: "red" }}>{errorState.address}</p>
                        <div className="wrap-input100">
                            <input className="input100" onChange={handler} type="text" name="address" ref={addressRef} placeholder="Address" />
                            <span className="focus-input100"></span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <p style={{ color: "red" }}>{errorState.pincode}</p>
                        <div className="wrap-input100">
                            <input className="input100" onChange={handler} type="text" name="pincode" ref={pincodeRef} placeholder="Pincode" />
                            <span className="focus-input100"></span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <p style={{ color: "red" }}>{errorState.city}</p>
                        <div className="wrap-input100">
                            <input className="input100" onChange={handler} type="text" name="city" ref={cityRef} placeholder="City" />
                            <span className="focus-input100"></span>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <p style={{ color: "red" }}>{errorState.state}</p>
                        <div className="wrap-input100">
                            <input className="input100" onChange={handler} type="text" name="state" ref={stateRef} placeholder="state" />
                            <span className="focus-input100"></span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <p style={{ color: "red" }}>{errorState.country}</p>
                        <div className="wrap-input100">
                            <input className="input100" onChange={handler} type="text" name="country" ref={countryRef} placeholder="Country" />
                            <span className="focus-input100"></span>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="addressFormBtn">
                <button onClick={submitAddressFunc} className="btn btn-outline-dark addressFormBtns">Save</button>
                <button onClick={cancelAddressFunc} className="btn btn-outline-dark addressFormBtns">Cancel</button>
            </div>
            <div style={{ padding: "20px", marginTop: "20px", border: "1px solid #ded9d9" }} className="savedAddressDiv">
                <h3>Saved address</h3><hr />
                <table className="table">
                    <thead>
                        <tr>
                            <th width="35%">Address</th>
                            <th width="15%">Pincode</th>
                            <th width="15%">City</th>
                            <th width="15%">State</th>
                            <th width="15%">Country</th>
                            <th width="5%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {address != undefined ?
                            address.map((elem,index) =>
                                <tr>
                                    <td>{elem.address}</td>
                                    <td>{elem.pincode}</td>
                                    <td>{elem.city}</td>
                                    <td>{elem.state}</td>
                                    <td>{elem.country}</td>
                                    <button onClick={()=>deleteAddressFunc(index)}><i className="fa fa-trash"></i></button>
                                </tr>
                            )
                            : ''}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
