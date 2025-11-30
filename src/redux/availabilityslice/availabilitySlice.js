import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { endPoints } from "../../api/endpoints/endPoints";
import { AxiosInstance } from "../../api/axios/axios";
import { Cookies } from "react-cookie";
import toast from "react-hot-toast";

const initialState = {
  availability: [],
  loading: false,
  error: null,
};

const cookie = new Cookies();

/////--------- Get doctor Availability------///

export const fetchDoctorAvailability = createAsyncThunk(
  "doctor/fetchAvailability",
  async (doctorId) => {
    let res = await AxiosInstance.get(
      `${endPoints.availability.getAvailableDoctor}/${doctorId}`
    );

    let resData = res?.data;
    return resData;
  }
);
/////--------- Set doctor Availability------///

export const setDoctorAvailability = createAsyncThunk(
  "doctor/setAvailability",
  async (formData) => {
    let res = await AxiosInstance.post(
      endPoints.availability.createAvailability,
      formData
    );

    let resData = res?.data;
    return resData;
  }
);

//////------Doctor CMS--------//

const availabilitySlice = createSlice({
  name: "Availability",
  initialState,
  reducers: {},
  extraReducers: (dev) => {
    dev

      /////-----------------doctor----------///

      .addCase(fetchDoctorAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorAvailability.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload.success === true) {
          state.availability = payload.data;
          state.error = null;
        } else {
          state.availability = [];
          state.error = payload.message || "Failed to fetch availability";
        }
      })

      .addCase(fetchDoctorAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })

      //// set doctor availability

      .addCase(setDoctorAvailability.pending, (state) => {})
      .addCase(setDoctorAvailability.fulfilled, (state, { payload }) => {
        if (payload.success === true) {
          toast.success(payload.message);
        } else {
          
          state.error = payload.message || "Failed to set availability";
        }
      })

      .addCase(setDoctorAvailability.rejected, (state, action) => {
         
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const {} = availabilitySlice.actions;
export default availabilitySlice;
