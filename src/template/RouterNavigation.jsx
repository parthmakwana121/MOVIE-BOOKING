import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Form from '../Form'
import Seats from '../Seats'

const RouterNavigation = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Form/>} />
        <Route path="/select-seats" element={<Seats/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default RouterNavigation