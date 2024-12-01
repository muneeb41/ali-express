import React from "react";
import logo from "../../../assets/images/logo/logo-white.png";
import { IoMenu } from "react-icons/io5";
import { allCategories } from "../../../utils/allCategoriesData.js";
import { useState } from "react";
import { ImCross } from "react-icons/im";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { logout } from "../../../redux/user/userSlice.js";
import { MdQrCode2 } from "react-icons/md";
import { TbMenuOrder } from "react-icons/tb";
import {
  FaUserCircle,
  FaCartPlus,
  FaRegHeart,
  FaCoins,
  FaEnvelope,
  FaMoneyBillAlt,
} from "react-icons/fa";
import {
  getUserFromLocalStorage,
  LOGOUT_ROUTES,
} from "../../../utils/constants.js";
import apiClient from "../../../lib/apiClient.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import downloadAppImage from "../../../assets/images/download-app/app.png";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isSearch,setIsSearch] = useState(false);
  const carts = useSelector((store)=> store.cart)
  const user = getUserFromLocalStorage()

  const handleGoToCart = ()=>{
    if(!user){
      toast.error("You must be logged in to view your cart")
      navigate('/signup');
  
    }else{
      navigate('/cart');
    }
  }

  return (
     <div className="box-shadow-main">
           <div className="bg-black flex justify-between px-3 items-center h-14 ">
      {isSearch? (<div className="flex items-center justify-around">
               <ImCross className="text-white" onClick={()=>setIsSearch(false)} />
               <div className="w-16"><SearchBar /></div>
      </div>):(
       <>
       <div className="flex justify-around gap-1 sm:gap-4 items-center">
        {/* ////////////////////////////////////////////////////// LOGO //////////////////////////////////////// */}
        <div>
          <img src={logo} alt="Logo" className="h-7  min-w-12 sm:w-24 lg:w-36" />
        </div>
        {/* ////////////////////////////////////////////////////// ALL CATEGORIES //////////////////////////////////////// */}
        <div>
          <AllCategories />
        </div> 
        <div className="flex sm:hidden">
          <MenuOfPages />
        </div>
      </div>

      {/* ////////////////////////////////////////////////////// SEARCH BAR /////////////////////////////////////// */}
      <div className="flex-grow ml-3 sm:mx-10 hidden sm:flex">
           <div className="hidden sm:flex w-full" ><SearchBar /></div>
           
      </div>
      <div className="flex justify-around items-center gap-1 sm:gap-4 lg:gap-7">
        {/* ////////////////////////////////////////////////////// QR DOWNLOAD ////////////////////////////////////////////*/}
        <div className="sm:hidden text-end"><FaSearch className="text-2xl text-white" onClick={()=>setIsSearch(true)} /></div>
        <div className="hidden md:flex">
          <div>
            <DownloadApp />
          </div>
        </div>
        {/* ////////////////////////////////////////////////////// ACCOUNT ////////////////////////////////////////////*/}
        <div>
          <Account />
        </div>
        {/* ////////////////////////////////////////////////////// CART ////////////////////////////////////////////*/}
        <div
          className="flex justify-center items-center gap-2 "
          onClick={handleGoToCart}
        >
          <BsCart3 className="text-3xl text-white hover-scale" />
          <div className="hidden lg:flex flex-col ">
            <p className="bg-white text-blue-700 rounded-full text-center text-xl font-semibold ">
            {user ? (carts.length === 0 ? '0' : carts.length) : 0}
            </p>
            <p className="text-white">Cart</p>
          </div>
        </div>
      </div>
       </>)}
    </div>
    {/* ==================================================== LIST OF PAGES ================================================= */}
     <ListOfPages /> 

  </div>
  );
};

export default Navbar;

const SearchBar = () => {
  return (
    <div className="flex items-center bg-white rounded-full shadow-md p-2 w-full max-w-xl  mx-7 h-10">
      <input
        type="text"
        placeholder="Search for items..."
        className="flex-grow  px-4 py-2 rounded-full outline-none text-gray-700"
      />
      <button className="bg-black text-white rounded-full p-2 ml-2 flex items-center justify-center">
        <FaSearch size={16} />
      </button>
    </div>
  );
};

const AllCategories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <div className="relative inline-block" >
      {/* Dropdown Button */}
      <button  
        onClick={toggleDropdown}
        className="px-2 py-2 my-auto text-2xl  text-white rounded-full bg-gray-700"
      >
        {isOpen ? <ImCross className="text-xl" /> : <IoMenu />}
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute left-0 mt-2 w-56 bg-white border rounded-md  max-h-[70vh] overflow-y-auto box-shadow-main z-40" >
          <div className=" ">
            <div className="ml-5 text-md font-bold flex ">
              <span className="relative top-1 mx-2 text-lg">
                <IoMenu />
              </span>{" "}
              ALL Categories
            </div>

            <hr className="border-t border-gray-300 border-2 mx-2 mt-1" />
          </div>
          {allCategories.map((category, index) => (
            <li
              key={index}
              className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              <span className="mr-2">{React.createElement(category.icon)}</span>
              {category.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Account = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = getUserFromLocalStorage();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await apiClient.post(LOGOUT_ROUTES);
      toast.success("Logout Successfully");
      dispatch(logout());
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle 400 errors (Bad Request)
        const { message } = error.response.data;
        toast.warn(message);
      } else {
        // Handle other errors (e.g., network issues)
        toast.error("Something went wrong! Please try again.");
        console.error("Error during sign-up:", error);
      }
    }
  };

  return (
    <div className="relative">
      {/* Account Button */}
      <button
        onMouseEnter={()=>setIsOpen(true)}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center  gap-2 text-white bg-black p-2 rounded-full"
      >
        <FaUserCircle size={24} />
        {user && (
          <div className="hidden md:flex">Hi, {user ? user.name : "User"}</div>
        )}
        {!user && <div className="text-lg hidden md:flex">Sign up</div>}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg overflow-y-auto max-h-96 z-40 "
        onMouseLeave={()=> setIsOpen(false)}
        >
          <div className="ml-3 mt-3 " onClick={() => setIsOpen(false)}>
            <ImCross className="hover:text-red-600 cursor-pointer" />
          </div>
          {user && (
            <div className="p-4 border-b">
              <p className="font-semibold flex items-center">
                <span className="text-3xl mx-2 ">
                  <FaUserCircle />
                </span>{" "}
                Welcome back,{" "}
                <span className="text-blue-700 mx-2"> {user.name}</span>
              </p>
              <div className="text-blue-500 hover:underline text-xl mt-1 inline-block">
                {user && <button onClick={handleLogout}>Log Out</button>}
              </div>
            </div>
          )}
          {!user && (
            <div className="p-4 border-b flex flex-col items-center justify-center gap-3">
              <Link
                to="/signup"
                className="bg-blue-600 cursor-pointer rounded-lg text-white px-9 py-2  "
              >
                {" "}
                Sign up
              </Link>
              <Link
                to="/login"
                className="bg-blue-600 cursor-pointer rounded-lg text-white  px-9 py-2 "
              >
                {" "}
                login
              </Link>
            </div>
          )}

          <ul className="p-4 space-y-3 cursor-pointer">
            {/* Menu Items */}
            <li className="flex items-center gap-2">
              <FaCartPlus />
              <span>My Orders</span>
            </li>
            <li className="flex items-center gap-2">
              <FaCoins />
              <span>My Coins</span>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope />
              <span>Message Center</span>
            </li>
            <li className="flex items-center gap-2">
              <FaMoneyBillAlt />
              <span>Payment</span>
            </li>
            <li className="flex items-center gap-2">
              <FaRegHeart />
              <span>Wish List</span>
            </li>
            <li className="flex items-center gap-2">
              <FaRegHeart />
              <span>My Coupons</span>
            </li>
          </ul>
          <div className="p-4 border-t text-gray-700">
            <p className="font-semibold text-red-500">Settings</p>
            <ul className="mt-2 space-y-3 font-semibold text-gray-500 text-sm">
              <li className="hover:bg-gray-400 p-2 rounded-md">
                AliExpress Business
              </li>
              <li className="hover:bg-gray-400 p-2 rounded-md">DS Center</li>
              <li className="hover:bg-gray-400 p-2 rounded-md">
                Seller Log In
              </li>
              <li className="hover:bg-gray-400 p-2 rounded-md">
                Buyer Protection
              </li>
              <li className="hover:bg-gray-400 p-2 rounded-md">Help Center</li>
              <li className="hover:bg-gray-400 p-2 rounded-md">
                Disputes & Reports
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const DownloadApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="flex justify-center items-center gap-2 relative"
    
    >
      <MdQrCode2
        className="text-white text-3xl"
        onMouseEnter={()=>setIsOpen(true)}
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <div className="absolute right-0 top-8 mt-2 w-56 bg-white border rounded-md  h-32  box-shadow-main z-30"
        onMouseLeave={()=> setIsOpen(false)} 
        >
          <ImCross className="h-4" onClick={() => setIsOpen(false)}  />
          <img src={downloadAppImage} alt="" className="w-full h-28" />
        </div>
      )}
    </div>
  );
};

const MenuOfPages = ()=>{
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" px-4 py-2 rounded-md hover-scale focus:outline-none"
      >
        {isOpen?(<ImCross  className="text-2xl text-white" />):(<TbMenuOrder className="text-2xl text-white" />) } 
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-40">
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-700"
          >
            Home
          </Link>
          <Link
            to="/welcome-deal"
            className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-700"
          >
            Welcome Deal
          </Link>
          <Link
            to="/phone"
            className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-700"
          >
            Phone
          </Link>
          <Link
            to="/groceries"
            className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-700"
          >
            Groceries
          </Link>
          <Link
            to="/kitchen-accessories"
            className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-700"
          >
            Kitchen
          </Link>
        </div>
      )}
    </div>
  );
}

const ListOfPages = () => {
  return (
    <div className="bg-black w-full sm:flex justify-around items-center text-white text-xl py-2 font-bold hidden md:px-32 lg:px-44">
      {/* Home */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          `hover:text-purple-500 hover-scale ${
            isActive ? "text-purple-500 underline" : ""
          }`
        }
      >
        Home
      </NavLink>

      {/* Welcome Deal */}
      <NavLink
        to="/welcome-deal"
        className={({ isActive }) =>
          `hover:text-purple-500 hover-scale ${
            isActive ? "text-purple-500 underline" : ""
          }`
        }
      >
        Welcome Deal
      </NavLink>

      {/* Mobiles */}
      <NavLink
        to="/phone"
        className={({ isActive }) =>
          `hover:text-purple-500 hover-scale ${
            isActive ? "text-purple-500 underline" : ""
          }`
        }
      >
        Mobiles
      </NavLink>

      {/* Groceries */}
      <NavLink
        to="/groceries"
        className={({ isActive }) =>
          `hover:text-purple-500 hover-scale ${
            isActive ? "text-purple-500 underline" : ""
          }`
        }
      >
        Groceries
      </NavLink>

      {/* Kitchen Accessories */}
      <NavLink
        to="/kitchen-accessories"
        className={({ isActive }) =>
          `hover:text-purple-500 hover-scale ${
            isActive ? "text-purple-500 underline" : ""
          }`
        }
      >
        Kitchen
      </NavLink>
    </div>
  );
};
