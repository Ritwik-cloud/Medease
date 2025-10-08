import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Eye, EyeClosed } from "lucide-react";
import "../login/login.css";
import loginImage from "../../../assets/images/authImage.jpg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PatientLoginForm } from "@/redux/patient/authSlice/patientAuthSlice";


// Yup validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const PatientLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const loginPayload = {
      email: data.email,
      password: data.password
    }
   
   
        
        try {
          await new Promise((resolve) => setTimeout(resolve, 1500));
          const response = await  dispatch(PatientLoginForm(loginPayload)).unwrap();
    
          if (response.status === true) {
       
            navigate("/patient/cms/dashboard");
          }
        } catch (error) {
          console.error("login error", error);
        }
  };

  return (
    <section className="login">
      <div className="container">
        <div className="row">
          {/* Left Image */}
          <div className="col50 rounded-md">
            <figure >
              <img className=" rounded-lg" src={loginImage} alt="login" />
            </figure>
          </div>

          {/* Right Side Login Card */}
          <div className="col50">
            <div className="logincard">
              <h4 className="login-heading">Login MEDEASE</h4>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email Input */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    className={`mt-1 block w-full px-3 py-2 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                   aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {/* Password Input */}
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...register("password")}
                      className={`mt-1 block w-full px-3 py-2 border ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      aria-invalid={errors.password ? "true" : "false"}
                    />
                    <span
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                    </span>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="btn">
                  <button type="submit" className="cmn-btn">
                    <h4>Sign In</h4>
                  </button>
                </div>
              </form>

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

export default PatientLogin;
