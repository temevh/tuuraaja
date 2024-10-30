import Calendar from "react-calendar";

import "./Sample.css";
import { useState } from "react";

const Calendar = () => {
  const [value, onChange] = useState(new Date());

  const dateChanged = (event) => {
    console.log("changed date to", event.target.value);
  };

  return (
    <div>
      <Calendar onChange={dateChanged} value={value} />
    </div>
  );
};

return Calendar;
