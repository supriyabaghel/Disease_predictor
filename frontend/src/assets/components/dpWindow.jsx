import { useState } from "react";
import Button from "@mui/material/Button";
import SymptomSearch from "./searchSymptoms";
import { useGlobalContext } from "./context";
import cancelIcon from "../img/cross icon.svg";
import axios from "axios";
import Prediction from "./Prediction";
import dpImg from "../img/dp-image.svg";

const DpWindow = () => {
  const { options } = useGlobalContext();

  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [prediction, setPrediction] = useState(null);

  // Helpers
  const isDuplicate = (symptom) => symptoms.includes(symptom);

  const handleAddSymptom = () => {
    if (!selectedSymptom) {
      alert("Choose a valid symptom");
      return;
    }
    if (isDuplicate(selectedSymptom)) {
      alert("This symptom has already been added!");
      return;
    }
    setSymptoms((prev) => [...prev, selectedSymptom]);
    setSelectedSymptom(null);
  };

  const removeSymptom = (symptom) => {
    setSymptoms((prev) => prev.filter((s) => s !== symptom));
    if (symptoms.length === 1) {
      setPrediction(null);
    }
  };

  const clearSymptoms = () => {
    setSymptoms([]);
    setPrediction(null);
  };

  // 🔹 Call new backend (POST /predict/)
  const handlePredict = async () => {
    if (symptoms.length === 0) {
      alert("Add at least one symptom!");
      return;
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/predict/", {
        symptoms: symptoms,
      });

      console.log("Prediction response:", response.data);
      setPrediction(response.data);
    } catch (error) {
      console.error("Prediction error:", error);
      alert("Prediction failed. Check backend logs.");
    }
  };

  return (
    <div className="dpWindow w-full flex flex-col items-center justify-center px-4 py-6">
      {/* Symptom search */}
      <div className="bttns-container flex w-2/3 xl:w-1/2 justify-center mb-6">
        <SymptomSearch
          handleAddSymptom={handleAddSymptom}
          selectedSymptom={selectedSymptom}
          setSelectedSymptom={setSelectedSymptom}
        />
      </div>

      {/* Symptoms & Prediction */}
      <div className="symptoms w-5/6 flex flex-col md:flex-row justify-center gap-10">
        {/* Selected symptoms */}
        <div className="w-full md:w-4/5 lg:w-1/2 overflow-y-scroll max-h-[400px] border rounded-xl shadow-sm p-4 bg-white">
          <h2 className="text-xl lg:text-2xl mb-3 font-semibold">Your Symptoms</h2>
          <div className="flex flex-wrap bg-green-50 w-full p-2 rounded-md">
            {symptoms.length === 0 ? (
              <div className="text-gray-500 italic flex justify-center w-full">
                Add your first symptom
              </div>
            ) : (
              symptoms.map((symptom) => (
                <div
                  key={symptom}
                  className="added-symptom flex items-center gap-2 px-3 py-1 bg-green-200 rounded-lg m-1"
                >
                  <span>{symptom}</span>
                  <button onClick={() => removeSymptom(symptom)}>
                    <img src={cancelIcon} alt="Remove symptom" className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Buttons */}
          <div className="btn-container w-full flex gap-2 mt-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handlePredict}
              className="w-1/2 md:w-1/3 h-11"
            >
              Predict
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={clearSymptoms}
              className="w-1/2 md:w-1/3 h-11"
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Prediction */}
        <div className="w-full md:w-4/5 lg:w-1/3 p-4 flex flex-col bg-white rounded-xl shadow-sm">
          <h2 className="text-xl lg:text-2xl mb-3 font-semibold">Prediction</h2>
          {prediction ? (
            <Prediction prediction={prediction} />
          ) : (
            <div className="w-full h-full bg-sky-50 mt-2 rounded-lg flex items-center justify-center text-gray-500 italic">
              No prediction
            </div>
          )}
        </div>
      </div>

      {/* About Section */}
      <section className="w-full flex flex-col md:flex-row justify-center items-center mt-10 gap-6">
        <div className="hero flex flex-col justify-center sm:w-5/6 md:w-1/2 px-4">
          <div className="hero-text text-3xl lg:text-4xl mb-5 font-bold">
            About our Disease Predictor
          </div>
          <div className="text-base xl:text-lg text-gray-600">
            Our disease predictor is powered by machine learning, trained on
            medical datasets to give you reliable predictions and suggested
            doctor specialities.
          </div>
        </div>
        <div className="img-wrapper w-1/2 flex justify-center">
          <img src={dpImg} alt="Disease Predictor" className="block w-4/5" />
        </div>
      </section>
    </div>
  );
};

export default DpWindow;
