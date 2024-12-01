import React, { useState } from "react";
import Cart from "../cart";
import { useNavigate } from "react-router-dom";

const CartList = ({ carts }) => {
    const [totalAmount , setTotalAmount] = useState([]);
    const navigate = useNavigate()
  return (
    <div className="bg-white shadow-xl rounded-xl mx-6 my-4 lg:w-[60vw] ">
      <div className="py-4">
        <p className="text-3xl font-semibold ml-10">Shopping Cart</p>
        <hr className="mx-3 my-4" />
      </div>
      {/* this is a container of a list of of cart items */}
      <div>
        { !carts?.length && <div className="flex flex-col justify-center items-center">
            <p className="text-center text-xl">Your cart is empty</p>
            <button onClick={()=> navigate('/')}
              className="mt-4 px-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                Continue Shopping
            </button>
        </div>  }
        {carts?.map((cart, index) => {
          return (
            <div key={cart.id}>
              <Cart  cart={cart} />
              <hr className="mx-2 w-full"  />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartList;
