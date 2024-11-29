"use client";
import { useParams } from "next/navigation";
import SubInfo from "../components/SubInfo";
import axios from "axios";

import FormatDates from "@/app/utils/functions/FormatDates";

const userPage = () => {
  const { email } = useParams();

  const updateDates = async (dates) => {
    try {
      const formattedDates = FormatDates(dates);
      console.log("formattedDates", formattedDates);

      const response = await axios.post("http://localhost:5000/api/adddates", {
        email: email,
        dates: formattedDates,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error adding dates", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-green-700 flex justify-center items-center p-6">
      <div className="grid grid-cols-1 gap-y-6">
        <SubInfo updateDates={updateDates} />
        <p>Tervetuloa {email}</p>
      </div>
    </div>
  );
};

export default userPage;
