import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosInstance } from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";

//----login----//

let doctorEndPoint = endPoints.doctor.auth.login;
console.log("doctor end point:", doctorEndPoint);

export const fetchDoctorLogin = createAsyncThunk("doctorAuthentication/fetchDoctorLogin",
    async (form_value) => {
        let res = await AxiosInstance.post(doctorEndPoint, form_value);
        console.log("Axios response for get api:", res);
        return res?.data;
    }
)

//----change password----//

let doctorChangePassword = endPoints.doctor.auth.changePassoword;
console.log("doctor change password:", doctorChangePassword);

export const fetchDoctorChangePassword = createAsyncThunk("doctorAuthentication/fetchDoctorChangePassword",
    async () => {
        let res = await AxiosInstance.post(doctorChangePassword);
        console.log("Axios response for post api for change password:", res);
        return res?.data;
    }
)

//----forget password----//

let doctorForgetPassword = endPoints.doctor.auth.forgotpassword;
console.log("doctor forget password:", doctorForgetPassword);

export const fetchDoctorForgetPassword = createAsyncThunk("doctorAuthentication/fetchDoctorForgetPassword",
    async () => {
        let res = await AxiosInstance.post(doctorForgetPassword);
        console.log("Axios response for post api for forget password:", res);
        return res?.data;
    }
)

//----reset password----//

let doctorResetPassword = endPoints.doctor.auth.resetpassword;
console.log("doctor reset password:", doctorResetPassword);

export const fetchDoctorResetPassword = createAsyncThunk("doctorAuthentication/fetchDoctorResetPassword",
    async () => {
        let res = await AxiosInstance.post(doctorResetPassword);
        console.log("Axios response for post api for reset password:", res);
        return res?.data;
    }
)

//----profile----//

let doctorProfile = endPoints.doctor.auth.doctorProfile;
console.log("doctor profile:", doctorProfile);

export const fetchDoctorProfile = createAsyncThunk("doctorAuthentication/fetchDoctorProfile",
    async () => {
        let res = await AxiosInstance.get(doctorProfile);
        console.log("Axios response for post api for doctor profile:", res);
        return res?.data;
    }
)

//----logout----//

let doctorLogout = endPoints.doctor.auth.doctorLogout;
console.log("doctor logout:", doctorLogout);

export const fetchDoctorLogout = createAsyncThunk("doctorAuthentication/fetchDoctorLogout",
    async () => {
        let res = await AxiosInstance.post(doctorLogout);
        console.log("Axios response for post api for doctor logout:", res);
        return res?.data;
    }
)

const doctorAuthSlice = createSlice({
    name: "doctorAuthentication",
    initialState,
    reducers: {},
    extraReducer:(dev)=>{
        dev
        //---login---//
        .addCase(fetchDoctorLogin.pending, (state, { payload }) => {})
        .addCase(fetchDoctorLogin.fulfilled, (state, { payload }) => {})
        .addCase(fetchDoctorLogin.rejected, (state, { payload }) => {})

        //---change password---//
        .addCase(fetchDoctorChangePassword.pending, (state, { payload }) => {})
        .addCase(fetchDoctorChangePassword.fulfilled, (state, { payload }) => {})
        .addCase(fetchDoctorChangePassword.rejected, (state, { payload }) => {})

        //---forget password---//
        .addCase(fetchDoctorForgetPassword.pending, (state, { payload }) => {})
        .addCase(fetchDoctorForgetPassword.fulfilled, (state, { payload }) => {})
        .addCase(fetchDoctorForgetPassword.rejected, (state, { payload }) => {})

         //---reset password---//
        .addCase(fetchDoctorResetPassword.pending, (state, { payload }) => {})
        .addCase(fetchDoctorResetPassword.fulfilled, (state, { payload }) => {})
        .addCase(fetchDoctorResetPassword.rejected, (state, { payload }) => {})

         //---profile---//
        .addCase(fetchDoctorProfile.pending, (state, { payload }) => {})
        .addCase(fetchDoctorProfile.fulfilled, (state, { payload }) => {})
        .addCase(fetchDoctorProfile.rejected, (state, { payload }) => {})

        //---logout---//
        .addCase(fetchDoctorLogout.pending, (state, { payload }) => {})
        .addCase(fetchDoctorLogout.fulfilled, (state, { payload }) => {})
        .addCase(fetchDoctorLogout.rejected, (state, { payload }) => {})
    }
});
export const {} = doctorAuthSlice.actions;
export default doctorAuthSlice;
