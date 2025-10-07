import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Calendar as CalendarIcon } from "lucide-react";
import { fetchDoctorAvailability } from "@/redux/availabilityslice/availabilitySlice";

function AppointmentSlotBooking() {
  const dispatch = useDispatch();
  const { availability, loading, error } = useSelector(
    (state) => state.Availability
  );
  const { id } = useParams(); // doctorId from route

  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();
  let bookingData;

  useEffect(() => {
    if (id) {
      dispatch(fetchDoctorAvailability(id));
    }
  }, [id, dispatch]);

  const getWeekday = (dt) =>
    dt?.toLocaleDateString("en-US", { weekday: "long" });

  const todayWeekday = date ? getWeekday(date) : null;

  const todayAvailability = availability?.find(
    (slot) => slot.weekday === todayWeekday
  );

  const isSpecialDayOff = todayAvailability?.specialDayOffs?.includes(
    date.toISOString().split("T")[0]
  );

  const getSlotsByPeriod = (period) => {
    if (!todayAvailability) return [];
    return todayAvailability.timeSlots.filter((slot) => {
      const startTime = slot.split(" - ")[0];
      const hour = parseInt(startTime.split(":")[0], 10);
      if (period === "Morning") return hour < 12;
      if (period === "Afternoon") return hour >= 12 && hour < 17;
      if (period === "Evening") return hour >= 17;
      return false;
    });
  };

  const handleBack = () => {
    window.history.back();
  };

  const handlePayment = () => {
    if (!selectedSlot) return;
    
     const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

    const bookingPayload = {
      doctorId: id,
      date: utcDate.toISOString().split("T")[0],
      timeSlot: selectedSlot,
    };
    console.log("Booking Payload:", bookingPayload);
    // Store booking data properly
    localStorage.setItem("bookingData", JSON.stringify(bookingPayload));

    // Navigate to booking confirmation page
    navigate(`/patient/cms/dashboard/doctors/booking/${id}/payment`);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <div className="flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Calendar Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    Select Date
                  </CardTitle>
                  <CardDescription>
                    Choose your appointment date
                  </CardDescription>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const today = new Date();
                    setMonth(today);
                    setDate(today);
                  }}
                >
                  Today
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                month={month}
                onMonthChange={setMonth}
                selected={date}
                onSelect={setDate}
                className="bg-transparent p-0"
              />
            </CardContent>
          </Card>

          {/* Time Slots Card */}
          <Card>
            <CardHeader>
              <CardTitle>Available Slots</CardTitle>
              <CardDescription>
                {date ? date.toDateString() : "Pick a date"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading && <p className="text-gray-500">Loading slots...</p>}
              {error && <p className="text-red-500">{error}</p>}

              {!loading && !error && todayAvailability ? (
                isSpecialDayOff ? (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">
                      Doctor is not available on this date.
                    </p>
                    <p className="mt-2 text-sm text-gray-400">
                      Please pick a different date.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {["Morning", "Afternoon", "Evening"].map((period) => {
                      const slots = getSlotsByPeriod(period);
                      if (slots.length === 0) return null;

                      return (
                        <div key={period}>
                          <h4 className="mb-2 font-medium text-gray-700">
                            {period}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {slots.map((slot, idx) => (
                              <Button
                                key={idx}
                                size="sm"
                                variant={
                                  selectedSlot === slot ? "default" : "outline"
                                }
                                onClick={() => setSelectedSlot(slot)}
                              >
                                {slot}
                              </Button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              ) : (
                !loading && (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">
                      No slots available for this day.
                    </p>
                  </div>
                )
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom action bar fixed inside main container */}
      <div className="relative">
        <div className="absolute bottom-32 left-0 right-0  shadow-md p-4 rounded-lg">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Button
              variant="outline"
              className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white hover:bg-gray-800 hover:text-white border-gray-800"
              onClick={handleBack}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <div className="hidden md:block text-center">
              {date && selectedSlot && (
                <div className="text-sm text-gray-600">
                  <p>Selected: {date.toDateString()}</p>
                  <p>Time: {selectedSlot}</p>
                </div>
              )}
            </div>

            <Button
              disabled={!selectedSlot}
              className={`${
                selectedSlot
                  ? "bg-primary/90 hover:bg-primary text-white"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              onClick={handlePayment}
            >
              Continue to Payment
            <ArrowRight className="w-4 h-4" />

            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentSlotBooking;

