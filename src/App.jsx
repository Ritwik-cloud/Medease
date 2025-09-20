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
const PatientLogin = lazy(() => import("./patient/auth/login/login"));
const Register = lazy(() => import("./patient/auth/register/Register"));
const VerifyOtp = lazy(() => import("./patient/auth/verifyotp/verifyOtp"));

const Spinner = lazy(() => import("./components/spinner/spinner"));
const Dashboard = lazy(() => import("./patient/cms/dashboard/dashboard"));
const DoctorLogin = lazy(() => import("./doctor/auth/login/doctorlogin"));


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
    { path: "/patient/auth/login", element: <PatientLogin /> },
    { path: "/patient/auth/register", element: <Register /> },
    { path: "/patient/auth/verifyotp", element: <VerifyOtp /> },



    /////-----------doctor-----///
    
    { path: "/doctor/auth/login", element: <DoctorLogin /> },




  ];

  const privateRoutes = [
    { path: "/patient/cms/dashboard", element: <Dashboard /> },
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
              <Route
                key={index}
                path={route.path}
                element={<PrivateRouter>{route.element}</PrivateRouter>}
              />
            ))}
          </Routes>
        </Router>
      </Suspense>
    </Provider>
  );
}

export default App;
