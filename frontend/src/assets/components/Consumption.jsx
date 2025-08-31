import React, { useEffect } from "react";
import crossIcon from "../img/cross icon.svg";
import {
  Button,
  FormControl,
  Select,
  MenuItem,
  Grid,
  InputLabel,
} from "@mui/material";
import { useGlobalContext } from "./context";

const ConsumptionModal = ({ consumptionModal, setConsumptionModal }) => {
  const { handleDashboardChange, data, handleDashboardSubmit } =
    useGlobalContext();

  const closeConsumptionModal = () => {
    setConsumptionModal(false);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal")) {
        closeConsumptionModal();
      }
    };
    if (consumptionModal) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [consumptionModal]);

  if (!consumptionModal) return null;

  return (
    <div className="modal fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[50%] relative">
        {/* Close button */}
        <div className="w-full flex justify-end">
          <button
            onClick={closeConsumptionModal}
            className="hover:scale-105 transition"
          >
            <img src={crossIcon} alt="close" loading="lazy" />
          </button>
        </div>

        {/* Form */}
        <form
          className="w-full flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            closeConsumptionModal();
            handleDashboardSubmit(e);
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <h1 className="text-2xl font-semibold text-gray-800">
                Consumption Data
              </h1>
            </Grid>

            {/* Smoking Consumption */}
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Smoking Consumption</InputLabel>
                <Select
                  value={data.smoke_cons || ""}
                  onChange={handleDashboardChange}
                  name="smoke_cons"
                  label="Smoking Consumption"
                >
                  <MenuItem value={"No Consumption"}>Non Smoker</MenuItem>
                  <MenuItem value={"Mild Smoking"}>Mild Smoking</MenuItem>
                  <MenuItem value={"Oftenly Smokes/ Addiction"}>
                    Addiction
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Alcohol Consumption */}
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Alcohol Consumption</InputLabel>
                <Select
                  value={data.alcohol_cons || ""}
                  onChange={handleDashboardChange}
                  name="alcohol_cons"
                  label="Alcohol Consumption"
                >
                  <MenuItem value={"No Consumption"}>No Consumption</MenuItem>
                  <MenuItem value={"Mild Consumption"}>Mild</MenuItem>
                  <MenuItem value={"High Consumption"}>
                    High Consumption
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Button variant="outlined" color="success" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ConsumptionModal;
