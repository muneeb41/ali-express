import React from 'react'
import SwiperWraper from '../swiper-wraper'
import { SwiperSlide } from 'swiper/react'
import Loading from '../loading/Loading'
import Cart from '../cart'


const SlideSection = ({loading,products}) => {
  return (
    <div className="py-8 px-4 bg-gray-100   ">
    {loading ? (
      <Loading />
    ) : (
      <SwiperWraper>
        {products.map((product, index) => (
          <SwiperSlide
            key={index}
            className="rounded-xl shadow-lg flex justify-start mx-auto   sm:mx-14  bg-white lg:mx-20 md:mx-16 max-w-60"
          >
            <Cart product={product}/>
          </SwiperSlide>
        ))}
      </SwiperWraper>
    )}
  </div>
  )
}

export default SlideSection