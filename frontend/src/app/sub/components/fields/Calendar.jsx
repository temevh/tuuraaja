import { useState, useEffect } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";

const Calendar = ({ selectedDates, updateDates }) => {
  const defaultClassNames = getDefaultClassNames();
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    console.log("selectedDates:", selectedDates);
    setSelected(selectedDates);
  }, []);

  const daySelected = (day) => {
    console.log("selected", day);
  };

  //Hae databasesta jo valitut päivät
  //Lisää ne kalenteriin alustaessas
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
        onSelect={daySelected}
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
