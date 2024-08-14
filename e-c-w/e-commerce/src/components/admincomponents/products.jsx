import { Button, TextField } from '@mui/material'
import './products.css'
import { useEffect, useState } from 'react';
import Editproduct from './editproduct.';

function Product() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [productName , setProductName] = useState("")
    const [price,setPrice] = useState("")
    const [description,setDescription] = useState("")
    const [stock,setStock] = useState("")
    const [category,setCategory] = useState("")
    const [tags,setTags] = useState([])
    const [recentProducts,setrecentProducts] = useState([])


    const addProduct = async () => {
      try {
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('stock', stock);
        formData.append('category', category);
        formData.append('tags', JSON.stringify(tags));
    
        // Ensure that selectedImage is not null before appending it to formData
        if (selectedImage) {
          // Convert the base64 string to a Blob
          const blob = await (await fetch(selectedImage)).blob();
          formData.append('image', blob);
        }
    
        const response = await fetch('http://localhost:3000/api/products', {
          method: 'POST',
          body: formData,
        });
    
        if (response.ok) {
          console.log('Product added successfully');
        } else {
          console.error('Failed to add product');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    

    const fetchRecentProducts = async () => {
      try {
        
        const response = await fetch('http://localhost:3000/api/recentProducts');
        const data = await response.json();
  
        
        console.log('Recently Added Products:', data);
      } catch (error) {
        console.error('Error fetching recent products:', error);
      }
    };

    useEffect(() => {
      fetchRecentProducts();
    }, []);
    
    

    const handleImageChange = (event) => {
      const file = event.target.files[0];
  
      // Check if a file is selected
      if (file) {
        const reader = new FileReader();
  
        reader.onload = () => {
          // Set the selected image and display it
          setSelectedImage(reader.result);
        };
  
        // Read the file as a data URL
        reader.readAsDataURL(file);
      }
    };
    return (
        <>
        <div id="productContainer" >
            <div id='' >
            <div id="addProduct" >
                 <div className='ProductText' >
                    Add Product
                 </div>
                 <div className='info' >
                         <div>
                               <div className='infoContainer' >
                                            <div className='infoText' >
                                                Product Name
                                            </div>
                                            <div>
                                            <TextField onChange={(e) => { setProductName(e.target.value)}} id="outlined-basic" label="Product Name" variant="outlined" />
                                            </div>  
                               </div>
                               <div className='infoContainer' >
                                            <div className='infoText' >
                                                Price
                                            </div>
                                            <div>
                                            <TextField onChange={(e) => { setPrice(e.target.value)}} id="outlined-basic" label="Price" variant="outlined" />
                                            </div>  
                               </div>
                               <div className='infoContainer' >
                                            <div className='infoText' >
                                                Category
                                            </div>
                                            <div>
                                            <TextField onChange={(e) => { setCategory(e.target.value)}} id="outlined-basic" label="Category" variant="outlined" />
                                            </div>  
                               </div>
                               <div className='infoContainer' >
                                            <div className='infoText' >
                                                Stock
                                            </div>
                                            <div>
                                            <TextField onChange={(e) => { setStock(e.target.value)}} id="outlined-basic" label="Stock" variant="outlined" />
                                            </div>  
                               </div>
                              
                         </div>

                         <div id='descriptionAndImageSection' >
                            <div className='descriptionAndImageSection' >
                            <TextField
                            onChange={(e) => { setDescription(e.target.value)}}
                                  id="outlined-multiline-static"
                                  label="Description"
                                  multiline
                                  rows={4}
                                  defaultValue=""
                                />
                            <TextField
                            onChange={(e) => { 
                               
                              const tagsArray = e.target.value.split(/\s+/);
                              setTags(tagsArray);

                             }}
                                  id="outlined-multiline-static"
                                  label="Tags"
                                  multiline
                                  rows={3}
                                  defaultValue=""
                                  style={{marginTop : "15px"}}
                                />
                            </div>
                            <div className='descriptionAndImageSection' >
                            <div>
                                  <label htmlFor="fileInput" className="custom-file-upload">
                                    Choose Image
                                  </label>
                                  <input
                                    type="file"
                                    id="fileInput"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                  />
                            
                                  {selectedImage && (
                                    <div id='showSelectedImage' >
                                      <img 
                                        id='image'
                                        src={selectedImage}
                                        alt="Selected"
                                        style={{maxHeight : "200px" , maxWidth : "200px"}}

                                      />
                                    </div>
                                  )}
                                  <div>
                                  <Button onClick={() => {addProduct()}} sx={{backgroundColor : "red"  , fontSize : "10px" }} variant="contained">Submit</Button>
                                  </div>
                                </div>
                            </div>
                         </div>
                 </div>
                 
               </div>
               <div id="editProduct" >
                       <Editproduct></Editproduct> 
                </div>
              
            </div>
            <div id="recentlyAddedProducts" >
                  
            </div>
             
        </div>
        </>
    )
}

export default Product