import { useState, useEffect } from "react";
import { DayPicker, getDefaultClassNames, DateUtils } from "react-day-picker";
import "react-day-picker/style.css";

const Calendar = ({ dbDays, setSelectedDates }) => {
  const defaultClassNames = getDefaultClassNames();
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const formatted = dbDays.map((day) => new Date(day));
    setSelected(formatted);
  }, [dbDays]);

  const handleSelect = (selectedDates) => {
    setSelected(selectedDates);
    setSelectedDates(selectedDates);
  };

  return (
    <div>
      <p className="text-3xl">Valitse sopivat päivämäärät</p>
      <DayPicker
        mode="multiple"
        selected={selected}
        onSelect={handleSelect}
        showOutsideDays
        locale={"Fi"}
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
