import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getColor, getCategories, fetchproduct } from '../../config/Myservices';
export default function ProductPage() {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    useEffect(() => {
        getColor().then(res => {
            if (res.data.success) {
                setcolor(res.data.cdata)
            }
        })
        getCategories().then(res => {
            if (res.data.success) {
                setcategories(res.data.cdata)
            }
        })
        fetchproduct().then(res => {
            setproducts(res.data)
        })
    }, [])
    const [rerender, setrerender] = useState(true);
    const [filtercategory, setfiltercategory] = useState(null);
    const [filtercolor, setfiltercolor] = useState(null);
    const [color, setcolor] = useState([])
    const [categories, setcategories] = useState([])
    const [products, setproducts] = useState([]);
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
    const setCategoryFunc = (id) => {
        setfiltercategory(id)
        if (filtercolor != null) {
            fetchproduct({ filterArgs: { category_id: id, color_id: filtercolor } }).then(res => {
                setproducts(res.data)
            })
        }
        else {
            fetchproduct({ filterArgs: { category_id: id } }).then(res => {
                setproducts(res.data)
            })
        }
    }
    const setColorFunc=(id)=>{
        setfiltercolor(id);
        if(filtercategory!=null){
            fetchproduct({ filterArgs: { category_id: filtercategory, color_id: id } }).then(res => {
                setproducts(res.data)
            })
        }
        else {
            fetchproduct({ filterArgs: { color_id: id } }).then(res => {
                setproducts(res.data)
            })
        }
    }
    const allProductFunc=()=>{
        fetchproduct().then(res=>{
            setproducts(res.data)
        })
    }
    console.log(products);
    return (
        <div style={{ width: "95%" }} className="row m-auto">
            <div className="col-md-2 col-sm-4">
                <button onClick={allProductFunc} className="btn btn-outline-primary myacountLink">All Products</button>
                <div className="dropdown">
                    <button className="btn btn-outline-primary myacountLink dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Category
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {categories.map(elem =>
                            <button onClick={() => setCategoryFunc(elem._id)} className="btn btn-primary dropdown-item" >{elem.category_name}</button>
                        )}
                    </ul>
                </div>
                <div className="dropdown">
                    <button className="btn btn-outline-primary myacountLink dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Color
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {color.map(elem =>
                            <button onClick={()=>setColorFunc(elem._id)} className="dropdown-item" >{elem.color_name}</button>
                        )}
                    </ul>
                </div>
            </div>
            <div className="col-md-10 col-sm-8">
                <div className="row my-4 container m-auto">
                    {products.length > 0 ?
                        products.map(elem =>
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
                            </div>)
                        : ''
                    }
                </div>
            </div>
        </div>
    )
}
