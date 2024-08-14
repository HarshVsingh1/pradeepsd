

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));







export default function AdminHomeTables() { 
const [rows,setRows] = useState([])
 
const userEmail = sessionStorage.getItem('email')
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  useEffect(()=>{

    const approve = async (appointmentId) => {
  
    
      
        
      const response = await axios.get(`${API_BASE_URL}/api/paymentrequests`) 
    
      if(response.status == 200){
        console.log(response.data)
        setRows(response.data)
      }
    } 
  
    approve()
  },[])

  if(!rows) {
    return (
        <div>
                  "wait"
        </div>
    )
  } else {
        
    return (  
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell align="right">price</StyledTableCell>
              <StyledTableCell align="right">hash</StyledTableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
               
                <StyledTableCell align="left">{row.email}</StyledTableCell>
                <StyledTableCell align="right">{row.price}</StyledTableCell>
                <StyledTableCell align="right">{row.hash}</StyledTableCell>
               
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );

  }


  
}