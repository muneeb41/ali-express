import React, { useEffect, useState } from 'react'
import CountdownTimer from '../../../../components/ui/CountdownTimer/index.jsx';
import SlideSection from '../../../../components/ui/slide-section/index.jsx'
import apiStore from '../../../../lib/apiStore.js'
import { toast } from'react-toastify';


const TodayDeal = () => {
    const [products , setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Show loading state before fetching data
  
        // Fetch all products concurrently
        const [shirtsResponse, shoesResponse, watchesResponse] = await Promise.all([
          apiStore.get('/products/category/mens-shirts'),
          apiStore.get('/products/category/mens-shoes'),
          apiStore.get('/products/category/mens-watches'),
        ]);
  
         // Combine all products
      let allProducts = [
        ...shirtsResponse.data.products,
        ...shoesResponse.data.products,
        ...watchesResponse.data.products,
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
    <div className=''>
        <div className=' my-7'>
            <div className='text-3xl font-bold text-center'>Today's deals</div>
        </div>
        <div className='bg-gray-100 py-4 '>
             <div className='text-3xl font-bold text-center'>SuperDeals</div>
             <div className='flex justify-center py-6'><CountdownTimer /></div>
        </div>
        <SlideSection products={products} loading={loading} />
    </div>
  )
}

export default TodayDeal