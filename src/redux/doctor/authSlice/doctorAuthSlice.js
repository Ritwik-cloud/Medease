import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AxiosInstance } from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";


let doctorEndPoint=endPoints.doctor.auth.login;
console.log("doctor end point:",doctorEndPoint);

export const fetchDoctorLogin=createAsyncThunk("Authentication/fetchDoctorLogin",
  async(form_value)=>{
    let res=await AxiosInstance.post(doctorEndPoint,form_value);
    console.log("Axios response for get api:",res);
    return res?.data;
  }
)

let doctorChangePassword=endPoints.doctor.auth.changePassoword;
console.log("doctor change password:",doctorChangePassword);

export const fetchDoctorChangePassword=createAsyncThunk("Authentication/fetchDoctorChangePassword",
  async()=>{
    let res=await AxiosInstance.post(doctorChangePassword);
    console.log("Axios response for post api for change password:",res);
    return res?.data;
  }
)

let doctorForgetPassword=endPoints.doctor.auth.forgotpassword;
console.log("doctor forget password:",doctorForgetPassword);

export const fetchDoctorForgetPassword=createAsyncThunk("Authentication/fetchDoctorForgetPassword",
  async()=>{
    let res=await AxiosInstance.post(doctorForgetPassword);
    console.log("Axios response for post api for forget password:",res);
    return res?.data;
  }
)

let doctorResetPassword=endPoints.doctor.auth.resetpassword;
console.log("doctor reset password:",doctorResetPassword);

export const fetchDoctorResetPassword=createAsyncThunk("Authentication/fetchDoctorResetPassword",
  async()=>{
    let res=await AxiosInstance.post(doctorResetPassword);
    console.log("Axios response for post api for reset password:",res);
    return res?.data;
  }
)

let doctorProfile=endPoints.doctor.auth.doctorProfile;
console.log("doctor profile:",doctorProfile);

export const fetchDoctorProfile=createAsyncThunk("Authentication/fetchDoctorProfile",
  async()=>{
    let res=await AxiosInstance.post(doctorProfile);
    console.log("Axios response for post api for doctor profile:",res);
    return res?.data;
  }
)

let doctorLogout=endPoints.doctor.auth.doctorLogout;
console.log("doctor logout:",doctorLogout);

export const fetchDoctorLogout=createAsyncThunk("Authentication/fetchDoctorLogout",
  async()=>{
    let res=await AxiosInstance.post(doctorLogout);
    console.log("Axios response for post api for doctor logout:",res);
    return res?.data;
  }
)
