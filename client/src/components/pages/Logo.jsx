import React from "react";
import logoPath from "../../assets/logo.svg";
function Logo(){
    return <div className="logo-contact">
        <a href="/"><img src={logoPath} alt="logo" /></a>
        <a href="/" style={{textDecoration:"none"}}><h1>Cartify</h1></a>
    </div>
}

export default Logo;