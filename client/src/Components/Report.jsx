import { Button, Container, Paper,Stack, Typography ,TableContainer,Table,TableBody,TableCell,TableHead,TableRow} from '@mui/material'
import React ,{useState}from 'react';
import DatePicker from "react-datepicker";
import axios from "axios";
import { format } from 'date-fns';

import "react-datepicker/dist/react-datepicker.css";

const Report = () => {

  const [totalSumDay,setTotalSumDay]=useState(0);
  const [totalSumMonth,setTotalSumMonth]=useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [dayData,setDayData]=useState([]);
  
  const [monthData,setMonthData]=useState([]);
  const day = (startDate.getUTCDate()).toString().padStart(2, '0'); // Get day and ensure 2 digits
  const month = (startDate.getUTCMonth() +1).toString().padStart(2, '0'); // Get month and ensure 2 digits
  const year = startDate.getUTCFullYear();

  
  const date = `${day}-${month}-${year}`;
   console.log(date)
 
 const handleReportByMonth= async()=>{

  const token = JSON.parse(localStorage.getItem('token'));
  const userId= JSON.parse(localStorage.getItem('userId'));
  
 // Retrieve the token from localStorage

  const headers = {
    Authorization: `Bearer ${token}`,
  }

 
  try {
    const response = await axios.get(`http://localhost:5000/expense/search/month/${userId}?date=${date}`,{headers});
     console.log(response);
     const formattedDates = response.data.map(item => {
      const formattedDate = format(new Date(item.createdAt), ' MMMM ');
      return { ...item, date: formattedDate };
    });
        setMonthData(formattedDates);
     const totalAmount=response.data.reduce((acc,val)=>acc+val.amount,0);
  setTotalSumMonth(totalAmount);


     
  } catch (error) {
    console.error('Error fetching search results:', error);
  }

}
  
console.log(monthData);
  const handleReport= async(e)=>{
  e.preventDefault();
    const token = JSON.parse(localStorage.getItem('token'));
    const userId= JSON.parse(localStorage.getItem('userId'));
    
   // Retrieve the token from localStorage

    const headers = {
      Authorization: `Bearer ${token}`,
    }

   
    try {
      const response = await axios.get(`http://localhost:5000/expense/search/day/${userId}?date=${date}`,{headers});
       console.log(response);
       const formattedDates = response.data.map(item => {
        const formattedDate = format(new Date(item.createdAt), 'dd, MMMM yyyy');
        return { ...item, date: formattedDate };
      });
          setDayData(formattedDates);
       const totalAmount=response.data.reduce((acc,val)=>acc+val.amount,0);
       setTotalSumDay(totalAmount);


       
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }


  return (
    <>
     <Container component="main" maxWidth="lg"  sx={{ mt:20}}>
    <Paper elevation={6}  style={{ backgroundColor: 'lightblue' }}  sx={{p:4}}>
     <Stack    direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 4, sm: 2, md: 4 }}>
      <Stack direction={{ xs: 'column'}}   spacing={{ xs: 3 }}>
        <Typography variant='h5'  >DAILY REPORTS</Typography>
        <Typography>Set Date</Typography>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd/MM/yyyy"  defaultValue="selec the date"/>
        <Button variant='contained' sx={{ mt: 2, width: '40px', height: '40px' }} onClick={handleReport}>Show</Button>
      </Stack>

      {dayData.length>0 ?(
         <TableContainer >
         <Table >
           <TableHead>
             <TableRow>
             <TableCell >Date</TableCell>
               <TableCell>Category</TableCell>
               <TableCell >Description</TableCell>
               <TableCell >Amount</TableCell>
              
             
             </TableRow>
           </TableHead>
           <TableBody>
             {dayData.map((row) => (
               <TableRow
                 key={row._id
                }
                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
               >
                 <TableCell component="th" scope="row">
                   {row.date}
                 </TableCell>
                 <TableCell >{row.category}</TableCell>
                 <TableCell >{row.description}</TableCell>
                 <TableCell >{row.amount}</TableCell>
               </TableRow>
             
             ))}
               <TableRow >
               <TableCell >{"     "}</TableCell>
               <TableCell >{"     "}</TableCell>
               <TableCell >{"     "}</TableCell>
               <TableCell >{`Total : ${totalSumDay}`}</TableCell>
                  </TableRow> 
           </TableBody>
         </Table>
       </TableContainer>
      ) :(" ")}
     
     </Stack>
    </Paper>
   </Container>


     {/*  Second Container */}

     <Container component="main" maxWidth="lg"  sx={{ mt:7}}>
    <Paper elevation={6}  style={{ backgroundColor: 'lightblue' }}  sx={{p:4}}>
     <Stack    direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 4, sm: 2, md: 4 }}>
      <Stack direction={{ xs: 'column'}}   spacing={{ xs: 3 }}>
        <Typography variant='h5'  >MONTHLY REPORTS</Typography>
        <Typography>Set Date</Typography>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd/MM/yyyy"/>
        <Button variant='contained' sx={{ mt: 2, width: '40px', height: '40px' }} onClick={handleReportByMonth}>Show</Button>
      </Stack>

      {monthData.length>0 ? (<TableContainer >
      <Table >
        <TableHead>
          <TableRow>
          <TableCell >Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell >Description</TableCell>
            <TableCell >Amount</TableCell>
           
          
          </TableRow>
        </TableHead>
        <TableBody>
          {monthData.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell >{row.category}</TableCell>
              <TableCell >{row.description}</TableCell>
              <TableCell >{row.amount}</TableCell>
            </TableRow>
          
          ))}
            <TableRow >
            <TableCell >{"     "}</TableCell>
            <TableCell >{"     "}</TableCell>
            <TableCell >{"     "}</TableCell>
            <TableCell >{`Total : ${totalSumMonth}`}</TableCell>
               </TableRow> 
        </TableBody>
      </Table>
    </TableContainer>) :(" ")}
     
     </Stack>
    </Paper>
   </Container>
    </>
  
  )
}

export default Report