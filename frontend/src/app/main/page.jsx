"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import {
  AddSubjectButton,
  SubList,
  SubjectDropdown,
  Buttons,
  Calendar,
} from "./components/index";
//import sendEmail from "../utils/functions/sendEmail";
import PostList from "./components/PostsList";

export default function Home() {
  const [substitutes, setSubstitutes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [enableButtons, setEnableButtons] = useState(false);
  const [selectedSubstitutes, setSelectedSubstitutes] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getsubjects"
        );
        const tempSub = response.data;
        console.log("tempSub", tempSub);
        const subjectNames = tempSub.map((subject) => subject.name);
        setSubjects(subjectNames);
        console.log("subjects", subjectNames);
        setLoading(false);
      } catch (error) {
        console.log("error loading courses", error);
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const fetchSubs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getsub", {
        params: {
          subject: selectedSubject,
          date: selectedDate,
        },
      });
      setSubstitutes(response.data);
      setEnableButtons(true);
    } catch (error) {
      console.error("Error fetching subs", error);
    }
  };

  const handleSubstituteSelected = (newSubs) => {
    setSelectedSubstitutes(newSubs);
  };

  const createPost = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/addpost", {
        date: selectedDate,
        subject: selectedSubject,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const sendSms = () => {
    alert("Lähetettiin tekstiviesti (ei oikeesti)");
  };

  const emailPressed = () => {
    createPost();
    //sendEmail(selectedSubstitutes, selectedSubject, selectedDate);
    //alert("Lähetettiin sähköposti valituille henkilöille");
  };

  return (
    <div className="min-h-screen w-full bg-gray-700 flex justify-center items-center p-6">
      {loading ? (
        <p className="text-black font-bold text-3xl">Ladataan...</p>
      ) : (
        <div className="w-full max-w-4xl bg-gray-500 rounded-lg shadow-lg p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-6">
              <SubjectDropdown
                selectedSubject={selectedSubject}
                onSubjectChange={setSelectedSubject}
                subjects={subjects}
              />
              <AddSubjectButton />
            </div>
            <div className="flex flex-row gap-4 w-full">
              <div className="w-1/2">
                <Calendar
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </div>
              <div className="w-1/2 ">
                <PostList />
              </div>
            </div>
            <Buttons
              fetchSubs={fetchSubs}
              sendSms={sendSms}
              sendEmail={emailPressed}
              buttonState={!enableButtons}
            />
            <SubList
              substitutes={substitutes}
              onSubstituteSelected={handleSubstituteSelected}
            />
          </div>
        </div>
      )}
    </div>
  );
}
