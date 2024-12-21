import { useEffect, useState } from "react";

const TimeSelect = ({ setSelectedTime }) => {
  const minutes = [0, 15, 30, 45];
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");

  useEffect(() => {}, [selectedHour]);

  const changeHour = (hour) => {
    setSelectedHour(hour);
    setSelectedTime([hour, selectedMinute]);
  };

  const changeMinute = (minute) => {
    setSelectedTime([selectedHour, minute]);
  };

  return (
    <div className="flex flex-row gap-4 mt-4">
      <p className="text-lg">Aloitusaika</p>

      <div className="pb-2 rounded-lg">
        <div className="flex flex-row gap-1">
          <select
            className="p-2 rounded-lg bg-gray-400"
            onChange={(e) => changeHour(e.target.value)}
          >
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <p className="text-2xl">:</p>
          <select
            className="p-2 rounded-lg bg-gray-400"
            onChange={(e) => changeMinute(e.target.value)}
          >
            {minutes.map((minute) => (
              <option key={minute} value={minute}>
                {minute.toString().padStart(2, "0")}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TimeSelect;
