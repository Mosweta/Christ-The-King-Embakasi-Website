function Aboutmenu() {
    return (
        <>
        <header> <div className="headingText"> 
        <h1>Christ The King Embakasi</h1> 
        <h2>(Archdiocese of Nairobi)</h2> 
        </div>

            <nav className="homeNav">
                
                <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="/">About Us</a></li>
                     <li><a href="/">Ministries</a></li> 
                     <li><a href="/">Events</a></li> 
                     <li><a href="/">Sermons</a></li> 
                     <li><a href="/">Giving</a></li>
                      <li><a href="/">Contact</a></li>
                </ul>
            </nav>
        </header>
        
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
            
            <div className="leadership">
                <h2>Our Leadership</h2>
                <div className="priests">
                    <div className="executive-card">
                        <p className="executive-name">Fr. Sammy Mungai</p>
                        <p className="executive-role">Parish Priest</p>
                    </div>

                    <div className="executive-card">
                        <p className="executive-name">Fr. Silferius</p>
                        <p className="executive-role">Assistant Parish Priest</p>
                    </div>
                </div>
                
                <h2>Assisting Fathers</h2>
                <div className="priests">
                    <div className="executive-card">
                        <p className="executive-name">Fr. Sammy Mungai</p>
                    </div>

                    <div className="executive-card">
                        <p className="executive-name">Fr. Deogracious</p>
                    </div>
                     <div className="executive-card">
                        <p className="executive-name">Fr. Kongwea</p>
                    </div>
                     <div className="executive-card">
                        <p className="executive-name">Fr. </p>
                    </div>
                </div>
                
                <h2>Executives Team</h2>
                <div className="executive-team">
                    <div className="executive-card">
                        <p className="executive-name">Name</p>
                        <p className="executive-role">Role</p>
                    </div>

                    <div className="executive-card">
                        <p className="executive-name">Name</p>
                        <p className="executive-role">Role</p>
                    </div>

                    <div className="executive-card">
                        <p className="executive-name">Name</p>
                        <p className="executive-role">Role</p>
                    </div>
                    
                    <div className="executive-card">
                        <p className="executive-name">Name</p>
                        <p className="executive-role">Role</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Aboutmenu;