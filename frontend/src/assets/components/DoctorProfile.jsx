import React from "react";

const DoctorProfile = ({ doctors }) => {
  return (
    <article className="flex justify-center w-screen gap-10 flex-wrap">
      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          className="w-72 h-auto max-w-sm bg-white rounded-lg shadow-md p-5 flex flex-col items-center"
        >
          {/* Doctor Image */}
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
            src={doctor.image_link}
            alt={doctor.name}
          />

          {/* Doctor Info */}
          <h5 className="text-xl text-gray-900 font-semibold">{doctor.name}</h5>
          <span className="font-normal text-gray-600">{doctor.speciality}</span>

          {/* Buttons */}
          <div className="flex mt-4 space-x-3 md:mt-6">
            <a
              href={`tel:${doctor.mobile_no}`}
              className="w-24 h-10 flex items-center justify-center py-2 text-sm font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600"
            >
              Contact
            </a>
            <a
              href="#"
              className="w-24 h-10 flex items-center justify-center py-2 text-sm font-semibold text-gray-700 border rounded-lg hover:bg-gray-100"
            >
              View Profile
            </a>
          </div>

          {/* Experience */}
          <div className="mt-2 italic text-gray-500 text-sm font-medium">
            {doctor.experience} Years of Experience
          </div>

          {/* Work Address */}
          <div className="px-1 mt-2 text-gray-700 w-5/6">
            <h2 className="text-base font-semibold">Work Address</h2>
            <p className="italic text-sm h-14 overflow-y-auto">
              {doctor.work_address}
            </p>
          </div>
        </div>
      ))}
    </article>
  );
};

export default DoctorProfile;
