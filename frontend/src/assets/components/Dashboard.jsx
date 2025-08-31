import React, { useEffect } from "react";
import axios from "axios";
import PatientForm from "./PatientForm";
import PatientProfile from "./PatientProfile";
import { useGlobalContext } from "./context";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const Dashboard = () => {
  // global context
  const {
    handleInputChange,
    formData,
    handleFormSubmit,
    data,
    fetchData,
  } = useGlobalContext();

  // fetch patient profile when dashboard loads
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="pt-24">
      {/* Patient info input form */}
      <PatientForm
        profileData={formData}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
        patientData={data}
      />

      {/* Patient profile display */}
      <PatientProfile responseData={data} />
    </div>
  );
};

export default Dashboard;
