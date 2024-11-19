"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";

const SubCalendar = ({ selectedDates, onDateChange }) => {
  const [value, setValue] = useState(new Date());

  const isHighlighted = (date) => {
    return selectedDates.some(
      (highlightedDate) =>
        date.getFullYear() === highlightedDate.getFullYear() &&
        date.getMonth() === highlightedDate.getMonth() &&
        date.getDate() === highlightedDate.getDate()
    );
  };

  const dayClicked = (date) => {
    onDateChange(date);
  };

  return (
    <CalendarContainer>
      <Calendar
        onChange={setValue}
        value={value}
        onClickDay={dayClicked}
        tileClassName={({ date, view }) => {
          if (view === "month" && isHighlighted(date)) {
            return "selected-day";
          }
        }}
        tileDisabled={({ date }) => [0, 6].includes(date.getDay())}
        locale="FI"
      />
    </CalendarContainer>
  );
};

export default SubCalendar;

const CalendarContainer = styled.div`
  /* ~~~ container styles ~~~ */
  width: 100%;
  max-width: 700px;
  margin: auto;
  margin-top: 20px;
  background-color: #d4f7d4;
  padding: 10px;
  border-radius: 3px;

  /* ~~~ calendar width ~~~ */
  .react-calendar {
    width: 100%;
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
    background-color: #6f876f;
    border: 0;
    border-radius: 3px;
    color: white;
    padding: 5px 0;

    &:hover {
      background-color: #556b55;
    }

    &:active {
      background-color: #a5c1a5;
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
      box-shadow: 0 0 6px 2px black;
    }
  }

  /* ~~~ neighboring month & weekend styles ~~~ */
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.3;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #dfdfdf;
    opacity: 0.3;
  }

  .react-calendar__month-view__weekdays__weekday:nth-child(6),
  .react-calendar__month-view__weekdays__weekday:nth-child(7) {
    opacity: 0.5;
  }

  .react-calendar__tile--active {
    background: #15803d !important;
    border-radius: 10% !important;
    color: black !important;
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
