import { Container, Stack, Typography ,Paper, Box, FormControl, InputLabel,
   Select, MenuItem, TextField, Button} from '@mui/material'

import React, { useState ,useEffect} from 'react';
import axios from "axios";
import { format } from 'date-fns';
import ExpenseTable from './ExpenseTable';




const AddExpenses = () => {

  const [description, setDescription] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [data,setData]=useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [paginatedData, setPaginatedData] = useState([]);

  const [isEdit,setIsEdit]=useState(false);
  const [id,setId]=useState(false);



  const fetchData = async (page, rowsPerPage) => {

    const token = JSON.parse(localStorage.getItem('token'));
    const userId = JSON.parse(localStorage.getItem('userId')); // Retrieve the token from localStorage

    const headers = {
      Authorization: `Bearer ${token}`,
    }
    try {
      const response = await axios.get(`http://localhost:5000/expense/${userId}?page=${page+1}&perPage=${rowsPerPage}`,{headers});
   
     console.log(response)


        setTotalItems(response.data.totalCount);
      const formattedDates = response.data.expenses.map(item => {
        const formattedDate = format(new Date(item.createdAt), 'dd, MMMM yyyy');
        return { ...item, date: formattedDate };
      });
  
      // Update the state with the formatted data
     // This header should contain the total count from the server
      setPaginatedData(formattedDates);
      console.log( paginatedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
   fetchData(page, rowsPerPage);
  }, [page, rowsPerPage]);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  
    const handleChangeRowsPerPage = event => {
      const newRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(newRowsPerPage);
      setPage(0);
    };


 

  //Add Expenses in databse
  const handleSubmit= async(e)=>{

    const token = JSON.parse(localStorage.getItem('token')); // Retrieve the token from localStorage
    const userId=JSON.parse(localStorage.getItem('userId')); 
    const headers = {
      Authorization: `Bearer ${token}`,
    }

  e.preventDefault();

  if(isEdit && id){

    const res=await axios.put(`http://localhost:5000/expense/${id}`,{category,description,amount},{headers});
    console.log(res);
    setIsEdit(false);
    setAmount("");
    setCategory("");
    setDescription("");
    fetchData(page, rowsPerPage);

  }else{
    const res=await axios.post(`http://localhost:5000/expense/${userId}`,{category,description,amount},{headers});
    console.log(res); 
    setAmount("");
    setCategory("");
    setDescription("");
    fetchData(page, rowsPerPage);
  

  }

  }




  
  return (
  <>
  <Container component="main" maxWidth="lg"  sx={{mt:14}}>

    <Paper sx={{p:3}} elevation={6} style={{ backgroundColor: 'lightblue' }}>

      <form onSubmit={handleSubmit}>
    <Stack>
   <Stack   direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 3, sm: 2, md: 4 }}>
   <Box sx={{ minWidth: 250 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={(e)=>setCategory(e.target.value)}
        >
          <MenuItem value="Electric">Electric</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Transportation">Transportation</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Box sx={{ minWidth: 320 }} >
      <TextField  label="Description" type='text'  name="description"  value={description} onChange={(e)=>setDescription(e.target.value)}fullWidth/>
    </Box>

    <Box sx={{ minWidth: 200 }} >
      <TextField  label="Amount" type='number' fullWidth onChange={(e)=>setAmount(e.target.value)} value={amount} />
    </Box>

    <Box sx={{ minWidth: 130 }} >
      <Button variant='outlined' type='submit'>{isEdit?"Edit Expense":"Add Expense"}</Button>
    </Box>


</Stack>
   </Stack>
   </form>
    </Paper>
 
  </Container>

  <ExpenseTable  
   setAmount={setAmount} setCategory={setCategory} 
   setDescription={setDescription}
   setIsEdit={setIsEdit}
   setId={setId}
    page={page}
    rowsPerPage={rowsPerPage}
    totalItems={totalItems}
    paginatedData={paginatedData}
    handleChangePage={handleChangePage}
    handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  </>
  )
}

export default AddExpenses