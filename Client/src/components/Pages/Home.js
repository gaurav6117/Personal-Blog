import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getpost, addpost } from '../../config/Myservices';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
export default function Home() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const titleRef = useRef(null);
    const bodyRef = useRef(null);
    const tagRef = useRef(null);
    const [toast, settoast] = useState({ class: 'toast', message: '' })
    const Products = useSelector(state => state.Products)
    const [tagArray, settagArray] = useState([]);
    useEffect(() => {
        getpost().then(res => dispatch({ type: 'AddPost', payload: res.data.pdata }))
        if (localStorage.getItem("token") != undefined) {
            let token = localStorage.getItem("token")
            var decode = jwt_decode(token);
            dispatch({ type: "SETUID", payload: decode.uid })
        }
    }, [])
    const Posts = useSelector(state => state.Posts)
    console.log(Posts);
    const productDetailFunc = (id) => {
        navigate(`/productDetail/${id}`)
    }
    const addPostFunc = (e) => {
        e.preventDefault()
        const data = { 'title': titleRef.current.value, 'body': bodyRef.current.value, 'tags': JSON.stringify(tagArray) }
        addpost(data)
            .then(res => console.log(res.data))
    }
    const addTagFunc = () => {
        const tag = tagRef.current.value
        settagArray([...tagArray, tag])
        tagRef.current.value = null;
        console.log(tagArray);
    }
    return (
        <div className="container">
            <h2 className="text-center mt-4 ">Welcome To MyBlog</h2>
            <div style={{ textAlign: 'right' }}>
                <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"> Add Post </button>
            </div>
            {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Open modal for @mdo</button> */}

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">New Post</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">Title:</label>
                                <input type="text" ref={titleRef} class="form-control" id="title" />
                            </div>
                            <div class="mb-3">
                                <label for="message-text" class="col-form-label">Body:</label>
                                <textarea ref={bodyRef} class="form-control" id="message-text"></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="tag" class="col-form-label">Tag:</label>
                                <input ref={tagRef} type="text" class="form-control" id="tag"></input>
                            </div>
                            <button onClick={addTagFunc} className="btn btn-outline-dark">ADD Tag</button>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={addPostFunc} type="submit" class="btn btn-primary">Add Post</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-4 container m-auto">
                {Posts.map(elem =>
                    <div key={elem._id} className="col-lg-4 ">
                        <div class="card" style={{ width: "18rem", margin: "10px 10px 10px 10px" }}>
                            <div class="card-body">
                                <h5 class="card-title">{elem.title}</h5>
                                <hr/>
                                <p class="card-text">{elem.body.slice(0,75)+'...'}</p>
                                <p class="card-text"><b>Tags:</b>{elem.tags}</p>
                                <a href="#" class="card-link">Card link</a>
                                <a href="#" class="card-link">Another link</a>
                            </div>
                        </div>
                    </div>
                )}
                {/* {Products.map(elem =>
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
                )} */}
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
        </div>
    )
}