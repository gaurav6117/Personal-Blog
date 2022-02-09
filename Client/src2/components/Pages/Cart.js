import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
export default function Cart() {
    let navigate = useNavigate();
    var total_amount = 0;
    const dispatch = useDispatch();
    const cartCount = useSelector(state => state.cartCount)
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const uid = useSelector(state => state.uid)
    const [rerender, setrerender] = useState(false)
    const Products = useSelector(state => state.Products)
    const [mycarT, setmycarT] = useState([])
    useEffect(() => {
        if (localStorage.getItem("myCart")) {
            let mycart = JSON.parse(localStorage.getItem("myCart"))
            let tempArr = [];
            for (let idy in mycart) {
                const obj = { [idy]: mycart[idy] }
                tempArr.push(obj)
            }
            setmycarT(tempArr)
        }
    }, [])
    const TotalPriceFunc = (a, b) => {
        total_amount += (Number(a) * Number(b))
        return (Number(a) * Number(b))
    }
    const incProductCountFunc = (id, quantity, index) => {
        total_amount = 0
        let arr = mycarT;
        arr[index][id] = Number(quantity) + 1;
        setmycarT(arr)
        let arrObj = {}
        arr.map(elem => {
            arrObj[(Object.keys(elem))[0]] = elem[(Object.keys(elem))[0]]
        })
        localStorage.setItem("myCart", JSON.stringify(arrObj))
        setrerender(!rerender)
    }
    const decProductCountFunc = (id, quantity, index) => {
        if (quantity > 0) {
            total_amount = 0
            let arr = mycarT;
            arr[index][id] = Number(quantity) - 1;
            setmycarT(arr)
            let arrObj = {}
            arr.map(elem => {
                arrObj[(Object.keys(elem))[0]] = elem[(Object.keys(elem))[0]]
            })
            localStorage.setItem("myCart", JSON.stringify(arrObj))
            setrerender(!rerender)
        }
    }
    const deleteCartProduct = (index) => {
        let arr = mycarT;
        total_amount = 0
        arr.splice(index, 1)
        setmycarT(arr)
        let arrObj = {}
        arr.map(elem => {
            arrObj[(Object.keys(elem))[0]] = elem[(Object.keys(elem))[0]]
        })
        localStorage.setItem("myCart", JSON.stringify(arrObj))
        dispatch({type:"CARTCOUNT", payload: (Number(cartCount)-1)})
        setrerender(!rerender)
    }
    const proceedToBuyFunc = () => {
        if (uid._id != undefined) {
            const Odata = { user_id: uid._id, amount: ((95 * total_amount) / 100), productData: JSON.stringify(mycarT) }
            localStorage.setItem("cart_products", JSON.stringify(Odata))
            navigate('/checkout')
        }
    }
    return (
        <div style={{ padding: "20px" }} className="row m-auto">
            <div className="col-md-9 col-sm-12 m-auto">
                <div className="cartPageLeft">
                    <div className="cartPageLeft1 row">
                        <div className="col-sm-6">
                            <span style={{ fontWeight: "bold" }}>Product</span>
                        </div>
                        <div className="col-2">
                            <span style={{ fontWeight: "bold" }}>Quantity</span>
                        </div>
                        <div className="col-sm-1">
                            <span style={{ fontWeight: "bold" }}>Price</span>
                        </div>
                        <div className="col-sm-2 text-center">
                            <span style={{ fontWeight: "bold" }}>Total</span>
                        </div>
                        <div className="col-sm-1">
                        </div>
                    </div>
                    <hr />
                    <div className="productRender">
                        {Products.map(elem => (
                            mycarT.map((cart_item, index) => {
                                if (elem._id === Object.keys(cart_item)[0]) {
                                    return <>
                                        <div className="cartPageLeft2 row">
                                            <div className="col-sm-6 row psettinginsm6">
                                                <div className="col-sm-4">
                                                    <img src={elem.product_image[0].base64} height="120px" width="120px" />
                                                </div>
                                                <div className="col-sm-8">
                                                    <p><span style={{ fontWeight: "bold" }}>{elem.product_name}</span><br />By: {elem.product_producer}<br />Status: <span style={{ color: "green" }}>In Stock</span> </p>
                                                </div>
                                            </div>
                                            <div className="col-2 text-center">
                                                <br /><br /><button onClick={() => decProductCountFunc(elem._id, cart_item[elem._id], index)} className="quantityBtn">-</button>
                                                <span style={{ border: "1px solid rgb(204, 204, 204)", padding: "5px 10px 5px 10px" }}>{cart_item[elem._id]}</span>
                                                <button onClick={() => incProductCountFunc(elem._id, cart_item[elem._id], index)} className="quantityBtn">+</button>
                                            </div>
                                            <div className="col-sm-1 text-center">
                                                <br /><br /><span style={{ fontWeight: "bold" }}>{elem.product_cost}</span>
                                            </div>
                                            <div className="col-sm-2 text-center">
                                                <br /><br /><span style={{ fontWeight: "bold" }}>{TotalPriceFunc(Number(cart_item[elem._id]), Number(elem.product_cost))}</span>
                                            </div>
                                            <div className="col-sm-1 text-center">
                                                <br /><br /><button onClick={() => deleteCartProduct(index)}><i style={{ color: "#de0d2c", fontSize: "24px" }} className="fa fa-trash"></i></button>
                                            </div>
                                        </div>
                                        <hr />
                                    </>
                                }
                            })
                        ))}
                    </div>
                </div>
            </div>
            <div className="col-md-3 col-sm-12 ">
                <div style={{ border: "1px solid rgb(204, 204, 204)", padding: "20px" }}>
                    <h3>Review Order</h3><br />
                    <p className="reviewP">Subtotal:<pre className="d-inline">             </pre> {(total_amount > 0 ? total_amount : 0).toFixed(2)}</p><hr />
                    <p className="reviewP">GST(5%):<pre className="d-inline">             </pre> {(total_amount > 0 ? (5 * total_amount) / 100 : 0).toFixed(2)} </p><hr />
                    <p className="reviewP orderTotal">Order Total:<pre className="d-inline">         </pre> {(total_amount > 0 ? (95 * total_amount) / 100 : 0).toFixed(2)}</p><br />
                    {isLoggedIn?
                    <button style={{ width: "100%" }} onClick={proceedToBuyFunc} className="btn btn-primary">Proceed To Buy</button>
                    :
                    <Link to="/login" style={{ width: "100%" }} className="btn btn-primary">Proceed To Buy</Link>
                    }
                    
                </div>
            </div>
        </div>
    )
}