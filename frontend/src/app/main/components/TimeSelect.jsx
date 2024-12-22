import { useEffect, useState } from "react";

const TimeSelect = ({ setSelectedTime }) => {
  const minutes = [0, 15, 30, 45];
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16];
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");

  useEffect(() => {
    if (selectedHour !== "" && selectedMinute !== "") {
      setSelectedTime([selectedHour, selectedMinute]);
    }
  }, [selectedHour, selectedMinute, setSelectedTime]);

  const changeHour = (hour) => {
    setSelectedHour(hour);
  };

  const changeMinute = (minute) => {
    setSelectedMinute(minute);
  };

  return (
    <div className="pb-2 rounded-lg pt-2">
      <div className="flex flex-row gap-1 items-center">
        <p className="text-lg font-bold text-black text-center mr-2">Aika</p>
        <select
          className="p-2 rounded-lg bg-blue-400"
          value={selectedHour}
          onChange={(e) => changeHour(e.target.value)}
        >
          <option value="" disabled></option>
          {hours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <p className="text-2xl text-black">:</p>
        <select
          className="p-2 rounded-lg bg-blue-400"
          value={selectedMinute}
          onChange={(e) => changeMinute(e.target.value)}
        >
          <option value="" disabled></option>
          {minutes.map((minute) => (
            <option key={minute} value={minute}>
              {minute.toString().padStart(2, "0")}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TimeSelect;
