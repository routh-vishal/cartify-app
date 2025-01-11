import React from "react";
import "../pages.css"
import "./admin.css"
import ProfileInfo from "./ProfileInfo";
import OrderHistory from "./OrderHistory";
import AddressBook from "./AddressBook";
import Cart from "./Cart";
import LogOut from "./LogOut"
function Admin(){
    return <div className="admin-container">
    <h1 className="admin-heading">My Dashboard</h1>
    <div className="admin-section profile-section">
      <ProfileInfo/>
      <LogOut />
    </div>
    <div className="admin-section">
      <OrderHistory />
    </div>
    <div className="admin-section">
      <AddressBook />
    </div>
    <div className="admin-section">
      <Cart />
    </div>
  </div>
}

export default Admin