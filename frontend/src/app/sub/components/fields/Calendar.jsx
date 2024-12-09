import { useState, useEffect } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";

const Calendar = ({ dbDays }) => {
  const defaultClassNames = getDefaultClassNames();
  const [selected, setSelected] = useState([]);
  const [toBeAdded, setToBeAdded] = useState([]);
  const [toBeDeleted, setToBeDeleted] = useState([]);

  useEffect(() => {
    // Format dbDays and set them as the initially selected dates
    const formatted = dbDays.map((day) => new Date(day));
    setSelected(formatted);
  }, [dbDays]);

  const handleSelect = (day) => {
    let updatedSelected = [...selected];
    let updatedToBeAdded = [...toBeAdded];
    let updatedToBeDeleted = [...toBeDeleted];

    if (selected.includes(day)) {
      // If the day was already selected, remove it from the selected array
      updatedSelected = updatedSelected.filter((d) => d !== day);

      // If it was part of the initial dbDays, add it to the toBeDeleted array
      if (dbDays.some((d) => new Date(d) === day)) {
        updatedToBeDeleted.push(day);
      } else {
        // If it was part of toBeAdded, remove it from toBeAdded
        updatedToBeAdded = updatedToBeAdded.filter((d) => d !== day);
      }
    } else {
      // If the day was not selected, add it to the selected array
      updatedSelected.push(day);

      // If it's not part of the initial dbDays, add it to toBeAdded
      if (!dbDays.some((d) => new Date(d) === day)) {
        updatedToBeAdded.push(day);
      } else {
        // If it was part of toBeDeleted, remove it from toBeDeleted
        updatedToBeDeleted = updatedToBeDeleted.filter((d) => d !== day);
      }
    }

    setSelected(updatedSelected);
    setToBeAdded(updatedToBeAdded);
    setToBeDeleted(updatedToBeDeleted);
  };

  useEffect(() => {
    console.log("To be added:", toBeAdded);
    console.log("To be deleted:", toBeDeleted);
  }, [toBeAdded, toBeDeleted]);

  return (
    <div>
      <p className="text-3xl">Valitse sopivat päivämäärät</p>
      <DayPicker
        mode="multiple"
        selected={selected}
        onSelect={handleSelect}
        showOutsideDays
        showWeekNumber
        classNames={{
          today: `border-amber-300`,
          selected: `bg-amber-500 border-amber-500 text-white`,
          root: `${defaultClassNames.root} shadow-lg p-5`,
          chevron: `${defaultClassNames.chevron} fill-green-500`,
        }}
      />
    </div>
  );
};

export default Calendar;
