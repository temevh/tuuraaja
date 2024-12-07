"use client";

import axios from "axios";

import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import {
  SubjectsField,
  FirstNameField,
  LastNameField,
  EmailField,
  PhoneNumberField,
} from "../sub/components";
import CodeField from "./components/CodeField";
import { useRouter } from "next/navigation";
import PasswordField from "./components/PasswordField";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhonenumber] = useState(null);
  const [schoolCode, setSchoolCode] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {
      console.log("loaded site");
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getsubjects"
        );
        const tempSub = response.data;
        const subjectNames = tempSub.map((subject) => subject.name);
        setSubjectList(subjectNames);
        setLoading(false);
      } catch (error) {
        console.log("error loading courses", error);
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const updateSubjects = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedSubjects(typeof value === "string" ? value.split(",") : value);
  };

  const updateFirstname = (event) => {
    setFirstname(event.target.value);
  };

  const updateLastname = (event) => {
    setLastname(event.target.value);
  };

  const updateEmail = (event) => {
    setEmail(event.target.value);
  };

  const updateNumber = (event) => {
    setPhonenumber(event.target.value);
  };

  const updateSchoolCode = (event) => {
    setSchoolCode(event.target.value);
  };

  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  const updatePasswordCheck = (event) => {
    setPasswordCheck(event.target.value);
  };

  const checkPasswords = () => {
    if (password.length < 6) {
      alert("Salasanan tulee olla yli 6 merkkiä pitkä");
      return false;
    } else if (password !== passwordCheck) {
      alert("Salasanat eivät täsmää");
      return false;
    } else {
      return true;
    }
  };

  const createPressed = async () => {
    const passwordsValid = checkPasswords();
    if (passwordsValid) {
      console.log("name ", firstname, lastname);
      console.log("email", email);
      console.log("number", phoneNumber);
      console.log("subjects", selectedSubjects);
      console.log("code", schoolCode);
      try {
        const response = await axios.post("http://localhost:5000/api/addsub", {
          firstName: firstname,
          lastName: lastname,
          phoneNumber: phoneNumber,
          email: email,
          subjects: selectedSubjects,
          password: password,
          dates: [],
          school: schoolCode,
        });
        console.log(response.data);
        const userEmail = email;
        router.push(`/mobile/${userEmail}`);
      } catch (error) {
        console.error("Error sending info:", error);
      }
    } else {
      return;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-gray-300">
      {loading ? (
        <p className="text-black font-bold text-3xl">Ladataan...</p>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-6 items-center rounded-md">
            <FirstNameField
              firstName={firstname}
              updateFirstName={updateFirstname}
            />
            <LastNameField
              lastName={lastname}
              updateLastName={updateLastname}
            />
          </div>
          <div className="flex gap-6 items-center rounded-md">
            <EmailField email={email} updateEmail={updateEmail} />
            <PhoneNumberField
              phoneNumber={phoneNumber}
              updateNumber={updateNumber}
            />
          </div>
          <div className="flex gap-6 items-center rounded-md">
            <SubjectsField
              subjectList={subjectList}
              selectedSubjects={selectedSubjects}
              updateSelectedSubjects={updateSubjects}
            />
            <CodeField code={schoolCode} updateCode={updateSchoolCode} />
          </div>
          <div className="flex gap-6 items-center rounded-md">
            <PasswordField
              password={password}
              updatePassword={updatePassword}
            />
            <PasswordField
              password={passwordCheck}
              updatePassword={updatePasswordCheck}
            />
          </div>
          <div className="bg-green-500 rounded-md hover:bg-green-900">
            <Button onClick={createPressed}>
              <p className="text-white font-bold text-xl hover:text-black">
                Luo profiili
              </p>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
