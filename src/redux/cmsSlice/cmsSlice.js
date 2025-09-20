import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { endPoints } from "../../api/endpoints/endPoints";
import {AxiosInstance} from '../../api/axios/axios'

const initialState = {};


/////----patient CMS------///

export const PatientDashboard = createAsyncThunk("PatientDashboard",
    async()=>{
        let res = await AxiosInstance.post(endPoints.patient.cms.dashboard)
        let resData = res?.data;
        return resData;
    }
)



export const PatientpdateProfile = createAsyncThunk("PatientpdateProfile",
    async(formData)=>{
        let res = await AxiosInstance.post(endPoints.patient.auth.verifyotp, formData)
        let resData = res?.data;
        return resData;
    }
)





//////------Doctor CMS--------//






const cmsSlice = createSlice({
    name: "Crud",
    initialState,
    reducers: {},
    extraReducers:(dev)=>{
        dev

        .addCase(PatientDashboard.pending,(state,{payload}) => {})
        .addCase(PatientDashboard.fulfilled,(state,{payload}) => {})
        .addCase(PatientDashboard.rejected,(state,{payload}) => {})


          .addCase(PatientpdateProfile.pending,(state,{payload}) => {})
        .addCase(PatientpdateProfile.fulfilled,(state,{payload}) => {})
        .addCase(PatientpdateProfile.rejected,(state,{payload}) => {})


    }
})

export const {} =cmsSlice.actions;
export default cmsSlice;