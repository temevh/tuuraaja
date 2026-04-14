"use client";
import { useEffect, useState } from "react";
import axios from "axios";

import { SubPostList } from "./index";
import { TimePicker } from "./fields";

const SubInfo = ({ userInfo, userPosts }) => {
  const [loading, setLoading] = useState(true);
  const [selectedTimes, setSelectedTimes] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (userInfo.selectedTimes) {
      setSelectedTimes(new Set(userInfo.selectedTimes));
    }
    setLoading(false);
  }, [userInfo.selectedTimes]);

  const updateDates = async () => {
    const response = await axios.post(
      "http://localhost:5000/api/updatedates",
      {
        selectedTimes: Array.from(selectedTimes),
      },
      { withCredentials: true },
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
          <button
            onClick={updateDates}
            className="bg-zinc-900 rounded-xl py-3 px-8 hover:bg-zinc-800 transition-colors duration-200 shadow-sm w-full md:w-1/2"
          >
            <p className="text-center text-white font-semibold tracking-wide">
              Tallenna muutokset
            </p>
          </button>
          <SubPostList userPosts={userPosts} />
        </div>
      </>
    </div>
  );
};

export default SubInfo;
