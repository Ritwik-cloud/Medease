import React, { useState } from 'react';
import '../PagesCss.css'; // Ensure your CSS file is imported
import logo from "../../assets/images/logo.png";
import faq from "../../assets/images/about-faq.png";
import lower1 from "../../assets/images/lower1.png";
import lower2 from "../../assets/images/lower2.png";
import lower3 from "../../assets/images/lower3.png";
import lower4 from "../../assets/images/lower4.png";
import lower5 from "../../assets/images/lower5.png";
import lower6 from "../../assets/images/lower6.png";




const About = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      {/* Header starts here */}
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
              <a href="index.html">
                <img src={logo} alt="logo" />
              </a>
            </div>
            <ul className={`navlinks ${isNavOpen ? 'active' : ''}`}>
              <li><a href="index.html">home</a></li>
              <li><a href="about.html">about us</a></li>
              <li><a href="contactus.html">contact us</a></li>
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

      <section className="about-page">
        <div className="container">
          <div className="about-header">
            <h1>Your Trusted Partner for Effortless Online Doctor Booking</h1>
            <p className="subtitle">
              At MedEase, we're on a mission to simplify the way patients connect
              with healthcare providers. By offering a seamless online doctor
              appointment booking experience, we put the power of healthcare
              scheduling right at your fingertips—making it easier, faster, and
              more reliable.
            </p>
          </div>

          <div className="section-about">
            <h2>Our Vision</h2>
            <p className="vision-text">
              We envision is to make a future, where healthcare access is
              immediate, affordable, and accessible for all kind of people. Our
              goal is to equip you with helpful information and compassionate
              support, so you can confidently navigate your healthcare journey.
            </p>
          </div>

          <div className="section-about">
            <h2>What We Do</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-title">24/7 Online Booking:</div>
                <div className="feature-desc">
                  Browse available doctors, specialties, and time slots anytime,
                  anywhere.
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-title">Smart Scheduling:</div>
                <div className="feature-desc">
                  Choose your preferred doctor and appointment time in a few quick
                  clicks.
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-title">Automated Reminders:</div>
                <div className="feature-desc">
                  Receive timely email or SMS alerts so you never miss an
                  appointment.
                </div>
              </div>
            </div>
          </div>

          <div className="section-about">
            <h2>Why Choose MedEase?</h2>
            <div className="benefits-grid">
              <div className="benefit-item">
                <div className="benefit-title">Convenience:</div>
                <div className="benefit-desc">
                  Book appointments on your schedule—morning, evening, or weekend.
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-title">Time-Saving:</div>
                <div className="benefit-desc">
                  Skip the long calls and paperwork. Book in seconds, receive
                  confirmations instantly.
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-title">Trustworthy:</div>
                <div className="benefit-desc">
                  We partner with verified clinics and healthcare professionals so
                  you can book with confidence.
                </div>
              </div>
            </div>
          </div>

          <div className="section-about">
            <h2>Our Promise</h2>
            <p className="promise-text">
              Today, the real barriers to quality care aren't doctors—they're lack
              of access and high costs. We're fighting that with smart technology,
              making healthcare truly within reach.
            </p>
            <p className="promise-text">
              We thrive on tackling tough problems and finding solutions fast.
            </p>
            <p className="promise-text">
              We're building for the future—on a foundation of openness, honesty,
              learning and respect for different perspectives. We don't just want
              to create a helpful tool; we want{' '}
              <span className="brand">MedEase</span> to be a place where everyone
              loves to use and a workplace everyone feels proud to be part of.
            </p>
            <p className="promise-text">
              Think for for trusting <span className="brand">MedEase</span> to guide
              your healthcare journey. We're here to make every appointment a step
              forward better care.
            </p>
          </div>

          <div className="faq-section">
            <div className="faq-header">
              <a href="#" className="faq-link">Get Your Answer</a>
              <h2>Frequently Asked Questions</h2>
            </div>
            <div className="faq-content">
              <div className="faq-image">
                <figure>
                  <img src={faq} alt="FAQ illustration" />
                </figure>
              </div>
              <div className="faq-list">
                {/* FAQ Item 1 */}
                <div className="faq-item">
                  <span className="faq-question">
                    Can I make an Appointment Online with White Plains Hospital Kand?
                  </span>
                  <div className="faq-icon">
                    <i className="fa-solid fa-square-plus" style={{ color: '#74C0FC' }}></i>
                  </div>
                </div>
                {/* FAQ Item 2 */}
                <div className="faq-item">
                  <span className="faq-question">
                    Can I make an Appointment Online with White Plains Hospital Kand?
                  </span>
                  <div className="faq-icon">
                    <i className="fa-solid fa-square-plus" style={{ color: '#74C0FC' }}></i>
                  </div>
                </div>
                {/* FAQ Item 3 */}
                <div className="faq-item">
                  <span className="faq-question">
                    Can I make an Appointment Online with White Plains Hospital Kand?
                  </span>
                  <div className="faq-icon">
                    <i className="fa-solid fa-square-plus" style={{ color: '#74C0FC' }}></i>
                  </div>
                </div>
                {/* FAQ Item 4 */}
                <div className="faq-item">
                  <span className="faq-question">
                    Can I make an Appointment Online with White Plains Hospital Kand?
                  </span>
                  <div className="faq-icon">
                    <i className="fa-solid fa-square-plus" style={{ color: '#74C0FC' }}></i>
                  </div>
                </div>
                {/* FAQ Item 5 */}
                <div className="faq-item">
                  <span className="faq-question">
                    Can I make an Appointment Online with White Plains Hospital Kand?
                  </span>
                  <div className="faq-icon">
                    <i className="fa-solid fa-square-plus" style={{ color: '#74C0FC' }}></i>
                  </div>
                </div>
              </div>
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
              <img src={lower1} alt="Card 1" loading="lazy" />
              <img  src={lower2}  alt="Card 2" loading="lazy" />
              <img  src={lower3} alt="Card 3" loading="lazy" />
              <img  src={lower4} alt="Card 4" loading="lazy" />
              <img  src={lower5} alt="Card 5" loading="lazy" />
              <img  src={lower6} alt="Card 6" loading="lazy" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
