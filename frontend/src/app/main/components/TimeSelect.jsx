import { useEffect, useState } from "react";

const TimeSelect = () => {
  const minutes = [0, 15, 30, 45];
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  const [selectedHour, setSelectedHour] = useState("");

  useEffect(() => {
    console.log("selected hour:", selectedHour);
  }, [selectedHour]);

  const changeHour = (hour) => {
    setSelectedHour(hour);
  };

  return (
    <div className="p-2 rounded-lg">
      <p className="text-lg font-bold">Aika</p>
      <div className="flex flex-row gap-4">
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
        <select className="p-2 rounded-lg bg-gray-400">
          {minutes.map((minute) => (
            <option key={minute} value={minute}>
              {minute}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TimeSelect;
