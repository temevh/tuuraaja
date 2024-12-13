"use client";
import { Button } from "@mui/material";

import { useRouter } from "next/navigation";
import PasswordField from "./register/components/PasswordField";
import { EmailField } from "./sub/components";
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
      if (response.data.found === true) {
        setWasFound(true);
      }
      if (wasFound === true) {
        const userEmail = email;
        router.push(`/sub/${userEmail}`);
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

  const registerClicked = () => {
    router.push("/register");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-tl from-gradientpurple to-gradientpink">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8 transform transition duration-500 hover:scale-105">
        <div className="flex flex-col gap-6">
          <p className="text-center text-black text-5xl italic underline font-bold pb-6">
            Tuuraaja
          </p>
          <EmailField email={email} updateEmail={updateEmail} />
          <PasswordField password={password} updatePassword={updatePassword} />
          <button
            onClick={checkCrendtials}
            className="bg-gradientpurple rounded-lg p-4 hover:bg-gradientpink transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            <p className="text-white text-2xl font-bold">Kirjaudu sisään</p>
          </button>
        </div>
        <div className="flex flex-row gap-2 pt-4 justify-center">
          <p className="text-black text-lg">Ei vielä käyttäjää? </p>
          <button onClick={registerClicked}>
            <p className="text-blue-500 text-lg underline hover:text-blue-700 transition duration-300">
              Luo profiili
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
