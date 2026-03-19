"use client";
import { useEffect, useState } from "react";
import axios from "axios";

import Calendar from "./fields/Calendar";
import { SubPostList } from "./index";
import { TimeSelect } from ".";
import { TimePicker } from "./fields";
import { SelectedTime } from "../../../types";

const SubInfo = ({ userInfo, userPosts }) => {
  const [loading, setLoading] = useState(true);
  const [selectedTimes, setSelectedTimes] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (userInfo.selectedTimes) {
      setSelectedTimes(new Set(userInfo.selectedTimes));
    }
    console.log(userInfo.selectedTimes)
    setLoading(false);
  }, [userInfo.selectedTimes]);

  const updateDates = async () => {
    console.log(selectedTimes)
    const token = localStorage.getItem("token")
    const response = await axios.post(
      "http://localhost:5000/api/updatedates",
      { token: token, selectedTimes: Array.from(selectedTimes) },
    );
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

        <div className="space-y-8">
          <TimePicker
            selectedTimes={selectedTimes}
            setSelectedTimes={setSelectedTimes}
          />
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
