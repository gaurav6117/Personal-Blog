import React, { useEffect, useState } from 'react'
import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon, TelegramShareButton, TelegramIcon, EmailShareButton, EmailIcon, PinterestShareButton, PinterestIcon } from "react-share";
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getpost } from '../../config/Myservices';
export default function BlogDetail() {
    useEffect(() => {
        getpost().then(res => dispatch({ type: 'AddPost', payload: res.data.pdata }))
    }, []);
    let param = useParams()
    const dispatch = useDispatch()
    const Posts = useSelector(state => state.Posts)
    const data = Posts != undefined ? Posts.filter(post => post._id === param.id) : '';
    console.log(data[0]);
    return (
        <>
            <div style={{ width: "90%" }} className=" m-auto row">
                <div className="col-md-8 col-sm-12 ">
                    <h1>{data[0]!= undefined?data[0].title:''}</h1>
                    <hr />
                    <div>
                        <FacebookShareButton
                            url={`http://www.myblog.com/productDetail/${param.id}`}
                            quote={"MyBlog - A one stop solution for Technial Quest"}
                            hashtag="#MyBlog"
                            className="socialMediaButton"
                        >
                            <FacebookIcon size={46} round={true} />
                        </FacebookShareButton>
                        <WhatsappShareButton
                            url={`http://www.myblog.com/blogDetail/${param.id}`}
                            quote={"MyBlog - A one stop solution for Technial Quest"}
                            hashtag="#MyBlog"
                            className="socialMediaButton"
                        >
                            <WhatsappIcon size={46} round={true} />
                        </WhatsappShareButton>
                        <TelegramShareButton
                            url={`http://www.myblog.com/blogDetail/${param.id}`}
                            quote={"MyBlog - A one stop solution for Technial Quest"}
                            hashtag="#MyBlog"
                            className="socialMediaButton"
                        >
                            <TelegramIcon size={46} round={true} />
                        </TelegramShareButton>
                        <PinterestShareButton
                            url={`http://www.myblog.com/blogDetail/${param.id}`}
                            quote={"MyBlog - A one stop solution for Technial Quest"}
                            hashtag="#MyBlog"
                            className="socialMediaButton"
                        >
                            <PinterestIcon size={46} round={true} />
                        </PinterestShareButton>
                        <EmailShareButton
                            url={`http://www.myblog.com/blogDetail/${param.id}`}
                            quote={"MyBlog - A one stop solution for Technial Quest"}
                            hashtag="#MyBlog"
                            className="socialMediaButton"
                        >
                            <EmailIcon size={46} round={true} />
                        </EmailShareButton>
                    </div>
                    <hr />
                    <p style={{fontSize:"20px"}}>
                        <b>Tags: </b>{data[0] != undefined?data[0].tags:''} 
                    </p>
                    <hr/>
                    <p style={{fontSize:"20px"}}>{data[0]!= undefined?data[0].body:''}</p>
                </div>
                <div className="col-md-4 col-sm-12 text-center">
                    <img src="https://i.pinimg.com/originals/0c/dc/45/0cdc456aaf9cad412a93dd24296fb087.png" alt="image not available"/>
                </div>
            </div>
            <br /><br /><br /><br />

            {/* <div style={{ width: "90%" }} className="m-auto row">
                <div className="col-md-5 col-sm-12 m-auto text-center">
                    <img src={data.length>0  ? data[0].product_image[0].base64 : ""} height="300px" alt="loading..." />
                    <div>
                        {data.length>0 ?
                            data[0].product_subimage.map(subimage =>
                                <img style={{ border: "1px solid gray", margin: "30px 19px 0px 10px" }} src={subimage} height="70px" alt="loading..." width="130px" />
                            ) : ""}
                    </div>
                </div>
                <div className="col-md-7 col-sm-12 ">
                    <h2>{data.length>0 ? data[0].product_name : ""}</h2>
                    <p><span className="productPage-subheading">Rating:</span> <span style={{ backgroundColor: "yellow", fontSize: "22px", fontWeight: "bold", padding: "5px" }} >{data.length>0 ? data[0].product_rating : ""}</span></p>
                    <hr />
                    <p><span className="productPage-subheading">Price:</span><span style={{ color: "green", fontSize: "22px", fontWeight: "bold" }}> ${data.length>0 ? data[0].product_cost : ""}</span></p>
                    <p ><span className="productPage-subheading">Color:</span><span style={{ color: data.length>0 ? data[0].color_id.color_code : '', backgroundColor: data.length>0 ? data[0].color_id.color_code : '', fontSize: "22px", padding: "5px" }}>color</span></p><br />
                    <h4>Share<i style={{ fontSize: "24px", margin: "6px" }} className="fa fa-share-alt"></i></h4>
                    <div>
                        <FacebookShareButton
                            url={`http://www.myblog.com/productDetail/${param.id}`}
                            quote={"MyBlog - A one stop solution for Technial Quest"}
                            hashtag="#MyBlog"
                            className="socialMediaButton"
                        >
                            <FacebookIcon size={46} round={true} />
                        </FacebookShareButton>
                        <WhatsappShareButton
                            url={`http://www.myblog.com/productDetail/${param.id}`}
                            quote={"MyBlog - A one stop solution for Technial Quest"}
                            hashtag="#MyBlog"
                            className="socialMediaButton"
                        >
                            <WhatsappIcon size={46} round={true} />
                        </WhatsappShareButton>
                        <TelegramShareButton
                            url={`http://www.myblog.com/productDetail/${param.id}`}
                            quote={"MyBlog - A one stop solution for Technial Quest"}
                            hashtag="#MyBlog"
                            className="socialMediaButton"
                        >
                            <TelegramIcon size={46} round={true} />
                        </TelegramShareButton>
                        <PinterestShareButton
                            url={`http://www.myblog.com/productDetail/${param.id}`}
                            quote={"MyBlog - A one stop solution for Technial Quest"}
                            hashtag="#MyBlog"
                            className="socialMediaButton"
                        >
                            <PinterestIcon size={46} round={true} />
                        </PinterestShareButton>
                        <EmailShareButton
                            url={`http://www.myblog.com/productDetail/${param.id}`}
                            quote={"MyBlog - A one stop solution for Technial Quest"}
                            hashtag="#MyBlog"
                            className="socialMediaButton"
                        >
                            <EmailIcon size={46} round={true} />
                        </EmailShareButton>
                    </div>
                    <div>
                        <button onClick={() => addToCart(data[0]._id)} className="btn btn-info productPageBtn">ADD TO CART</button>
                        <button className="btn btn-warning productPageBtn">RATE PRODUCT</button>
                    </div>
                </div>
            </div>
            <br /><br /><br /><br /> */}
        </>
    )
}