"use client";
import { useParams } from "next/navigation";
import SubInfo from "../components/SubInfo";

const userPage = () => {
  const { email } = useParams();

  return (
    <div className="min-h-screen w-full bg-green-700 flex justify-center items-center p-6">
      <div className="grid grid-cols-1 gap-y-6">
        <SubInfo />
      </div>
    </div>
  );
};

export default userPage;
