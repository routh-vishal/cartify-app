import React from 'react';
import instaPath from "../../assets/instagram.svg"
import fbPath from "../../assets/facebook.svg"
import linkedinPath from "../../assets/linkedin.svg"
import waPath from "../../assets/whatsapp.svg"
import mailPath from "../../assets/email.svg"
import "./footer.css"
import SocialCard from './SocialCard';
function Footer() {
  const socialLinks = [
    { link: "https://www.facebook.com/vishal.routh.9634/", name: "facebook", img: fbPath },
    { link: "https://www.linkedin.com/in/vishal-routh-196312255", name: "linkedin", img: linkedinPath },
    { link: "https://wa.me/918100597181", name: "whatsapp", img: waPath },
    { link: "https://www.instagram.com/routh_vishal_", name: "instagram", img: instaPath },
    { link: "mailto:routhvishal36@gmail.com", name: "email", img: mailPath },
  ];
  return (
    <footer> <div className="footer-content">
      <div className="social-buttons">
        {socialLinks.map(({ link, name, img }) => (
          <SocialCard link={link} name={name} img={img} key={name} />
        ))}
      </div>
      <span>© {new Date().getFullYear()} Vishal Routh</span>
    </div></footer>
  );
}

export default Footer;

