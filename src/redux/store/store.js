import { configureStore } from "@reduxjs/toolkit";
import appointmentSlice from "../appointmentslice/appointmentSlice";
import availabilitySlice from "../availabilityslice/availabilitySlice";
import patientAuthSlice from "../patient/authSlice/patientAuthSlice";
import patientCmsSlice from "../patient/cmsSlice/patientCmsSlice";


export const store = configureStore({
   reducer: {
        patientAuth: patientAuthSlice.reducer,
       patientCms: patientCmsSlice.reducer,
        Appointment:appointmentSlice.reducer,
        Availability: availabilitySlice.reducer,
    }
})

