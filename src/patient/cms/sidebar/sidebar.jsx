import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Heart,
  Calendar,
  TrendingUp,
  Settings,
  LogOut,
  Menu,
  User,
  FileText,
  Stethoscope,
  Activity,
  Clock,
  Phone,
  MessageSquare,
  X,
  SidebarClose,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDispatch } from "react-redux";
import { PatientlogOut } from "@/redux/patient/authSlice/patientAuthSlice";

const DoctorSidebar = ({
  collapsed,
  setCollapsed,
  name,
  img,
  dob,
  id,
  role,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/patient/cms/dashboard", icon: Home },
    { name: "Doctors", path: "doctors", icon: Stethoscope },
    { name: "Appointment", path: "appointment", icon: Calendar },
    { name: "Invoices", path: "invoices", icon: FileText },
    { name: "Profile Setting", path: "profile", icon: User },
    { name: "Change Password", path: "password", icon: Settings },
    { name: "Log Out", path: "logout", icon: LogOut, isLogout: true },
  ];

  const handleLogout = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const response = await dispatch(PatientlogOut()).unwrap();
      if (response.status === true) {
        navigate("/patient/auth/login");
      }
    } catch (error) {
      console.error("Patient logout error", error);
    } finally {
      setShowLogoutDialog(false);
    }
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth < 1024 && !collapsed) {
        const sidebar = document.getElementById("sidebar");
        const toggleButton = document.getElementById("sidebar-toggle");

        if (
          sidebar &&
          !sidebar.contains(event.target) &&
          toggleButton &&
          !toggleButton.contains(event.target)
        ) {
          setCollapsed(true);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [collapsed, setCollapsed]);

  // Handle window resize - collapse sidebar on mobile by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once on mount

    return () => window.removeEventListener("resize", handleResize);
  }, [setCollapsed]);

  // Don't render sidebar if collapsed
  if (collapsed) {
    return null;
  }

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-500 ease-in-out"
        onClick={() => setCollapsed(true)}
      />

      {/* Sidebar */}
      <div
        id="sidebar"
        className="bg-white border-r border-gray-200 h-full flex flex-col transition-all duration-500 ease-in-out rounded-lg shadow-sm
                   fixed lg:relative top-0 left-0 z-50 lg:z-auto w-64
                   min-h-screen lg:min-h-full transform translate-x-0"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-primary">MEDEASE</h1>
            <Button
              id="sidebar-toggle"
              size="icon"
              variant="ghost"
              onClick={() => setCollapsed(!collapsed)}
              className="h-8 w-8 hover:bg-gray-100 transition-colors duration-200"
            >
              {window.innerWidth < 1024 ? (
                <X className="h-4 w-4" />
              ) : (
                <SidebarClose className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Patient Profile Section */}
        <div className="p-4 border-b border-gray-200">
          <div
            className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-cover bg-center bg-no-repeat relative"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=200&fit=crop')",
            }}
          >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20 rounded-lg"></div>

            <div className="relative z-10 flex flex-col items-center space-y-2">
              <img
                src={
                  img ||
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                }
                alt="Patient"
                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="text-center">
                <h3 className="font-semibold text-white drop-shadow-md">
                  {name}
                </h3>
                <p className="text-sm text-white/90 drop-shadow-md">
                  {role} ID: {id}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              if (item.isLogout) {
                return (
                  <button
                    key={item.name}
                    onClick={() => setShowLogoutDialog(true)}
                    className="w-full flex items-center p-3 rounded-lg transition-colors text-red-600 hover:bg-red-50"
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              }
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/patient/cms/dashboard"}
                  onClick={() => {
                    // Close mobile sidebar when navigating
                    if (window.innerWidth < 1024) {
                      setCollapsed(true);
                    }
                  }}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-50 text-primary font-semibold border-r-4 border-primary"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be redirected to the login page and will need to sign in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DoctorSidebar;