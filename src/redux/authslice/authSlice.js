import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { endPoints } from "../../api/endpoints/endPoints";
import { AxiosInstance } from "../../api/axios/axios";
import toast from "react-hot-toast";
import { Cookies } from "react-cookie";

const initialState = {};
const cookie = new Cookies();

//////////////-----------Patient Auth-----------///

export const registerForm = createAsyncThunk("register", async (formData) => {
  let res = await AxiosInstance.post(endPoints.patient.auth.register, formData);
  let resData = res?.data;
  return resData;
});

export const verifyOtp = createAsyncThunk("verifyOtp", async (formData) => {
  let res = await AxiosInstance.post(
    endPoints.patient.auth.verifyotp,
    formData
  );
  let resData = res?.data;
  return resData;
});

export const resendOtp = createAsyncThunk("resendOtp", async (formData) => {
  let res = await AxiosInstance.post(
    endPoints.patient.auth.resendotp,
    formData
  );
  let resData = res?.data;
  return resData;
});

export const loginForm = createAsyncThunk("loginForm", async (formData) => {
  let res = await AxiosInstance.post(endPoints.patient.auth.login, formData);
  let resData = res?.data;
  return resData;
});


export const PatientlogOut = createAsyncThunk("PatientlogOut", async () => {
  let res = await AxiosInstance.post(endPoints.patient.auth.logOut);
  let resData = res?.data;
  return resData;
});


export const forgetPassword = createAsyncThunk(
  "forgotPassword",
  async (formData) => {
    let res = await AxiosInstance.post(
      endPoints.patient.auth.forgotpassword,
      formData
    );
    let resData = res?.data;
    return resData;
  }
);
export const resetPassword = createAsyncThunk(
  "resetPassword",
  async (formData) => {
    let res = await AxiosInstance.post(
      endPoints.patient.auth.resetpassword,
      formData
    );
    let resData = res?.data;
    return resData;
  }
);





/////////////----------------Doctor Auth-------------////





 

const authSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {},
  extraReducers: (dev) => {
    dev

      .addCase(registerForm.pending, (state, { payload }) => {})
      .addCase(registerForm.fulfilled, (state, { payload }) => {
        toast.success(payload.message);
        localStorage.setItem("userEmail", payload.data.email);
      })
      .addCase(registerForm.rejected, (state, { payload }) => {})

      .addCase(verifyOtp.pending, (state, { payload }) => {})
      .addCase(verifyOtp.fulfilled, (state, { payload }) => {
        toast.success(payload.message);
      })
      .addCase(verifyOtp.rejected, (state, { payload }) => {})

      .addCase(loginForm.pending, (state, { payload }) => {})
      .addCase(loginForm.fulfilled, (state, { payload }) => {
        toast.success(payload.message);
        if (payload.status === true) {
          cookie.set("token", payload.token, {
            path: "/",
            secure: true,
          });

          
        }
      })

      



       .addCase(PatientlogOut.pending, (state, { payload }) => {})
      .addCase(PatientlogOut.fulfilled, (state, { payload }) => {
       if (payload.status === true) {
      cookie.remove("token", { path: "/" });
         toast.success(payload.message);
       }

      })
      .addCase(PatientlogOut.rejected, (state, { payload }) => {})
  },



});

export const {} = authSlice.actions;
export default authSlice;
