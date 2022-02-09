import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getproduct, fetchCart, setCart, fetchAddress, fetchOrder } from '../../config/Myservices';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
export default function Home() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [toast, settoast] = useState({ class: 'toast', message: '' })
    const Products = useSelector(state => state.Products)
    console.log(Products);
    useEffect(() => {
        getproduct().then(res => dispatch({ type: 'AddProduct', payload: res.data }))
        if (localStorage.getItem("token") != undefined) {
            let token = localStorage.getItem("token")
            var decode = jwt_decode(token);
            dispatch({ type: "SETUID", payload: decode.uid })
            fetchCart({ user_id: decode.uid._id, token: localStorage.getItem('token') }).then(res => {
                let temp = JSON.parse(res.data.cart_value);
                if (localStorage.getItem("myCart") != undefined) {
                    let arr = JSON.parse(localStorage.getItem("myCart"));
                    for (const id in temp) {
                        if ((Object.keys(arr)).includes(id)) {
                            let local_val = arr[id];
                            let db_val = temp[id];
                            arr[id] = local_val > db_val ? local_val : db_val;
                            let temp2 = Object.keys(arr);
                            dispatch({ type: "CARTCOUNT", payload: temp2.length });
                            localStorage.setItem("myCart", JSON.stringify(arr));
                        }
                        else {
                            let db_val = temp[id];
                            arr[id] = db_val;
                            let temp2 = Object.keys(arr);
                            dispatch({ type: "CARTCOUNT", payload: temp2.length });
                            localStorage.setItem("myCart", JSON.stringify(arr));
                        }
                    }
                }
                else {
                    let temp2 = Object.keys(temp);
                    dispatch({ type: "CARTCOUNT", payload: temp2.length });
                    localStorage.setItem("myCart", JSON.stringify(temp));
                }
            })
            if (localStorage.getItem("myCart") != undefined) {
                let token = localStorage.getItem("token")
                let decode = jwt_decode(token);
                let temp = localStorage.getItem("myCart")
                setCart({ cartData: temp, user_id: decode.uid._id, token: localStorage.getItem('token') })
            }
            fetchAddress({ user_id: decode.uid._id, token: localStorage.getItem('token') }).then(res => {
                if (res.data) {
                    dispatch({ type: "ADDRESS", payload: JSON.parse(res.data.address) })
                }
            })
            fetchOrder({ user_id: decode.uid._id, token: localStorage.getItem('token') }).then(res => {
                if (res.data) {
                    dispatch({ type: "ORDER", payload: res.data })
                }
            })
        }
    }, [])
    const callToastFunc = (message) => {
        settoast({ ...toast, class: 'myclass', message: message })
        setTimeout(() => {
            settoast({ ...toast, class: 'toast' })
        }, 2000);
    }
    const productDetailFunc = (id) => {
        navigate(`/productDetail/${id}`)
    }
    const addToCart = (id) => {
        if (localStorage.getItem("myCart") != undefined) {
            let arr = JSON.parse(localStorage.getItem("myCart"));
            if ((Object.keys(arr)).includes(String(id))) {
                var val = arr[id];
                arr[id] = val + 1;
                let temp2 = Object.keys(arr);
                dispatch({ type: "CARTCOUNT", payload: temp2.length });
                localStorage.setItem("myCart", JSON.stringify(arr));
                callToastFunc("Product Added!")
            }
            else {
                arr[id] = 1;
                let temp2 = Object.keys(arr);
                dispatch({ type: "CARTCOUNT", payload: temp2.length });
                localStorage.setItem("myCart", JSON.stringify(arr));
                callToastFunc("Product Added!")
            }
        }
        else {
            let arr = { [id]: 1 }
            let temp2 = Object.keys(arr);
            dispatch({ type: "CARTCOUNT", payload: temp2.length });
            localStorage.setItem("myCart", JSON.stringify(arr))
            callToastFunc("Product Added!")
        }
    }
    return (
        <>
            <h2 className="text-center mt-4 ">Welcome To MyBlog</h2>
            <div className="row my-4 container m-auto">
                {Products.slice(0, 6).map(elem =>
                    <div key={elem._id} className="col-lg-4 productCard">
                        <div className="productCardInner" style={{ width: "19rem" }}>
                            <img src={elem.product_image[0].base64} onClick={() => productDetailFunc(elem._id)} className="card-img-top m-auto" height="180px" width="100px" alt="no image" />
                            <div className="cardBody">
                                <h5 className="cardTitle">{elem.product_name}</h5>
                                <div className="d-flex justify-content-between">
                                    <span className="productCardCost">${elem.product_cost}</span>
                                    <span className="productCardRating">Rating: <span className="cardRatingValue">{elem.product_rating}</span><i style={{ color: "blue", fontSize: "20px" }} className="fa fa-star"></i></span>
                                </div>
                                <div>
                                    <button onClick={() => addToCart(elem._id)} className="btn btn-primary productCardBtn">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: "11" }}>
                <div id="liveToast" className={toast.class} role="alert" aria-live="assertive" aria-atomic="true">
                    <div style={{ backgroundColor: "#cff4fc", color: "black" }} className="toast-header">
                        {/* <img src="..." className="rounded me-2" alt="..."> */}
                        <strong class="me-auto">Message</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div style={{ backgroundColor: "#cff4fc", color: 'black' }} className="toast-body">
                        {toast.message}
                    </div>
                </div>
            </div>
            <br /><br />
        </>
    )
}