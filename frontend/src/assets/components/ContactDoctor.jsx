import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import DoctorProfile from "./DoctorProfile";
import SkeletonLoader from "./SkeletonLoader";
import { Autocomplete, TextField } from "@mui/material";

const docOptions = [
  "Family Medicine",
  "Internal Medicine",
  "Pediatrician",
  "Gynecologist",
  "Cardiologist",
  "Oncologist",
  "Gastroenterologist",
  "Pulmonologist",
  "Infectious disease",
  "Nephrologist",
  "Endocrinologist",
  "Ophthalmologist",
  "Otolaryngologist",
  "Dermatologist",
  "Psychiatrist",
  "Neurologist",
  "Radiologist",
  "Anesthesiologist",
  "Surgeon",
  "Physician executive",
];

const ContactDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [speciality, setSpeciality] = useState(null);
  const doctorType = useRef("All");

  // fetch doctors from backend
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/doctor/${doctorType.current}/`
      );
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  // fetch on first load
  useEffect(() => {
    fetchData();
  }, []);

  const handleDocChange = () => {
    if (speciality === "" || !docOptions.includes(speciality)) {
      alert("Please select a valid option");
    } else {
      doctorType.current = speciality;
      fetchData();
    }
  };

  return (
    <section className="w-screen flex flex-col items-center p-5">
      {/* Search bar */}
      <div className="flex w-80 md:w-3/5 justify-center gap-3 mb-6">
        <Autocomplete
          options={docOptions}
          value={speciality}
          onChange={(e, newValue) => setSpeciality(newValue)}
          className="searchbox w-5/6 bg-white"
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              color="primary"
              label="Select a speciality.."
            />
          )}
        />
        <button
          onClick={handleDocChange}
          className="w-24 text-base font-semibold text-center hover:scale-105 bg-teal-500 text-white rounded-md px-3 py-2 transition"
        >
          Search
        </button>
      </div>

      <div className="border-t border-gray-200 mb-8 w-4/5"></div>

      {/* Doctors list */}
      <div className="flex justify-center w-full mt-4">
        {doctors.length ? (
          <DoctorProfile doctors={doctors} />
        ) : (
          <SkeletonLoader />
        )}
      </div>

      <article id="info-contact-doctor"></article>
    </section>
  );
};

export default ContactDoctor;
