"use client";
import { Button } from "@mui/material";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const registerClicked = () => {
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen gap-24 bg-gray-600">
      <div className="bg-green-700 rounded-lg hover:bg-green-500">
        <Button onClick={registerClicked}>
          <p className="text-white font-bold text-xl hover:text-black">
            Kirjaudu sisään
          </p>
        </Button>
      </div>
      <div className="bg-green-700 rounded-lg hover:bg-green-500">
        <Button>
          <p className="text-white font-bold text-xl hover:text-black">
            Luo profiili
          </p>
        </Button>
      </div>
    </div>
  );
}
