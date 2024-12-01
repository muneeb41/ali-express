import React, { useState } from 'react'
import Navbar from '../../components/ui/navbar'
import Section from '../../components/ui/section'
import { toast } from 'react-toastify';
import { useEffect } from'react';
import apiStore from '../../lib/apiStore';
import SlideSection from '../../components/ui/slide-section';
import Footer from '../../components/ui/footer';




const Phone = () => {
  const [products , setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  
  // Fetch phone products from API here
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);  // Show loading state before fetching data
        const response = await apiStore.get('/products/category/smartphones')
      console.log(response.data.products)
      setProducts(response.data.products.slice(0,15));
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
       <Section  title={'SmartPhones'} products={products} loading={loading}/>
       <Footer />
    </div>
  )
}

export default Phone