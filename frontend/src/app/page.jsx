"use client";
import { useRouter } from "next/navigation";
import PasswordField from "./register/components/PasswordField";
import { EmailField } from "./sub/components";
import { useState } from "react";
import axios from "axios";

import { jwtDecode } from "jwt-decode";

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

  const login = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      const userData = response.data.user;
      console.log("Logged in user info:", userData);
      const userRole = userData.role;

      if (userRole === "admin") {
        router.push("/main");
      } else if (userRole === "substitute") {
        router.push("/sub");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Väärä sähköposti tai salasana");
    }
  };

  const registerClicked = () => {
    router.push("/register");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-50">
      <div className="w-full max-w-md bg-white rounded-2xl border border-zinc-200 shadow-sm p-10 mx-4">
        <div className="flex flex-col gap-6">
          <p className="text-center text-zinc-900 text-4xl font-extrabold tracking-tight pb-2">
            Tuuraaja
          </p>
          <div className="flex flex-col gap-5">
            <EmailField email={email} updateEmail={updateEmail} />
            <PasswordField
              password={password}
              updatePassword={updatePassword}
            />
          </div>
          <button
            onClick={login}
            className="mt-2 bg-zinc-900 rounded-xl p-4 hover:bg-zinc-800 transition-colors duration-200"
          >
            <p className="text-white text-lg font-semibold tracking-wide">
              Kirjaudu sisään
            </p>
          </button>
          <div className="flex flex-row gap-2 pt-2 justify-center items-center">
            <p className="text-zinc-500 text-sm">Ei vielä käyttäjää?</p>
            <button onClick={registerClicked} className="group">
              <p className="text-zinc-900 text-sm font-medium group-hover:text-zinc-600 transition-colors duration-200">
                Luo profiili
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
