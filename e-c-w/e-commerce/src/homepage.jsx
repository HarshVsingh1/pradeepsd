import BrowseCategories from "./components/browsebycategories";
import Categories from "./components/categories";
import Exploreproduct from "./components/exploreproduct";
import Imageslide from "./components/Imageslides";
import './Homepage.css'
import addbanner from './assets/banner.png'
import Services from "./components/services";
import Newarrival from "./components/newarrivals";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";

function Homepage() {

    const [products,setProducts] = useState([]) ;


    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await fetch('http://localhost:3000/api/products');
            if (!response.ok) {
              throw new Error('Failed to fetch products');
            }
    
            const data = await response.json();
            setProducts(data);
            console.log(data)
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchProducts();
      }, []); 


    return (
        <> 
        <div  >
            <div>
                <Navbar></Navbar>
            </div>
            <div className="centerdiv">
                 <Imageslide></Imageslide>
            </div>
            <div>
                <Categories
                 products={products}
                ></Categories>
            </div>
            <div>
                <BrowseCategories
               
                ></BrowseCategories>
            </div>
            <div>
                <Exploreproduct
                  products={products}
                ></Exploreproduct>
            </div>

           
            <div>
                <Newarrival></Newarrival>
            </div>
            <div>
                <Services></Services>
            </div>
            <div>
                <Footer></Footer>
            </div>
          
        </div>
        </>
    )
}

export default Homepage ;