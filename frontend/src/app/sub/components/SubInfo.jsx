"use client";
import { useEffect, useState } from "react";

import Calendar from "./fields/Calendar";

const SubInfo = ({ userInfo }) => {
  const [dbDays, setDbDays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userInfo.dates) {
      const formattedDates = userInfo.dates.map((day) => new Date(day));
      setDbDays(formattedDates);
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
            <Calendar dbDays={dbDays} />
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
