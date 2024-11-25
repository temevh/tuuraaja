"use client";
import { useRouter } from "next/navigation";

import PasswordField from "../register/components/PasswordField";
import { EmailField } from "../mobile/components";
import { useState } from "react";

import axios from "axios";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [wasFound, setWasFound] = useState(false);

  const updateEmail = (event) => {
    setEmail(event.target.value);
  };

  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  const checkDb = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getcredentials", {
        params: {
          email: email,
          password: password,
        },
      });
      //const wasFound = response.data.found;
      if (response.data.found === true) {
        setWasFound(true);
      }
      if (wasFound === true) {
        router.push("/mobile");
      } else {
        alert("Salasana tai sähköposti väärin");
        setEmail("");
        setPassword("");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkCrendtials = () => {
    checkDb();
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
