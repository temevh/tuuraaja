"use client";

import axios from "axios";

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
import { LevelCheckboxes } from "../main/components";

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
  const [lukioChecked, setLukioChecked] = useState(false);
  const [ylakouluChecked, setYlakouluChecked] = useState(false);

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

  const createPressed = async () => {
    let level = "molemmat";
    if (lukioChecked === false && ylakouluChecked === true) {
      level = "ylakoulu";
    } else if (lukioChecked === true && ylakouluChecked === false) {
      level = "lukio";
    }

    try {
      await axios.post("http://localhost:5000/api/register", {
        firstName: firstname,
        lastName: lastname,
        phoneNumber: phoneNumber,
        email: email,
        subjects: selectedSubjects,
        password: password,
        dates: [],
        school: schoolCode,
        level: level,
      });
      alert("Rekisteröinti onnistui");
      router.push("/");
    } catch (error) {
      alert("Virhe rekisteröinnissä");
      console.error("Error sending info:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-screen bg-gradient-to-tl from-gradientend to-gradientstart">
          <p className="text-black font-bold text-6xl bg-white rounded-md p-12">
            Ladataan...
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen bg-gradient-to-tl from-gradientend to-gradientstart">
          <div className="w-full flex flex-col gap-6 items-center max-w-md bg-white rounded-lg shadow-2xl p-8 transform transition duration-500 hover:scale-105">
            <p className="text-center text-black text-xl">
              Täytä alla olevat kentät
            </p>
            <div className="flex flex-row gap-6">
              <FirstNameField
                firstName={firstname}
                updateFirstName={updateFirstname}
              />
              <LastNameField
                lastName={lastname}
                updateLastName={updateLastname}
              />
            </div>
            <div className="flex flex-row gap-6">
              <EmailField email={email} updateEmail={updateEmail} />
              <PhoneNumberField
                phoneNumber={phoneNumber}
                updateNumber={updateNumber}
              />
            </div>
            <div className="flex flex-row gap-6">
              <SubjectsField
                subjectList={subjectList}
                selectedSubjects={selectedSubjects}
                updateSelectedSubjects={updateSubjects}
              />
              <CodeField code={schoolCode} updateCode={updateSchoolCode} />
            </div>
            <LevelCheckboxes
              setLukioCheck={() => setLukioChecked(!lukioChecked)}
              setYlakouluCheck={() => setYlakouluChecked(!ylakouluChecked)}
            />
            <div className="flex flex-row gap-6">
              <PasswordField
                password={password}
                updatePassword={updatePassword}
              />
            </div>
            <button
              onClick={createPressed}
              className="bg-buttonprimary rounded-lg p-4 hover:bg-buttonsecondary transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
              <p className="text-white text-2xl font-bold">Luo profiili</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
