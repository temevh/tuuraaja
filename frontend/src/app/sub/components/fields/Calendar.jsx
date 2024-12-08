import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

const Calendar = ({ selectedDates }) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    console.log("selectedDates:", selectedDates);
    setSelected(selectedDates);
  }, []);

  return (
    <div>
      <p className="text-3xl">Valitse sopivat päivämäärät</p>
      <DayPicker mode="multiple" selected={selected} onSelect={setSelected} />
    </div>
  );
};

export default Calendar;
