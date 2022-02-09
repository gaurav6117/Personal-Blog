import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchOrder } from '../../config/Myservices'
import jwt_decode from 'jwt-decode';
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
export default function Invoice() {
    var params = useParams()
    const uid = useSelector(state => state.uid)
    const [selectedOrder, setselectedOrder] = useState({})
    const Products = useSelector(state => state.Products)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            let token = localStorage.getItem('token')
            let decode = jwt_decode(token)
            fetchOrder({ email: decode.uid.email, token: localStorage.getItem('token') }).then(res => {
                if (res.data) {
                    res.data.map(elem => {
                        if (elem._id == params.id) {
                            setselectedOrder(elem)
                        }
                    })
                }
            })
        }
    }, [])
    const printDocument = () => {
        const input = document.getElementById('contend');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                pdf.save("invoice.pdf");
            });
    }
    return (
        <>
            <div id="contend" style={{ width: "60%", border: "1px solid gray", padding: "50px" }} className="m-auto container invoiceDiv">
                <h2 style={{ backgroundColor: "#212529", color: "white", padding: "10px" }} className="text-center">Neo<span style={{ color: "red" }}>Store</span></h2><hr />
                <div className="d-flex justify-content-between">
                    <p><b>GSTIN:</b> 06AAXCS0655F1Z2</p>
                    <p><b>Invoice Number: </b>{params.id}</p>
                </div><hr />
                <div className="row m-auto">
                    <div className="col-md-4">
                        <p><b>Order Date: </b>{selectedOrder.created_at}</p>
                        <p><b>Invoice Date: </b> {selectedOrder.created_at}</p>
                        <p><b>PAN No.:</b>BBJPC1XXXR</p>
                    </div>
                    <div className="col-md-4">
                        <p><b>Bill To: {uid.first_name + ' ' + uid.last_name}</b></p>
                        <p><b>Address:</b>{selectedOrder.address}</p>
                    </div>
                    <div className="col-md-4">
                        <p><b>ship To: {uid.first_name + ' ' + uid.last_name}</b></p>
                        <p><b>Address:</b>{selectedOrder.address}</p>
                    </div>
                </div><hr />
                <div className="row m-auto">
                    <div className="col-md-6 billPtitle">Product</div>
                    <div className="col-md-3 billPtitle">Quantity</div>
                    <div className="col-md-3 billPtitle">Price</div>
                </div><hr />
                <div>
                    {Products != undefined ? Products.map(elem => (
                        selectedOrder.products != undefined ? selectedOrder.products.map((soData, index) => {
                            if (elem._id === Object.keys(soData)[0]) {
                                return <div className="row m-auto">
                                    <div style={{ fontSize: "18px", color: "black", marginBottom: "10px", fontWeight: "bold", fontFamily: "arial" }} className="col-md-6">{elem.product_name}</div>
                                    <div style={{ fontSize: "18px", color: "black", marginBottom: "10px", fontWeight: "bold", fontFamily: "arial" }} className="col-md-3">{soData[Object.keys(soData)[0]]}</div>
                                    <div style={{ fontSize: "18px", color: "black", marginBottom: "10px", fontWeight: "bold", fontFamily: "arial" }} className="col-md-3">{elem.product_cost}</div>
                                </div>
                            }
                        }) : ''
                    )) : ''}
                </div><hr />
                <h4 className="text-end">Grand Total<pre style={{ display: "inline" }}>        </pre>{selectedOrder.amount}</h4>
                <div><br /><br /><br /><br /><br />
                    <h4 className="text-center">Thanks For Shopping.</h4>
                </div>
            </div>
            <br />
            <button style={{ width: "400px", margin: "0px 0px 0px 500px" }} onClick={printDocument} className='btn btn-primary'> Save As Pdf</button>
            <br /><br />
        </>
    )
}