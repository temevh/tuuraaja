"use client";
import { useParams } from "next/navigation";
import SubInfo from "../components/SubInfo";
import axios from "axios";

import { formatDates } from "@/app/utils/functions";
import { useEffect } from "react";

const userPage = () => {
  const { email } = useParams();
  const formattedEmail = email.replace("%40", "@");

  const updateDates = async (dates) => {
    try {
      const formattedDates = formatDates(dates);
      console.log("formattedDates", formattedDates);

      const response = await axios.post("http://localhost:5000/api/adddates", {
        email: formattedEmail,
        dates: formattedDates,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error adding dates", error);
    }
  };

  useEffect(() => {
    const fetchSubInfo = async () => {
      const response = await axios.get("http://localhost:5000/api/getsubinfo", {
        params: {
          email: formattedEmail,
        },
      });
      console.log(response.data);
    };
    fetchSubInfo();
  }, []);

  return (
    <div className="min-h-screen w-full bg-green-700 flex justify-center items-center p-6">
      <div className="grid grid-cols-1 gap-y-6">
        <p>{formattedEmail}</p>
        <SubInfo updateDates={updateDates} />
      </div>
    </div>
  );
};

export default userPage;
