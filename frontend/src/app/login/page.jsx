"use client";
import { useRouter } from "next/navigation";
import PasswordField from "../register/components/PasswordField";
import { EmailField } from "../sub/components";
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
        router.push(`/mobile/${userEmail}`);
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
    <div className="min-h-screen w-full bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col gap-6">
          <EmailField email={email} updateEmail={updateEmail} />
          <PasswordField password={password} updatePassword={updatePassword} />
          <button
            onClick={checkCrendtials}
            className="bg-green-600 rounded-lg p-4 hover:bg-green-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <p className="text-white text-2xl font-bold">Kirjaudu sisään</p>
          </button>
        </div>
      </div>
    </div>
  );
}
