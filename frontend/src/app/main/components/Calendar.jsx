import { useEffect, useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import { fi } from "react-day-picker/locale";
import "./calendar.css";

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
          root: `${defaultClassNames.root} shadow-lg p-5`,
          chevron: `${defaultClassNames.chevron} fill-green-500`,
          day: `custom-day`,
          week: `custom-week`,
          month: `custom-month`,
          selected: `custom-selected`,
          button_next: `custom-arrow`,
          button_previous: `custom-arrow`,
        }}
      />
    </div>
  );
};

export default Calendar;
