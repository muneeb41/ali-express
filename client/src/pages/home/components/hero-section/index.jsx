import React, { useState } from 'react'
import banner from '../../../../assets/images/hero-section/banner.png'
import banner2 from '../../../../assets/images/hero-section/banner2.png'
import banner3 from '../../../../assets/images/hero-section/banner3.png'
import banner4 from '../../../../assets/images/hero-section/banner4.png'
import small from '../../../../assets/images/hero-section/1.jpg'
import small2 from '../../../../assets/images/hero-section/2.jpg'
import small3 from '../../../../assets/images/hero-section/3.jpg'
import small4 from '../../../../assets/images/hero-section/6.jpg'
import { Swiper } from 'swiper/react'
import { SwiperSlide } from 'swiper/react'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";


import SwiperWraper from '../../../../components/ui/swiper-wraper'


import apiStore from '../../../../lib/apiStore';
import Loading from '../../../../components/ui/loading/Loading';

import { useEffect } from'react';
import Cart from '../../../../components/ui/cart';
import SlideSection from '../../../../components/ui/slide-section';




const HeroSection = () => {

   const imagesForLargerScreen = [banner, banner2 ,banner3, banner4];
   const imagesForSmallerScreen = [small , small2, small3, small4];
    
  //    const [products,setProducts] = useState([]);
  //    const [loading, setLoading] = useState(false);
  
  
  //     // Fetch products from the API
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       setLoading(true); // Show loading state
  //       const response = await apiStore.get('/products?skip=159');
  //       setProducts(response.data.products.sort(() => Math.random() - 0.5));
  //     } catch (error) {
  //       console.error('Error fetching products:', error);
  //       toast.error('Failed to load products. Please try again.');
  //     } finally {
  //       setLoading(false); // Hide loading state
  //     }
  //   };

  //   fetchProducts();
  // }, []);
  // <img src={banner1} alt="" className='w-full h-full ' />

  return (
    <div className='w-full h-[52vh]'>
         <Swiper
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Navigation, Autoplay]} // Add modules for pagination and navigation
        spaceBetween={0} // Space between slides
        slidesPerView={1} // Number of slides visible at a time
        
        loop={true} // Enable infinite looping
        className="h-full "
        speed={600}
      >
         {imagesForLargerScreen.map((image, index) =>(
         <SwiperSlide key={index} className=''>
         <img src={imagesForLargerScreen[index]} alt="Slide" className="h-full w-full hidden sm:flex " />
         <img src={imagesForSmallerScreen[index]} alt="Slide" className="h-full w-full sm:hidden" />
       </SwiperSlide>
       ))}
     
        
      </Swiper>
    </div>

  )
}

export default HeroSection

