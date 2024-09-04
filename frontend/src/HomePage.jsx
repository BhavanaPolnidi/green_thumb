import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { Link } from 'react-router-dom';
import leafImage from './assets/leaf.jpeg';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <nav>
        <div id="logo_box">
          <span id="circle"></span>
          <span id="square"></span>
          <img
            id="logo"
            src="https://w7.pngwing.com/pngs/588/355/png-transparent-bastyr-university-naturopathy-medicine-health-care-alternative-health-services-herbs-miscellaneous-food-leaf.png"
            alt="Logo"
          />
        </div>
        <ul>
          {/* <li><a href="/">Home</a></li> 
          <li><a href="#features">Features</a></li>
          <li><a href="#contact">Contact</a></li> */}
          <li style={{backgroundColor: '#399918', padding: '10px 30px', borderRadius: '50px', filter: 'drop-shadow(1px 1px 3px grey)'}}>
            <Link to="/login" style={{color:'#FAF1E4'}}>Login</Link>
          </li>
        </ul>
      </nav>
      <section className="feature_add">
        <main className="animatedDiv">
          <p>Discover</p>
          <div className="img_box" style={{ animationDelay: '5.5s', transform: 'rotate(25deg)' }}>
            <img
              src="https://wallpaperbat.com/img/774822-vegetable-wallpaper-top-free-vegetable-background.jpg"
              width="100%"
              height="100%"
              style={{ borderRadius: '10px' }}
              alt="Animated"
            />
          </div>
          <div className="img_box1" style={{ animationDelay: '4s', transform: 'rotate(15deg)' }}>
            <img
              src="https://img.freepik.com/premium-photo/beautiful-lotus-flower-sunrise-background_969965-15987.jpg"
              width="100%"
              height="100%"
              style={{ borderRadius: '10px' }}
              alt="Animated 1"
            />
          </div>
          <div className="img_box2" style={{ animationDelay: '2.5s', transform: 'rotate(5deg)' }}>
            <img
              src="https://media.gettyimages.com/id/1272714150/video/close-up-of-salad-leaves-being-torn-up-in-slow-motion.jpg?s=640x640&k=20&c=Tz5o2AX8K9BMPbQPgDp6Yi-Bn0fZ8CP90sLd9QEqQ-8="
              width="100%"
              height="100%"
              style={{ borderRadius: '10px' }}
              alt="Animated 2"
            />
          </div>
          <div className="img_box3" style={{ animationDelay: '1s', transform: 'rotate(-15deg)' }}>
            <img
              src="https://images.herzindagi.info/image/2024/Apr/water-rich-fruits-for-summer.jpg"
              width="100%"
              height="100%"
              style={{ borderRadius: '10px' }}
              alt="Animated 3"
            />
          </div>
          <div className="firsttitle">
            <h1>
              We’re here to help you nurture our<br/>planet
              <img src={leafImage} width="40px" height="40px" alt="Leaf" style={{marginLeft: '10px' , borderRadius: '50%'}} />
            </h1>
            <span style={{fontSize: '18px', opacity: '0.8'}}>We help realize your dreams in making a garden, let's<br/>start with small things that can change the world, so <br/>you can enjoy the fresh air forever</span>
          </div>
          <div className="featuresBox">
            <div id="fbox" style={{transform: 'rotate(0deg)'}} className="fbox3"></div>
            <div id="fbox" style={{transform: 'rotate(15deg) translate(90px,-5px)'}} className="fbox2"></div>
            <div id="fbox" style={{transform: 'rotate(30deg) translate(180px,-10px)'}} className="fbox1"></div>
            {/* <div id="fbox" style={{transform:'translateX(320px'}}></div> */}
          </div>
        </main>
      </section>
      {/* <article></article> */}
    </div>
  );
};

export default HomePage;
