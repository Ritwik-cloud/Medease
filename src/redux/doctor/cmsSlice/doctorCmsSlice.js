import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosInstance } from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";
import { Cookies } from "react-cookie";

const initialState = {
  DoctorDashboardDetails: {},
};

const cookie = new Cookies();
//----all doctor----//

let allDoctor = endPoints.doctor.cms.allDoctors;
console.log("All doctor:", allDoctor);

export const fetchAllDoctor = createAsyncThunk(
  "doctorCms/fetchAllDoctor",
  async () => {
    let res = await AxiosInstance.get(allDoctor);
    console.log("Axios response for post api for all doctor:", res);
    return res?.data;
  }
);

//----dashboard----//

let DoctorDashboard = endPoints.doctor.cms.dashboard;
console.log("doctor dashboard:", DoctorDashboard);

export const fetchDoctorDashboard = createAsyncThunk(
  "doctorCms/fetchDoctorDashboard",
  async () => {
    let res = await AxiosInstance.get(DoctorDashboard, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Axios response for post api for doctor dashboard:", res);
    return res?.data;
  }
);

//----update profile----//

let DoctorUpdateProfile = endPoints.doctor.cms.updateProfile;
console.log("doctor updateprofile:", DoctorUpdateProfile);

export const fetchDoctorUpdateProfile = createAsyncThunk(
  "doctorCms/fetchDoctorUpdateProfile",
  async () => {
    let res = await AxiosInstance.post(DoctorUpdateProfile);
    console.log("Axios response for post api for doctor updateprofile:", res);
    return res?.data;
  }
);

//----specilization----//

let doctorBySpeciality = endPoints.doctor.cms.doctorBySpeciality;
console.log("doctor speciality:", doctorBySpeciality);

export const fetchDoctorBySpeciality = createAsyncThunk(
  "doctorCms/fetchDoctorBySpeciality",
  async () => {
    let res = await AxiosInstance.post(doctorBySpeciality);
    console.log("Axios response for post api for doctor speciality:", res);
    return res?.data;
  }
);

const doctorCmsSlice = createSlice({
  name: "doctorCms",
  initialState,
  reducers: {},
  extraReducers: (dev) => {
    dev

      //----all doctor----//
      .addCase(fetchAllDoctor.pending, (state, { payload }) => {})
      .addCase(fetchAllDoctor.fulfilled, (state, { payload }) => {})
      .addCase(fetchAllDoctor.rejected, (state, { payload }) => {})

      //----dashboard----//
      .addCase(fetchDoctorDashboard.pending, (state, { payload }) => {})
      .addCase(fetchDoctorDashboard.fulfilled, (state, { payload }) => {
        if (payload.status === true) {
          state.DoctorDashboardDetails = payload.data;
          cookie.set("doctorId",payload.data.id, {
            path: "/",
            secure: true,
          });
       
          console.log("Full payload:", payload); // Debug: see entire response
          console.log("Payload data:", payload.data); // Debug: check data object
          console.log("Doctor ID:", payload.data?.id); // Debug: check if id exists
        }
      })
      .addCase(fetchDoctorDashboard.rejected, (state, { payload }) => {})

      //----update profile----//
      .addCase(fetchDoctorUpdateProfile.pending, (state, { payload }) => {})
      .addCase(fetchDoctorUpdateProfile.fulfilled, (state, { payload }) => {})
      .addCase(fetchDoctorUpdateProfile.rejected, (state, { payload }) => {})

      //----specilization----//
      .addCase(fetchDoctorBySpeciality.pending, (state, { payload }) => {})
      .addCase(fetchDoctorBySpeciality.fulfilled, (state, { payload }) => {})
      .addCase(fetchDoctorBySpeciality.rejected, (state, { payload }) => {});
  },
});
export const {} = doctorCmsSlice.actions;
export default doctorCmsSlice;
