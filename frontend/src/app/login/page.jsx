"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

import PasswordField from "../register/components/PasswordField";
import { EmailField } from "../mobile/components";
import { useState } from "react";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const updateEmail = (event) => {
    setEmail(event.target.value);
  };

  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  const checkCrendtials = () => {};

  const loginClicked = () => {
    router.push("/mobile");
  };

  return (
    <div className="flex items-center justify-center h-screen gap-24 bg-green-800">
      <div className="flex flex-col gap-6">
        <EmailField email={email} updateEmail={updateEmail} />
        <PasswordField password={password} updatePassword={updatePassword} />
        <button onClick={checkCrendtials}>
          <div className="bg-green-600 rounded-lg">
            <p className="text-black text-2xl font-bold">Kirjaudu sisään</p>
          </div>
        </button>
      </div>
    </div>
  );
}
