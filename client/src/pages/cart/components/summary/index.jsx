import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../../redux/cart/cartSlice.js";
import { toast } from "react-toastify";


const Summary = () => {
  const carts = useSelector((state) => state.cart); // Access the cart state from Redux
  const totalAmount = carts.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
  const dispatch = useDispatch(); // Access the dispatch function from Redux

  const handleCheckout = ()=>{
      if(carts.length === 0){
        toast.error('Your cart is empty. Please add items to proceed.');
        return;
      }
      dispatch(clearCart()); // Clear the cart before checkout
      toast.success('Order placed successfully. Thank you!');
  }

  return (
    <div className="bg-white shadow-xl p-4 rounded-xl mx-6 my-4 overflow-hidden">
      <div className="py-4">
        <p className="text-2xl font-bold text-center text-gray-800">Summary</p>
        <hr className="my-4 border-gray-300" />
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="table-auto w-full border-collapse border border-gray-200  text-left">
          <thead>
            <tr className="bg-black text-white">
              <th className="px-1 py-2 border border-gray-300 ">Item</th>
              <th className="px-1 py-2 border border-gray-300 hidden sm:table-cell">Quantity</th>
              <th className="px-1 py-2 border border-gray-300 hidden sm:table-cell ">Price</th>
              <th className="px-1 py-2 border border-gray-300 ">Total</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((cart, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}
              >
                <td className="px-1 py-2 border border-gray-300 text-gray-600 font-semibold">{cart.title}</td>
                <td className="px-1 py-2 border border-gray-300 text-blue-600 hidden sm:table-cell">{cart.quantity}</td>
                <td className="px-1 py-2 border border-gray-300 text-red-600 hidden sm:table-cell">${cart.price.toFixed(2)}</td>
                <td className="px-1 py-2 border border-gray-300 text-green-600">
                  ${(cart.price * cart.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-purple-500 font-semibold">
              <td colSpan={3} className="px-1 py-2 border border-gray-300 text-white hidden sm:table-cell">
                Total Amount:
              </td>
              <td colSpan={1} className="px-1 py-2 border border-gray-300 text-white sm:hidden ">
                Total Amount:
              </td>
              <td className="px-1 py-2 border border-gray-300 text-white">
                ${totalAmount.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-4 text-center">
        <button  onClick={handleCheckout} 
        className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-2 rounded-lg">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Summary;
