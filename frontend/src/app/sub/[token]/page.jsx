"use client";
import { useParams } from "next/navigation";
import SubInfo from "../components/SubInfo";
import axios from "axios";

//import { formatDates } from "@/app/utils/functions";
import { useEffect, useState } from "react";

const userPage = () => {
  //const { token } = useParams();
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchSubInfo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getsubinfo",
          {
            params: {
              token: token,
            },
          }
        );
        setUserInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sub info", error);
      }
    };
    fetchSubInfo();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-700 flex justify-center items-center p-6 bg-gradient-to-tl from-gradientpurple to-gradientpink">
      {loading ? (
        <p>Ladataan...</p>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <SubInfo userInfo={userInfo} />
        </div>
      )}
    </div>
  );
};

export default userPage;
