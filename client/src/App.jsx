import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/home/index.jsx";
import Login from "./pages/login/index.jsx";
import Signup from "./pages/signup/index.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from '../src/redux/store.js';
import Cart from "./pages/cart/index.jsx";
import Phone from "./pages/Phone/index.jsx";
import Groceries from "./pages/Groceries/index.jsx";
import KitchenAccessories from "./pages/kitchen-accessories/index.jsx";
import WelcomeDeal from "./pages/welcome-deal/index.jsx";
import ProductDetails from "./pages/product-details/index.jsx";



function App() {
 

  return (
    <>
      <Provider store={store}>
        <Router
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/phone" element={<Phone/>} />
            <Route path="/groceries" element={<Groceries/>} />
            <Route path="/kitchen-accessories" element={<KitchenAccessories/>} />
            <Route path="/welcome-deal" element={<WelcomeDeal/>} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
        {/* ToastContainer component to display notifications */}
        <ToastContainer
          position="top-center"
          theme="colored"
          autoClose={1000}
        />
      </Provider>
    </>
  );
}

export default App;
