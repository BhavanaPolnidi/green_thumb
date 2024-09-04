import React, { useEffect, useState } from 'react';
import './UserPageStyle.css'; 
import heroImg from './assets/file.png';
import step1Img from './assets/istockphoto-1372690274-612x612.jpg';
import step2Img from './assets/Seed-packets_istock.jpg';
import step3Img from './assets/whimsical-3d-cartoon-garden-shovel-white-background_980928-184.avif';
import videoImg from './assets/Screenshot 2024-08-11 230324.png';
import twitterIcon from './assets/twitter.png';
import facebookIcon from './assets/facebook.png';
import instagramIcon from './assets/instagram.png';
import plantLogo from './assets/logo.png';
import axios from 'axios'; // Import axios for API calls

import { Link } from 'react-router-dom';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      setLoading(true); // Set loading to true when starting to fetch
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5000/auth/user', {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in the headers
            },
          });
          setUser(response.data);
        } else {
          setError('No token found, please log in again.');
        }
      } catch (error) {
        setError('Error fetching user data.');
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // Set loading to false once fetching is done
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  return (
    <div>
<nav>
  <i></i>
  {/* {user && <div className="user-name">{user.name}</div>}  */}
  {/* <span style={{ fontSize: '30px' , textDecoration: 'none' , color: '#000'}} title='Log out'><Link to="/homepage" target='_blank'>&#9662;</Link></span> */}
  <ul className="nav-links">
    <li><a href="#ecommerce">Ecommerce</a></li>
    {/* <li><a href="#reminders">Reminders</a></li> */}
    <li className="dropdown">
      <a className="dropbtn">Guidance</a>
      <div className="dropdown-content">
      <a href="https://disease-recommendation-xjvf.onrender.com/">suggestions</a>
       <a href="http://localhost:8080/">Plant Identification</a>
        <a href="https://plant-recommendation.onrender.com">Plant Recommendations </a>
      </div>
    </li>
    <li></li>
    <li><a href="#sowmya">Disease Detection</a></li>
    <li><a href="#blog">Blog</a></li>
    <li><a href="#design">Garden Design</a></li>

  </ul>
</nav>

      <section className="hero">
        <div className="hero-content">
          <h1>We're here to help you grow a greener future.<span>🍀</span></h1>
          <p>We help realize your dreams in making a garden, let's start with small things that can change the world, so you can enjoy the fresh air forever</p>
          {/* <div className="hero-buttons">
            <button className="join-now-btn">Join Now</button>
            <a href="#" className="how-it-works-link">See how it works →</a>
          </div> */}
          <div className="scrollcircle"><span>&#x25BC;</span><span>Scroll Down</span></div>
        </div>
        <div className="hero-image">
          <img src={heroImg} alt="Cactus" />
        </div>
      </section>

      <section className="steps" id="ecommerce">
        <h2>Discover Your Perfect Plant</h2>
        <p>Bring Home the Beauty of Nature – Shop Our Handpicked Selection of Plants and Transform Your Space Today!</p>
        <div className="steps-container">
          <div className="step">
            <img src={step1Img} alt="Inoculate" />
            <h3>Plants</h3>
            <p>Coating the seed with bacteria that allow it to “fix” nitrogen soil.</p>
          </div>
          <div className="step">
            <img src={step2Img} alt="Sow the seeds" />
            <h3>Seeds</h3>
            <p>The quantities of our additions are not an exact science.</p>
          </div>
          <div className="step">
            <img src={step3Img} alt="Punt the Pots" />
            <h3>Tools</h3>
            <p>We own two of these blockers, one with a seed pin that makes.</p>
          </div>
        </div>
        <a href="http://localhost:5174" className="learn-more">Explore &#8594;</a>
      </section>

      <section className="plant-section" id="reminders">
        <div className="content">
          <h1>Never Miss a Gardening Task</h1>
          <p>Stay organized and keep your garden thriving with our Reminders feature. <br />Set custom alerts for watering, fertilizing, pruning, and more. Your garden's success is just a reminder away!</p>
          <Link to="/reminder" className="learn-more">See how it works &#8594;</Link>
        </div>
        <div className="image-container">
          {/* You can add an image here if needed */}
        </div>
      </section>

      <section className="garden-nutrition" id="sowmya">
        <div className="image-container">
          {/* Add an image if needed */}
        </div>
        <div className="content">
          <h1>Spot and Prevent Plant Diseases Early</h1>
          <p> Our disease detection feature helps you identify potential issues before they become serious. From spotting common fungal infections to recognizing signs of nutrient deficiencies, stay ahead of plant health challenges. 
          </p>
          <Link to="http://127.0.0.1:5000" className="learn-more">Plants Suggestion&#8594;</Link>

        </div>
      </section>

      <section className="plant-section" id="blog">
        <div className="content">
          <h1>Join Our Green Community</h1>
          <p>Being part of a gardening community can enrich your plant-growing journey, whether you're nurturing a vibrant flower garden or cultivating a lush indoor jungle.</p>
          <a href="https://blog-git-main-bhavanas-projects-0c09a7a3.vercel.app/" className="learn-more">Lets join &#8594;</a>
        </div>
        <div className="image-container1">
          {/* Add an image if needed */}
        </div>
      </section>

      <section className="video-section" id="design">
        <div className="image-container">
          <img src={videoImg} alt="Draken Plant" width="60%" />
          <div className="draken">
            {/* <h2>— draken</h2>
            <p>Draken is not just a black, but green too</p> */}
          </div>
        </div>
        <div className="content">
          <h1>Design Your Garden</h1>
          <p>Generate custom garden designs from text prompts, creating personalized layouts and aesthetics based on your descriptions.</p>
          <a href="/design" className="learn-more">Create Now &#8594;</a>
        </div>
      </section>
  

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section logo">
            <img src={plantLogo} alt="Plant Logo" width={150} height={70} />
            <p>Copyright ©2024 </p>
            <p>All rights reserved</p>
          </div>
          {/* <div className="footer-section">
            <h3>Location</h3>
            <p>3337 California</p>
            <p>Los Angeles 19604</p>
            <p>610-231-9818</p>
          </div> */}
          {/* <div className="footer-section">
            <h3>Helpful</h3>
            <p>About Us</p>
            <p>Help</p>
            <p>Service</p>
            <p>Privacy</p>
          </div> */}
          {/* <div className="footer-section">
            <h3>Resource</h3>
            <p>Pricing Feature</p>
            <p>Server Status</p>
            <p>Careers</p>
          </div> */}
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Tutorial</p>
            <p>Support</p>
            <div className="social-icons">
              <img src={twitterIcon} alt="Twitter" />
              <img src={facebookIcon} alt="Facebook" />
              <img src={instagramIcon} alt="Instagram" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserPage;
