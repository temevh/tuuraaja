"use client";
import { useEffect, useState } from "react";
import axios from "axios";

import Calendar from "./fields/Calendar";
import { TimeSelect } from ".";

const SubInfo = ({ userInfo }) => {
  const [dbDays, setDbDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTime, setSelectedTime] = useState([""]);
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
      console.error("selectedDates is not an array!");
      return;
    }

    const datesWithTime = selectedDates.map((date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const hour = parseInt(selectedTime[0], 10) + 2;
      const minute = parseInt(selectedTime[1], 10);
      return new Date(year, month, day, hour, minute);
    });

    const response = await axios.post("http://localhost:5000/api/updatedates", {
      email: userInfo.email,
      dates: datesWithTime,
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
            <div className="flex flex-row gap-4">
              <p className="text-lg">Valitse sopiva aikaväli</p>
              <TimeSelect setSelectedTime={setSelectedTime} />
            </div>
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
