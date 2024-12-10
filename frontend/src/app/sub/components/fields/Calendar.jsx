import { useState, useEffect } from "react";
import { DayPicker, getDefaultClassNames, DateUtils } from "react-day-picker";
import "react-day-picker/style.css";

const Calendar = ({ dbDays }) => {
  const defaultClassNames = getDefaultClassNames();
  //const [selectedDayss, setSelectedDays] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    // Format dbDays and set them as the initially selected dates
    const formatted = dbDays.map((day) => new Date(day));
    setSelected(formatted);
  }, [dbDays]);

  const buttonClicked = () => {
    console.log("selected days:", selected);
  };

  return (
    <div>
      <p className="text-3xl">Valitse sopivat päivämäärät</p>
      <DayPicker
        mode="multiple"
        selected={selected}
        onSelect={setSelected}
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
      <button onClick={buttonClicked}>PRESS ME</button>
    </div>
  );
};

export default Calendar;
