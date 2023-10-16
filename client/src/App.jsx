import React,{useState} from "react";
import {BrowserRouter,Route,Routes,Navigate} from "react-router-dom";
import Form from "./Components/Form";
import AddExpenses from "./Components/AddExpenses";
import ForgetPassword from "./Components/ForgetPassword";
import ResetPassword from "./Components/ResetPassword";
import Navbar from "./Components/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Leaderborad from "./Components/Leaderborad";
import Report from "./Components/Report";




const App = () => {


  return (
    <BrowserRouter>

    <ToastContainer/>
   <Navbar/>
    <Routes>
        <Route path="/form" element={<Form/>} />
        <Route path="/" element={<AddExpenses/>} />
        <Route path="/forget-password" element={<ForgetPassword/>} />
       <Route path="/auth/reset-password/:resetToken" element={<ResetPassword/>}/>  
       <Route path="/report" element={<Report/>}/>  
       <Route path="/leaderboard" element={<Leaderborad/>}/>  

      </Routes>
    </BrowserRouter>
  )
}

export default App