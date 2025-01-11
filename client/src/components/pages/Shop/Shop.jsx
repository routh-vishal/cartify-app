import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./shop.css";
import ItemCard from "./Itemcard";

function Shop() {
  const [items, setItems] = useState([]);  // State to hold products
  const [loading, setLoading] = useState(true);  // State for loading status
  const [error, setError] = useState(null);  // State for error handling

  // Fetch products from backend on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
        setItems(response.data);  // Set the response data (products) in state
        setLoading(false);  // Stop loading
      } catch (err) {
        setError("Failed to fetch products.");
        setLoading(false);  // Stop loading even if there's an error
      }
    };

    fetchProducts();
  }, []);  // Empty dependency array means this runs only once on component mount

  if (loading) {
    return <div><h1 style={{fontSize:"3.5rem", margin:"10% 25%", color: "#333"}}>Loading search results...</h1></div>;
  }

  // Handle error state
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="main shop-items">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default Shop;
