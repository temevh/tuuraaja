import { useState, useEffect } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";

const Calendar = ({ dbDays }) => {
  const defaultClassNames = getDefaultClassNames();
  const [selected, setSelected] = useState([]);
  const [allDays, setAllDays] = useState([]);
  const [toBeAdded, setToBeAdded] = useState([]);
  const [toBeDeleted, setToBeDeleted] = useState([]);

  useEffect(() => {
    console.log("dbDays:", dbDays);
    const formatted = dbDays.map((day) => new Date(day));
    setSelected(formatted);
    setAllDays(formatted);
  }, [dbDays]);

  useEffect(() => {
    console.log("all days:", allDays);
    if (allDays.includes(selected)) {
      console.log("Day already selected");
    } else {
      console.log("Day not yet selected");
    }
  }, [selected]);

  //Hae databasesta jo valitut päivät check
  //Lisää ne kalenteriin alustaessa check
  //Käyttäjän klikatessa päivää
  //Jos jo valittu (haettu db) -> lisää poistoarrayhin
  //Jos ei valittu -> lissää lisäysarrayhin
  //Nappia painaessa poista ensin poistettavat
  //Lisää uudet
  //Ilmoita käyttäjälle muutoksista

  return (
    <div>
      <p className="text-3xl">Valitse sopivat päivämäärät</p>
      <DayPicker
        mode="multiple"
        selected={selected}
        onSelect={setSelected}
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
