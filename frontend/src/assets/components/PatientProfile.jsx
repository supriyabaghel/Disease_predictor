import Calendar from "./Calendar";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import Record from "./Record";
import BP_chart from "./BP_chart";
import LogModal from "./LogModal";
import BP_Log from "./BP_Log";
import ProfileModal from "./ProfileModal";
import GlucoseLevel from "./GlucoseLevel";
import SugarChart from "./SugarChart";
import Personal from "./Personal";
import MedicalHistory from "./MedicalHistory";
import ConsumptionModal from "./Consumption";

const PatientProfile = ({ responseData }) => {
  const [record, setRecord] = useState(false);
  const [logModal, setLogModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [consumptionModal, setConsumptionModal] = useState(false);

  const { first_name, height, weight, last_name } = responseData;
  const [bmi, setBmi] = useState(0);
  const [bmiColor, setBmiColor] = useState("");

  useEffect(() => {
    // Calculate BMI
    const calculateBMI = () => {
      const heightInMeters = height / 100; // Convert cm → m
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue);

      // Color logic
      if (bmiValue < 18.5) {
        setBmiColor("bg-purple-400");
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        setBmiColor("bg-blue-400");
      } else if (bmiValue >= 24.9 && bmiValue < 29.9) {
        setBmiColor("bg-orange-400");
      } else {
        setBmiColor("bg-red-500");
      }
    };
    calculateBMI();
  }, [height, weight]);

  if (responseData.new_patient) {
    return null;
  }

  return (
    <div className="profile flex justify-center flex-col items-center">
      {Object.keys(responseData).length > 0 ? (
        <>
          {/* Sidebar + Charts + Info */}
          <div className="w-full flex flex-wrap justify-center gap-4">
            {/* Sidebar */}
            <div className="bg-gray-800 w-5/6 md:p-2 sm:w-1/6 lg:w-1/6">
              <Sidebar
                setRecord={setRecord}
                setLogModal={setLogModal}
                setProfileModal={setProfileModal}
                setConsumptionModal={setConsumptionModal}
              />
            </div>

            {/* Main Content */}
            <div className="sm:h-screen w-5/6 sm:w-4/6 lg:w-4/6 flex flex-col gap-4">
              {/* Greeting + BMI */}
              <div className="md:pt-6 h-40 w-full flex justify-between items-center p-2">
                <div className="w-full md:w-1/2 text-2xl font-semibold">
                  <p>Hi, {first_name + " " + last_name}</p>
                  <p>Check your</p>
                  <p>Health!</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-lg md:text-xl font-semibold">BMI</p>
                  <div
                    className={`bmi w-12 h-10 md:w-16 md:h-12 rounded-full flex items-center justify-center text-white font-bold ${bmiColor}`}
                  >
                    {bmi.toFixed(1)}
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="charts-container w-full flex flex-wrap gap-4">
                <div className="w-full sm:w-1/2 rounded-md bg-white p-2">
                  <BP_chart chartData={responseData.bp_log} />
                </div>
                <div className="w-full sm:w-1/2 rounded-md bg-white p-2">
                  <Sugar_chart chartData={responseData.blood_glucose} />
                </div>
              </div>

              {/* Personal Info */}
              <div className="my-2 w-full rounded-md bg-white">
                <Personal responseData={responseData} />
              </div>
            </div>

            {/* Right Side: Calendar + Medical History + Logs */}
            <div className="sm:w-full lg:w-1/2 flex flex-col gap-4 p-2">
              <div className="flex flex-wrap lg:flex-nowrap gap-4">
                <div className="flex w-5/6 sm:w-3/5 md:w-1/2 border rounded-lg bg-white">
                  <Calendar />
                </div>
                <div className="w-5/6 bg-gray-50 rounded-lg p-2">
                  <MedicalHistory data={responseData.medical_history} />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 w-full">
                <div className="w-5/6 h-96 md:w-1/2 lg:h-full rounded-lg bg-white p-2">
                  <h2 className="font-semibold text-lg md:text-2xl mb-2">
                    Glucose
                  </h2>
                  <div className="flex-grow bg-gray-50">
                    <GlucoseLevel responseData={responseData} />
                  </div>
                </div>
                <div className="w-5/6 h-96 md:w-1/2 lg:h-full rounded-lg bg-white p-2">
                  <h2 className="font-semibold text-lg md:text-2xl mb-2">
                    Blood Pressure
                  </h2>
                  <div className="flex-grow bg-gray-50">
                    <BP_Log responseData={responseData} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modals */}
          <Record setRecord={setRecord} record={record} />
          <LogModal setLogModal={setLogModal} logModal={logModal} />
          <ProfileModal setProfileModal={setProfileModal} profileModal={profileModal} />
          <ConsumptionModal
            consumptionModal={consumptionModal}
            setConsumptionModal={setConsumptionModal}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PatientProfile;
