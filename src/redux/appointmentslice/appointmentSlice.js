import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { endPoints } from "../../api/endpoints/endPoints";
import {AxiosInstance} from '../../api/axios/axios'
import { Cookies } from "react-cookie";
import toast from "react-hot-toast";

const initialState = {

};

const cookie = new Cookies()







////--------------Book appointment----------///
export const BookAppointment = createAsyncThunk("BookAppointment",
    async(formData)=>{
        let res = await AxiosInstance.post(endPoints.appointment.bookAppointment, formData)
        let resData = res?.data;
        return resData;
    }
)






//////------Doctor CMS--------//








const appointmentSlice = createSlice({
    name: "Appointment",
    initialState,
    reducers: {},
    extraReducers:(dev)=>{
        dev

        .addCase(BookAppointment.pending,(state,{payload}) => {})
        .addCase(BookAppointment.fulfilled,(state,{payload}) => {
            if (payload.status === true) {
         
               toast.success(payload.message)

          
        }
        })
        .addCase(BookAppointment.rejected,(state,{payload}) => {})






        /////-----------------doctor----------///




    }
})

export const {} =appointmentSlice.actions;
export default appointmentSlice;