import React, { useEffect, useState } from "react";
import axios from "axios";
const userId=window.sessionStorage.getItem("id");
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        const userId=sessionStorage.getItem("id");
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Userid:userId,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

   const removeFromCart = async (userId, productId) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/user/remove-from-cart`, {
        userId,
        productId,
      });
      setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== productId));
    } catch (error) {
      console.error("Error removing product from cart:", error);
      alert("Failed to remove product from cart.");
    }
  };
  

  if (!cartItems.length) return <div className="main"><h1 style={{fontSize:"3.5rem", margin:"10% 35%", color: "#333"}}>Your cart is empty</h1></div>;

  return (
    <div className="cart main">
      <h2 className="section-heading">Your Cart</h2>
      <ul className="cart-list">
        {cartItems.map((item) => (
          <li key={item.product_id} className="cart-item">
          <a href={"/item/"+item.product_id} style={{textDecoration:"none", color:"inherit"}}>
            <div className="cart-item-info cart-container">
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
              <button className="remove-cart" onClick={(e)=>{e.preventDefault();removeFromCart(userId,item.product_id)}}>Remove from Cart</button>
            </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Cart;