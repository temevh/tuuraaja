"use client";
import { useRouter } from "next/navigation";
import PasswordField from "./register/components/PasswordField";
import { EmailField } from "./sub/components";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Button from "./components/Button";

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

  const login = async (overrideEmail, overridePassword) => {
    const loginEmail =
      typeof overrideEmail === "string" ? overrideEmail : email;
    const loginPassword =
      typeof overridePassword === "string" ? overridePassword : password;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        {
          email: loginEmail,
          password: loginPassword,
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
          <Button variant="primary" size="lg" fullWidth onClick={login}>
            Kirjaudu sisään
          </Button>
          <div className="flex flex-row gap-2 pt-2 justify-center items-center">
            <p className="text-zinc-500 text-sm">Ei vielä käyttäjää?</p>
            <Button variant="ghost" size="sm" onClick={registerClicked}>
              Luo profiili
            </Button>
          </div>

          <div className="mt-4 pt-4 border-t border-zinc-100 flex flex-col gap-2">
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="md"
                fullWidth
                onClick={() => login("sub@mail.com", "Testi123!")}
              >
                Sub
              </Button>
              <Button
                variant="secondary"
                size="md"
                fullWidth
                onClick={() => login("admin@mail.com", "Testi123!")}
              >
                Admin
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
