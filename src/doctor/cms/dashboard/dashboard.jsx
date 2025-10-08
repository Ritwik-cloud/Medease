// import React, { useEffect, useState } from "react";
// import { Outlet } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { Button } from "@/components/ui/button";
// import { Menu, SidebarClose } from "lucide-react";
// import PatientSidebar from "../sidebar/sidebar";
// import { PatientDashboard } from "@/redux/cmsSlice/cmsSlice";
// import DoctorSidebar from "@/patient/cms/sidebar/sidebar";

// const DashboardDoctor = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const dispatch = useDispatch();
//   const { patientDashboardDetails } = useSelector((state) => state.patientCms);

//   useEffect(() => {
//     const fetchPatientDashboard = async () => {
//       try {
//         await new Promise((resolve) => setTimeout(resolve, 1500));
//         // await dispatch(PatientDashboard()).unwrap();
//       } catch (error) {
//         console.error("Patient Dashboard error", error);
//       }
//     };

//     fetchPatientDashboard();
//   }, []);

//   // Set collapsed to true by default on mobile
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 1024) {
//         setCollapsed(true);
//       } else {
//         setCollapsed(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize(); // Call once on mount

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <DoctorSidebar
//         collapsed={collapsed}
//         setCollapsed={setCollapsed}
//         name={patientDashboardDetails?.name}
//         id={patientDashboardDetails?._id}
//         role={patientDashboardDetails?.role}
//       />

//       {/* Main Content */}
//       <main className="flex-1 overflow-auto p-4 lg:p-6">
//         {/* Mobile Menu Button */}
//         {collapsed && (
//           <div className="mb-4 lg:hidden">
//             <Button
//               onClick={() => setCollapsed(false)}
//               variant="outline"
//               size="sm"
//             >
//               <SidebarClose className="h-5 w-5 mr-2" />
//               Menu
//             </Button>
//           </div>
//         )}

//         {/* Dashboard Header */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800">
//                 Patient Dashboard
//               </h1>
//               <p className="text-gray-600 mt-1">
//                 Welcome to your medease dashboard
//               </p>
//             </div>
//           </div>

//           {/* Desktop Menu Toggle */}

//           {collapsed && (
//             <div className="hidden lg:block mt-2">
//               <Button
//                 onClick={() => setCollapsed(false)}
//                 variant="outline"
//                 size="sm"
//               >
//                 <SidebarClose className="h-5 w-5 " />
//               </Button>
//             </div>
//           )}
//         </div>

//         {/* Main Content */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DashboardDoctor;
