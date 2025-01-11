import React, { useEffect, useState } from "react";
import axios from "axios";
const userId=sessionStorage.getItem("id");
const AddressBook = () => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/addresses`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Userid:userId,
          },
        });
        setAddresses(response.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const handleAddAddress = async () => {
    const newAddress = prompt("Enter new address:");
    if (!newAddress) return;

    try {
      const token = sessionStorage.getItem("authToken");
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/address`,
        { address: newAddress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Userid:userId,
          },
        }
      );
      setAddresses((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      const token = sessionStorage.getItem("authToken");
      await axios.delete(`${process.env.REACT_APP_API_URL}/user/address/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Userid:userId,
        },
      });
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <div className="address-book">
      <h2 className="section-heading">Address Book</h2>
      <ul className="address-list">
        {addresses.map((addr) => (
          <li key={addr.id} className="address-item">
            {addr.address}
            <button
              className="address-btn delete-btn"
              onClick={() => handleDeleteAddress(addr.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button className="add-address-btn" onClick={handleAddAddress}>
        Add New Address
      </button>
    </div>
  );
};

export default AddressBook;
