import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../components/Pages/Home';
import EditProfile from '../components/myAccount/EditProfile';
import Search from '../components/Body/Search';
import BlogDetail from '../components/Pages/BlogDetail';
// const ProductPage = React.lazy(() => import('../components/Pages/ProductPage'))
const MyAccount = React.lazy(() => import('../components/Pages/MyAccount'))
const Login = React.lazy(() => import('../components/LoginModule/Login'))
const RecoverPassword = React.lazy(() => import('../components/LoginModule/RecoverPassword'))
const ForgotPassword = React.lazy(() => import('../components/LoginModule/ForgotPassword'))
const Register = React.lazy(() => import('../components/LoginModule/Register'))
const Profile = React.lazy(() => import('../components/myAccount/Profile'))
const ChangePAssword = React.lazy(() => import('../components/myAccount/ChangePAssword'))
const TermsAndConditions = React.lazy(() => import('../components/Body/TermsAndConditions'))
// const ProductDetail = React.lazy(() => import('../components/Pages/ProductDetail'));
export default function RoutesFile() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/recoverpassword/:email" element={<RecoverPassword />} />
        <Route path="/recoverpassword" element={<RecoverPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myAccount" element={<MyAccount />}>
          <Route path="/myAccount/" element={<Profile />} />
          <Route path="/myAccount/changePAssword" element={<ChangePAssword />} />
          <Route path="/myAccount/editprofile" element={<EditProfile />} />
        </Route>
        <Route path="/blogDetail/:id" element={<BlogDetail />} />
        {/* <Route path="/productDetail/:id" element={<ProductDetail />} /> */}
        {/* <Route path="/productpage" element={<ProductPage />} /> */}
        <Route path="/termsandconditions" element={<TermsAndConditions />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Suspense>
  )
}