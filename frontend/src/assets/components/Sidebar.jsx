import React from "react";
import record from "../img/record.svg";
import profile from "../img/profile.svg";
import settings from "../img/settings.svg";
import consumption from "../img/cons.svg";

const Sidebar = ({
  setRecord,
  setLogModal,
  setProfileModal,
  setConsumptionModal,
}) => {
  const handleRecord = () => setRecord(true);
  const handleLogModal = () => setLogModal(true);
  const handleProfileModal = () => setProfileModal(true);
  const handleConsumptionModal = () => setConsumptionModal(true);

  return (
    <div className="flex sm:flex-col justify-center items-center gap-4 p-3 bg-gray-50 rounded-2xl shadow-md">
      {/* Profile Button */}
      <button
        onClick={handleProfileModal}
        className="w-10 h-10 p-1 hover:scale-95 transition-transform hover:cursor-pointer"
      >
        <img src={profile} alt="Profile" className="w-full" />
      </button>

      {/* Record Button */}
      <button
        onClick={handleRecord}
        className="w-10 h-10 p-1 hover:scale-95 transition-transform hover:cursor-pointer"
      >
        <img src={record} alt="Record" className="w-full" />
      </button>

      {/* Settings Button */}
      <button
        onClick={handleLogModal}
        className="w-10 h-10 p-1 hover:scale-95 transition-transform hover:cursor-pointer"
      >
        <img src={settings} alt="Settings" className="w-full" />
      </button>

      {/* Consumption Button */}
      <button
        onClick={handleConsumptionModal}
        className="w-9 h-9 p-1 hover:scale-95 transition-transform hover:cursor-pointer"
      >
        <img src={consumption} alt="Consumption" className="w-full" />
      </button>
    </div>
  );
};

export default Sidebar;
