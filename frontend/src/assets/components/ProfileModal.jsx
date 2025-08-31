import React, { useEffect } from "react";
import crossIcon from "../img/cross icon.svg";
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useGlobalContext } from "./context";

const ProfileModal = ({ profileModal, setProfileModal }) => {
  const { handleDashboardChange, data, handleDashboardSubmit } =
    useGlobalContext();

  const closeModal = () => {
    setProfileModal(false);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal")) {
        closeModal();
      }
    };

    if (profileModal) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [profileModal]);

  if (!profileModal) return null;

  return (
    <div className="modal fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-2xl">
        {/* Close button */}
        <div className="w-full flex justify-end">
          <button onClick={closeModal} className="hover:scale-110 transition">
            <img src={crossIcon} alt="close modal" loading="lazy" />
          </button>
        </div>

        <h1 className="text-3xl pb-6 font-semibold text-gray-700 text-center">
          Edit Profile
        </h1>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDashboardSubmit(e);
            closeModal();
          }}
          className="w-full flex flex-col gap-4 items-center"
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="first_name"
                label="First Name"
                fullWidth
                value={data.first_name || ""}
                onChange={handleDashboardChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="last_name"
                label="Last Name"
                fullWidth
                value={data.last_name || ""}
                onChange={handleDashboardChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="age"
                label="Age"
                fullWidth
                type="number"
                value={data.age || ""}
                onChange={handleDashboardChange}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Sex</InputLabel>
              <Select
                name="sex"
                value={data.sex || ""}
                onChange={handleDashboardChange}
                fullWidth
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="height"
                label="Height (cm)"
                fullWidth
                type="number"
                value={data.height || ""}
                onChange={handleDashboardChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="weight"
                label="Weight (Kg)"
                fullWidth
                type="number"
                value={data.weight || ""}
                onChange={handleDashboardChange}
              />
            </Grid>

            {/* DOB */}
            <Grid item xs={4}>
              <TextField
                name="dob_day"
                label="Day"
                helperText="Date of Birth"
                type="number"
                fullWidth
                value={data.dob_day || ""}
                onChange={handleDashboardChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="dob_month"
                label="Month"
                helperText="Month of Birth"
                type="number"
                fullWidth
                value={data.dob_month || ""}
                onChange={handleDashboardChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="dob_year"
                label="Year"
                helperText="Year of Birth"
                type="number"
                fullWidth
                value={data.dob_year || ""}
                onChange={handleDashboardChange}
              />
            </Grid>

            {/* Diet */}
            <Grid item xs={6}>
              <InputLabel>Diet Type</InputLabel>
              <Select
                name="diet"
                value={data.diet || ""}
                onChange={handleDashboardChange}
                fullWidth
              >
                <MenuItem value="Vegan">Vegan</MenuItem>
                <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
              </Select>
            </Grid>

            {/* Exercise */}
            <Grid item xs={6}>
              <InputLabel>Exercise</InputLabel>
              <Select
                name="exercise"
                value={data.exercise || ""}
                onChange={handleDashboardChange}
                fullWidth
              >
                <MenuItem value="Yoga">Yoga</MenuItem>
                <MenuItem value="Mild Exercises">
                  Mild Exercises - Walks, Jogs
                </MenuItem>
                <MenuItem value="Heavy Exercises">
                  Heavy Exercises - Running, Lifting
                </MenuItem>
                <MenuItem value="No">No Exercise</MenuItem>
              </Select>
            </Grid>
          </Grid>

          {/* Submit */}
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            className="w-48 mt-4"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
