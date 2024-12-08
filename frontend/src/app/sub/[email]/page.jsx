"use client";
import { useParams } from "next/navigation";
import SubInfo from "../components/SubInfo";
import axios from "axios";

import { formatDates } from "@/app/utils/functions";
import { useEffect, useState } from "react";

const userPage = () => {
  const { email } = useParams();
  const formattedEmail = email.replace("%40", "@");
  const [subInfo, setSubInfo] = useState(null);

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
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getsubinfo",
          {
            params: {
              email: formattedEmail,
            },
          }
        );
        console.log(response.data);
        setSubInfo(response.data);
      } catch (error) {
        console.error("Error fetching sub info", error);
      }
    };
    fetchSubInfo();
  }, [formattedEmail]);

  return (
    <div className="min-h-screen w-full bg-gray-700 flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-gray-300 rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center gap-6">
          <p className="text-2xl font-bold text-gray-700">{formattedEmail}</p>
          <SubInfo updateDates={updateDates} />
        </div>
      </div>
    </div>
  );
};

export default userPage;
