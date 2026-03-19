import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { SelectedTime } from "../../../../types";
import { ChevronRight, ChevronLeft } from 'lucide-react';

const DAYS = ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"];
const TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

const getWeekNumber = (d) => {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
};

const formatDateRange = (d) => {
  const date = new Date(d);
  const day = date.getDay();
  const diffToMonday = date.getDate() - day + (day === 0 ? -6 : 1);

  const start = new Date(date.setDate(diffToMonday));
  const end = new Date(start.valueOf());
  end.setDate(start.getDate() + 6);

  const format = (dt) => `${dt.getDate()}.${dt.getMonth() + 1}.`;
  return `${format(start)} - ${format(end)}${end.getFullYear()}`;
};

export const TimePicker = ({ dbDays, setSelectedDates }) => {
  const [currentWeekDate, setCurrentWeekDate] = useState(new Date());
  const [selectedTimes, setSelectedTimes] = useState<SelectedTime>(new Set());

  const getMonday = (d) => {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const toggleSlot = (date, time) => {
    const slotId = `${date.toISOString().split('T')[0]}T${time}`;

    const newSelected = new Set(selectedTimes);
    if (newSelected.has(slotId)) {
      newSelected.delete(slotId);
    } else {
      newSelected.add(slotId);
    }
    setSelectedTimes(newSelected);
  };

  const forwardWeek = () => {
    const newDate = new Date(currentWeekDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeekDate(newDate);
  };

  const backwardWeek = () => {
    const newDate = new Date(currentWeekDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeekDate(newDate);
  };

  const monday = getMonday(currentWeekDate);

  return (
    <div className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-center mb-6">
        <IconButton onClick={backwardWeek}>
          <ChevronLeft />
        </IconButton>
        <div className="mx-4 text-center">
          <h2 className="text-xl font-bold text-zinc-900 mb-1">
            Viikko {getWeekNumber(currentWeekDate)}
          </h2>
          <p className="text-sm font-medium text-zinc-500">
            {formatDateRange(currentWeekDate)}
          </p>
        </div>
        <IconButton onClick={forwardWeek}>
          <ChevronRight />
        </IconButton>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {DAYS.map((day) => (
          <div
            key={day}
            className="text-center font-semibold text-gray-500 text-sm mb-2"
          >
            {day}
          </div>
        ))}

        {TIME_SLOTS.map((time, rowIndex) => (
          <React.Fragment key={time}>
            {DAYS.map((_, colIndex) => {
              const cellDate = new Date(monday);
              cellDate.setDate(monday.getDate() + colIndex);

              const slotId = `${cellDate.toISOString().split('T')[0]}T${time}`;
              const isSelected = selectedTimes.has(slotId);

              return (
                <button
                  key={slotId}
                  onClick={() => toggleSlot(cellDate, time)}
                  className={`
                    w-full aspect-square md:aspect-auto md:h-12 flex items-center justify-center
                    rounded-xl text-xs md:text-sm font-medium transition-all duration-200
                    ${isSelected
                      ? "bg-zinc-900 text-white shadow-md transform scale-105"
                      : "bg-zinc-50 text-zinc-600 hover:bg-zinc-200 hover:scale-105"
                    }
                  `}
                >
                  {time}
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
