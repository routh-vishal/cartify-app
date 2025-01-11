import React from "react";
import Logo from "./Logo";
import "./pages.css"
function Contact(){
    return <div className="contact-page main">
    <h1>Contact Us</h1>
    <p>Have questions? Feel free to reach out to us!</p>
    <ul>
      <li>Email: support@cartify.com</li>
      <li>Phone: +123 456 7890</li>
      <li>Address: 123, ABC Towers, XYZ Street,
Near DEF Park, Sector 45,
Bengaluru, Karnataka - 560102</li>
    </ul>
    <Logo />
  </div>
}

export default Contact