import React, { useState, useRef, useEffect } from "react";

const Calendar = () => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  const monthDropdownRef = useRef(null);
  const yearDropdownRef = useRef(null);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getMonthName = (month) => {
    return new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      new Date(2000, month, 1)
    );
  };

  const getWeekdayName = (day) => {
    return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
      new Date(2000, 0, day + 2) // adjust so it starts at Monday
    );
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setIsMonthDropdownOpen(false);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setIsYearDropdownOpen(false);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleClickOutside = (event) => {
    if (
      monthDropdownRef.current &&
      !monthDropdownRef.current.contains(event.target)
    ) {
      setIsMonthDropdownOpen(false);
    }
    if (
      yearDropdownRef.current &&
      !yearDropdownRef.current.contains(event.target)
    ) {
      setIsYearDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Render weekdays
  const renderDaysList = () =>
    Array.from({ length: 7 }).map((_, i) => (
      <div
        key={`day-${i}`}
        className="flex-1 text-center w-8 text-gray-700 text-sm"
      >
        {getWeekdayName(i)}
      </div>
    ));

  // Month dropdown
  const renderMonthDropdown = () => {
    const monthOptions = Array.from({ length: 12 }, (_, i) => ({
      value: i,
      label: getMonthName(i),
    }));

    return (
      <div className="relative inline-block" ref={monthDropdownRef}>
        <button
          className="bg-white text-teal-500 px-2 py-1 rounded hover:scale-105"
          onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
        >
          {getMonthName(selectedMonth)}
        </button>
        {isMonthDropdownOpen && (
          <div className="absolute mt-2 py-1 w-20 bg-white border rounded shadow max-h-44 overflow-y-auto z-10">
            {monthOptions.map((option) => (
              <div
                key={option.value}
                className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleMonthChange(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Year dropdown
  const renderYearDropdown = () => {
    const yearOptions = Array.from({ length: 50 }, (_, i) => {
      const year = currentDate.getFullYear() - 25 + i;
      return { value: year, label: year.toString() };
    });

    return (
      <div className="relative inline-block" ref={yearDropdownRef}>
        <button
          className="bg-white text-gray-700 px-2 py-1 rounded hover:scale-105"
          onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
        >
          {selectedYear}
        </button>
        {isYearDropdownOpen && (
          <div className="absolute mt-2 py-1 w-24 bg-white border rounded shadow max-h-44 overflow-y-auto z-10">
            {yearOptions.map((option) => (
              <div
                key={option.value}
                className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleYearChange(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Calendar rendering
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
    const calendar = [];

    // Empty cells for previous month
    for (let i = 0; i < firstDay; i++) {
      calendar.push(<div key={`empty-${i}`} className="w-8 h-8" />);
    }

    // Add current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(selectedYear, selectedMonth, i);
      const isSelected = date.toDateString() === selectedDate.toDateString();
      const isCurrentDate = date.toDateString() === currentDate.toDateString();

      const cellClasses = `w-8 h-8 rounded-2xl text-sm flex items-center justify-center cursor-pointer transition-all duration-200
        ${isSelected ? "bg-teal-500 text-white" : ""}
        ${!isSelected && isCurrentDate ? "bg-sky-500 text-white" : ""}
        ${!isSelected && !isCurrentDate ? "text-gray-600 hover:bg-gray-100" : ""}
      `;

      calendar.push(
        <div
          key={`date-${i}`}
          className={cellClasses}
          onClick={() => handleDateClick(date)}
        >
          {i}
        </div>
      );
    }

    return calendar;
  };

  return (
    <div className="w-full rounded-lg p-4 shadow bg-white">
      <div className="flex gap-2 items-center mb-4">
        {renderMonthDropdown()}
        {renderYearDropdown()}
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">{renderDaysList()}</div>
      <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
    </div>
  );
};

export default Calendar;
