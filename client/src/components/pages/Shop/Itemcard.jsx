import React from "react";
import "./shop.css";
import axios from "axios";
const ItemCard = ({ item }) => {
  const {id, name, price, image_url, description } = item;
  const userId=window.sessionStorage.id;
  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/user/add-to-cart`, {
        userId,
        productId:id,
        quantity:1,
      });
      alert("Product successfully added to cart!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  return (
    <a href={"/item/"+id} style={{textDecoration:"none", color:"inherit"}}>
      <div className="item-card">
      <img src={image_url} alt={name} className="item-image" />
      <div className="item-details">
        <h3 className="item-name">{name}</h3>
        <p className="item-price">₹{price}</p>
        <p className="item-description">{description}</p>
        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
    </a>
    
  );
};

export default ItemCard;
