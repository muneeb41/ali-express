import React, { useEffect, useState } from 'react'
import Navbar from '../../components/ui/navbar'
import HeroSection from './components/hero-section'
import TodayDeal from './components/today-deal'
import ShopCategories from './components/shop-categories'
import Section from '../../components/ui/section'
import apiStore from '../../lib/apiStore'
import FooterAdditionalDetails from './components/footer-additional-details'
import Footer from '../../components/ui/footer'



const Home = () => {
  const [products , setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Show loading state before fetching data
  
        // Fetch all products concurrently
        const [response1, response2, response3,response4 ] = await Promise.all([
          apiStore.get('/products/category/tablets'),
          apiStore.get('/products/category/furniture'),
          apiStore.get('/products/category/laptops'),
          apiStore.get('/products/category/motorcycle'),
        ]);
  
         // Combine all products
      let allProducts = [
        ...response1.data.products,
        ...response2.data.products,
        ...response3.data.products,
        ...response4.data.products,
      ];

      // Shuffle the products array
      allProducts = allProducts.sort(() => Math.random() - 0.5);

      // Set shuffled products
      setProducts(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false); // Hide loading state after fetching data or error
      }
    };
  
    fetchProducts();
  }, []);






 
  return (
    <div>
        <Navbar />
        <HeroSection />
        <TodayDeal />
        <ShopCategories />
        <Section title={'More to Love'} products={products} loading={loading}  />
        <FooterAdditionalDetails />
        <Footer />
    </div>
  )
}

export default Home