import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./register.css";
import image from "../../../assets/images/authImage.jpg";
import { useDispatch } from "react-redux";
import { registerForm } from "../../../redux/authslice/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";

// yup validation schema (removed dob & address)
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  gender: yup.string().required("Please select your gender"),
  profileImg: yup
    .mixed()
    .test("required", "Profile picture is required", (value) => {
      return value && value.length > 0;
    }),
});

const Register = () => {
  const [img, setImg] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPasswrod] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // File handler
  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("File size should be less than 5MB");
        return;
      }
      setImg(file);
      setValue("profileImg", [file]);
      clearErrors("profileImg");
    } else {
      alert("Please upload a valid image file");
    }
  };

  // submit handler
  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("profileImg", img);
    formData.append("phone", data.phone);
    formData.append("password", data.password);
    formData.append("gender", data.gender);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const response = await dispatch(registerForm(formData)).unwrap();

      if (response.status === true) {
        navigate("/patient/auth/otp");
      }
    } catch (error) {
      console.error("Register error", error);
    }
  };

  return (
    <section className="registration">
      <div className="container">
        <div className="row">
          {/* Left Image */}
          <div className="col50">
            <img src={image} alt="login" />
          </div>

          {/* Registration Form */}
          <div className="col50">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="register-card">
                <Link to={"../doctor/auth/login"}>
                  <h4 className="head">Are you a Doctor?</h4>
                </Link>

                {/* Name */}
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Name *"
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && <p className="error">{errors.name.message}</p>}

                {/* Email */}
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email *"
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <p className="error">{errors.email.message}</p>
                )}

                {/* Phone */}
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="Mobile Number"
                  aria-invalid={errors.phone ? "true" : "false"}
                />
                {errors.phone && (
                  <p className="error">{errors.phone.message}</p>
                )}

                {/* Password */}
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create Password *"
                    aria-invalid={errors.password ? "true" : "false"}
                  />
                  <span
                    className="toggle-eye absolute right-5 bottom-8 cursor-pointer "
                    onClick={() => setShowPasswrod(!showPassword)}
                  >
                    {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                  </span>
                </div>

                {errors.password && (
                  <p className="error">{errors.password.message}</p>
                )}

                {/* Profile Picture */}
                <div className="profile-upload">
                  <label htmlFor="profileImg">Profile Picture *</label>
                  <input
                    type="file"
                    id="profileImg"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>
                {errors.profileImg && (
                  <p className="error">{errors.profileImg.message}</p>
                )}

                {/* Gender */}
                <div className="gender-and-already">
                  <div className="gender md:flex flex-col gap-1">
                    <label htmlFor="gender">Gender</label>
                    <select id="gender" {...register("gender")}>
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && (
                      <p className="error">{errors.gender.message}</p>
                    )}
                  </div>
                  <Link to={"/patient/auth/login"}>
                    <h4>Already have an account?</h4>
                  </Link>
                </div>

                {/* Sign Up Button */}
                <div className="btn">
                  <button
                    type="submit"
                    className="cmn-btn"
                    disabled={isSubmitting}
                  >
                    <h4>{isSubmitting ? "Signing up..." : "Sign up"}</h4>
                  </button>
                </div>

                {/* OR Divider */}
                <div className="or">
                  <h4>or</h4>
                </div>

                {/* Social Login */}
                <div className="btn2">
                  <a href="#" className="cmn-btn2">
                    <div className="logo">
                      <i className="fa-brands fa-facebook-f"></i>
                    </div>
                    <h4>Log in</h4>
                  </a>
                  <a href="#" className="cmn-btn2">
                    <div className="logo">
                      <i className="fa-brands fa-google"></i>
                    </div>
                    <h4>Log in</h4>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
