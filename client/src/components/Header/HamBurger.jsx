import React, { useState } from "react";
import "./hamburger.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-container">
      {/* Hamburger icon */}
      <div className={`hamburger-icon`} onClick={toggleMenu}>
        {isOpen?<IoMdClose size={40}/>:<RxHamburgerMenu size={40}/>}
      </div>

      {/* Mobile Navigation Menu */}
      <nav className={`mobile-nav ${isOpen ? "show" : ""}`}>
        <ul>
          <li><a href="/myCart" onClick={() => setIsOpen(false)}>My Cart</a></li>
          <li><a href="/shop" onClick={() => setIsOpen(false)}>Shop</a></li>
          <li><a href="/about" onClick={() => setIsOpen(false)}>About</a></li>
          <li><a href="/contact" onClick={() => setIsOpen(false)}>Contact</a></li>
          <li><a href="/admin" onClick={() => setIsOpen(false)}>Profile</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Hamburger;
