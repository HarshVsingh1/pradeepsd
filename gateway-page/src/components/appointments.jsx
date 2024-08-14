import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AppointmentTables() {
  const [rows, setRows] = useState([]);
 
  const userEmail = sessionStorage.getItem("email");
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  

 
  useEffect(() => {
    const data = {
      userEmail,
    };

    const fetch = async () => {
      const response = await axios.get(
        `${API_BASE_URL}/users`,
        data
      );
      setRows(response.data);
      console.log(response);
    };

    fetch();
  }, []);

  if (!rows) {
    return <div>{"hi"}</div>;
  } else {
    return (
      <TableContainer
        style={{ overflowY: "scroll"}}
        component={Paper}
      >
        <Table
          sx={{ minWidth: 700 }}
          stickyHeader
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="right">Password</StyledTableCell>
              <StyledTableCell align="right">Api key</StyledTableCell>
              <StyledTableCell align="right">Wallet Address</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                
                <StyledTableCell align="left">{row.email}</StyledTableCell>
                <StyledTableCell align="right">{row.password}</StyledTableCell>
                <StyledTableCell align="right">{row.apiKey}</StyledTableCell>
                <StyledTableCell align="right">{row.walletAddress}</StyledTableCell>
                
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}