import React from "react";

const GlucoseLevel = ({ responseData }) => {
  if (
    !responseData ||
    !responseData.blood_glucose ||
    !responseData.blood_glucose.date ||
    responseData.blood_glucose.date.length === 0
  ) {
    return (
      <p className="w-full h-full grid place-content-center italic text-gray-500">
        No values in log
      </p>
    );
  }

  // Function to apply cell styles based on glucose values
  const getCellStyles = (value, isAfterColumn) => {
    if (isAfterColumn) {
      if (value > 180) {
        return "bg-red-100";
      }
    } else {
      if (value > 120) {
        return "bg-red-100";
      }
    }
    return "";
  };

  let prevDate = null; // Track previous date

  return (
    <div className="px-1 bg-white">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b font-semibold text-gray-800">Date</th>
            <th className="py-2 px-4 border-b font-semibold text-gray-800">Before</th>
            <th className="py-2 px-4 border-b font-semibold text-gray-800">After</th>
          </tr>
        </thead>
        <tbody>
          {responseData.blood_glucose.date.map((date, index) => {
            const currentBefore = responseData.blood_glucose.before[index];
            const currentAfter = responseData.blood_glucose.after[index];

            // Skip row if both values are empty
            if (!currentBefore && !currentAfter) {
              return null;
            }

            const isFirstDate = prevDate !== date;
            prevDate = date;

            return (
              <tr key={index} className="border-b">
                <td
                  className={`py-2 px-4 border-r text-gray-800 ${
                    isFirstDate ? "bg-sky-100" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isFirstDate && (
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    )}
                    <div>{date}</div>
                  </div>
                </td>

                <td
                  className={`py-2 px-4 border-r text-center ${getCellStyles(
                    currentBefore,
                    false
                  )}`}
                >
                  {currentBefore}
                </td>

                <td
                  className={`py-2 px-4 text-center ${getCellStyles(
                    currentAfter,
                    true
                  )}`}
                >
                  {currentAfter}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GlucoseLevel;
