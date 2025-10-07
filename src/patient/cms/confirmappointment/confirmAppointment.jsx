import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BookingConfirmation = () => {
  const doctorInfo = JSON.parse(localStorage.getItem("doctorData") || '{}');
  const bookingData = JSON.parse(localStorage.getItem("bookingData") || '{}');
  const navigate = useNavigate()
  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('en-GB', options);
  };

  const handleClick = ()=>{
 navigate('/patient/cms/dashboard/doctors')
 localStorage.removeItem("doctorData")
 localStorage.removeItem("bookingData")

  }
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Confirmation Card */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-100 border-gray-300 shadow-lg">
              <CardHeader className="bg-gray-200 border-b border-gray-300">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
                  Booking Confirmed
                </h1>
              </CardHeader>
              
              <CardContent className="p-6 space-y-6">
                {/* Doctor Info Section */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
                      alt={doctorInfo?.name || "Dr Akash Das"}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold text-lg">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      Your Booking has been confirmed With{" "}
                      <span className="font-semibold text-gray-900">{doctorInfo?.name || "Dr Akash Das"}</span>{" "}
                      be on time before 15 Mins From the appointment Time
                    </p>
                  </div>
                </div>

                <hr className="border-gray-300" />

                {/* Booking Info Section */}
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 className="text-lg font-semibold text-gray-900">Booking Info</h2>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-primary/70 hover:bg-grprimary/bg-primary/80 text-white w-fit"
                    >
                      <CalendarDays className="w-4 h-4 mr-2" />
                      Reschedule
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Service</h3>
                        <p className="text-gray-700">{doctorInfo?.specialization || 'Cardiology'}</p>
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Date & Time</h3>
                        <p className="text-gray-700">
                          {bookingData?.timeSlot || '10:00 - 11:00'}, {formatDate(bookingData?.date) || '18 Nov 2025'}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Appointment Type</h3>
                        <p className="text-gray-700">Clinic Visit, {doctorInfo.location}</p>
                      </div>
                    </div>

                    {/* Right Column */}
                    {/* <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Additional Service</h3>
                        <p className="text-gray-700">Echocardiograms</p>
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Clinic Name</h3>
                        <p className="text-gray-700">Wellness Path</p>
                      </div>
                    </div> */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Number Card */}
            <Card className="bg-gray-100 border-gray-300 shadow-lg">
              <CardContent className="p-6 text-center space-y-4">
                <h3 className="font-semibold text-gray-900 text-lg">Booking Number</h3>
                <Badge className="bg-green-200 text-green-800 hover:bg-green-200 px-4 py-2 text-sm font-medium">
                  DSAHUKL235
                </Badge>
                <Button onClick= {handleClick} className="w-full bg-primary/90 hover:bg-primary text-white font-medium">
                  Start New Booking
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;