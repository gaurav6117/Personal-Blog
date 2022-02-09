import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from "./components/Body/Navbar"
import Footer from './components/Body/Footer'
import RoutesFile from './Routes/RoutesFile';
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <RoutesFile />
      <Footer />
    </BrowserRouter>
  )
}