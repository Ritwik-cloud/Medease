import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Separator } from "../../../components/ui/separator";
import {
  CreditCard,
  Shield,
  Calendar,
  MapPin,
  ArrowLeft,
  Check,
  CreditCardIcon,
  ArrowRight,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { BookAppointment } from "@/redux/appointmentslice/appointmentSlice";
import { useDispatch } from "react-redux";

const PaymentBookingPage = () => {
  const realBookingData = JSON.parse(localStorage.getItem("bookingData"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  // Dummy static data for UI
  const bookingData = {
    doctorName: "Dr. Sarah Wilson",
    date: realBookingData.date,
    time: realBookingData.time,
    appointmentType: "Clinic (Wellness Path)",
    service: "Echocardiograms",
    fee: 250,
    bookingFee: 0,
    tax: 20,
  };

  const total = bookingData.fee + bookingData.bookingFee + bookingData.tax;
  const handleBack = () => {
    window.history.back();
  };

  const handleSubmit = async () => {
    const formData = {
      doctorId: realBookingData.doctorId,
      date: realBookingData.date,
      timeSlot: realBookingData.timeSlot,
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const response = await dispatch(BookAppointment(formData)).unwrap();

      if (response.status === true) {
        navigate(`/patient/cms/dashboard/doctors/booking/${id}/confirm`);
      }
    } catch (error) {
      console.error("payment error", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment Gateway (UI only) */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Payment Gateway
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                {/* Payment method buttons (noninteractive) */}
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-700 bg-white">
                    <div className="p-1 rounded bg-blue-500 text-white">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-sm">Credit Card</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-700 bg-white">
                    <div className="p-1 rounded bg-blue-600 text-white">
                      <CreditCardIcon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-sm">UPI</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-700 bg-white">
                    <div className="p-1 rounded bg-purple-500 text-white">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-sm">Stripe</span>
                  </button>
                </div>
              </div>

              {/* Card Details form (dummy) */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="cardHolder"
                    className="text-sm font-medium text-gray-700"
                  >
                    Card Holder Name
                  </Label>
                  <Input
                    id="cardHolder"
                    placeholder="John Doe"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="cardNumber"
                    className="text-sm font-medium text-gray-700"
                  >
                    Card Number
                  </Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    className="h-12"
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="expiry"
                      className="text-sm font-medium text-gray-700"
                    >
                      Expiry Date
                    </Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      className="h-12"
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="cvv"
                      className="text-sm font-medium text-gray-700"
                    >
                      CVV
                    </Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      className="h-12"
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Info */}
          <Card className="shadow-lg">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Booking Info
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Date & Time</p>
                      <p className="text-sm text-gray-600">
                        {bookingData.time}, {bookingData.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Appointment type
                      </p>
                      <p className="text-sm text-gray-600">
                        {bookingData.appointmentType}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Payment Info
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{bookingData.service}</span>
                    <span className="font-medium">${bookingData.fee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Booking Fees</span>
                    <span className="font-medium text-green-600">
                      {bookingData.bookingFee === 0
                        ? "Free"
                        : `$${bookingData.bookingFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${bookingData.tax}</span>
                  </div>
                  <Separator />
                  <div className="bg-primary text-white px-4 py-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total</span>
                      <span className="text-xl font-bold">${total}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-700">
                  Secured by 256-bit SSL encryption
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center mt-8 gap-4">
          <Button
            variant="outline"
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white hover:bg-gray-800 hover:text-white border-gray-800"
            onClick={handleBack}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <Button
            onClick={handleSubmit}
            className="px-8 py-3 bg-primary/95 hover:bg-primary text-white font-medium"
          >
            Confirm & Pay
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentBookingPage;
