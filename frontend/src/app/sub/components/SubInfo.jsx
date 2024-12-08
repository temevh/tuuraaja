"use client";
import { useEffect, useState } from "react";

import Calendar from "./fields/Calendar";

const SubInfo = ({ updateDates, previousSubDates }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (previousSubDates) {
      const formattedDates = previousSubDates.map((day) => new Date(day));
      setSelectedDates(formattedDates);
    }
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-700 flex justify-center items-center p-6 rounded-lg">
      {loading ? (
        <p>Ladataan...</p>
      ) : (
        <div>
          <div className="flex flex-col gap-6 pb-6">
            <Calendar selectedDates={selectedDates} />
          </div>
          <div className="bg-purple-500 mt-8 text-center">
            <button onClick={() => updateDates(selectedDates)}>
              Päivitä tiedot
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubInfo;
