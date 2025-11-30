export const endPoints = {

   /// ----patient ----//
  patient: {
    auth: {
      register: `/api/patient/register`,
      verifyotp: `/api/patient/verifyemail`,
      resendotp: `/api/patient/resendotp`,
      forgotpassword: `/api/patient/forgetpassword`,
      resetpassword: `/api/patient/resetpassword/:token`,
      login: `/api/patient/login`,
      profile: `/api/patient/profile`,
      logOut: `/api/patient/logout`
    },

    cms: {
     
      dashboard: `/api/patient/dashboard`,
      updateProfile: `/api/patient/updateprofile`,
      

    },
  },


  ////-------------------Doctor--------------///

  doctor: {
    auth: {
      changePassoword:`/api/doctor/change-password`,
      forgotpassword: `/api/doctor/forgetpassword`,
      resetpassword: `/api/doctor/resetpassword/:token`,
      login: `/api/doctor/login`,
      profile: `/api/doctor/profile`,
      logOut: `/api/doctor/logout`
    },

    cms: {
       allDoctors: `/api/alldoctor`,
      dashboard: `/api/doctor/dashboard`,
      updateProfile: `/api/doctor/updateprofile`,
      doctorBySpeciality:`/api/doctor/getAllDoctorsbyspecilization`,

    },
  },


///-------------Appointments----------//
  appointment:{
    bookAppointment:`/api/appointment/create/book`,
    myPatient:`/api/appointment/patient/mypatient`,
    rescheduleAppointment:`/api/appointment/patient/reschedule/{id}`,
    patientCancelAppointment:`/api/appointment/patient/cancel/{id}`,
    confirmAppointment:`/api/appointment/patient/cancel/{id}`,
    doctorCancelAppointment:`/api/appointment/patient/cancel/{id}`,
    completedAppointment:`/api/appointment/doctor/complete/{id}`
  },

  ///-------Blogs-----//
  blog:{
    createBlog:`/api/create/blog`,
    allBlogs:`/api/blog/list`,
    blogDetails:`/api/blog/{id}`,
    updateBlog:`/api/updateblog/{id}`,
    deleteBlog:`/api/deleteblog/{id}`
  },

  /////--------------cooments on Blog---------///
  comment:{
    addComment:`/api/blog/{id}/comment`,
    getComment:`/api/blog/{id}/comments`
  },

  /////-------------Doctor Availability-----///
  availability:{
    createAvailability:`/api/availability/create`,
    getAvailableDoctor:`/api/availability/doctor`,
    dayOffForDoctor:`/api/availability/doctor/{doctorId}/dayoff`,
    getAllAvailableDoctors:`/api/availability`,
    specialDayOffForDoctor:`/api/availability/doctor/{doctorId}/special-dayoff`,

  },

  /////----------Doctor Review by patients---///

  review:{
    submitReview:`/api/review`,
    allReviews:`/api/review`,
    doctorReview:`/api/review/doctor/{doctorId}`
  }

};
