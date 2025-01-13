import { useEffect, useState } from "react";

const TimeSelect = ({ setSelectedTime }) => {
  const minutes = [0, 15, 30, 45];
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");

  const changeHour = (hour) => {
    setSelectedHour(hour);
  };

  const changeMinute = (minute) => {
    setSelectedMinute(minute);
  };

  useEffect(() => {
    if (selectedHour && selectedMinute) {
      setSelectedTime([selectedHour, selectedMinute]);
    }
  }, [selectedHour, selectedMinute, setSelectedTime]);

  return (
    <div className="flex flex-row gap-4 mt-4">
      <p className="text-lg text-black">Aloitusaika</p>
      <div className="pb-2 rounded-lg">
        <div className="flex flex-row gap-1">
          <select
            className="p-2 rounded-lg bg-blue-700"
            onChange={(e) => changeHour(e.target.value)}
          >
            <option value="">--</option>
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <p className="text-2xl">:</p>
          <select
            className="p-2 rounded-lg bg-blue-700"
            onChange={(e) => changeMinute(e.target.value)}
          >
            <option value="">--</option>
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
