import React,{useEffect, useState} from 'react'
import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon, TelegramShareButton, TelegramIcon, EmailShareButton, EmailIcon, PinterestShareButton, PinterestIcon } from "react-share";
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getproduct, fetchCart, setCart, fetchAddress, fetchOrder } from '../../config/Myservices';
export default function ProductDetail() {
    useEffect(() => {
        getproduct().then(res => dispatch({ type: 'AddProduct', payload: res.data }))
    }, []);
    let param = useParams()
    const dispatch = useDispatch()
    const Products = useSelector(state => state.Products)
    const data = Products!=undefined?Products.filter(product => product._id === param.id):'';
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
    return (
        <>
            <div style={{ width: "90%" }} className="m-auto row">
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
                            url={`http://www.Neostore.com/productDetail/${param.id}`}
                            quote={"NeoStore - A one stop solution for styling"}
                            hashtag="#NeoStore"
                            className="socialMediaButton"
                        >
                            <FacebookIcon size={46} round={true} />
                        </FacebookShareButton>
                        <WhatsappShareButton
                            url={`http://www.Neostore.com/productDetail/${param.id}`}
                            quote={"NeoStore - A one stop solution for styling"}
                            hashtag="#NeoStore"
                            className="socialMediaButton"
                        >
                            <WhatsappIcon size={46} round={true} />
                        </WhatsappShareButton>
                        <TelegramShareButton
                            url={`http://www.Neostore.com/productDetail/${param.id}`}
                            quote={"NeoStore - A one stop solution for styling"}
                            hashtag="#NeoStore"
                            className="socialMediaButton"
                        >
                            <TelegramIcon size={46} round={true} />
                        </TelegramShareButton>
                        <PinterestShareButton
                            url={`http://www.Neostore.com/productDetail/${param.id}`}
                            quote={"NeoStore - A one stop solution for styling"}
                            hashtag="#NeoStore"
                            className="socialMediaButton"
                        >
                            <PinterestIcon size={46} round={true} />
                        </PinterestShareButton>
                        <EmailShareButton
                            url={`http://www.Neostore.com/productDetail/${param.id}`}
                            quote={"NeoStore - A one stop solution for styling"}
                            hashtag="#NeoStore"
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
            <br /><br /><br /><br />
        </>
    )
}