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
    if (!Array.isArray(selectedDates)) {
      console.error("selectedDates is not an array!");
      return;
    }

    const datesWithTime = selectedDates.map((date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const hour = parseInt(selectedTime[0], 10);
      const minute = parseInt(selectedTime[1], 10);
      return new Date(year, month, day, hour, minute);
    });

    const response = await axios.post("http://localhost:5000/api/updatedates", {
      email: userInfo.email,
      dates: datesWithTime,
    });
    console.log(response);
    if (response.status === 200) {
      alert(response.data.message);
    } else {
      alert(response.data.error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-700 flex justify-center items-center p-6 rounded-lg">
      {loading ? (
        <p>Ladataan...</p>
      ) : (
        <div>
          <div className="flex flex-row gap-6 pb-6">
            <div>
              <Calendar dbDays={dbDays} setSelectedDates={setSelectedDates} />
              <TimeSelect setSelectedTime={setSelectedTime} />
            </div>
            <div>
              <p>Sub post list</p>
            </div>
          </div>
          <button
            onClick={updateDates}
            className="bg-gradientpurple rounded-lg p-4 hover:bg-gradientpink transition duration-300 ease-in-out transform hover:scale-105 shadow-lg mx-auto w-1/2"
          >
            <p className="text-center">Päivitä tiedot</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default SubInfo;
