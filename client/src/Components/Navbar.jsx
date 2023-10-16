import React, { useEffect, useState } from 'react';
import {AppBar,Box,Toolbar,Typography,Button,IconButton,Avatar,Stack, Hidden,Paper, Divider} from '@mui/material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import {  toast } from 'react-toastify';
import axios from "axios";
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
const Navbar = () => {

let token=JSON.parse(localStorage.getItem("userId"));
 
const [toggle,setToggle]=useState(false);
 
const userId = JSON.parse(localStorage.getItem('userId')); //



  let isLogin=token?true:false;
  
    const navigate=useNavigate();

  const handleLogout=()=>{
    setToggle(false);
    isLogin=false;
    console.log(isLogin)
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  localStorage.clear();
    navigate("/form")
   
  }

 let isPremium= JSON.parse(localStorage.getItem("isPremium"));
  console.log(isPremium)

    const handleReport= async()=>{

      if(isPremium){
        navigate("/report");
      }else{
        
        toast("Please buy premium first....")
      }
     
    }


    const handleLeaderboard= async()=>{

      if(isPremium){
        navigate("/leaderboard");
      }else{
        toast("Please buy premium first....")
      }
     
    }

    const handleSubmit = async () => {
      setToggle(false);
      const token = JSON.parse(localStorage.getItem('token')); // Retrieve the token from localStorage

      const headers = {
        Authorization: `Bearer ${token}`,
      }
     
console.log(headers);
  
      try {
     const response = await axios.post(`http://localhost:5000/payment/${userId}`,{name:"Premium",desc:"Buy Description",amount:500},{headers});
       const res = response.data;
        console.log(response);
  
        if (res.success) {
          const options = {
            key: `${res.key_id}`,
            amount: `${res.amount}`,
            currency: 'INR',
            name: `${res.product_name}`,
            description: `${res.description}`,
            image: 'https://dummyimage.com/600x400/000/fff',
            order_id: `${res.order_id}`,
            handler: function (response) {
              toast("Payment Successfully....");
              localStorage.setItem("isPremium",JSON.stringify(res.isPremium));
              // window.open("/", "_self");
            },
            prefill: {
              contact: `${res.contact}`,
              name: `${res.name}`,
              email: `${res.email}`,
            },
            notes: {
              description: `${res.description}`,
            },
            theme: {
              color: '#2300a3',
            },
          };
          const razorpayObject = new window.Razorpay(options);
          razorpayObject.on('payment.failed', function (response) {
            toast("Failed...");
          });
          razorpayObject.open();
        } else {
          toast("Payment Successfully....");
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };









  return (
 <> 
  
      <AppBar color='primary'  style={{width:"100vw" }}>
        <Toolbar>
        <Box  sx={{ flexGrow: 1 }}>
        <Stack direction="row"  style={{display:"flex",alignItems:"center"}}>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              [useTheme().breakpoints.up('md')]: {
                marginLeft: '5px',
              },
            }}
          >
         <CurrencyExchangeIcon/>
          </IconButton>

          <Hidden smDown >
        <Typography variant="h6" component="div"  sx={{mr:3}}>
            Exprense Tracker
          </Typography>
          </Hidden>
          <Button  style={{color:"white"}} variant='outlined' onClick={()=>navigate("/")} sx={{ml:-2}}>Home</Button>
          <Button style={{color:"white"}} endIcon={<StarHalfIcon  style={{color:"yellow"}}/>} onClick={handleReport}>Report</Button>
          <Button style={{color:"white"}} endIcon={<StarHalfIcon style={{color:"yellow"}} />} onClick={handleLeaderboard}>Leaderboad</Button>
        </Stack>
    
      </Box>
          
      <Hidden smDown >
          <Box sx={{mr:5}}>
            <Stack direction="row" spacing={2}>
            <Button style={{color:"white"}} endIcon={<StarHalfIcon style={{color:"yellow"}} />} onClick={handleSubmit}>Buy Perimium</Button>
            { isLogin ?  <Button color="inherit" onClick={handleLogout} >LOGOUT</Button>: <Button color="inherit" onClick={()=>navigate("/form")} >Login</Button>}
          
          
            </Stack>
       
        
          </Box>
          </Hidden>
          <Hidden smUp  >
            <IconButton sx={{ml:-1}} style={{color:"white",position:"relative"}}  onClick={()=>setToggle((prev)=>!prev)} > 
            <MenuOpenIcon/>
            </IconButton>
     
          </Hidden>

          <Hidden smUp  >
          {toggle&& <Box sx={{mr:5}}  style={{position:"absolute" ,top:50,right:1}}>
            <Paper sx={{p:3}}>

          
            <Stack direction="column" spacing={2}>
            <Button  endIcon={<StarHalfIcon style={{color:"yellow"}} />} onClick={handleSubmit} >Buy Perimium</Button>
            <Divider/>
            { isLogin ?  <Button color="inherit" onClick={handleLogout} >LOGOUT</Button>: <Button color="inherit" onClick={()=>{navigate("/form"),setToggle(false)}} >Login</Button>}
        
          
            </Stack>
            </Paper>
        
          </Box>}
          </Hidden>


   
        </Toolbar>
      </AppBar>

  
 </>
  )
}

export default Navbar