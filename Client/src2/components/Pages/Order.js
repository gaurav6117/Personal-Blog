import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrder, cancelOrder } from '../../config/Myservices'
import { Link, useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode"
export default function Order() {
    const dispatch = useDispatch();
    let navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("token")) {
            let token = localStorage.getItem("token")
            var decode = jwt_decode(token);
            fetchOrder({ user_id: decode.uid._id, token: localStorage.getItem('token') }).then(res => {
                if (res.data) {
                    dispatch({ type: "ORDER", payload: res.data })
                }
            })
        }
    }, [])
    const order = useSelector(state => state.order)
    const Products = useSelector(state => state.Products)
    const cancelOrderFunc = (id) => {
        cancelOrder({ user_id: id, token: localStorage.getItem('token') }).then(res => {
            console.log(res.data);
            if (res.data.success) {
                navigate("/")
            }
        })
    }
    return (
        <div className="container">
            <h2 className="mt-3">My Orders</h2>
            <hr />
            {order.map(elem => {
                if (elem.active_flag == true) {
                    return <div style={{ border: "1px solid rgb(222, 217, 217)", margin: "10px" }}>
                        <div style={{ padding: "10px" }}>
                            <h3 style={{ color: "gray" }}>Order Placed</h3>
                            <p style={{ fontSize: "18px" }}><span style={{ color: "white", padding: "10px", fontFamily: "arial", backgroundColor: "blue" }}>Order Id: {elem._id} <span style={{ fontSize: "28px", color: "red", fontWeight: "bold" }}>/</span> Placed on: {elem.created_at}</span><br />Amount: <span style={{ fontWeight: "bold", color: "blue", fontSize: "20px" }}>{elem.amount}</span></p>
                            <hr />
                            {Products.map(alldata => (
                                elem.products.map(pdata => {
                                    if (alldata._id === Object.keys(pdata)[0]) {
                                        return <>
                                            <img src={alldata.product_image[0].base64} height="100px" width="100px" style={{ marginRight: "15px" }} />
                                        </>
                                    }
                                })
                            ))}
                            <hr />
                            <Link to={`/invoice/${elem._id}`} className="btn btn-outline-dark">View Invoice</Link>
                            <button style={{marginLeft:"10px"}} onClick={() => cancelOrderFunc(elem._id)} className="btn btn-outline-dark">Cancel Order</button>
                        </div>
                    </div>
                }
            })}
        </div>
    )
}
