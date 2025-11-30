import { AxiosInstance } from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";
import toast from "react-hot-toast";


const initialState = {
  patientDashboardDetails: {},
  PatientProfileDetails: {},
  profileLoading: false,

  allDoctor: {},
};

const cookie = new Cookies();

/////----patient CMS------///

export const PatientDashboard = createAsyncThunk(
  "PatientDashboard",
  async () => {
    let res = await AxiosInstance.get(endPoints.patient.cms.dashboard, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    let resData = res?.data;
    return resData;
  }
);

export const PatientProfile = createAsyncThunk(
  "PatientProfileDetails",
  async () => {
    let res = await AxiosInstance.get(endPoints.patient.auth.profile);
    let resData = res?.data;
    return resData;
  }
);

export const PatientUpdateProfile = createAsyncThunk(
  "PatientUpdateProfile",
  async (formData) => {
    let res = await AxiosInstance.post(endPoints.patient.cms.updateProfile, formData);
    let resData = res?.data;
    return resData;
  }
);


////--------------Book appointment----------///
// export const BookAppointment = createAsyncThunk("BookAppointment",
//     async(formData)=>{
//         let res = await AxiosInstance.get(endPoints.appointment.bookAppointment, formData)
//         let resData = res?.data;
//         return resData;
//     }
// )

//////------Doctor CMS--------//

export const GetDoctorList = createAsyncThunk("GetDoctorList", async () => {
  let res = await AxiosInstance.get(endPoints.doctor.cms.allDoctors);
  let resData = res?.data;
  return resData;
});




const patientCmsSlice = createSlice({
  name: "patientCms",
  initialState,
  reducers: {},
  extraReducers: (dev) => {
    dev

      .addCase(PatientDashboard.pending, (state, { payload }) => {})
      .addCase(PatientDashboard.fulfilled, (state, { payload }) => {
        if (payload.status === true) {
          state.patientDashboardDetails = payload.data;
        }
      })
      .addCase(PatientDashboard.rejected, (state, { payload }) => {})

      /////----------patient profile details----------///

      .addCase(PatientProfile.pending, (state, { payload }) => {
        state.profileLoading = true;
      })
      .addCase(PatientProfile.fulfilled, (state, { payload }) => {
        if (payload.status === true) {
            toast.success(payload.message)
          state.PatientProfileDetails = payload.data;
          state.profileLoading = false;
        }
      })
      .addCase(PatientProfile.rejected, (state, { payload }) => {
        state.profileLoading = false;

      })

      ///patient profile update -------///
      .addCase(PatientUpdateProfile.pending, (state, { payload }) => {
        // state.profileLoading = true;
      })
      .addCase(PatientUpdateProfile.fulfilled, (state, { payload }) => {
        if (payload.status === true) {
            toast.success(payload.message)
          // state.PatientProfileDetails = payload.data;
          // state.profileLoading = false;
        }
      })
      .addCase(PatientUpdateProfile.rejected, (state, { payload }) => {
        // state.profileLoading = false;

      })

      /////-----------------doctor----------///

      .addCase(GetDoctorList.pending, (state, { payload }) => {})
      .addCase(GetDoctorList.fulfilled, (state, { payload }) => {
        state.allDoctor = payload.data;
      })
      .addCase(GetDoctorList.rejected, (state, { payload }) => {});
  },
});

export const {} = patientCmsSlice.actions;
export default patientCmsSlice;
