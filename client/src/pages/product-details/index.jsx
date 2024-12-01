import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/ui/loading/Loading";
import apiStore from "../../lib/apiStore";
import Navbar from "../../components/ui/navbar";
import { FaCheckCircle, FaTruck, FaUndo } from "react-icons/fa";
import { toast } from "react-toastify";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import CircleProgress  from "./components/cicle-progress";
import StarRating from "./components/star-rating";
import { getUserFromLocalStorage } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const user = getUserFromLocalStorage();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiStore.get(`/products/${id}`);
        console.log(response.data);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("API error");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [id]);

  const handleAddToCart = async () => {
    const payload = {...product,quantity};
    if (!user) {
      toast.error("You need to login to add items to cart");
      navigate('/signup');
      return;
    }
    dispatch(addToCart(payload));
    toast.success("Item added to cart");
  }

  const handleBuy = ()=>{
    toast.success("Order Placed successfully");
  }



  return (
    <div>
      <Navbar />
      {loading && <Loading />}
      {!loading && <div className="max-w-6xl mx-auto p-6 ">
        <div className="flex flex-col sm:flex-row bg-white shadow-md box-shadow-main rounded-lg overflow-hidden">
          {/* Image Section */}
          <div className="w-full flex justify-center sm:items-center lg:w-1/2 p-4">
            <img
              src={product.thumbnail || "placeholder.png"}
              alt={product.title || "Product Image"}
              className=" rounded-lg w-[35vw] hover-scale "
            />
          </div>

          {/* Details Section */}
          <div className="w-full lg:w-1/2 p-6 space-y-2  sm:space-y-3">
            <h2 className="text-2xl font-bold text-gray-800">
              {product.title || "Product Title"}
            </h2>
            <p className="text-gray-500">{product.category || "Category"}</p>
            <div className="flex items-center space-x-3">
              <p className="text-xl font-semibold text-red-600">
                ${Number(product.price)?.toFixed(2) || "0.00"}
              </p>
              {product.discountPercentage > 0 && (
                <span className="ml-2 text-md text-gray-500 line-through">
                  {/* calculate amount before discount  with formula*/}$
                  {(
                    product.price /
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </span>
              )}
            </div>
            {product.discountPercentage && (
              <div className="text-xl font-semibold text-green-600 flex justify-start gap-5 ">
                <span>Save {product.discountPercentage}%</span>
                {/* this is rating container */}
                <span className="relative bottom-1">
                  {" "}
                  <CircleProgress
                    percentage={Math.floor(product.rating * 2 * 10)}
                  />
                </span>
              </div>
            )}
              {/* this is rating container */}
            <StarRating rating={product.rating} />
            <hr />
            <p className="text-gray-700">
              {product.description || "No description available"}
            </p>
            <hr />
            {/* Availability */}
            <div className="flex items-center space-x-2">
              <FaCheckCircle className="text-green-500" />
              <span className="text-sm text-gray-600">
                {product.availabilityStatus || "Unavailable"} (
                {product.stock || 0} available)
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {product.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-600 text-sm py-1 px-2 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Shipping, Return, and Warranty */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FaTruck className="text-purple-600" />
                <span className="text-sm text-gray-600">
                  {product.shippingInformation || "No shipping information"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FaUndo className="text-blue-500" />
                <span className="text-sm text-gray-600">
                  {product.returnPolicy || "No return policy"}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-600">
                  Warranty: {product.warrantyInformation || "No warranty"}
                </span>
              </div>
            </div>

            {/* Dimensions & Weight */}
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                Dimensions: {product.dimensions?.width || 0}cm (W) x{" "}
                {product.dimensions?.height || 0}cm (H) x{" "}
                {product.dimensions?.depth || 0}cm (D)
              </p>
              <p>Weight: {product.weight || 0}kg</p>
            </div>
            <hr />

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

            {/* Buy Button */}
            <button  onClick={handleAddToCart}
            className="w-full py-2  bg-blue-600 text-white font-semibold shadow-xl rounded-md hover:bg-blue-700 transition  ">
              Add to Cart
            </button>
            {/* Buy Button */}
            <button onClick={handleBuy}
             className="w-full py-2 bg-red-600 text-white font-semibold shadow-2xl rounded-md hover:bg-red-700 transition">
                Buy Now
            </button>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default ProductDetails;
