import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { searchProduct } from '../../config/Myservices';
export default function Search() {
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const productDetailFunc = (id) => {
        navigate(`/productDetail/${id}`)
    }
    const [rerender, setrerender] = useState(false)
    const Products = useSelector(state => state.Products)
    const [filterP, setfilterP] = useState([])
    const addToCart = (id) => {
        if (localStorage.getItem("myCart") != undefined) {
            let arr = JSON.parse(localStorage.getItem("myCart"));
            if ((Object.keys(arr)).includes(String(id))) {
                var val = arr[id];
                arr[id] = val + 1;
                let temp2 = Object.keys(arr);
                dispatch({ type: "CARTCOUNT", payload: temp2.length });
                localStorage.setItem("myCart", JSON.stringify(arr));
            }
            else {
                arr[id] = 1;
                let temp2 = Object.keys(arr);
                dispatch({ type: "CARTCOUNT", payload: temp2.length });
                localStorage.setItem("myCart", JSON.stringify(arr));
            }
        }
        else {
            let arr = { [id]: 1 }
            let temp2 = Object.keys(arr);
            dispatch({ type: "CARTCOUNT", payload: temp2.length });
            localStorage.setItem("myCart", JSON.stringify(arr))
        }
    }
    const searchHandler = (e) => {
        const { value } = e.target;
        searchProduct({value:value}).then(res=>{
            if(res.data){
                setfilterP(res.data)
            }
        })
        setrerender(!rerender)
    }
    console.log(filterP);
    return (
        <div className="container">
            <input style={{ width: "50%", marginLeft: "300px" }} className="form-control me-2" type="search" placeholder="Search" name="search" onChange={searchHandler} aria-label="Search" />
            <div style={{ minHeight: "270px" }} className="row my-4 container m-auto">
                {filterP.map(elem =>
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
        </div>
    )
}