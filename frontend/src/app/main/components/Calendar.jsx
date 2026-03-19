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
      <p className="text-2xl font-bold tracking-tight text-zinc-900 pb-4 text-center">Kalenteri</p>
      <div className="bg-white border border-zinc-200 shadow-sm rounded-xl p-2 flex justify-center text-zinc-900">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={handleSelect}
          locale={fi}
          showWeekNumber
          classNames={{
            root: `${defaultClassNames.root}`,
            chevron: `${defaultClassNames.chevron} fill-zinc-500`,
            today: `custom-today`,
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
