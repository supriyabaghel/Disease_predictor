import React from "react";

const Prediction = ({ prediction }) => {
  if (!prediction) {
    return (
      <div className="w-full h-full bg-sky-50 mt-2 rounded-lg flex items-center justify-center text-gray-500 italic">
        No prediction yet
      </div>
    );
  }

  // Format % probability
  const formatProb = (prob) => `${(prob * 100).toFixed(2)}%`;

  return (
    <div className="flex flex-col gap-4">
      {/* Highlighted Predicted Disease */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-green-200 to-green-400 shadow-md text-center">
        <div className="text-xl font-bold text-green-900">
          🩺 Predicted Disease: <span className="uppercase">{prediction.predicted}</span>
        </div>
        <div className="text-md mt-2 text-gray-800">
          Recommended Doctor:{" "}
          <span className="font-semibold text-purple-800">{prediction.doctor}</span>
        </div>
      </div>

      {/* Top 5 Predictions */}
      <div className="bg-teal-50 rounded-xl p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">
          🔍 Top 5 Possible Diseases
        </h3>
        <div className="flex flex-col gap-2">
          {prediction.top5.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white px-3 py-2 rounded-lg shadow-sm"
            >
              <span className="font-medium text-gray-800">{item.disease}</span>
              <span className="text-sm text-gray-600">
                {formatProb(item.prob)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Prediction;
