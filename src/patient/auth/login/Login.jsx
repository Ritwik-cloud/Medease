import React from "react";
import "../login/login.css";
import loginImage from "../../../assets/images/img.png";
import googleLogo from "../../../assets/images/google.png";
import facebookLogo from "../../../assets/images/facebook.png";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPasswrod] = useState(false);
  return (
    <section className="login">
      <div className="container">
        <div className="row">
          {/* Left Image */}
          <div className="col50">
            <figure>
              <img src={loginImage} alt="login" />
            </figure>
          </div>

          {/* Right Side Login Card */}
          <div className="col50">
            <div className="logincard">
              <h4 className="login-heading">Login MEDEASE</h4>

              <h4 className="h4-mail">Email</h4>
              <input type="email" name="mail" id="mail" placeholder="Email" />

                <div className="pw">
                  <h4>Password</h4>
                  <h4>
                    <a href="#" className="forget-pass">
                      Forgot Password?
                    </a>
                  </h4>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="pass"
                  id="pass"
                  placeholder="Password"
                />
                
              <div className="relative">
                <span
                  className="toggle-eye absolute right-5 bottom-9 cursor-pointer "
                  onClick={() => setShowPasswrod(!showPassword)}
                >
                  {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                </span>
              </div>

              <div className="check">
                <input type="checkbox" id="ck" name="ck" />
                <label htmlFor="ck">
                  <h4>Remember Me</h4>
                </label>
              </div>

              {/* Sign In Button */}
              <div className="btn">
                <a href="#" className="cmn-btn">
                  <h4>Sign In</h4>
                </a>
              </div>

              <div className="or">
                <h4>or</h4>
              </div>

              {/* Google Login */}
              <div className="btn2">
                <a href="#" className="cmn-btn">
                  <div className="logo">
                    <i className="fa-brands fa-google"></i>
                  </div>
                  <h4 className="googlle-sign">Sign With Google</h4>
                </a>
              </div>

              {/* Facebook Login */}
              <div className="btn3">
                <a href="#" className="cmn-btn">
                  <div className="logo">
                    <i className="fa-brands fa-facebook-f"></i>
                  </div>
                  <h4 className="facebook-sign">Sign With Facebook</h4>
                </a>
              </div>

              {/* Sign Up Option */}
              <div className="new-act">
                <h4>Don't have an account ?</h4>
                <h4>
                  <a href="#" className="sign-up">
                    Sign Up
                  </a>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
