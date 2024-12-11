"use client";

import { useParams } from "next/navigation";

const ReportPage = () => {
  //The pages route should be randomly generated
  const params = useParams();
  const postCode = params.code;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-2xl font-bold">REPORT PAGE {postCode}</p>
    </div>
  );
};

export default ReportPage;
