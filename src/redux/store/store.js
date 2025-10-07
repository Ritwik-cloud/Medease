import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../authslice/authSlice";
import cmsSlice from "../cmsSlice/cmsSlice";
import appointmentSlice from "../appointmentslice/appointmentSlice";
import availabilitySlice from "../availabilityslice/availabilitySlice";


export const store = configureStore({
   reducer: {
        auth: authSlice.reducer,
        Cms: cmsSlice.reducer,
        Appointment:appointmentSlice.reducer,
        Availability: availabilitySlice.reducer,
    }
})

