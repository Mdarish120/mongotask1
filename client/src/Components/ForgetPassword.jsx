import { Button, Container, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import useStyles from './styles';
import axios from 'axios';
import {  toast } from 'react-toastify';

const ForgetPassword = () => {
    const classes = useStyles();
    const [email,setEmail]=useState("");


    const handleSubmit= async(e)=>{
       e.preventDefault();
       const res=await axios.post("http://localhost:5000/auth/forget-password",{email});
       console.log(res);
       toast("Password reset email sent. Check your inbox");

    }
  return (
   <Container component="main" maxWidth="xs">
    <Paper className={classes.paper} elevation={6}>
        <Typography  component="h1" variant="h5" sx={{mb:6}}>Forget Password</Typography>
        <form  onSubmit={handleSubmit}>
        <TextField name="email" label="Email Address" onChange={(e)=>setEmail(e.target.value)} value={email}  type="email" fullWidth />
    <Button variant='contained' sx={{mt:4}} type='submit'>Send</Button>
        </form>

    </Paper>
  
   </Container>
  )
}

export default ForgetPassword