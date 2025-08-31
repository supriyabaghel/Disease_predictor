import React, { useEffect } from "react";
import crossIcon from "../img/cross icon.svg";
import { TextField, Button } from "@mui/material";
import { useGlobalContext } from "./context";

const Record = ({ record, setRecord }) => {
  const { handleDashboardChange, data, handleDashboardSubmit } = useGlobalContext();

  const closeRecord = () => {
    setRecord(false);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal")) {
        closeRecord();
      }
    };

    if (record) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [record]);

  if (!record) return null;

  return (
    <div className="modal fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-lg">
        {/* Close button */}
        <div className="w-full flex justify-end">
          <button onClick={closeRecord} className="hover:scale-110 transition">
            <img src={crossIcon} alt="close modal" loading="lazy" />
          </button>
        </div>

        {/* Form */}
        <form
          className="w-full flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleDashboardSubmit(e);
            closeRecord();
          }}
        >
          <h1 className="text-2xl font-semibold text-gray-700 text-center">
            Update Your Medical Info
          </h1>

          {/* Current Medications */}
          <TextField
            name="current_med"
            label="Current Medications"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            helperText="Separate values by commas"
            onChange={handleDashboardChange}
            value={data.current_med || ""}
          />

          {/* Medical History */}
          <TextField
            name="medical_history"
            label="Medical History"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            helperText="Separate values by commas"
            onChange={handleDashboardChange}
            value={data.medical_history || ""}
          />

          {/* Submit */}
          <Button variant="outlined" color="success" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Record;
