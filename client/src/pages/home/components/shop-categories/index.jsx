import React from 'react'
import image from '../../../../assets/images/hero-section/shop.png'
import { Link } from 'react-router-dom'

const ShopCategories = () => {
  return (
    <div className='hidden sm:flex flex-col'>
        <div className=' my-7'>
            <div className='text-xl  sm:text-3xl font-bold text-center'>Shop by Category</div>
        </div>
        <div className=' py-4 '>
             <Link to='/welcome-deal' ><img src={image} alt="" className='sm:w-[80vw] mx-auto w-full ' /></Link>
        </div>
    </div>
  )
}

export default ShopCategories