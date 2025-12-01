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
import { lazy, Suspense } from "react";
import { Cookies } from "react-cookie";
import CreateAppointment from "./patient/cms/myAppointments/myAppointments";
import Home from "./patient/cms/home/home";
import DoctorList from "./patient/cms/doctorList/doctorList";
import AppointmentSlotBooking from "./patient/cms/appointmentSlotBooking/appointmentSlotBooking";
import PaymentPage from "./patient/cms/paymentPage/paymentPage";
import ConfirmAppointment from "./patient/cms/confirmappointment/confirmAppointment";
import PatientProfileDetails from "./patient/cms/profiledetails/profileDetails";
import EditPatientProfile from "./patient/cms/updateProfile/updateProfile";
import  LandingPage  from "./pages/landingPage/landingPage";
import DoctorLogin from "./doctor/auth/login/doctorlogin";
import DashboardDoctor from "./doctor/cms/dashboard/dashboard";
import DoctorAvailableTiming from "./doctor/cms/availabletiming/availableTiming";
import PatientHome from "./patient/cms/home/home";
import DoctorHome from "./doctor/cms/home/home";
import DoctorAppointmentList from "./doctor/cms/appointmentList/appointmentList";
import DoctorInvoicesPage from "./doctor/cms/invoices/invoices";
import DoctorProfilePage from "./doctor/cms/profilePage/profilePage";
import About from "./pages/aboutUs/aboutUs";
import ContactUs from "./pages/contactUs/contactUs";
const PatientLogin = lazy(() => import("./patient/auth/login/login.jsx"));
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
