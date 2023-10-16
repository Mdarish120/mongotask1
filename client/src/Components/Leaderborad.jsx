import { Container,Paper ,Stack, Typography,Box, TableContainer, Table, TableHead, TableRow, TableBody, TableCell} from '@mui/material'
import React, { useEffect, useState } from 'react'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import axios from 'axios';

const Leaderborad = () => {

let [data,setData]=useState([]);

       
const fetchData= async()=>{
  
 

   const token = JSON.parse(localStorage.getItem('token'));
   const userId= JSON.parse(localStorage.getItem('userId'));
   
  // Retrieve the token from localStorage
 
   const headers = {
     Authorization: `Bearer ${token}`,
   }
 

   try {
    const res=await axios.get(`http://localhost:5000/leaderboard`,{headers});
    setData(res.data.sort((a,b)=>b.totalExpenses-a.totalExpenses));
    console.log(res);
   } catch (error) {
     console.log(error.response.data);
   }
 


}

console.log(data);

  useEffect(()=>{
   fetchData();
  },[]);

let count=1;

  return (
   <Container  component="main" maxWidth="lg"  sx={{ mt:18}}>
    <Paper elevation={6}  style={{ backgroundColor: 'lightblue' }}  sx={{p:4}}>
     <Stack  direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 10, md: 7 }}>
       <Box>
        <Stack direction={{xs:"row"}} spacing={{xs:2}} >
          <Typography variant='h4'>Leaderboard</Typography>
            <EmojiEventsIcon style={{height:"50px", width:"50px" ,color:"yellow"}}/>
          </Stack>
       </Box>
      <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell sx={{ px: 10 }}>
              <Typography>Position</Typography>
              </TableCell>
            
              <TableCell sx={{ px: 10}}>
              <Typography>Name</Typography>
              </TableCell>
          
              <TableCell sx={{ px: 10 }}>
              <Typography>TotalExpanses</Typography>
              </TableCell>
              
              </TableRow>
            
            
          </TableHead>
          <TableBody>

            {data.map((item)=>(
              <TableRow>
                 <TableCell sx={{ px: 10 }}>{count++}</TableCell>

               <TableCell sx={{ px: 10 }} >{item.name}</TableCell>
             
               
               
               <TableCell  sx={{ px: 10 }}>{item.totalExpenses}</TableCell>
               </TableRow>
            ))}
           
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
      
     </Stack>
    </Paper>
   </Container>
  )
}

export default Leaderborad