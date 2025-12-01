
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import "./verifyOtp.css";
import { verifyOtp } from "../../../redux/patient/authSlice/patientAuthSlice";
import { useNavigate } from "react-router-dom";

// Validation schema with Yup
const otpSchema = yup.object().shape({
  otp: yup
    .array()
    .of(
      yup
        .string()
        .matches(/^[0-9]$/, "Only digits allowed")
        .required("Required")
    )
    .length(6, "Must be 6 digits"),
});

export default function VerifyOtp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [resendTimer, setResendTimer] = useState(30);
  const useEmail = localStorage.getItem("userEmail");

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(otpSchema),
    defaultValues: { otp: ["", "", "", "", "", ""] },
  });

  // Countdown for resend timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const onSubmit = async (data) => {
    const otpPayload = {
      email: useEmail,
      otp: data.otp.join(""), 
    };

  
       
       try {
         await new Promise((resolve) => setTimeout(resolve, 1500));
         const response = await dispatch(verifyOtp(otpPayload)).unwrap();
   
         if (response.status === true) {
           navigate("/patient/auth/login");
         }
       } catch (error) {
         console.error("Register error", error);
       }
  };

  return (
    <main className="otp-page">
      <section className="card" role="form" aria-labelledby="otp-title">
        <header className="card__header">
          <h1 id="otp-title">Verify One-Time Password</h1>
          <p className="subtitle">
            Enter the 6-digit code sent to the registered mobile/email.
          </p>
        </header>

        <form id="otp-form" className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="otp-group" role="group" aria-label="Enter 6 digit code">
            {Array.from({ length: 6 }).map((_, index) => (
              <Controller
                key={index}
                name={`otp.${index}`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="1"
                    aria-label={`Digit ${index + 1}`}
                    className="otp-input"
                    id={`otp-${index + 1}`}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      clearErrors("otp");
                      if (e.target.value && index < 5) {
                        document.getElementById(`otp-${index + 2}`).focus();
                      }
                    }}
                  />
                )}
              />
            ))}
          </div>

          {errors.otp && (
            <p id="error" className="error" role="alert">
              {errors.otp.message}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            id="verify-btn"
            aria-label="Verify OTP"
          >
            Verify
          </button>

          <div className="actions">
            <button
              type="button"
              className="btn btn-link"
              id="resend-btn"
              disabled={resendTimer > 0}
              onClick={() => setResendTimer(30)}
            >
              Resend code
            </button>
            <span className="muted" id="resend-timer" aria-live="polite">
              {resendTimer > 0 && `Resend in ${resendTimer}s`}
            </span>
          </div>
        </form>
      </section>
    </main>
  );
}
