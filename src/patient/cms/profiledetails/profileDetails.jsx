import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  UserCircle,
  Edit,
  Camera,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useNavigation } from "react-router-dom";
import { PatientProfile } from "@/redux/patient/cmsSlice/patientCmsSlice";

const PatientProfileDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { PatientProfileDetails, profileLoading } = useSelector((state) => state.patientCms);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        await dispatch(PatientProfile()).unwrap();
      } catch (error) {
        console.error("Patient profile error", error);
      }
    };

    fetchProfileData();
  }, [dispatch]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const getInitials = (name) => {
    return name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "PT";
  };

  const capitalizeRole = (role) => {
    if (!role) return "Patient";
    return role.charAt(0).toUpperCase() + role.slice(1);
  };


  const handleEdit = ()=>{
        navigate("/patient/cms/dashboard/updateprofile");

  }

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!PatientProfileDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600">Failed to load profile data</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="bg-white shadow-lg">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Profile Image */}
            <div className="relative group">
              <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-primary/30 shadow-lg">
                <AvatarImage
                  src={PatientProfileDetails?.profileImg}
                  alt={PatientProfileDetails?.name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-blue-100 text-primary text-2xl font-semibold">
                  {getInitials(PatientProfileDetails?.name)}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 bg-primary hover:bg-primary/90 text-white p-2 rounded-full shadow-lg transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {PatientProfileDetails?.name || "N/A"}
                </h1>
                <Badge className="bg-blue-100 text-primary hover:bg-blue-100 w-fit mx-auto sm:mx-0">
                  {capitalizeRole(PatientProfileDetails?.role)}
                </Badge>
              </div>
              <p className="text-gray-600 mb-4">
                {capitalizeRole(PatientProfileDetails?.role)} ID: {PatientProfileDetails?._id || "N/A"}
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-white" onClick={handleEdit}>
                <Edit className="w-4 h-4 mr-2"  />
                Edit Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card className="bg-white shadow-md">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <UserCircle className="w-5 h-5 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium text-gray-900">
                  {PatientProfileDetails?.name || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium text-gray-900">
                  {formatDate(PatientProfileDetails?.dob)}{" "}
                  {PatientProfileDetails?.dob && (
                    <span className="text-gray-500">
                      ({calculateAge(PatientProfileDetails.dob)} years old)
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <UserCircle className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium text-gray-900">
                  {PatientProfileDetails?.gender || "Not specified"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-white shadow-md">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium text-gray-900 truncate">
                  {PatientProfileDetails?.email || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium text-primary">
                  {PatientProfileDetails?.phone || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium text-gray-900">
                  {PatientProfileDetails?.address || "Not provided"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Information */}
      <Card className="bg-white shadow-md">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Account Logged In</p>
              <p className="font-medium text-gray-900">
                {PatientProfileDetails?.iat
                  ? new Date(PatientProfileDetails.iat * 1000).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Session Expires</p>
              <p className="font-medium text-gray-900">
                {PatientProfileDetails?.exp
                  ? new Date(PatientProfileDetails.exp * 1000).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientProfileDetails;