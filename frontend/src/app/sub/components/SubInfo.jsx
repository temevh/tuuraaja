"use client";
import { useState } from "react";

import { SubCalendar } from "./index";

const SubInfo = ({ updateDates }) => {
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateChange = (date) => {
    const dateString = date.toDateString();
    const isAlreadySelected = selectedDates.some(
      (highlightedDate) => highlightedDate.toDateString() === dateString
    );

    if (isAlreadySelected) {
      setSelectedDates((prevDates) =>
        prevDates.filter(
          (highlightedDate) => highlightedDate.toDateString() !== dateString
        )
      );
    } else {
      setSelectedDates((prevDates) => [...prevDates, date]);
    }
    console.log(selectedDates);
  };

  return (
    <div className="min-h-screen w-full bg-gray-700 flex justify-center items-center p-6 rounded-lg">
      <div>
        <div className="flex flex-col gap-6 pb-6">
          <p className="text-5xl">Valitse sopivat päivämäärät</p>
          <SubCalendar
            onDateChange={handleDateChange}
            selectedDates={selectedDates}
          />
        </div>
        <div className="bg-purple-500 mt-8 text-center">
          <button onClick={() => updateDates(selectedDates)}>
            Päivitä tiedot
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubInfo;
