import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Menu, SidebarClose } from "lucide-react";
import { fetchDoctorDashboard } from "@/redux/doctor/cmsSlice/doctorCmsSlice";
import DoctorSidebar from "../sidebar/sidebar";


const DashboardDoctor = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const {DoctorDashboardDetails } = useSelector((state) => state.doctorCms);

  useEffect(() => {
    const DoctorDashboard = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        await dispatch(fetchDoctorDashboard()).unwrap();
      } catch (error) {
        console.error("Doctor Dashboard error", error);
      }
    };

    DoctorDashboard();
  }, []);

  // Set collapsed to true by default on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once on mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DoctorSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        name={DoctorDashboardDetails?.name}
        id={DoctorDashboardDetails?.id}
        role={DoctorDashboardDetails?.roleName}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 lg:p-6">
        {/* Mobile Menu Button */}
        {collapsed && (
          <div className="mb-4 lg:hidden">
            <Button
              onClick={() => setCollapsed(false)}
              variant="outline"
              size="sm"
            >
              <SidebarClose className="h-5 w-5 mr-2" />
              Menu
            </Button>
          </div>
        )}

      

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardDoctor;
