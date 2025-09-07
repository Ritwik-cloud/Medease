import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("./patient/auth/login/Login"));
const Register = lazy(() => import("./patient/auth/register/Register"));
const Spinner = lazy(() => import("./components/spinner/Spinner"));

function PrivateRouter({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login to access product list");
    return <Navigate to="/auth/login" />;
  }
  return children;
}

function App() {
  const publicRoutes = [
    { path: "/auth/login", element: <Login /> },
    { path: "/auth/register", element: <Register /> },
  ];

  return (
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <Router>
          <Routes>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Router>
      </Suspense>
    </Provider>
  );
}

export default App;
