import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { endPoints } from "../../api/endpoints/endPoints";
import {AxiosInstance} from '../../api/axios/axios'
import { Cookies } from "react-cookie";
import toast from "react-hot-toast";

const cookie = new Cookies()

////--------------Book appointment----------///
export const BookAppointment = createAsyncThunk("BookAppointment",
    async(formData)=>{
        let res = await AxiosInstance.post(endPoints.appointment.bookAppointment, formData)
        let resData = res?.data;
        return resData;
    }
) 

// ----my patient----//
export const fetchMyPatient = createAsyncThunk("Appointment/fetchMyPatient",
    async () => {
        let res = await AxiosInstance.get(endPoints.appointment.myPatient);
        console.log("Axios response for get api for my patient:", res);
        return res?.data;
    }
)

//----patient reschedule----//
export const fetchPatientReschedule = createAsyncThunk("Appointment/fetchPatientReschedule",
  async ({ id, payload }) => {
    let res = await AxiosInstance.put(
      `${endPoints.appointment.rescheduleAppointment}/${id}`,
      payload
    );
    console.log("Axios response for put api for patient reschedule:", res);
    return res?.data;
  }
);

//----patient cancel----//
export const fetchPatientCancel = createAsyncThunk("Appointment/fetchPatientCancel",
    async ({id,payload}) => {
        let res = await AxiosInstance.put(`${endPoints.appointment.patientCancelAppointment}/${id}`,
            payload
        );
        console.log("Axios response for put api for patient cancel appointment:", res);
        return res?.data;
    }
)

//----doctor confirm----//
export const fetchDoctorConfirm = createAsyncThunk("Appointment/fetchDoctorConfirm",
    async ({id,payload}) => {
        let res = await AxiosInstance.put(`${endPoints.appointment.confirmAppointment}/${id}`,
            payload
        );
        console.log("Axios response for put api for doctor confirm appointment:", res);
        return res?.data;
    }
)

//----doctor cancel----//
export const fetchDoctorCancel = createAsyncThunk("Appointment/fetchDoctorCancel",
    async ({id,payload}) => {
        let res = await AxiosInstance.put(`${endPoints.appointment.doctorCancelAppointment}/${id}`,
            payload
        );
        console.log("Axios response for put api for doctor cancel appointment:", res);
        return res?.data;
    }
)

//----doctor complete----//
export const fetchDoctorComplete = createAsyncThunk("Appointment/fetchDoctorComplete",
    async ({id,payload}) => {
        let res = await AxiosInstance.put(`${endPoints.appointment.completedAppointment}/${id}`,payload);
        console.log("Axios response for put api for doctor complete appointment:", res);
        return res?.data;
    }
)

const appointmentSlice = createSlice({
    name: "Appointment",
    initialState,
    reducers: {},
    extraReducers:(dev)=>{
        dev
        //----book appointment----//
        .addCase(BookAppointment.pending,(state,{payload}) => {})
        .addCase(BookAppointment.fulfilled,(state,{payload}) => {
            if (payload.status === true) {
         
               toast.success(payload.message)
        }
        })
        .addCase(BookAppointment.rejected,(state,{payload}) => {})

        // ----my patient----//
        .addCase( fetchMyPatient.pending,(state,{payload}) => {})
        .addCase( fetchMyPatient.fulfilled,(state,{payload}) => {})
        .addCase( fetchMyPatient.rejected,(state,{payload}) => {})

        //----patient reschedule----//
        .addCase( fetchPatientReschedule.pending,(state,{payload}) => {})
        .addCase( fetchPatientReschedule.fulfilled,(state,{payload}) => {})
        .addCase( fetchPatientReschedule.rejected,(state,{payload}) => {})

        //----patient cancel----//
        .addCase( fetchPatientCancel.pending,(state,{payload}) => {})
        .addCase( fetchPatientCancel.fulfilled,(state,{payload}) => {})
        .addCase( fetchPatientCancel.rejected,(state,{payload}) => {})

        //----doctor confirm----//
        .addCase( fetchDoctorConfirm.pending,(state,{payload}) => {})
        .addCase( fetchDoctorConfirm.fulfilled,(state,{payload}) => {})
        .addCase( fetchDoctorConfirm.rejected,(state,{payload}) => {})

        //----doctor cancel----//
        .addCase( fetchDoctorCancel.pending,(state,{payload}) => {})
        .addCase( fetchDoctorCancel.fulfilled,(state,{payload}) => {})
        .addCase( fetchDoctorCancel.rejected,(state,{payload}) => {})

        //----doctor complete----//
        .addCase( fetchDoctorComplete.pending,(state,{payload}) => {})
        .addCase( fetchDoctorComplete.fulfilled,(state,{payload}) => {})
        .addCase( fetchDoctorComplete.rejected,(state,{payload}) => {})
    }
})

export const {} =appointmentSlice.actions;
export default appointmentSlice;