import React, { useEffect, useRef, useState } from "react";
import crossIcon from "../img/cross icon.svg";
import { TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { useGlobalContext } from "./context";

const LogModal = ({ logModal, setLogModal }) => {
  const { fetchData, url, data, setData } = useGlobalContext();

  const afterRef = useRef("");
  const beforeRef = useRef("");
  const highRef = useRef("");
  const lowRef = useRef("");

  // Save date in state for display
  const [today, setToday] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2);
    const month = currentDate.toLocaleString("default", { month: "short" });
    const day = currentDate.getDate();
    setToday(`${day} ${month} '${year}`);
  }, []);

  const closeLogModal = () => setLogModal(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Build updated form data
    const highValue = highRef.current.value;
    const lowValue = lowRef.current.value;
    const beforeValue = beforeRef.current.value;
    const afterValue = afterRef.current.value;

    const updatedFormData = { ...data };

    // Add BP log
    if (highValue && lowValue) {
      updatedFormData.bp_log.high.push(highValue);
      updatedFormData.bp_log.low.push(lowValue);
      updatedFormData.bp_log.date.push(today);
    }

    // Add Glucose log
    if (beforeValue && afterValue) {
      updatedFormData.blood_glucose.before.push(beforeValue);
      updatedFormData.blood_glucose.after.push(afterValue);
      updatedFormData.blood_glucose.date.push(today);
    }

    try {
      await axios.put(url, updatedFormData, { withCredentials: true });
      setData(updatedFormData); // update local state
      await fetchData(); // refresh data
    } catch (error) {
      console.error("Error submitting log:", error);
    }

    closeLogModal();
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal")) {
        closeLogModal();
      }
    };
    if (logModal) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [logModal]);

  if (!logModal) return null;

  return (
    <div className="modal fixed top-0 left-0 w-screen h-screen bg-black/40 flex justify-center items-center z-50">
      <div className="flex flex-col gap-4 items-center bg-white rounded-lg shadow-lg p-6 w-96 sm:w-[450px]">
        {/* Close button */}
        <div className="w-full flex justify-end">
          <button onClick={closeLogModal} className="hover:scale-110 transition">
            <img src={crossIcon} alt="close" className="w-6 h-6" />
          </button>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-gray-800">Medical Log</h1>
        <h2 className="text-lg text-teal-600 font-semibold">{today}</h2>

        {/* Form */}
        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Blood Pressure */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Blood Pressure</h3>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField name="high" label="High" inputRef={highRef} type="number" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField name="low" label="Low" inputRef={lowRef} type="number" fullWidth />
              </Grid>
            </Grid>
          </div>

          {/* Glucose */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Glucose Level</h3>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField name="before" label="Before Breakfast" inputRef={beforeRef} type="number" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField name="after" label="After Breakfast" inputRef={afterRef} type="number" fullWidth />
              </Grid>
            </Grid>
          </div>

          {/* Submit button */}
          <Button variant="contained" color="success" type="submit">
            Add Entry
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LogModal;
