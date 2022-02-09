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
    const [tagArray, settagArray] = useState(null);
    useEffect(() => {
        getpost().then(res => dispatch({ type: 'AddPost', payload: res.data.pdata }))
        if (localStorage.getItem("token") != undefined) {
            let token = localStorage.getItem("token")
            var decode = jwt_decode(token);
            dispatch({ type: "SETUID", payload: decode.uid })
        }
    }, [])
    const [rerender, setrerender] = useState(false)
    const Posts = useSelector(state => state.Posts)
    console.log(Posts);
    const postDetailFunc = (id) => {
        navigate(`/postDetail/${id}`)
    }
    const addPostFunc = (e) => {
        e.preventDefault()
        const data = { 'title': titleRef.current.value, 'body': bodyRef.current.value, 'tags': JSON.stringify(tagArray) }
        addpost(data)
        setrerender(!rerender)
    }
    const addTagFunc = () => {
        const tag = tagRef.current.value
        // settagArray([...tagArray, tag])
        if (tagArray == null) {
            settagArray(tag)
        }
        else {
            settagArray(tagArray + ', ' + tag)
        }
        tagRef.current.value = null;
    }
    const blogDetailFunc = (id) => {
        navigate(`/blogDetail/${id}`)
    }
    return (
        <div className="container">
            <h2 className="text-center mt-4 ">Welcome To MyBlog</h2>
            <div style={{ textAlign: 'right' }}>
                <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"> Add Post </button>
            </div>
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
                {Posts.length > 0 ? Posts.map(elem =>
                    <div key={elem._id} onClick={() => blogDetailFunc(elem._id)} className="col-lg-4 ">
                        <div class="card" style={{ width: "18rem", margin: "10px 10px 10px 10px" }}>
                            <div class="card-body">
                                <h5 class="card-title" style={{ fontSize: '25px' }}>{elem.title}</h5>
                                <hr />
                                <p class="card-text" style={{ fontSize: '20px' }}>{elem.body.slice(0, 75) + '...'}</p>
                                <p class="card-text" style={{ fontSize: '20px' }}><b>Tags:</b>{elem.tags}</p>
                                <button onClick={() => postDetailFunc(elem.id)} className="btn btn-outline-primary" style={{ width: "100%" }}>View Post</button>
                            </div>
                        </div>
                    </div>
                ) : <div style={{width:"100%", height:"200px"}}>
                    <h2 style={{position:"absolute", left:"500px", top:"350px", backgroundColor:"gray", color:"white", padding:"0px 10px 0px 10px"}}>No Posts Available! Add Now</h2>
                </div>}
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