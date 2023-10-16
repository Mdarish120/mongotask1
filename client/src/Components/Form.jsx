import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import useStyles from './styles';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {  toast } from 'react-toastify';




const Form = () => {
    const initialState = { name: '', email: '', password: '', confirmPassword: '' };
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
const navigate=useNavigate();
  const classes = useStyles();




  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
   
  };

  const handleSubmit = (e) => {

    e.preventDefault();
console.log(form);
const state=isSignup?"signup":"login";
const signup= async()=>{
  try {

    const res=await axios.post(`http://localhost:5000/auth/${state}`,form);
    localStorage.setItem("token",JSON.stringify(res.data.token));
    localStorage.setItem("userId",JSON.stringify(res.data.result._id));
    localStorage.setItem("isPremium",JSON.stringify(res.data.result.isPremium));
     setForm({name:"",email:"",password:"",confirmPassword:""});
  
     console.log(res);
     navigate("/");
  
  
  
 
    
  } catch (error) {
     console.log(error);
     toast("Request Failed");
  }
    
  };

  signup();

}




  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs" sx={{mt:20}}>
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container direction={"column"} spacing={2}>
            { isSignup && (
            <>
               <Grid item><TextField name="name" label="Name" onChange={handleChange} value={form.name} autoFocus half fullWidth /></Grid>
            </>
            )}
          <Grid item> <TextField name="email" label="Email Address" onChange={handleChange} value={form.email}  type="email"fullWidth /></Grid> 
         <Grid item> <TextField name="password" label="Password" onChange={handleChange} value={form.password}  type="password" fullWidth /></Grid>  
            { isSignup &&<Grid item><TextField name="confirmPassword" label="Confirm Password" onChange={handleChange} value={form.confirmPassword}  type="password" fullWidth/></Grid>  }
         

          <Grid item>
          <Button type="submit"  variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          </Grid>
          </Grid>
       
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={()=>navigate("/forget-password")} >
               Forget Password
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Form;
