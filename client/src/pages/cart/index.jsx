import React from 'react'
import Navbar from '../../components/ui/navbar'
import { getCartsFromLocalStorage } from '../../utils/constants'
import CartList from './components/carts-list';
import Summary from './components/summary';
import { useSelector } from 'react-redux';


const CartPage = () => {
  const carts = useSelector((state) => state.cart); // Access the cart state from Redux
  console.log(carts);

  return (
    <div className='bg-gray-200'>
      <Navbar />
      <div className='flex flex-col-reverse lg:flex-row md:justify-between '>
        <CartList carts={carts} />
         <div className='lg:mr-6 lg:w-[37vw]  '>
           <Summary />
         </div>
      </div>
    </div>
  )
}

export default CartPage