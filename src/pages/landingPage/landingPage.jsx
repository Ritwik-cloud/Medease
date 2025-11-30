import React, { useState } from "react";
import "../PagesCss.css";
import logo from "../../assets/images/logo.png";
import banner from "../../assets/images/banner.png";
import doctorsBanner from "../../assets/images/doctors-banner.png";

import urologyIcon from "../../assets/images/urology-icon.png";
import neurologyIcon from "../../assets/images/neurology-icon.png";
import orthopedicIcon from "../../assets/images/orthopedic-icon.png";
import cardiologyIcon from "../../assets/images/cardiology-icon.png";
import dentalIcon from "../../assets/images/dental-icon.png";
import pediatristIcon from "../../assets/images/Pediatrist-icon.png";
import psychiatristIcon from "../../assets/images/Psychiatrist-icon.png";

import bookingCard1 from "../../assets/images/booking-card1.png";
import bookingCard2 from "../../assets/images/booking-card2.png";

import feature1 from "../../assets/images/feature1.png";
import feature2 from "../../assets/images/feature2.png";
import feature3 from "../../assets/images/feature3.png";
import feature4 from "../../assets/images/feature4.png";
import feature5 from "../../assets/images/feature5.png";
import feature6 from "../../assets/images/feature6.png";

import blogcard1 from "../../assets/images/blogcard-1.png";
import blogcard2 from "../../assets/images/blogcard-2.png";
import blogcard3 from "../../assets/images/blogcard-3.png";
import blogDoctor1 from "../../assets/images/blog-doctor-1.png";
import blogDoctor2 from "../../assets/images/blog-doctor-2.png";

import review from "../../assets/images/review.png";

import lower1 from "../../assets/images/lower1.png";
import lower2 from "../../assets/images/lower2.png";
import lower3 from "../../assets/images/lower3.png";
import lower4 from "../../assets/images/lower4.png";
import lower5 from "../../assets/images/lower5.png";
import lower6 from "../../assets/images/lower6.png";

import { Link } from "react-router-dom";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Arrays for mapping
  const specialties = [
    { img: urologyIcon, name: "Urology" },
    { img: neurologyIcon, name: "Neurology" },
    { img: orthopedicIcon, name: "Orthopedic" },
    { img: cardiologyIcon, name: "Cardiology" },
    { img: dentalIcon, name: "Dentist" },
    { img: pediatristIcon, name: "Pediatrist" },
    { img: psychiatristIcon, name: "Psychiatrist" },
  ];

  const bookingCards = [bookingCard1, bookingCard2, bookingCard1]; 

  const features = [
    { img: feature1, name: "ICU" },
    { img: feature2, name: "Laboratory" },
    { img: feature3, name: "Operation" },
    { img: feature4, name: "Medical" },
    { img: feature5, name: "Patient ward" },
    { img: feature6, name: "Test Room" },
  ];

  const blogCards = [
    { card: blogcard1, doctor: blogDoctor1 },
    { card: blogcard2, doctor: blogDoctor2 },
    { card: blogcard3, doctor: blogDoctor1 },
  ];

  const lowerImages = [lower1, lower2, lower3, lower4, lower5, lower6];

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container">
          <nav>
            <div className="hamburger" id="hamburger" onClick={toggleMenu}>
              <div />
              <div />
              <div />
            </div>
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <ul className={`navlinks ${isMenuOpen ? "active" : ""}`}>
              <li>
                <Link to="/">home</Link>
              </li>
              <li>
                <Link to="/about">about us</Link>
              </li>
              <li>
                <Link to="/contact">contact us</Link>
              </li>
              <li>
                <div className="dropdown">
                  <a href="#">Blog ▾</a>
                  <div className="dropdown-content">
                    <a href="#">Blog List</a>
                    <a href="#">Blog Grid</a>
                    <a href="#">Blog Details</a>
                  </div>
                </div>
              </li>
            </ul>
            <div className="btn">
              <Link to="/patient/auth/register" className="cmn-btn">
                Login / sign up
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Banner Section */}
      <section className="banner">
        <div className="container">
          <div className="row-banner">
            <div className="col60">
              <div className="service-card">
                <div className="highlight-text">Search Doctor,</div>
                <div className="sub-text">Make an Appointment</div>
                <p>
                  Access to expert physicians and surgeons, advanced technologies
                  and top-quality surgery facilities right here.
                </p>
                <div className="search-group">
                  <div className="search-content">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <button type="submit" className="search-btn">
                        <i className="fa-solid fa-location-dot" /> Search Location
                      </button>
                    </form>
                    <div className="search-info">
                      Based on your
                      <br />
                      Location
                    </div>
                  </div>
                  <div className="search-content">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <button type="submit" className="search-btn">
                        <i className="fa-solid fa-magnifying-glass" /> Search Doctors
                      </button>
                    </form>
                    <div className="search-info">
                      Ex : Dental or Sugar
                      <br />
                      Check up etc
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col40">
              <div className="blogcard">
                <img src={banner} alt="Doctor Banner" />
                <div className="info-tag top-left">
                  <a href="#">
                    <img src={doctorsBanner} alt="Patients" />
                    15K+ Satisfied Patients
                  </a>
                </div>
                <div className="info-tag middle-left">
                  <a href="#">
                    <img src={doctorsBanner} alt="Doctors" />
                    Meet our Doctors
                  </a>
                </div>
                <div className="info-tag middle-right">
                  <a href="#">Regular Check-Up</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service */}
      <section className="service">
        <div className="container">
          <div className="content">
            <h3>What are you looking for</h3>
          </div>
          <div className="row">
            <div className="col33">
              <div className="blogcard33" id="booking-appoinment">
                <p>Booking Appointment</p>
                <a className="cmn-btn" href="#">
                  Book Now
                </a>
              </div>
            </div>
            <div className="col33">
              <div className="blogcard33" id="find-a-report">
                <p>Find a Report</p>
                <a className="cmn-btn" href="#">
                  Find Now
                </a>
              </div>
            </div>
            <div className="col33">
              <div className="blogcard33" id="find-a-lab">
                <p>Find a Lab</p>
                <a className="cmn-btn" href="#">
                  Find Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialities */}
      <section className="specialities">
        <div className="container">
          <div className="content">
            <h3>Clinic and Specialities</h3>
            <div className="specialities-row">
              {specialties.map((spec, idx) => (
                <figure key={idx}>
                  <a href="#">
                    <img src={spec.img} alt={spec.name} loading="lazy" />
                    <p>{spec.name}</p>
                  </a>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section className="booking">
        <div className="container">
          <div className="content">
            <h3>Book Our Doctor</h3>
          </div>
          <div className="row">
            {bookingCards.map((cardImg, index) => (
              <div className="col33" key={index}>
                <div className="blogcard33">
                  <figure>
                    <a href="#">
                      <img src={cardImg} alt="Doctor" />
                    </a>
                  </figure>
                  <div className="doctor-details">
                    <a href="#">
                      <h4>
                        {index === 1 ? "Linda Tobin" : "Rubey Perin"}{" "}
                        <i className="fa-regular fa-circle-check" />
                      </h4>
                    </a>
                    <p>MDS - Periodontology and Oral Implantology, BDS</p>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className="fa-solid fa-star"
                          style={{ color: "#ffd43b" }}
                        />
                      ))}
                      <p>({index === 1 ? 43 : 17})</p>
                    </div>
                  </div>
                  <div className="other-details">
                    <div className="locations">
                      <i className="fa-solid fa-location-dot" />
                      <p>Florida, USA</p>
                    </div>
                    <div className="available-time">
                      <i className="fa-solid fa-clock" />
                      <p>Available on Fri 22 Mar</p>
                    </div>
                    <div className="fees">
                      <i className="fa-solid fa-indian-rupee-sign" />
                      <p>$300 - $1000</p>
                    </div>
                    <div className="booking-btn">
                      <a href="#" className="cmn-btn">
                        View Profile
                      </a>
                      <a href="#" className="cmn-btn">
                        Book now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Features */}
      <section className="available-features">
        <div className="container">
          <div className="content">
            <h3>Available Features in our clinic</h3>
          </div>
          <div className="features">
            {features.map((feat, idx) => (
              <div className="features-card" key={idx}>
                <figure>
                  <a href="#">
                    <img src={feat.img} alt={feat.name} loading="lazy" />
                  </a>
                </figure>
                <a href="#">
                  <p>{feat.name}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="blog">
        <div className="container">
          <div className="content">
            <h3>Blogs and News</h3>
          </div>
          <div className="row">
            {blogCards.map((b, idx) => (
              <div className="col33" key={idx}>
                <div className="blogcard33">
                  <figure>
                    <a href="#">
                      <img src={b.card} alt="Blog" loading="lazy" />
                    </a>
                  </figure>
                  <div className="blog-details">
                    <div className="blog-doctor">
                      <figure>
                        <img src={b.doctor} alt="Doctor" loading="lazy" />
                      </figure>
                      <a href="#">
                        <h4>Dr. Deborah Angel</h4>
                      </a>
                    </div>
                    <p>
                      <i className="fa-solid fa-clock" /> 2 Dec, 2023
                    </p>
                    <p>Benefits of consulting with an Online Doctor.</p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                      do eiusmod..
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="load-more-btn">
            <a href="#" className="cmn-btn">
              Load More
            </a>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="testimonial">
        <div className="container">
          <div className="content">
            <h3>Testimonials</h3>
          </div>
          <div className="row">
            {Array(3)
              .fill(0)
              .map((_, idx) => (
                <div className="col33" key={idx}>
                  <div className="blogcard33">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className="fa-solid fa-star"
                          style={{ color: "#ffd43b" }}
                        />
                      ))}
                    </div>
                    <p>Nice Treatment</p>
                    <p>
                      I had a wonderful experience the staff was friendly and
                      attentive, and Dr. took the time to explain everything
                      clearly.
                    </p>
                    <div className="review-person">
                      <figure>
                        <img src={review} alt="Reviewer" />
                      </figure>
                      <div className="review-name-location">
                        <p>Deney Hendrawan</p>
                        <p>India</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col20">
              <div className="blogcard20">
                <div className="col20-heading">
                  <h6>Company</h6>
                </div>
                <ul>
                  <a href="#">
                    <li>About</li>
                  </a>
                  <a href="#">
                    <li>Features</li>
                  </a>
                  <a href="#">
                    <li>Works</li>
                  </a>
                  <a href="#">
                    <li>Careers</li>
                  </a>
                  <a href="#">
                    <li>Locations</li>
                  </a>
                </ul>
              </div>
            </div>
            <div className="col20">
              <div className="blogcard20">
                <div className="col20-heading">
                  <h6>Treatment</h6>
                </div>
                <ul>
                  <a href="#">
                    <li>Dental</li>
                  </a>
                  <a href="#">
                    <li>Cardiac</li>
                  </a>
                  <a href="#">
                    <li>Spinal Cord</li>
                  </a>
                  <a href="#">
                    <li>Hair Growth</li>
                  </a>
                  <a href="#">
                    <li>Anemia & Disorder</li>
                  </a>
                </ul>
              </div>
            </div>
            <div className="col20">
              <div className="blogcard20">
                <div className="col20-heading">
                  <h6>Specialities</h6>
                </div>
                <ul>
                  <a href="#">
                    <li>Transplant</li>
                  </a>
                  <a href="#">
                    <li>Cardiologist</li>
                  </a>
                  <a href="#">
                    <li>Oncology</li>
                  </a>
                  <a href="#">
                    <li>Pediatrics</li>
                  </a>
                  <a href="#">
                    <li>Gynecology</li>
                  </a>
                </ul>
              </div>
            </div>
            <div className="col20">
              <div className="blogcard20">
                <div className="col20-heading">
                  <h6>Utilities</h6>
                </div>
                <ul>
                  <a href="#">
                    <li>Pricing</li>
                  </a>
                  <a href="#">
                    <li>Contact</li>
                  </a>
                  <a href="#">
                    <li>Request a Quote</li>
                  </a>
                  <a href="#">
                    <li>Premium Membership</li>
                  </a>
                  <a href="#">
                    <li>Integrations</li>
                  </a>
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
                  <a href="https://facebook.com">
                    <i className="fa-brands fa-facebook-f" />
                  </a>
                  <a href="https://instagram.com">
                    <i className="fa-brands fa-instagram" />
                  </a>
                  <a href="https://twitter.com">
                    <i className="fa-brands fa-x-twitter" />
                  </a>
                  <a href="https://linkedin.com">
                    <i className="fa-brands fa-linkedin-in" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Lower Footer */}
      <section className="lower-footer">
        <div className="container">
          <div className="lower-content">
            <div className="copy-right">
              <p>
                Copyright © 2025 <Link to="/">MedEase.</Link> All Rights Reserved
              </p>
            </div>
            <div className="cards">
              {lowerImages.map((imgSrc, idx) => (
                <img key={idx} src={imgSrc} alt={`lower ${idx}`} loading="lazy" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
