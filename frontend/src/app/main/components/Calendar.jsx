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
      <p className="text-3xl text-center pb-4">Kalenteri</p>
      <div className="bg-gray-700 rounded-md">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={handleSelect}
          locale={fi}
          showWeekNumber
          classNames={{
            root: `${defaultClassNames.root}`,
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
    </div>
  );
};

export default Calendar;
