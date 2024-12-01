import React from "react";
import { FaCartPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { getUserFromLocalStorage } from "../../../utils/constants.js";

import { addToCart } from "../../../redux/cart/cartSlice.js";





const Cart = ({ product })=> {
    const navigate = useNavigate();
    const user = getUserFromLocalStorage();
    const dispatch = useDispatch();


    const handleDetails = () => {
    navigate(`/product-details/${product.id}`);
  };

  const handleAddToCart = async () => {
    const payload = {...product,quantity:1};
    if (!user) {
      toast.error("You need to login to add items to cart");
      navigate('/signup');
      return;
    }
    dispatch(addToCart(payload));
    toast.success("Item added to cart");
  }

  return (
    <div className="w-60 bg-white border rounded-lg shadow-lg overflow-hidden hover-scale">
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        {/* Add to Cart Icon */}
        <button onClick={handleAddToCart}
         className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-gray-200 hover-scale">
         <FaCartPlus className="text-3xl hover:text-blue-500" />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800">{product.title.length >20?(`${product.title.slice(0,16)}...`):(product.title)}</h3>
       
       <div className="flex justify-between gap-0 "> 
        {/* Price and Discount */}
        <div className="flex items-center mt-2">
          <span className="text-xl font-bold text-red-600">
            ${product.price.toFixed(2)}
          </span>
          {product.discountPercentage > 0 && (
            <span className="ml-2 text-md text-gray-500 line-through">
                {/* calculate amount before discount  with formula*/}
              $
              {(
                product.price /
                (1 - product.discountPercentage / 100)
              ).toFixed(2)}
            </span>
          )}
        </div>
        <div>
            <CircleProgress percentage={Math.floor(product.rating *2 *10)} />
        </div>
       </div>

        {product.discountPercentage > 0 && (
          <p className="text-lg font-semibold text-green-600 mt-1 ">
            Save {product.discountPercentage.toFixed(1)}%
          </p>
        )}
      </div>

      {/* Call-to-Action Button */}
      <div className="px-4 pb-4">
        <button onClick={handleDetails}
         className="w-full text-lg bg-black text-white py-2 rounded-full hover:bg-blue-700">
          See Preview
        </button>
      </div>
    </div>
  );
}

export default Cart;




const CircleProgress = ({ percentage }) => {
    let color = '#53f57e'
    // this component change its color according to given percentage 
    if(percentage >=80){
        color = '#53f57e' // green
    }else if(percentage >=60){
        color = "#f7c65c"  // orange-yellow
    }else{
        color = "#f55045"  // lite-red
    }
  return (
    // this component show movie and tv show rating in percentage 
    <div className='relative '>
      <div className="relative rounded-full bg-black h-9 w-9 z-10 xl:h-11 xl:w-11">
        <div
          className="absolute top-0 left-0 rounded-full h-9 w-9 z-20 p-1 xl:h-11 xl:w-11"
          style={{
            background: `conic-gradient(${color} ${percentage}%, gray ${percentage}%)`
          }}
        >
          <div className={`flex justify-center items-center rounded-full h-7 w-7 xl:h-9 xl:w-9 bg-black `}
            style={{
                color: color
            }}
          >
            {percentage}<span className='text-[10px]'>%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

