import axios from "axios";
import {MAIN_URL} from "./URL"
var token=localStorage.getItem('token');
// Login Functions
export function getUser(data){
    return axios.post(`${MAIN_URL}/login/getUser`,data);
}
export function addUser(data){
    return axios.post(`${MAIN_URL}/login/addUser`,data);
}
export function forgotPassword(data){
    return axios.post(`${MAIN_URL}/login/forgotPassword`,data);
}
export function recoverPassword(data){
    return axios.post(`${MAIN_URL}/login/recoverPassword`,data);
}
export function changePassword(data){
    return axios.post(`${MAIN_URL}/login/changePassword`,data);
}
export function editProfile(data){
    return axios.post(`${MAIN_URL}/login/editprofile`,data);
}

// admin function
export function addColor(data){
    return axios.post(`${MAIN_URL}/admin/addcolor`,data);
}
export function addCategory(data){
    return axios.post(`${MAIN_URL}/admin/addcategory`,data);
}
export function addProduct(data){
    return axios.post(`${MAIN_URL}/admin/addproduct`,data);
}
export function getCategories(){
    return axios.get(`${MAIN_URL}/admin/getcategories`);
}
export function getColor(){
    console.log(token);
    return axios.get(`${MAIN_URL}/admin/getcolor`)
}
// Web Functions
export function getproduct(){
    return axios.get(`${MAIN_URL}/product`);
}
export function fetchproduct(data){
    return axios.post(`${MAIN_URL}/product/fetchproduct`,data);
}
// cart Functions
export async function  fetchCart(data){
    return await axios.post(`${MAIN_URL}/product/fetchcart`,data);
}
export async function  setCart(data){
    return await axios.post(`${MAIN_URL}/product/setcart`,data);
} 
// search Functions
export async function searchProduct(data){
    return await axios.post(`${MAIN_URL}/product/searchProduct`,data);
} 

// order Functions
export async function  fetchOrder(data){
    return await axios.post(`${MAIN_URL}/product/fetchplacedorder`,data);
}
export async function  addOrder(data){
    return await axios.post(`${MAIN_URL}/product/addplacedorder`,data);
}
export async function  cancelOrder(data){
    return await axios.post(`${MAIN_URL}/product/cancelorder`,data);
}

// address Function
export async function  fetchAddress(data){
    return await axios.post(`${MAIN_URL}/product/fetchaddress`,data);
}
export async function  setAddress(data){
    return await axios.post(`${MAIN_URL}/product/setaddress`,data);
}
