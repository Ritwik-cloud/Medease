import React, { useState } from 'react';
import '../PagesCss.css'; // Make sure to import your CSS file here
import { Link } from 'react-router-dom';
import logo from "../../assets/images/logo.png";


const ContactUs = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted");
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <nav>
            <div 
              className="hamburger" 
              id="hamburger"
              onClick={toggleNav}
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="logo">
              <Link to={"/"}>
                <img src={logo} alt="logo" />
              </Link>
            </div>
            {/* Added dynamic class for mobile menu based on state */}
            <ul className={`navlinks ${isNavOpen ? 'active' : ''}`}>
              <li><Link to={"/"}>home</Link></li>
              <li><Link to={"/about"}>about us</Link></li>
              <li><Link to={"/contact"}>contact us</Link></li>
              <li>
                <div className="dropdown">
                  <a href="#">Blog &#x25BE;</a>
                  <div className="dropdown-content">
                    <a href="#">Blog List</a>
                    <a href="#">Blog Grid</a>
                    <a href="#">Blog Details</a>
                  </div>
                </div>
              </li>
            </ul>
            <div className="btn">
              <a href="#" className="cmn-btn">Login/ sign up</a>
            </div>
          </nav>
        </div>
      </header>

      <div className="header-section">
        <h1>Contact us</h1>
      </div>

      <section className="contact-details">
        <div className="container">
          <div className="content-wrapper">
            <div className="left-section">
              <p className="get-in-touch">Get in touch</p>
              <h2>Have Any Question?</h2>

              <div className="info-box">
                <i className="fa-solid fa-location-dot" style={{ color: '#74C0FC' }}></i>
                <div className="info-content">
                  <h3>Address</h3>
                  <p>8432 Mante Highway, Aminaport, USA</p>
                </div>
              </div>

              <div className="info-box">
                <i className="fa-solid fa-phone" style={{ color: '#74C0FC' }}></i>
                <div className="info-content">
                  <h3>Phone Number</h3>
                  <p>+1 315 369 5943</p>
                </div>
              </div>

              <div className="info-box">
                <i className="fa-solid fa-envelope" style={{ color: '#74C0FC' }}></i>
                <div className="info-content">
                  <h3>Email Address</h3>
                  <p>MedEase@example.com</p>
                </div>
              </div>
            </div>

            <div className="right-section">
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="services">Services</label>
                    <input type="text" id="services" name="services" />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message"></textarea>
                </div>

                <div className="button-wrapper">
                  <button type="submit" className="submit-btn">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Section for footer */}
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col20">
              <div className="blogcard20">
                <div className="col20-heading">
                  <h6>Company</h6>
                </div>
                <ul>
                  <li><a href="#">About</a></li>
                  <li><a href="#">Features</a></li>
                  <li><a href="#">Works</a></li>
                  <li><a href="#">Careers</a></li>
                  <li><a href="#">Locations</a></li>
                </ul>
              </div>
            </div>

            <div className="col20">
              <div className="blogcard20">
                <div className="col20-heading">
                  <h6>Treatment</h6>
                </div>
                <ul>
                  <li><a href="#">Dental</a></li>
                  <li><a href="#">Cardiac</a></li>
                  <li><a href="#">Spinal Cord</a></li>
                  <li><a href="#">Hair Growth</a></li>
                  <li><a href="#">Anemia & Disorder</a></li>
                </ul>
              </div>
            </div>

            <div className="col20">
              <div className="blogcard20">
                <div className="col20-heading">
                  <h6>Specialities</h6>
                </div>
                <ul>
                  <li><a href="#">Transplant</a></li>
                  <li><a href="#">Cardiologist</a></li>
                  <li><a href="#">Oncology</a></li>
                  <li><a href="#">Pediatrics</a></li>
                  <li><a href="#">Gynacology</a></li>
                </ul>
              </div>
            </div>

            <div className="col20">
              <div className="blogcard20">
                <div className="col20-heading">
                  <h6>Utilities</h6>
                </div>
                <ul>
                  <li><a href="#">Pricing</a></li>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">Request a Quote</a></li>
                  <li><a href="#">Premium Membership</a></li>
                  <li><a href="#">Integrations</a></li>
                </ul>
              </div>
            </div>

            <div className="col20">
              <div className="blogcard20">
                <div className="col20-heading">
                  <h6>Newsletter</h6>
                </div>
                <p>Subscribe & Stay Updated from the MedEase</p>
                <h6>Connect With Us</h6>
                <div className="socials">
                  <a href="https://www.facebook.com"><i className="fa-brands fa-facebook-f"></i></a>
                  <a href="https://www.instagram.com"><i className="fa-brands fa-instagram"></i></a>
                  <a href="https://www.twitter.com"><i className="fa-brands fa-x-twitter"></i></a>
                  <a href="https://www.linkedin.com"><i className="fa-brands fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <section className="lower-footer">
        <div className="container">
          <div className="lower-content">
            <div className="copy-right">
              <p>Copyright © 2025 <a href="index.html">MedEase.</a> All Rights Reserved</p>
            </div>
            <div className="cards">
              <img src="/image/lower1.png" alt="" loading="lazy" />
              <img src="/image/lower2.png" alt="" loading="lazy" />
              <img src="/image/lower3.png" alt="" loading="lazy" />
              <img src="/image/lower4.png" alt="" loading="lazy" />
              <img src="/image/lower5.png" alt="" loading="lazy" />
              <img src="/image/lower6.png" alt="" loading="lazy" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
