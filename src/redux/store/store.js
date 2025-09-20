import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../authslice/authSlice";
import cmsSlice from "../cmsSlice/cmsSlice";


export const store = configureStore({
   reducer: {
        auth: authSlice.reducer,
        Cms: cmsSlice.reducer,
    }
})