import { useEffect, useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import { fi } from "react-day-picker/locale";

const Calendar = ({ selectedDate, setSelectedDate }) => {
  const defaultClassNames = getDefaultClassNames();
  const [selected, setSelected] = useState(new Date());

  useEffect(() => {
    setSelected(selectedDate);
  }, [selectedDate]);

  const handleSelect = (date) => {
    setSelected(date);
    setSelectedDate(date);
  };

  return (
    <div>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={handleSelect}
        locale={fi}
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
