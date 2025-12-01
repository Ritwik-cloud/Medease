import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { Cookies } from "react-cookie";
import React, { lazy, Suspense } from "react";

const CreateAppointment = lazy(() => import("./patient/cms/myAppointments/myAppointments"));
const Home = lazy(() => import("./patient/cms/home/home"));
const DoctorList = lazy(() => import("./patient/cms/doctorList/doctorList"));
const AppointmentSlotBooking = lazy(() => import("./patient/cms/appointmentSlotBooking/appointmentSlotBooking"));
const PaymentPage = lazy(() => import("./patient/cms/paymentPage/paymentPage"));
const ConfirmAppointment = lazy(() => import("./patient/cms/confirmappointment/confirmAppointment"));
const PatientProfileDetails = lazy(() => import("./patient/cms/profiledetails/profileDetails"));
const EditPatientProfile = lazy(() => import("./patient/cms/updateProfile/updateProfile"));
const LandingPage = lazy(() => import("./pages/landingPage/landingPage"));
const DoctorLogin = lazy(() => import("./doctor/auth/login/doctorlogin"));
const DashboardDoctor = lazy(() => import("./doctor/cms/dashboard/dashboard"));
const DoctorAvailableTiming = lazy(() => import("./doctor/cms/availabletiming/availableTiming"));
const PatientHome = lazy(() => import("./patient/cms/home/home"));
const DoctorHome = lazy(() => import("./doctor/cms/home/home"));
const DoctorAppointmentList = lazy(() => import("./doctor/cms/appointmentList/appointmentList"));
const DoctorInvoicesPage = lazy(() => import("./doctor/cms/invoices/invoices"));
const DoctorProfilePage = lazy(() => import("./doctor/cms/profilePage/profilePage"));
const About = lazy(() => import("./pages/aboutUs/aboutUs"));
const ContactUs = lazy(() => import("./pages/contactUs/contactUs"));
const PatientLogin = lazy(() => import("./patient/auth/login/login"));
const Register = lazy(() => import("./patient/auth/register/Register"));
const VerifyOtp = lazy(() => import("./patient/auth/verifyotp/verifyOtp"));
const Spinner = lazy(() => import("./components/spinner/spinner"));
const DashboardPatient = lazy(() => import("./patient/cms/dashboard/dashboard"));


///---- private routing----///

function PrivateRouter({ children }) {
  const cookie = new Cookies();
  const token = cookie.get("token");
  if (!token) {
    alert("Please login to access Patient Dashboard");
    return <Navigate to="/patient/auth/login" />;
  }
  return children;
}

function App() {
  const publicRoutes = [
    { path: "/", element: <LandingPage /> },
    { path: "/about", element: <About /> },
    { path: "/contact", element: <ContactUs /> },



    /////---------patient-------Authentication--------///
    { path: "/patient/auth/login", element: <PatientLogin /> },
    { path: "/patient/auth/register", element: <Register /> },
    { path: "/patient/auth/verifyotp", element: <VerifyOtp /> },

    /////-----------doctor----- Authentication----------///
    { path: "/doctor/auth/login", element: <DoctorLogin /> },

  ];

  const privateRoutes = [
    /////---------patient-------Dashboard-------///

    {
      path: "/patient/cms/dashboard",
      element: (
        <PrivateRouter>
          <DashboardPatient />
        </PrivateRouter>
      ),
      children: [
        { index: true, element: <PatientHome /> }, // default tab
        { path: "appointment", element: <CreateAppointment /> },
        { path: "doctors", element: <DoctorList /> },
        { path: "doctors/booking/:id", element: <AppointmentSlotBooking />   },
       { path: "doctors/booking/:id/payment", element: <PaymentPage /> },
       { path: "doctors/booking/:id/confirm", element: <ConfirmAppointment /> },


        { path: "profile", element: <PatientProfileDetails /> },
        { path: "updateprofile", element: <EditPatientProfile /> },

        
      ],
    },




    ///////-------------doctor dahboard---------------////

     {
      path: "/doctor/cms/dashboard",
      element: (
        <PrivateRouter>
          <DashboardDoctor />
        </PrivateRouter>
      ),
      children: [
        { index: true, element: <DoctorHome /> },
        { path: "appointments", element: <DoctorAppointmentList /> },
        { path: "available-timing", element: <DoctorAvailableTiming /> },
        { path: "invoices", element: <DoctorInvoicesPage />   },
        { path: "profile", element: <DoctorProfilePage /> },
        { path: "updateprofile", element: <EditPatientProfile /> },

        
      ],
    },

    /////---------Doctor-------Dashboard-------///
  ];

  return (
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <Router>
          <Routes>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}

            {privateRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element}>
                {route.children?.map((child, cIndex) =>
                  child.index ? (
                    <Route key={cIndex} index element={child.element} />
                  ) : (
                    <Route
                      key={cIndex}
                      path={child.path}
                      element={child.element}
                    />
                  )
                )}
              </Route>
            ))}
          </Routes>
        </Router>
      </Suspense>
    </Provider>
  );
}

export default App;
