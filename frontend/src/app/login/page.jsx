"use client";

import axios from "axios";

import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { SubjectsField } from "../mobile/components";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

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

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-gray-600">
      {loading ? (
        <p className="text-black font-bold text-3xl">Ladataan...</p>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-6 items-center rounded-md">
            {/*<p className="text-2xl text-">Etunimi</p>*/}
            <TextField
              label="Etunimi"
              sx={{ width: 300, backgroundColor: "white" }}
            ></TextField>
            <TextField
              label="Sukunimi"
              sx={{ width: 300, backgroundColor: "white" }}
            ></TextField>
          </div>
          <div className="flex gap-6 items-center rounded-md">
            <TextField
              label="Sähköposti"
              sx={{ width: 300, backgroundColor: "white" }}
            ></TextField>
            <TextField
              label="Puhelinnumero"
              sx={{ width: 300, backgroundColor: "white" }}
            ></TextField>
          </div>
          <SubjectsField
            subjectList={subjectList}
            selectedSubjects={selectedSubjects}
            updateSelectedSubjects={updateSubjects}
          />
        </div>
      )}
    </div>
  );
}
