import React from 'react';
import HeadingText from './HeadingText';
import "./home.css"
import ItemCard from '../pages/Shop/Itemcard';
import { useEffect, useState } from 'react';
import axios from 'axios';
function Home() {
  const [hotDeals, setHotDeals] = useState([]);

  useEffect(() => {
    // Fetch the top 5 products with the highest price
    const fetchHotDeals = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/top-deals`);
        setHotDeals(response.data);
      } catch (error) {
        console.error("Error fetching hot deals:", error);
      }
    };

    fetchHotDeals();
  }, []);
  return (
    <div className='main'>
      <HeadingText />
      <div className="hot-deals">
        <h2>HOT Deals</h2>
        <div className="hot-deals-list">
          {hotDeals.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>

  );
}

export default Home;
