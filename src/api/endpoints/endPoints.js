export const endPoints = {
  patient: {
    auth: {
      signup: `/api/patient/register`,
      verifyotp: `/api/patient/verifyemail`,
      resendotp: `/api/patient/resendotp`,
      forgotpassword: `/api/patient/forgetpassword`,
      resetpassword: `/api/patient/resetpassword/:token`,
      signin: `/api/patient/login`,
      profile: `/api/patient/profile`,
    },

    cms: {
      dashboard: `/api/patient/dashboard`,
    },
  },
};
