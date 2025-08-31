import React from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useGlobalContext } from "./context";

const SymptomSearch = ({
  selectedSymptom,
  setSelectedSymptom,
  handleAddSymptom,
}) => {
  const { options } = useGlobalContext();
  

console.log("🔎 Total options available:", options.length);


  return (
    <div className="flex w-4/5 lg:w-full justify-center gap-3 items-center">
      <Autocomplete
        options={options}
        value={selectedSymptom}
        onChange={(e, newValue) => setSelectedSymptom(newValue)}
        className="searchbox w-full bg-white rounded-md shadow-sm"
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            color="primary"
            label="Enter your symptoms..."
          />
        )}
      />
      <Button
        variant="outlined"
        color="info"
        onClick={handleAddSymptom}
        size="large"
        className="hover:scale-105 transition-transform"
      >
        Add
      </Button>
    </div>
  );
};

export default SymptomSearch;
