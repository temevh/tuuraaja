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
    <div className="bg-blue-800 rounded-lg shadow-lg p-6">
      <DayPicker
        mode="multiple"
        selected={selected}
        onSelect={handleSelect}
        showOutsideDays
        locale={fi}
        showWeekNumber
        classNames={{
          today: `border-green-500 text-red-500`,
          day: `hover:bg-blue-200 hover:text-black focus:bg-blue-500 transition duration-300 ease-in-out rounded-lg`,
          selected: `bg-purple-600 border-blue-600 text-white rounded-md`,
          root: `${defaultClassNames.root} bg-blue-600 rounded-lg shadow-lg p-5`,
          chevron: `${defaultClassNames.chevron} fill-yellow-500`,
        }}
      />
    </div>
  );
};

export default Calendar;
