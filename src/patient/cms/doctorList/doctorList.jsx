import { baseURL } from '@/api/axios/axios';
import DoctorProfileCard from '@/components/doctorprofilecard/doctorProfileCard';
import { GetDoctorList } from '@/redux/cmsSlice/cmsSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function DoctorList() {
  const dispatch = useDispatch();
  const { allDoctor } = useSelector((state) => state.Cms);

  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const response = await dispatch(GetDoctorList()).unwrap();
        console.log(response, " doctorAll");
      } catch (error) {
        console.error("login error", error);
      }
    };

    fetchAllDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Our Doctors</h1>
        
        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.isArray(allDoctor) &&
            allDoctor.map((doctor) => {
              // Construct full image URL
              const imageUrl = doctor.profileImg 
                ? `${baseURL}/${doctor.profileImg.replace(/\\/g, "/")}`
                : null;

              return (
                <DoctorProfileCard
                  key={doctor._id}
                  doctor={{
                    _id: doctor._id,
                    name: doctor.name,
                    email: doctor.email,
                    profileImg: imageUrl,
                    role: doctor.role,
                    roleId: doctor.roleId,
                    specializationId: doctor.specializationId,
                    specialization: doctor.specialization,
                    degree: doctor.degree,
                    experience: doctor.experience,
                    about: doctor.about,
                    fees: doctor.fees,
                    location: doctor.location,
                    firstLogin: doctor.firstLogin,
                    phone: doctor.phone,
                    createdAt: doctor.createdAt,
                    updatedAt: doctor.updatedAt,
                    reviewCount: doctor.reviewCount || 0,
                    nextAvailability: doctor.nextAvailability || "N/A",
                    lastBooked: doctor.lastBooked || "N/A",
                    verified: doctor.verified || false,
                  }}
                />
              );
            })}
        </div>

        {/* Loading/Empty State */}
        {!Array.isArray(allDoctor) || allDoctor.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No doctors found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorList;