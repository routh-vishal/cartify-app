import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './pages.css';

function ItemDetail() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId=window.sessionStorage.getItem("id");
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
    useEffect(() => {
        // Fetch item details from the backend
        const fetchItemDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/item/${id}`);
                setItem(response.data);
                setLoading(false);
            } catch (err) {
                setError("Item not found!");
                setLoading(false);
            }
        };

        fetchItemDetails();
    }, [id]);

    if (loading) {
      return <div><h1 style={{fontSize:"3.5rem", margin:"10% 25%", color: "#333"}}>Loading item...</h1></div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="item-detail-container">
            <div className="item-detail">
                <div className="item-detail-image">
                    <img src={item.image_url} alt={item.name} />
                </div>
                <div className="item-detail-info">
                    <h2>{item.name}</h2>
                    <p className="price">₹{item.price}</p>
                    <p className="description">{item.description}</p>
                    <button onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default ItemDetail;
