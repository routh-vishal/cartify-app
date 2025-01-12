import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ItemCard from "./Itemcard";
import "./shop.css"; 

function SearchResults() {
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search); 
  const searchText = queryParams.get("searchText"); 
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/search?q=${encodeURIComponent(searchText)}`);
        setItems(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch search results.");
        setLoading(false);
      }
    };

    if (searchText) {
      fetchSearchResults();
    }
  }, [searchText]); 

  if (loading) {
    return <div><h1 style={{fontSize:"3.5rem", margin:"10% 25%", color: "#333"}}>Loading search results...</h1></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (items.length === 0) {
    return <div><h1 style={{fontSize:"3.5rem", margin:"10% 25%", color: "#333"}}>No results found for "{searchText}".</h1></div>;
  }

  return (
    <div className="main shop-items">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default SearchResults;

