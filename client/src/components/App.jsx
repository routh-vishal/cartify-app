import React,{useState,useEffect} from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Home from './home/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Shop from './pages/Shop/Shop';
import Admin from './pages/Admin/Admin';
import { Routes, Route, useLocation, Navigate,useNavigate } from "react-router-dom";
import ItemDetail from './pages/ItemDetail';
import NotFound from './pages/NotFound';
import MyCart from './pages/Admin/Cart';
import SearchResults from './pages/Shop/SearchResults';
import Signup from './auth/SignupPage.jsx';
import Login from "./auth/Login.jsx";
import PrivateRoute from './auth/PrivateRoute'; 
import axios from 'axios';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!window.sessionStorage.getItem("authToken"));
  useEffect(() => {
    const verifyToken = async () => {
      const token = window.sessionStorage.getItem("authToken");
      if (!token) {
        setIsAuthenticated(false);
        if (window.location.pathname !== "/signup") 
        navigate("/login");
        return;
      }

      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/verify-token`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.tokenValid) {
          setIsAuthenticated(true); // Token is valid
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        window.sessionStorage.removeItem("authToken"); // Remove the invalid token
        window.sessionStorage.removeItem("id"); // Remove the id
        setIsAuthenticated(false);
        if (window.location.pathname !== "/signup") 
        navigate("/login"); // Redirect to login
      }
    };

    verifyToken();
  }, [navigate]);
  const hideHeaderFooterRoutes = ["/signup", "/login"];
  const isHiddenRoute = hideHeaderFooterRoutes.includes(location.pathname);

  return (
    <div className="container">
      {!isHiddenRoute && <Header />}
      <Routes>
        <Route path="/signup" element={isAuthenticated?<Navigate to="/home" replace />:<Signup />} />
        <Route path="/login" element={isAuthenticated?<Navigate to="/home" replace />:<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Use PrivateRoute for protected routes */}
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/about" element={<PrivateRoute element={<About />} />} />
        <Route path="/contact" element={<PrivateRoute element={<Contact />} />} />
        <Route path="/shop" element={<PrivateRoute element={<Shop />} />} />
        <Route path="/item/:id" element={<PrivateRoute element={<ItemDetail />} />} />
        <Route path="/admin" element={<PrivateRoute element={<Admin />} />} />
        <Route path="/myCart" element={<PrivateRoute element={<MyCart />} />} />
        <Route path="/search" element={<PrivateRoute element={<SearchResults />} />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isHiddenRoute && <Footer />}
    </div>
  );
}

export default App;
