"use client";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";

const CalendarComponent = ({ selectedDate, onDateChange }) => {
  const [value, setValue] = useState(null);

  const isHighlighted = (date) => {
    if (!selectedDate) return false;
    return (
      date.getFullYear() === selectedDate.getFullYear() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getDate() === selectedDate.getDate()
    );
  };

  const dayClicked = (date) => {
    onDateChange(date);
  };

  useEffect(() => {
    setValue(selectedDate);
  }, [selectedDate]);

  return (
    <CalendarContainer>
      <Calendar
        onChange={setValue}
        value={value}
        onClickDay={dayClicked}
        tileClassName={({ date, view }) => {
          if (view === "month" && isHighlighted(date)) {
            return "highlight";
          }
        }}
        tileDisabled={({ date }) => [0, 6].includes(date.getDay())}
        locale="FI"
      />
    </CalendarContainer>
  );
};

export default CalendarComponent;

const CalendarContainer = styled.div`
  /* ~~~ container styles ~~~ */
  max-width: 700px;
  margin: auto;
  margin-top: 20px;
  background-color: #ffffff;
  border: 1px solid #e4e4e7;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
  padding: 16px;
  border-radius: 12px;

  /* ~~~ calendar width ~~~ */
  .react-calendar {
    width: 100%;
  }

  .react-calendar__month-view__weekdays__weekday {
    text-decoration: bibe;
  }

  /* ~~~ navigation styles ~~~ */
  .react-calendar__navigation {
    display: flex;

    .react-calendar__navigation__label {
      font-weight: bold;
    }

    .react-calendar__navigation__arrow {
      flex-grow: 0.333;
    }
  }

  /* Hide the previous and next year buttons */
  .react-calendar__navigation__prev2-button,
  .react-calendar__navigation__next2-button {
    display: none;
  }

  /* ~~~ label styles ~~~ */
  .react-calendar__month-view__weekdays {
    text-align: center;
    color: black;
  }

  /* ~~~ button styles ~~~ */
  button {
    margin: 3px;
    background-color: #18181b;
    border: 0;
    border-radius: 8px;
    color: white;
    padding: 8px 0;

    &:hover {
      background-color: #27272a;
    }

    &:active {
      background-color: #3f3f46;
    }
  }

  /* ~~~ day grid styles ~~~ */
  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: repeat(7, 2fr);

    .react-calendar__tile {
      max-width: initial !important;
    }

    .react-calendar__tile--range {
      box-shadow: 0 0 0px 1px #18181b;
    }
  }

  /* ~~~ neighboring month & weekend styles ~~~ */
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.3;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #a1a1aa;
    opacity: 0.8;
  }

  .react-calendar__month-view__weekdays__weekday:nth-child(6),
  .react-calendar__month-view__weekdays__weekday:nth-child(7) {
    opacity: 0.5;
  }

  .react-calendar__tile--active {
    background: #18181b !important;
    border-radius: 8px !important;
    color: white !important;
  }

  /* ~~~ other view styles ~~~ */
  .react-calendar__year-view__months,
  .react-calendar__decade-view__years,
  .react-calendar__century-view__decades {
    display: grid !important;
    grid-template-columns: 20% 20% 20% 20% 20%;

    &.react-calendar__year-view__months {
      grid-template-columns: 33.3% 33.3% 33.3%;
    }

    .react-calendar__tile {
      max-width: initial !important;
    }
  }
`;
