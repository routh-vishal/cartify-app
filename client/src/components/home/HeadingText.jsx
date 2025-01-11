import React from "react";
function HeadingText(){
    return (
        <section className="tagline-section">
          <div className="tagline-content">
            <h1>Welcome to Cartify</h1>
            <p>Your one-stop shop for all your needs!</p>
            <a href="/shop"><button className="cta-button">Shop Now</button></a>
          </div>
        </section>
    );
}

export default HeadingText;