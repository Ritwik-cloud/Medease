import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setDoctorAvailability } from '@/redux/availabilityslice/availabilitySlice';
import toast from 'react-hot-toast';

// Yup validation schema
const schema = yup.object({
  weekday: yup.string().required('Please select a day'),
  timeSlots: yup.array().of(
    yup.object({
      startHour: yup
        .number()
        .typeError('Required')
        .min(0, 'Min 0')
        .max(23, 'Max 23')
        .required('Required'),
      startMinute: yup
        .number()
        .typeError('Required')
        .min(0, 'Min 0')
        .max(59, 'Max 59')
        .required('Required'),
      endHour: yup
        .number()
        .typeError('Required')
        .min(0, 'Min 0')
        .max(23, 'Max 23')
        .required('Required')
        .test('end-after-start', 'End time must be after start time', function(value) {
          const { startHour, startMinute, endMinute } = this.parent;
          if (value < startHour) return false;
          if (value === startHour && endMinute <= startMinute) return false;
          return true;
        }),
      endMinute: yup
        .number()
        .typeError('Required')
        .min(0, 'Min 0')
        .max(59, 'Max 59')
        .required('Required'),
      duration: yup
        .number()
        .typeError('Required')
        .min(15, 'Min 15 minutes')
        .max(240, 'Max 240 minutes')
        .required('Required')
    })
  ).min(1, 'At least one time slot is required')
}).required();

export default function DoctorAvailableTiming() {
  const [activeTab, setActiveTab] = useState('general');
  const {DoctorDashboardDetails } = useSelector((state) => state.doctorCms);

  const dispatch = useDispatch()

  const doctorId = DoctorDashboardDetails?.id;

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      weekday: 'Monday',
      timeSlots: [
        { startHour: 0, startMinute: 0, endHour: 0, endMinute: 0, duration: 30 }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'timeSlots'
  });

  const selectedDay = watch('weekday');

  const formatTime = (hour, minute) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  const onSubmit = async (data) => {
     if (!doctorId) {
        toast.error("Doctor ID not found. Please refresh the page.");
        return;
    }
    // Transform data to backend format
    const availabilityData = data.timeSlots.map(slot => ({
      doctorId: doctorId,
      weekday: data.weekday,
      startHour: slot.startHour,
      startMinute: slot.startMinute,
      endHour: slot.endHour,
      endMinute: slot.endMinute,
      duration: slot.duration
    }));

    
    console.log('Data to send to backend:', availabilityData, DoctorDashboardDetails);
     
           try {
             await new Promise((resolve) => setTimeout(resolve, 1500));
             const response = await  dispatch(setDoctorAvailability(availabilityData)).unwrap();
        if (response.status === true) {
       
            toast.success(response.message)
          }
            
           } catch (error) {
            toast.error(error.message)
             console.error("setting availability error", error);
           } 
   
    
   
  };

  const addTimeSlot = () => {
    append({ startHour: 9, startMinute: 0, endHour: 17, endMinute: 0, duration: 30 });
  };

  return (
    <div className="min-h-screen p-2 sm:p-2 lg:p-8">
      <div className="max-w-full mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Available Timing
        </h1>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={activeTab === 'general' ? 'default' : 'secondary'}
            onClick={() => setActiveTab('general')}
            className="rounded-full"
          >
            General Availability
          </Button>
          <Button
            variant={activeTab === 'clinic' ? 'default' : 'secondary'}
            onClick={() => setActiveTab('clinic')}
            className="rounded-full"
          >
            Clinic Availability
          </Button>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="bg-primary/10 border-2 border-primary/10 shadow-lg">
            <CardContent className="p-2 sm:p-2">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 pb-3 border-b-2 border-primary/20">
                Available Timing
              </h2>

              {/* Select Available Day */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Available Day
                </label>
                <Controller
                  name="weekday"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-wrap gap-2">
                      {days.map((day) => (
                        <Button
                          key={day}
                          type="button"
                          variant={field.value === day ? 'default' : 'secondary'}
                          onClick={() => field.onChange(day)}
                          className={`rounded-lg text-sm sm:text-base px-3 sm:px-4 py-2 ${
                            field.value === day
                              ? 'bg-primary/90 hover:bg-primary/100'
                              : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                          }`}
                        >
                          {day}
                        </Button>
                      ))}
                    </div>
                  )}
                />
                {errors.weekday && (
                  <p className="text-red-500 text-sm mt-2">{errors.weekday.message}</p>
                )}
              </div>

              {/* Time Slots Configuration */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900">
                      {selectedDay} - Time Slots
                    </h3>
                    <Button
                      type="button"
                      onClick={addTimeSlot}
                      size="sm"
                      className="bg-primary/90 hover:bg-primary text-white"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Slot
                    </Button>
                  </div>

                  {errors.timeSlots && typeof errors.timeSlots.message === 'string' && (
                    <p className="text-red-500 text-sm mb-3">{errors.timeSlots.message}</p>
                  )}

                  <div className="space-y-4">
                    {fields.map((field, index) => (
                      <div key={field.id} className="bg-white rounded-lg p-4 border-2 border-gray-200">
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-sm font-medium text-gray-700">Slot {index + 1}</span>
                          {fields.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => remove(index)}
                              size="sm"
                              variant="ghost"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Start Time */}
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-2">
                              Start Time
                            </label>
                            <div className="flex gap-2 items-start">
                              <div className="flex-1">
                                <Controller
                                  name={`timeSlots.${index}.startHour`}
                                  control={control}
                                  render={({ field }) => (
                                    <Input
                                      {...field}
                                      type="number"
                                      min="0"
                                      max="23"
                                      className="w-full"
                                      placeholder="Hour"
                                    />
                                  )}
                                />
                                {errors.timeSlots?.[index]?.startHour && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {errors.timeSlots[index].startHour.message}
                                  </p>
                                )}
                              </div>
                              <span className="flex items-center pt-2">:</span>
                              <div className="flex-1">
                                <Controller
                                  name={`timeSlots.${index}.startMinute`}
                                  control={control}
                                  render={({ field }) => (
                                    <Input
                                      {...field}
                                      type="number"
                                      min="0"
                                      max="59"
                                      className="w-full"
                                      placeholder="Min"
                                    />
                                  )}
                                />
                                {errors.timeSlots?.[index]?.startMinute && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {errors.timeSlots[index].startMinute.message}
                                  </p>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatTime(
                                watch(`timeSlots.${index}.startHour`) || 0,
                                watch(`timeSlots.${index}.startMinute`) || 0
                              )}
                            </p>
                          </div>

                          {/* End Time */}
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-2">
                              End Time
                            </label>
                            <div className="flex gap-2 items-start">
                              <div className="flex-1">
                                <Controller
                                  name={`timeSlots.${index}.endHour`}
                                  control={control}
                                  render={({ field }) => (
                                    <Input
                                      {...field}
                                      type="number"
                                      min="0"
                                      max="23"
                                      className="w-full"
                                      placeholder="Hour"
                                    />
                                  )}
                                />
                                {errors.timeSlots?.[index]?.endHour && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {errors.timeSlots[index].endHour.message}
                                  </p>
                                )}
                              </div>
                              <span className="flex items-center pt-2">:</span>
                              <div className="flex-1">
                                <Controller
                                  name={`timeSlots.${index}.endMinute`}
                                  control={control}
                                  render={({ field }) => (
                                    <Input
                                      {...field}
                                      type="number"
                                      min="0"
                                      max="59"
                                      className="w-full"
                                      placeholder="Min"
                                    />
                                  )}
                                />
                                {errors.timeSlots?.[index]?.endMinute && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {errors.timeSlots[index].endMinute.message}
                                  </p>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatTime(
                                watch(`timeSlots.${index}.endHour`) || 0,
                                watch(`timeSlots.${index}.endMinute`) || 0
                              )}
                            </p>
                          </div>

                          {/* Duration */}
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-medium text-gray-600 mb-2">
                              Appointment Duration (minutes)
                            </label>
                            <Controller
                              name={`timeSlots.${index}.duration`}
                              control={control}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  type="number"
                                  min="15"
                                  step="15"
                                  className="w-full"
                                  placeholder="30"
                                />
                              )}
                            />
                            {errors.timeSlots?.[index]?.duration && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.timeSlots[index].duration.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-primary/95 hover:bg-primary text-white px-8 py-3 rounded-lg font-medium disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button 
              type="button"
              variant="outline" 
              className="w-full sm:w-auto border-2 border-gray-300 hover:bg-gray-50 px-8 py-3 rounded-lg font-medium"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}