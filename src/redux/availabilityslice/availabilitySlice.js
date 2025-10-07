import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { endPoints } from "../../api/endpoints/endPoints";
import { AxiosInstance } from "../../api/axios/axios";
import { Cookies } from "react-cookie";

const initialState = {
  availability: [],
  loading: false,
  error: null,
};

const cookie = new Cookies();

/////---------doctor Availability------///

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
      });
  },
});

export const {} = availabilitySlice.actions;
export default availabilitySlice;

