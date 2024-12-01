import React, { useEffect, useState } from 'react'
import StarRating from '../stat-rating'
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaCheckCircle, FaTruck, FaUndo } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { updateQuantity ,removeFromCart } from '../../../../redux/cart/cartSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Cart = ({cart }) => {
    const [quantity, setQuantity] = useState(cart.quantity)
    const dispatch  = useDispatch();
    const navigate = useNavigate()
   useEffect(()=>{
    const handleUpdateQuantity = ()=>{
        dispatch(updateQuantity({id: cart.id, quantity}));
    }
    handleUpdateQuantity()
   },[quantity])

   const  handleRemmoveCart = ()=>{
      dispatch(removeFromCart({id: cart.id}));
      toast.success('Cart removed successfully')
   }

   const handleDetails = () => {
    navigate(`/product-details/${cart.id}`);
  };
  return (
    <div  className=" flex flex-col sm:flex-row justify-start py-3 w-full ">
              <img
                src={cart.thumbnail}
                alt={cart.title}
                className="w-60 h-60 mr-4"
              />
              {/* container of information about the cart */}
              <div className="flex flex-col space-y-2 ml-7">
                <h2 className="text-xl font-bold text-gray-800">
                  {cart.title || "Product Title"}
                </h2>
                {/* container for price */}
                <div className="flex items-center space-x-3">
                  <p className="text-xl font-semibold text-red-600">
                    ${Number(cart.price)?.toFixed(2) || "0.00"}
                  </p>
                  {cart.discountPercentage > 0 && (
                    <span className="ml-2 text-md text-gray-500 line-through">
                      {/* calculate amount before discount  with formula*/}$
                      {(
                        cart.price /
                        (1 - cart.discountPercentage / 100)
                      ).toFixed(2)}
                    </span>
                  )}
                  {cart.discountPercentage && (
                    <div className="text-xl font-semibold text-green-600 flex justify-start gap-5 ">
                      <span>Save {cart.discountPercentage}%</span>
                    </div>
                  )}
                </div>
                <StarRating rating={cart.rating} />

                {/* Add Quantity container */}
                <div className="flex items-center gap-1 sm:gap-4 mt-4">
                  {/* Quantity Label */}
                  <label className="text-sm font-medium text-gray-600 ">
                    Quantity:
                  </label>

                  {/* Decrease Button */}
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))} // Prevent going below 1
                    className="flex items-center justify-center w-8 h-8 text-white bg-red-500 hover:bg-red-700 rounded-full"
                  >
                    <AiOutlineMinus size={16} />
                  </button>

                  {/* Quantity Input */}
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-10 sm:w-16 text-center py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />

                  {/* Increase Button */}
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="flex items-center justify-center w-8 h-8 text-white bg-green-500 hover:bg-green-600 rounded-full"
                  >
                    <AiOutlinePlus size={16} />
                  </button>
                </div>

                {/* Shipping, Return, and Warranty */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FaTruck className="text-purple-600" />
                <span className="text-sm text-gray-600">
                  {cart.shippingInformation || "No shipping information"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FaUndo className="text-blue-500" />
                <span className="text-sm text-gray-600">
                  {cart.returnPolicy || "No return policy"}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-600">
                  Warranty: {cart.warrantyInformation || "No warranty"}
                </span>
              </div>
            </div>

            
              {/* Total Price */}
               <div className="text-xl font-semibold text-red-600">
                Total: <span className='text-neutral-700'>${quantity * cart.price}</span>
               </div>

                {/* container for remove button and view button */}
               <div className='flex justify-start'>
                  <button onClick={handleRemmoveCart}
                  className="flex items-center justify-center w-24  text-lg bg-red-500 text-white py-1 rounded-full hover:bg-red-800">
                    Remove
                  </button>
                  <button onClick={handleDetails}
                  className="flex items-center justify-center w-24 text-lg bg-blue-500 text-white py-1 rounded-full hover:bg-blue-600 ml-4">
                    View
                  </button>
 
               </div>
              </div>
              
            </div>
  )
}

export default Cart