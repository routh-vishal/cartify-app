import React ,{useState,useEffect} from 'react';
import Logo from './Logo';
import Nav from './Nav';
import './headerStyles.css'
import Search from './Search';
import Hamburger from './HamBurger';
function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header>
    <div className='header-container'>
      <Logo />
      {!isMobile&&<Search />}
      <div className="nav-container">
        {isMobile ? <Hamburger /> : <Nav />}
      </div>
    </div>
      {isMobile&&<Search />} 
    </header>
  );
}

export default Header;