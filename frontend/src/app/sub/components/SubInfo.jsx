"use client";
import { useEffect, useState } from "react";
import axios from "axios";

import Calendar from "./fields/Calendar";

const SubInfo = ({ userInfo }) => {
  const [dbDays, setDbDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    if (userInfo.dates) {
      const formattedDates = userInfo.dates.map((day) => new Date(day));
      setDbDays(formattedDates);
    }
    setLoading(false);
  }, [userInfo.dates]);

  const updateDates = async () => {
    console.log("selected dates:", selectedDates);

    if (!Array.isArray(selectedDates)) {
      console.error("selectedDates is not an array");
      return;
    }

    const response = await axios.post("http://localhost:5000/api/updatedates", {
      email: userInfo.email,
      dates: selectedDates.map((date) => date.toISOString().split("T")[0]), // Format dates as YYYY-MM-DD
    });
    console.log(response);
  };

  return (
    <div className="min-h-screen w-full bg-gray-700 flex justify-center items-center p-6 rounded-lg">
      {loading ? (
        <p>Ladataan...</p>
      ) : (
        <div>
          <div className="flex flex-col gap-6 pb-6">
            <Calendar dbDays={dbDays} setSelectedDates={setSelectedDates} />
          </div>
          <div className="bg-purple-500 mt-8 text-center">
            <button onClick={updateDates}>Päivitä tiedot</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubInfo;
