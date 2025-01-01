"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  AddSubjectButton,
  SubList,
  SubjectDropdown,
  Calendar,
  TimeSelect,
  LevelCheckboxes,
} from "./components/index";
import {
  CreatePostButton,
  FetchSubsButton,
  SendSmsButton,
} from "./components/Buttons";
//import sendEmail from "../utils/functions/sendEmail";
import PostList from "./components/PostsList";

export default function Home() {
  const [substitutes, setSubstitutes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState([""]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [buttonState, setButtonState] = useState(true);
  const [selectedSubstitutes, setSelectedSubstitutes] = useState([]);
  const [lukioChecked, setLukioChecked] = useState(false);
  const [ylakouluChecked, setYlakouluChecked] = useState(false);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getposts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getsubjects"
        );
        const tempSub = response.data;
        const subjectNames = tempSub.map((subject) => subject.name);
        setSubjects(subjectNames);
      } catch (error) {
        console.log("error loading courses", error);
      }
    };

    const fetchData = async () => {
      await fetchSubjects();
      await fetchPosts();
      setLoading(false);
    };

    fetchData();
  }, []);

  const fetchSubs = async () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const day = selectedDate.getDate();

    const hour = parseInt(selectedTime[0], 10);
    const minute = parseInt(selectedTime[1], 10);

    const date = new Date(Date.UTC(year, month, day, hour, minute));
    console.log("date", date);

    let level = "molemmat";
    if (lukioChecked === false && ylakouluChecked === true) {
      level = "ylakoulu";
    } else if (lukioChecked === true && ylakouluChecked === false) {
      level = "lukio";
    }

    try {
      const response = await axios.get("http://localhost:5000/api/getsubs", {
        params: {
          subject: selectedSubject,
          date: date.toISOString(),
          level: level,
        },
      });
      if (response.data.length > 0) {
        setSubstitutes(response.data);
        setButtonState(false);
      }
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
      alert(response.data.message);
      fetchPosts();
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
    <div className="flex items-center justify-center p-6 min-h-screen bg-gradient-to-tl from-gradientend to-gradientstart">
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
                <div className="flex flex-row gap-4 items-center">
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
                <PostList posts={posts} />
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <FetchSubsButton fetchSubs={fetchSubs} />
              <CreatePostButton
                sendEmail={emailPressed}
                buttonState={buttonState}
              />
            </div>
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
