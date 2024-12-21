import { useState, useEffect } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { fi } from "react-day-picker/locale";
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
    <div className="rounded-lg">
      <DayPicker
        mode="multiple"
        selected={selected}
        onSelect={handleSelect}
        showOutsideDays
        locale={fi}
        showWeekNumber
        classNames={{
          today: `border-blue-600`,
          day: `hover:bg-blue-100 focus:bg-blue-100 transition duration-200 ease-in-out rounded-md`,
          selected: `bg-blue-500 border-blue-500 text-white`,
          root: `${defaultClassNames.root} bg-pink-300 rounded-lg shadow-lg p-5`,
          chevron: `${defaultClassNames.chevron} fill-green-500`,
        }}
      />
    </div>
  );
};

export default Calendar;
