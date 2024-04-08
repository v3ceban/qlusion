import { useState } from "react";

export default function Calendar() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const years = [currentYear, currentYear + 1];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedDay, setSelectedDay] = useState(null);

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const dayOfTheWeek = (month, year, day) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[new Date(year, month, day).getDay()];
  };

  const generateDays = () => {
    const totalDays = daysInMonth(selectedMonth, selectedYear);
    const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
    const days = [];

    for (let i = 1; i <= totalDays; i++) {
      const row = Math.ceil((i + firstDay) / 7) + 1;
      days.push(
        <label
          key={i}
          onClick={() => setSelectedDay(i)}
          className={
            selectedDay === i
              ? "active " + dayOfTheWeek(selectedMonth, selectedYear, i)
              : dayOfTheWeek(selectedMonth, selectedYear, i)
          }
          style={{ gridRow: row }}
        >
          <input type="radio" name={`day`} />
          {i}
        </label>,
      );
    }
    return days;
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(months.indexOf(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const calendarHeaders = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days.map((day) => (
      <p key={day} className={day} style={{ gridRow: "1" }}>
        {day.slice(0, 3)}
      </p>
    ));
  };

  return (
    <form method="POST" id="calendarForm">
      <select
        name="month"
        defaultValue={months[currentMonth]}
        onChange={handleMonthChange}
      >
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
      <select
        name="year"
        defaultValue={currentYear}
        onChange={handleYearChange}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <div id="calendar">
        {calendarHeaders()}
        {generateDays()}
      </div>
    </form>
  );
}
