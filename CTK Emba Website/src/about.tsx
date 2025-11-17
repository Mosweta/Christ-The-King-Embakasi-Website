function Aboutmenu() {
    return (
        <>    
            <div className="aboutNav">
                <h1>About Us</h1>
                <h4>Get to know Christ the King Embakasi Parish</h4>
            </div>
            
            <div className="aboutStory">
                <div className="story">
                    <h2>Our Story</h2>
                    <p>Founded as part of the Archdiocese of Nairobi, Christ the King Embakasi Parish has been a center of faith, worship, and community service for the people of Embakasi and beyond</p>
                </div>
                <div className="img">
                    <img src="ctk.jpg" alt="Church Image"/>
                </div>
            </div>

            <div className="mv">
                <div className="mission"> 
                    <h4>Our Mission</h4>
                    <p>To share the love of Christ through worship, service and community.</p> 
                </div>
                <div className="vision">
                    <h4>Our Vision</h4> 
                    <p>To be a beacon of faith, hope, and charity in Embakasi.</p> 
                </div> 
            </div>
            
            <section className="church-section">

  <h2 className="church-title">Our Leadership</h2>

  <div className="church-grid">
    <div className="church-card">
      <h3 className="church-name">Fr. Sammy Mungai</h3>
      <p className="church-role">Parish Priest</p>
    </div>

    <div className="church-card">
      <h3 className="church-name">Fr. Silferius</h3>
      <h3 className="church-name">Fr. John Mwangi</h3>
      <p className="church-role">Assistant Parish Priest</p>
    </div>
  </div>

  <h2 className="church-title">Assisting Fathers</h2>

  <div className="church-grid">
    <div className="church-card">
      <h3 className="church-name">Fr. Deogracious</h3>
    </div>

    <div className="church-card">
      <h3 className="church-name">Fr. Kongwea</h3>
    </div>
  </div>

</section>
            <div className="footer-about">
                <p>© 2024 Christ the King Embakasi Parish. All rights reserved.</p> 
            </div>
        </>
    );
}

export default Aboutmenu;