"use client";
import { useEffect, useState } from "react";
import axios from "axios";

import Calendar from "./fields/Calendar";
import { SubPostList } from "./index";
import { TimeSelect } from ".";

const SubInfo = ({ userInfo, userPosts }) => {
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
    if (response.status === 200) {
      alert(response.data.message);
    } else {
      alert(response.data.error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-300 flex justify-center items-center p-6 rounded-lg">
      {loading ? (
        <p>Ladataan...</p>
      ) : (
        <div>
          <p className="text-2xl text-white font-bold pb-2">
            {userInfo.firstName} {userInfo.lastName}
          </p>
          <div className="flex flex-row gap-6 pb-2">
            <div>
              <Calendar dbDays={dbDays} setSelectedDates={setSelectedDates} />
              <TimeSelect setSelectedTime={setSelectedTime} />
            </div>
            <div className="w-1/2">
              <SubPostList userPosts={userPosts} />
            </div>
          </div>
          <button
            onClick={updateDates}
            className="bg-gradientpurple rounded-lg p-4 hover:bg-gradientpink transition duration-300 ease-in-out transform hover:scale-105 shadow-lg mx-auto w-1/2"
          >
            <p className="text-center">Tallenna muutokset</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default SubInfo;
