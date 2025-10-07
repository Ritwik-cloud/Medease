import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  CheckCircle,
  Phone,
  Mail,
  DollarSign,
  Clock,
  IndianRupee,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const DoctorProfileCard = ({ doctor = {} }) => {
  const navigate = useNavigate()
  // Sample data for demonstration
  const sampleDoctor = {
    _id: "68cbf0ddfef979466c503d94",
    name: "Prasenjit Saha",
    email: "prasen@yopmail.com",
    profileImg: "uploads\\doctor\\1758195932965_a1.png",
    role: "doctor",
    roleId: "68cbedf72018289de70f03e9",
    specializationId: "68cbedf72018289de70f03ef",
    specialization: "Cardiologist",
    degree: "M.B.B.S",
    experience: "20",
    about: "good",
    fees: 600,
    location: "Delhi",
    firstLogin: false,
    phone: "7278685264",
    createdAt: "2025-09-18T11:45:33.842Z",
    updatedAt: "2025-09-18T21:50:38.916Z",
    rating: "4.5",
    reviewCount: 25,
    nextAvailability: "23 Mar 2025",
    lastBooked: "18 Jan 2023",
    verified: true,
  };

  // Use provided doctor data or fallback to sample data
  const doctorData = Object.keys(doctor).length > 0 ? doctor : sampleDoctor;

  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .slice(-2)
        .map((n) => n[0])
        .join("") || "DR"
    );
  };


const handleBook = () => {
  const doctorInfo = {
    name: doctorData.name,
    specialization: doctorData.specialization,
    fees: doctorData.fees,
    location: doctorData.location
  }
  
  try {
    localStorage.setItem("doctorData", JSON.stringify(doctorInfo))
    navigate(`/patient/cms/dashboard/doctors/booking/${doctorData._id}`)
  } catch (error) {
    console.error("Error saving doctor data:", error)
  }
}
  return (
    <Card className="bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <CardContent className="p-6 flex flex-col items-center text-center">
        {/* Header with Image */}
        <div className="mb-4">
          <Avatar className="w-20 h-20 border-2 border-gray-100 rounded-full overflow-hidden">
            <AvatarImage
              src={doctorData.profileImg || "https://via.placeholder.com/150"}
              alt={doctorData.name || "Doctor"}
              className="object-cover w-full h-full"
            />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg w-full h-full flex items-center justify-center rounded-full">
              {getInitials(doctorData.name)}
            </AvatarFallback>
          </Avatar>
        </div>
        {/* Doctor Name and Verification */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <h3 className="font-semibold text-lg text-gray-900">
            {doctorData.name || "Doctor Name"}
          </h3>
          {doctorData.verified && (
            <CheckCircle className="w-5 h-5 text-green-500" />
          )}
        </div>
        {/* Specialization with badges */}
        <div className="mb-3">
          <p className="text-gray-600 mb-2">
            {doctorData.degree || "Degree"} -{" "}
            {doctorData.specialization || "Specialization"}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <Clock className="w-3 h-3 mr-1" />
              {doctorData.experience || "0"} years exp
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <IndianRupee className="w-3 h-3 mr-1" />{doctorData.fees || "0"}
            </Badge>
          </div>
        </div>
        {/* About */}
        {doctorData.about && (
          <div className="mb-3">
            <p className="text-gray-700 text-sm capitalize">
              {doctorData.about}
            </p>
          </div>
        )}
        {/* Contact and Location Details */}{" "}
        <div className="space-y-2 mb-4">
          {" "}
          {doctorData.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {" "}
              <Phone className="w-4 h-4 text-primary/90" />{" "}
              <span>{doctorData.phone}</span>{" "}
            </div>
          )}{" "}
          {doctorData.email && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {" "}
              <Mail className="w-4 h-4 text-primary/90" />{" "}
              <span className="truncate">{doctorData.email}</span>{" "}
            </div>
          )}{" "}
          {doctorData.location && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {" "}
              <MapPin className="w-4 h-4 text-primary/90" />{" "}
              <span>
                Location:{" "}
                <span className="font-medium">{doctorData.location}</span>
              </span>{" "}
            </div>
          )}{" "}
          {doctorData.nextAvailability && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {" "}
              <Calendar className="w-4 h-4 text-primary/90" />{" "}
              <span>
                Next Availability:{" "}
                <span className="font-medium">
                  {doctorData.nextAvailability}
                </span>
              </span>{" "}
            </div>
          )}{" "}
        </div>
        {/* Role and Status */}
        {(doctorData.role || doctorData.firstLogin !== undefined) && (
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {doctorData.role && (
              <Badge
                variant="outline"
                className="border-green-300 text-green-700"
              >
                {doctorData.role.charAt(0).toUpperCase() +
                  doctorData.role.slice(1)}
              </Badge>
            )}
            {doctorData.firstLogin !== undefined && (
              <Badge variant={doctorData.firstLogin ? "default" : "secondary"}>
                {doctorData.firstLogin ? "Active User" : "New User"}
              </Badge>
            )}
          </div>
        )}
        {/* Action Buttons */}
        <div className="flex gap-3 w-full">
          {/* <Button
            variant="outline"
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            View Profile
          </Button> */}
          <Button  onClick={handleBook} className="flex-1 bg-primary hover:bg-primary-600 text-white">
         
           Book Now

          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorProfileCard;
