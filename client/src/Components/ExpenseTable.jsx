import { Container, Stack, Typography ,Paper, Box, FormControl, InputLabel,
  Select, MenuItem, TextField, Button,Table, TableBody, TableCell, TableContainer,
   TableHead, TableRow, TablePagination,
  } from '@mui/material'
   import { format } from 'date-fns';
import React, { useState ,useEffect} from 'react';
import axios from "axios";


const ExpenseTable = ({setAmount,setDescription,setCategory,setIsEdit,setId,page,totalItems,rowsPerPage,paginatedData,handleChangePage,handleChangeRowsPerPage}) => {









   const handleEdit=(data)=>{

             setId(data._id);
           setDescription(data.description);
           setAmount(data.amount);
           setCategory(data.category);
           setIsEdit(true);
      
    }


    const handleDelete= async(id)=>{
      const token = JSON.parse(localStorage.getItem('token')); // Retrieve the token from localStorage

      const headers = {
        Authorization: `Bearer ${token}`,
      }
      
      try {
           const res=await axios.delete(`http://localhost:5000/expense/${id}`,{headers});
           console.log(res);
           fetchData(page, rowsPerPage);
      } catch (error) {
         console.log(error);
      }
    }
 
return (
  <Container component="main" maxWidth="lg"  sx={{ mt:7}}>
    <Paper elevation={6}  style={{ backgroundColor: 'lightblue' }}>

  
  <TableContainer>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell><Typography variant='h5'>Date</Typography></TableCell>
              <TableCell><Typography variant='h5'>Category</Typography></TableCell>
              <TableCell><Typography variant='h5'>Description</Typography></TableCell>
              <TableCell><Typography variant='h5'>Amount</Typography></TableCell>
              <TableCell><Typography variant='h5'>Action</Typography></TableCell>
            
            </TableRow>
          </TableHead>
          <TableBody>
          {paginatedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.amount}</TableCell>
                 <Stack direction="row" spacing={2}>
                  <Button variant='outlined' onClick={(e)=>{handleEdit(item)}}>Edit</Button>
                  <Button variant='outlined' onClick={()=>handleDelete(item._id)}>Delete</Button> 
                  </Stack>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>
      <TablePagination
         rowsPerPageOptions={[5,10,20]}
        component="div"
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
  </Container>
)
}

export default ExpenseTable;