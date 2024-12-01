import React from 'react'
import apiStore from '../../lib/apiStore';
import Section from '../../components/ui/section';
import Navbar from '../../components/ui/navbar';
import { useEffect, useState } from'react';
import { toast } from 'react-toastify';
import SlideSection from '../../components/ui/slide-section';
import Footer from '../../components/ui/footer';


const KitchenAccessories = () => {
  const [products , setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  
  // Fetch phone products from API here
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);  // Show loading state before fetching data
        const response = await apiStore.get('/products/category/kitchen-accessories')
      console.log(response.data.products)
      setProducts(response.data.products);
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
       <SlideSection products={products} loading={loading} />
       <Section  title={'Kitchen Accessories'} products={[...products].reverse()} loading={loading}/>
       <Footer />
    </div>
  )
}

export default KitchenAccessories