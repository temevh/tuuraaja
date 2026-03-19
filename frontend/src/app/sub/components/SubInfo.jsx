"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import SettingsIcon from "@mui/icons-material/Settings";

import Calendar from "./fields/Calendar";
import { SubPostList } from "./index";
import { TimeSelect } from ".";
import { TimePicker } from "./fields";

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
    <div className="mx-auto flex flex-col p-4 w-full">
      <>
        <p className="text-3xl font-extrabold tracking-tight text-zinc-900">
          Moi {userInfo.firstName}! 👋
        </p>

        {/*<Calendar dbDays={dbDays} setSelectedDates={setSelectedDates} /
              <TimeSelect setSelectedTime={setSelectedTime} />
              */}
        <div className="space-y-8">
          <TimePicker dbDays={dbDays} setSelectedDates={setSelectedDates} />
          <SubPostList userPosts={userPosts} />
        </div>
        <button
          onClick={updateDates}
          className="bg-zinc-900 rounded-xl py-3 px-8 hover:bg-zinc-800 transition-colors duration-200 shadow-sm w-full md:w-1/2"
        >
          <p className="text-center text-white font-semibold tracking-wide">
            Tallenna muutokset
          </p>
        </button>
      </>
    </div>
  );
};

export default SubInfo;
