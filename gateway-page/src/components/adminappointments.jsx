

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
})); 







export default function AdminAppointmentTables() {
  const [rows ,setRows] = useState([])

const userEmail = sessionStorage.getItem('email')
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const fetch = async () => {
               
  const response = await axios.post(`${API_BASE_URL}/doctor/appointments`, {userEmail})
  setRows(response.data)
console.log(response)


} 

useEffect(() => { 

  fetch()
 
} ,[]) 


const approve = async (id) => {
  
  console.log(id)
  const data = {
    email : userEmail ,
    appointmentId : id
  }
  console.log(data)
    
  const response = await axios.put(`${API_BASE_URL}/doctor/appointment/approve`, data) 

  if(response.status == 200){
   fetch()
    console.log(response.data)
  }
} 

  
if(!rows) {
  return (
      <div>
                "wait"
      </div>
  )
} else {

  return (  
    <TableContainer  style={{overflowY : "scroll" , height : '400px'}}   component={Paper}>
      <Table sx={{ minWidth: 700  }} stickyHeader aria-label="customized table">
        <TableHead >
          <TableRow>
            <StyledTableCell>User Email</StyledTableCell>
            <StyledTableCell align="right">date</StyledTableCell>
            <StyledTableCell align="right">time</StyledTableCell>
            <StyledTableCell align="right">status</StyledTableCell> 
            
            
          </TableRow>
        </TableHead>
        <TableBody   >
          {rows.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {row.userEmail}
              </StyledTableCell>
              <StyledTableCell align="right">{row.date}</StyledTableCell>
              <StyledTableCell align="right">{row.time}</StyledTableCell>
              <StyledTableCell align="right">
              <div style={{display : "flex" , justifyContent : "flex-end"  , gap : "10px"}} > 

               
              <div>
              <Button  onClick={() => approve(row._id)} variant="contained">Approve</Button>

                </div>

                <div>
                <Button  sx={{backgroundColor : "red" , '&:hover' : {backgroundColor : "darkred"}}} variant="contained">Reject</Button>
                </div>
              

                   
                  
                </div>
              </StyledTableCell>

             
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
}