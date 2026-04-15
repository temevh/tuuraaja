"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import {
  AddSubjectButton,
  SubList,
  SubjectDropdown,
  Calendar,
  TimeSelect,
  LevelCheckboxes,
} from "./components/index";
import { generateToken, sendEmail } from "../utils/functions";
import PostList from "./components/PostsList";
import Button from "../components/Button";

export default function Home() {
  const [substitutes, setSubstitutes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState([null, null]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubstitutes, setSelectedSubstitutes] =
    useState<GridRowSelectionModel>({ type: "include", ids: new Set() });
  const [lukioChecked, setLukioChecked] = useState(false);
  const [ylakouluChecked, setYlakouluChecked] = useState(false);
  const [posts, setPosts] = useState([]);

  const constructDate = (selectedDate, selectedTime) => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const day = selectedDate.getDate();
    const hour = parseInt(selectedTime[0], 10);
    const minute = parseInt(selectedTime[1], 10);

    return new Date(year, month, day, hour, minute);
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getposts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  const createPressed = async () => {
    if (!selectedTime[0] || !selectedTime[1]) return;
    const postCode = await createPost();
    if (!postCode) return;

    const date = constructDate(selectedDate, selectedTime);
    sendEmail(selectedSubstitutes, selectedSubject, date, postCode);
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getsubjects",
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
    if (!selectedTime[0] || !selectedTime[1]) {
      console.error("Time is not fully selected");
      return;
    }

    const date = constructDate(selectedDate, selectedTime);

    console.log("date", date);

    let level = "molemmat";
    if (!lukioChecked && ylakouluChecked) {
      level = "ylakoulu";
    } else if (lukioChecked && !ylakouluChecked) {
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
      }
    } catch (error) {
      console.error("Error fetching subs", error);
    }
  };

  const createPost = async () => {
    if (!selectedTime[0] || !selectedTime[1]) {
      console.error("Time is not fully selected");
      return;
    }

    const date = constructDate(selectedDate, selectedTime);

    console.log("Creating post with date:", date);

    const postCode = generateToken(16);

    try {
      console.log("postDate", date);
      const response = await axios.post("http://localhost:5000/api/addpost", {
        date: date.toISOString(),
        subject: selectedSubject,
        postCode: postCode,
      });
      console.log(response);
      alert(response.data.message);
      fetchPosts();
      return postCode;
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <div className="flex justify-center p-6 min-h-screen bg-zinc-50">
      {loading ? (
        <div className="flex items-center justify-center w-full h-full min-h-[50vh]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-32 bg-zinc-200 rounded mb-4"></div>
            <p className="text-zinc-600 font-medium">Ladataan...</p>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-5xl bg-white border border-zinc-200 rounded-2xl shadow-sm p-10">
          <div className="flex flex-col gap-2">
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
            <span className="flex flex-row gap-6">
              <SubjectDropdown
                selectedSubject={selectedSubject}
                onSubjectChange={setSelectedSubject}
                subjects={subjects}
              />
              <AddSubjectButton />
            </span>
            <div className="flex flex-row justify-between">
              <Button variant="primary" size="lg" onClick={fetchSubs}>
                Hae sijaisia
              </Button>
            </div>
            <SubList
              substitutes={substitutes}
              selectedSubstitutes={selectedSubstitutes}
              setSelectedSubstitutes={setSelectedSubstitutes}
            />
            <Button variant="primary" size="lg" onClick={createPressed}>
              Luo ilmoitus
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
