"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import {
  AddSubjectButton,
  SubList,
  SubjectDropdown,
  Buttons,
  Calendar,
  TimeSelect,
  LevelCheckboxes,
} from "./components/index";
//import sendEmail from "../utils/functions/sendEmail";
import PostList from "./components/PostsList";

export default function Home() {
  const [substitutes, setSubstitutes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState([""]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [enableButtons, setEnableButtons] = useState(false);
  const [selectedSubstitutes, setSelectedSubstitutes] = useState([]);
  const [lukioChecked, setLukioChecked] = useState(false);
  const [ylakouluChecked, setYlakouluChecked] = useState(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getsubjects"
        );
        const tempSub = response.data;
        const subjectNames = tempSub.map((subject) => subject.name);
        setSubjects(subjectNames);
        setLoading(false);
      } catch (error) {
        console.log("error loading courses", error);
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const fetchSubs = async () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const day = selectedDate.getDate();

    const hour = parseInt(selectedTime[0], 10);
    const minute = parseInt(selectedTime[1], 10);
    const date = new Date(year, month, day, hour, minute);
    let level = "molemmat";
    if (lukioChecked === false && ylakouluChecked === true) {
      level = "ylakoulu";
    } else if (lukioChecked === true && ylakouluChecked === false) {
      level = "lukio";
    } else {
      level = "molemmat";
    }

    try {
      const response = await axios.get("http://localhost:5000/api/getsubs", {
        params: {
          subject: selectedSubject,
          date: date,
          level: level,
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
    <div className="flex items-center justify-center p-6 min-h-screen bg-gradient-to-tl from-gradientpurple to-gradientpink">
      {loading ? (
        <p className="text-black font-bold text-3xl">Ladataan...</p>
      ) : (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl p-8">
          <div className="flex flex-col gap-2">
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
                <div className="flex flex-row gap-4">
                  <TimeSelect setSelectedTime={setSelectedTime} />
                  <LevelCheckboxes
                    setLukioCheck={() => setLukioChecked(!lukioChecked)}
                    setYlakouluCheck={() =>
                      setYlakouluChecked(!ylakouluChecked)
                    }
                  />
                </div>
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
