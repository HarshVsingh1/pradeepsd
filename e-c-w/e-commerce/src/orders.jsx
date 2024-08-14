import { useEffect, useState } from "react";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button} from "@mui/material"


function Order() {
     const token = sessionStorage.getItem('token')
     const email = sessionStorage.getItem('email')
     const [orderplaced,setOrderplaced] = useState([])
    const orders = async() => { 
        try{
            const response = await fetch('http://localhost:3000/user/orderplaced' , {
                method : "POST" ,
                headers :{
                    'Content-Type' : "application/json" ,
                    authorization : token
                } ,
                body : JSON.stringify({
                    email 
                })
            }) 

            if(response.ok) {
                 const data = await response.json()
                 setOrderplaced(data.orderlist)
                 console.log(data)
            }
        }catch(error) {
             console.error("error :" , error.message)
        }
       
    } 


    useEffect(() => {
        orders()
    },[])
    

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

    return (
        <>
        <div>
              <div>
                <Navbar></Navbar>
              </div> 

              {orderplaced.length == 0 ? (
                 <div style={{display : "flex" , flexDirection : "column" , gap : "20px" , justifyContent : "center" , alignItems : "center" , width : "100%"}} > 
                 <div id='descriptiontext' > You haven't added anything in the cart Shop here </div>
                 <div>
                 <Button  onClick={() => {navigate('/')}} sx={{backgroundColor : "red" , ":hover"  : { backgroundColor : "#BF3131"}}} variant="contained">Home</Button>
                
                 </div>
                
             </div>
              ) : (
                <div>
                <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell><img style={{height : "40px",backgroundColor : "white"}} src="https://cdn2.iconfinder.com/data/icons/designers-and-developers-icon-set/32/image-512.png"></img></StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Order Timing</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderplaced.map((row) => ( 
                
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                <img style={{height : "40px",backgroundColor : "white"}} src={`data:image/png;base64,${row.imageUrl}`}></img>
                </StyledTableCell>
                <StyledTableCell align="right">{row.productName}</StyledTableCell>
                <StyledTableCell align="right">{row.price}</StyledTableCell>
                <StyledTableCell align="right">{row.createdAt ? new Date(row.createdAt).toDateString() : ''}</StyledTableCell>
                <StyledTableCell align="right">{row.protein}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
</div>
              )} 

              <div>
                <Footer></Footer>
              </div>
        </div>
        </>
    )
}

export default Order ;