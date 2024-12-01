import React, { useEffect, useState } from 'react'
import apiStore from '../../lib/apiStore';
import Navbar from '../../components/ui/navbar';
import Section from '../../components/ui/section';

import { toast } from'react-toastify';
import SlideSection from '../../components/ui/slide-section';
import Footer from '../../components/ui/footer';



const Groceries = () => {
  const [products , setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  
  // Fetch phone products from API here
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);  // Show loading state before fetching data
        const response = await apiStore.get('/products/category/groceries')
      console.log(response.data.products)
      setProducts(response.data.products.slice(0.25));
      } catch (error) {
         console.error('Error fetching products:', error);
        toast.error('api error')
      }finally{
        setLoading(false);  // Hide loading state after fetching data or error occurred
      }
    };
    fetchProducts();
  }, []);


 
  return (
    <div>
       <Navbar />
       <SlideSection products={[...products].reverse()} loading={loading} />
       <Section  title={'Groceries'} products={products} loading={loading}/>
       <Footer />
    </div>
  )
}

export default Groceries