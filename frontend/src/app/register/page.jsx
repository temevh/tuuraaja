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
        <div className="flex items-center justify-center h-screen bg-zinc-50">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-32 bg-zinc-200 rounded mb-4"></div>
            <p className="text-zinc-400 font-medium">Ladataan...</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-zinc-50 py-12">
          <div className="w-full flex flex-col gap-6 items-center max-w-xl bg-white border border-zinc-200 rounded-2xl shadow-sm p-10 mx-4">
            <div className="w-full text-center pb-2">
              <p className="text-zinc-900 text-2xl font-bold tracking-tight">
                Luo profiili
              </p>
              <p className="text-zinc-500 text-sm mt-1">
                Täytä alla olevat kentät jatkaaksesi
              </p>
            </div>
            
            <div className="w-full flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row gap-5 w-full">
                <div className="w-full sm:w-1/2">
                  <FirstNameField
                    firstName={firstname}
                    updateFirstName={updateFirstname}
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <LastNameField
                    lastName={lastname}
                    updateLastName={updateLastname}
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-5 w-full">
                <div className="w-full sm:w-1/2">
                  <EmailField email={email} updateEmail={updateEmail} />
                </div>
                <div className="w-full sm:w-1/2">
                  <PhoneNumberField
                    phoneNumber={phoneNumber}
                    updateNumber={updateNumber}
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-5 w-full">
                <SubjectsField
                  subjectList={subjectList}
                  selectedSubjects={selectedSubjects}
                  updateSelectedSubjects={updateSubjects}
                />
                <CodeField code={schoolCode} updateCode={updateSchoolCode} />
              </div>
              
              <div className="w-full pt-2">
                <LevelCheckboxes
                  setLukioCheck={() => setLukioChecked(!lukioChecked)}
                  setYlakouluCheck={() => setYlakouluChecked(!ylakouluChecked)}
                />
              </div>
              
              <div className="w-full pt-2">
                <PasswordField
                  password={password}
                  updatePassword={updatePassword}
                />
              </div>
            </div>
            
            <button
              onClick={createPressed}
              className="w-full mt-4 bg-zinc-900 rounded-xl p-4 hover:bg-zinc-800 transition-colors duration-200"
            >
              <p className="text-white text-lg font-semibold tracking-wide">Rekisteröidy</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
