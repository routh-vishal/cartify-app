import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./shop.css";
import ItemCard from "./Itemcard";

function Shop() {
  const [items, setItems] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
        setItems(response.data);  
        setLoading(false);  
      } catch (err) {
        setError("Failed to fetch products.");
        setLoading(false);  
      }
    };

    fetchProducts();
  }, []);  

  if (loading) {
    return <div><h1 style={{fontSize:"3.5rem", margin:"10% 25%", color: "#333"}}>Loading search results...</h1></div>;
  }

  
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
